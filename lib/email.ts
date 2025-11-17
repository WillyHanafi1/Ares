import { Resend } from 'resend';
import { ContactFormData } from './validation';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send email notification for new contact form submission
 */
export async function sendContactNotification(data: ContactFormData): Promise<boolean> {
  const notificationEmail = process.env.NOTIFICATION_EMAIL;

  if (!notificationEmail) {
    console.error('NOTIFICATION_EMAIL is not configured');
    return false;
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured');
    return false;
  }

  try {
    await resend.emails.send({
      from: 'SeriaFlow <onboarding@resend.dev>', // Change to your verified domain
      to: notificationEmail,
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #22d3ee 0%, #a855f7 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
              .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border-left: 3px solid #22d3ee; }
              .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;"> New Lead!</h1>
                <p style="margin: 5px 0 0 0; opacity: 0.9;">You have a new contact form submission</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name</div>
                  <div class="value">${data.name}</div>
                </div>
                <div class="field">
                  <div class="label">Email</div>
                  <div class="value"><a href="mailto:${data.email}" style="color: #22d3ee; text-decoration: none;">${data.email}</a></div>
                </div>
                <div class="field">
                  <div class="label">Company</div>
                  <div class="value">${data.company}</div>
                </div>
                <div class="field">
                  <div class="label">Message</div>
                  <div class="value">${data.message}</div>
                </div>
                <div class="footer">
                  <p>Submitted at: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}</p>
                  <p>This email was sent from your SeriaFlow website contact form.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
}

/**
 * Send confirmation email to the person who submitted the form
 */
export async function sendContactConfirmation(data: ContactFormData): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured');
    return false;
  }

  try {
    await resend.emails.send({
      from: 'SeriaFlow <onboarding@resend.dev>', // Change to your verified domain
      to: data.email,
      subject: 'Thank you for contacting SeriaFlow!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #22d3ee 0%, #a855f7 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .button { display: inline-block; background: linear-gradient(135deg, #22d3ee 0%, #a855f7 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
              .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; text-align: center; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;"> SeriaFlow</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">AI-Powered Business Solutions</p>
              </div>
              <div class="content">
                <h2 style="color: #1f2937;">Thank You, ${data.name}!</h2>
                <p>We've received your message and appreciate you reaching out to us. Our team will review your inquiry and get back to you within 24 hours.</p>
                <p><strong>Your message:</strong></p>
                <div style="background: white; padding: 15px; border-radius: 6px; border-left: 3px solid #22d3ee; margin: 15px 0;">
                  ${data.message}
                </div>
                <p>In the meantime, feel free to explore our services and learn more about how we can help transform your business with AI.</p>
                <div style="text-align: center;">
                  <a href="https://seriaflow.com" class="button">Visit Our Website</a>
                </div>
                <div class="footer">
                  <p><strong>SeriaFlow</strong> - Transforming Businesses with AI</p>
                  <p>If you have any urgent questions, please don't hesitate to reach out.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return true;
  } catch (error) {
    console.error('Confirmation email error:', error);
    return false;
  }
}
