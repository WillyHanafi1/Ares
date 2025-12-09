# Backend Setup Guide

This guide will walk you through setting up the secure backend for your contact form with reCAPTCHA v3, database storage, and email notifications.

##  Prerequisites

- Node.js 18+ installed
- PostgreSQL database (we recommend Supabase for easy setup)
- Google reCAPTCHA v3 account
- Resend account for email sending

##  Quick Start (5 Steps)

### Step 1: Setup Supabase Database (Free)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to Project Settings  Database
4. Copy your connection string (it looks like: `postgresql://postgres:[YOUR-PASSWORD]@[HOST]:5432/postgres`)
5. The database tables will be created automatically on first API call

**Alternative**: Use any PostgreSQL provider (Railway, Neon, etc.)

### Step 2: Setup Google reCAPTCHA v3 (Free)

1. Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Register a new site:
   - Label: SeriaFlow Website
   - reCAPTCHA type: **reCAPTCHA v3**
   - Domains: 
     - `localhost` (for development)
     - `your-domain.com` (for production)
3. Copy your **Site Key** and **Secret Key**

### Step 3: Setup Resend for Emails (Free)

1. Go to [resend.com](https://resend.com) and create a free account
2. Add and verify your domain (or use their test domain)
3. Create an API key in the dashboard
4. Copy your API key (starts with `re_`)

**Free tier**: 100 emails/day, 3,000/month

### Step 4: Configure Environment Variables

Open `.env.local` and fill in your credentials:

```env
# Database (from Supabase)
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@HOST:5432/postgres

# Google reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here

# Email (from Resend)
RESEND_API_KEY=re_your_api_key_here
NOTIFICATION_EMAIL=your@email.com

# Automation (n8n Webhook)
N8N_WEBHOOK_URL=https://n8n.your-domain.com/webhook/contact-form

# Security (default values are fine)
RATE_LIMIT_MAX=5
RATE_LIMIT_WINDOW=3600000
```

### Step 5: Setup n8n Workflow (Optional)

1. Create a `Webhook` node in n8n (POST method)
2. Copy the Production URL
3. Set `N8N_WEBHOOK_URL` in `.env.local`
4. The API will now forward validated leads to your workflow!

### Step 6: Initialize Database & Test

```powershell
# Install dependencies (already done)
npm install

# Initialize database tables
npm run db:init

# Start development server
npm run dev
```

Visit `http://localhost:3000` and test the contact form!

##  Security Features

 **reCAPTCHA v3**: Bot protection with score-based verification (0.5 threshold)  
 **Input Validation**: Strict length and format checks  
 **XSS Prevention**: DOMPurify sanitization removes all HTML tags  
 **SQL Injection Prevention**: Parameterized queries  
 **Rate Limiting**: 5 submissions per hour per IP address  
 **Email Validation**: RFC-compliant email format checking  

##  Database Schema

The `contacts` table is created automatically with these fields:

| Field | Type | Description |
|-------|------|-------------|
| id | SERIAL | Auto-incrementing primary key |
| name | VARCHAR(100) | Contact's full name |
| email | VARCHAR(255) | Contact's email address |
| company | VARCHAR(200) | Company name |
| message | TEXT | Contact message |
| ip_address | VARCHAR(45) | Submitter's IP (for rate limiting) |
| created_at | TIMESTAMP | Submission timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**Indexes**: email, created_at, ip_address (for fast queries)

##  Email Templates

Two emails are sent automatically:

1. **Admin Notification**: Sent to you with lead details
2. **Customer Confirmation**: Sent to the person who submitted the form

Both emails are fully styled with your brand colors (cyan + purple gradient).

##  Testing

### Test reCAPTCHA Integration

1. Open browser DevTools  Console
2. Submit the contact form
3. Check console for reCAPTCHA score (should be 0.5+)

### Test Database Storage

```sql
-- Run in Supabase SQL editor
SELECT * FROM contacts ORDER BY created_at DESC LIMIT 10;
```

### Test Rate Limiting

1. Submit 6 forms quickly
2. The 6th submission should be rejected with "Too many submissions"

### Test Email Delivery

1. Check your inbox (notification email)
2. Check the submitter's inbox (confirmation email)
3. View email logs in Resend dashboard

##  Deployment to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - `RECAPTCHA_SECRET_KEY`
   - `RESEND_API_KEY`
   - `NOTIFICATION_EMAIL`
   - `RATE_LIMIT_MAX=5`
   - `RATE_LIMIT_WINDOW=3600000`
4. Deploy!

**Important**: Update your reCAPTCHA domains to include your Vercel domain.

##  Customization

### Change Rate Limit

Edit `.env.local`:
```env
RATE_LIMIT_MAX=10        # Max submissions
RATE_LIMIT_WINDOW=7200000 # 2 hours in milliseconds
```

### Change reCAPTCHA Score Threshold

Edit `lib/recaptcha.ts` line 38:
```typescript
if (data.success && data.score >= 0.7) { // More strict
```

### Customize Email Templates

Edit `lib/email.ts` to modify:
- Email subject lines
- HTML templates
- Brand colors
- Footer text

### Add Email Domain

In Resend:
1. Add your domain (e.g., seriaflow.com)
2. Add DNS records (MX, TXT, CNAME)
3. Update `from:` in `lib/email.ts`:
```typescript
from: 'SeriaFlow <hello@seriaflow.com>',
```

##  Monitoring

### View Recent Contacts

Create `app/api/contacts/route.ts`:
```typescript
import { NextResponse } from 'next/server';
import { getContacts } from '@/lib/database';

export async function GET() {
  const contacts = await getContacts(50);
  return NextResponse.json(contacts);
}
```

Visit: `http://localhost:3000/api/contacts`

### Monitor Email Delivery

- Resend Dashboard: View sent emails, delivery rates
- Supabase Dashboard: View database records

##  Troubleshooting

### "reCAPTCHA not loaded" Error

**Cause**: Script didn't load or site key is wrong  
**Fix**: 
1. Check `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` in `.env.local`
2. Clear browser cache
3. Check browser console for script errors

### "Database connection failed"

**Cause**: Invalid DATABASE_URL  
**Fix**:
1. Verify connection string in Supabase
2. Check if database is running
3. Ensure SSL is enabled for production

### "Email sending failed"

**Cause**: Invalid RESEND_API_KEY or unverified domain  
**Fix**:
1. Check API key in Resend dashboard
2. Use `onboarding@resend.dev` for testing
3. Verify your domain for production

### "Too many submissions" (during testing)

**Cause**: Rate limit triggered  
**Fix**:
1. Wait 1 hour
2. OR clear database: `DELETE FROM contacts WHERE ip_address = 'your-ip';`
3. OR increase `RATE_LIMIT_MAX` temporarily

### TypeScript Errors

**Fix**:
```powershell
npm install --save-dev @types/pg @types/validator
```

##  Cost Breakdown

### Free Tier (Perfect for Starting)

- **Supabase**: 500MB database, 2GB bandwidth/month = **$0**
- **reCAPTCHA v3**: 1M assessments/month = **$0**
- **Resend**: 100 emails/day, 3,000/month = **$0**
- **Vercel**: Hobby plan = **$0**

**Total**: $0/month for up to 3,000 leads/month

### 10k Visitors/Month (~100 leads)

Still free tier! All within limits.

### 50k Visitors/Month (~500 leads)

- **Supabase**: Free tier
- **reCAPTCHA**: Free tier
- **Resend**: $10/month (10k emails)
- **Vercel**: Free tier

**Total**: ~$10/month

##  Next Steps

1.  Setup complete? Test the form thoroughly
2.  Update `README.md` with backend setup info
3.  Deploy to production
4.  Setup analytics (optional)
5.  Add Slack notifications (optional)

##  Support

If you encounter issues:

1. Check browser DevTools  Console for errors
2. Check Vercel logs for API errors
3. Check Supabase logs for database errors
4. Check Resend dashboard for email errors

##  Security Checklist

Before going to production:

- [ ] All environment variables are set
- [ ] reCAPTCHA domains include production domain
- [ ] Email domain is verified in Resend
- [ ] Database connection uses SSL
- [ ] Rate limiting is configured
- [ ] Test all error scenarios
- [ ] Monitor first 100 submissions closely

---

**Congratulations!** Your secure backend is now ready to capture leads. 
