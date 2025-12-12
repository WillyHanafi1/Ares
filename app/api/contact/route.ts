import { NextRequest, NextResponse } from 'next/server';
import { validateContactForm } from '@/lib/validation';
import { verifyRecaptcha } from '@/lib/recaptcha';
import { sendContactNotification, sendContactConfirmation } from '@/lib/email';

// Simple in-memory rate limiting (resets on server restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return true;
  }

  record.count++;
  return false;
}

/**
 * POST /api/contact
 * Handle contact form submissions with security features:
 * 1. reCAPTCHA v3 verification
 * 2. Input validation and sanitization
 * 3. In-memory rate limiting
 * 4. Webhook forwarding (primary)
 * 5. Email notifications (backup)
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Step 1: Verify reCAPTCHA token
    if (!body.recaptchaToken) {
      return NextResponse.json(
        { success: false, error: 'reCAPTCHA verification required' },
        { status: 400 }
      );
    }

    const isHuman = await verifyRecaptcha(body.recaptchaToken);
    if (!isHuman) {
      return NextResponse.json(
        { success: false, error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 403 }
      );
    }

    // Step 2: Validate and sanitize input
    const validation = validateContactForm(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    // Step 3: Get client IP address for rate limiting
    const ipAddress =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Step 4: Check rate limit (in-memory)
    const isRateLimited = checkRateLimit(ipAddress);
    if (isRateLimited) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many submissions. Please try again later.'
        },
        { status: 429 }
      );
    }

    // Generate unique ID for this submission
    const submissionId = `SF-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Step 5: Forward to Webhook (Primary Data Handler)
    let webhookSuccess = false;
    if (process.env.N8N_WEBHOOK_URL) {
      try {
        console.log('🚀 Forwarding to webhook...');
        const webhookResponse = await fetch(process.env.N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Source': 'Seriaflow-Website',
          },
          body: JSON.stringify({
            ...validation.sanitizedData,
            id: submissionId,
            ip: ipAddress,
            submittedAt: new Date().toISOString(),
          }),
        });

        if (webhookResponse.ok) {
          console.log('✅ Forwarded to webhook successfully');
          webhookSuccess = true;
        } else {
          console.error('❌ Webhook error:', webhookResponse.statusText);
        }
      } catch (error) {
        console.error('❌ Failed to forward to webhook:', error);
      }
    }

    // Step 6: Send email notifications (Backup if webhook fails or as additional notification)
    try {
      await Promise.all([
        sendContactNotification(validation.sanitizedData!),
        sendContactConfirmation(validation.sanitizedData!),
      ]);
      console.log('✅ Email notifications sent');
    } catch (error) {
      console.error('❌ Email notification error:', error);
      // Don't fail the request if email fails but webhook succeeded
    }

    // If neither webhook nor email worked
    if (!webhookSuccess && !process.env.RESEND_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unable to process your request. Please try again later.'
        },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message! We will get back to you soon.',
        id: submissionId,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again later.'
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/contact
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Contact API is running',
    webhookConfigured: !!process.env.N8N_WEBHOOK_URL,
    emailConfigured: !!process.env.RESEND_API_KEY,
  });
}
