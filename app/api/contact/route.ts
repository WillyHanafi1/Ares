import { NextRequest, NextResponse } from 'next/server';
import { validateContactForm } from '@/lib/validation';
import { verifyRecaptcha } from '@/lib/recaptcha';
import { saveContact, checkRateLimit } from '@/lib/database';
import { sendContactNotification, sendContactConfirmation } from '@/lib/email';

/**
 * POST /api/contact
 * Handle contact form submissions with security features:
 * 1. reCAPTCHA v3 verification
 * 2. Input validation and sanitization
 * 3. Rate limiting
 * 4. Database storage
 * 5. Email notifications
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

    // Step 4: Check rate limit
    const isRateLimited = await checkRateLimit(ipAddress);
    if (isRateLimited) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many submissions. Please try again later.'
        },
        { status: 429 }
      );
    }

    // Step 5: Save to database (Primary Source of Truth & Failover)
    const contactId = await saveContact(validation.sanitizedData!, ipAddress);

    // Step 6: Forward to n8n Webhook (Automation Layer)
    // We send payload to n8n for "Heavy Lifting" (CRM, Email, Slack, etc.)
    if (process.env.N8N_WEBHOOK_URL) {
      try {
        console.log('🚀 Forwarding to n8n webhook...');
        const n8nResponse = await fetch(process.env.N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Source': 'Seriaflow-Website',
          },
          body: JSON.stringify({
            ...validation.sanitizedData,
            id: contactId,
            ip: ipAddress,
            submittedAt: new Date().toISOString(),
          }),
        });

        if (n8nResponse.ok) {
          console.log('✅ forwarded to n8n successfully');
        } else {
          console.error('❌ n8n webhook error:', n8nResponse.statusText);
        }
      } catch (error) {
        console.error('❌ Failed to forward to n8n:', error);
        // We do NOT fail the request here, because data is already saved in DB
      }
    }

    // Step 7: Send email notifications (Legacy/Backup)
    // You can disable this if n8n handles all emails
    Promise.all([
      sendContactNotification(validation.sanitizedData!),
      sendContactConfirmation(validation.sanitizedData!),
    ]).catch(error => {
      console.error('Email notification error:', error);
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message! We will get back to you soon.',
        id: contactId,
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
  });
}
