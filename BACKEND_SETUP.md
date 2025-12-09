# Backend Setup

## Required Services
1. **Supabase** - Database (free)
2. **reCAPTCHA v3** - Bot protection (free)
3. **Resend** - Email (free 3000/month)
4. **n8n** - Automation (optional)

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://postgres:PASSWORD@db.xxx.supabase.co:5432/postgres

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lc...
RECAPTCHA_SECRET_KEY=6Lc...

# Email
RESEND_API_KEY=re_...
NOTIFICATION_EMAIL=your@email.com

# n8n (optional)
N8N_WEBHOOK_URL=https://n8n.example.com/webhook/...

# Rate Limit
RATE_LIMIT_MAX=5
RATE_LIMIT_WINDOW=3600000
```

## Setup Steps

1. Create Supabase project → Copy connection string
2. Register reCAPTCHA v3 → Get site/secret keys
3. Create Resend account → Get API key
4. Run `npm run db:init`
5. Run `npm run dev`

## Security Features
- reCAPTCHA v3 (score 0.5+)
- XSS prevention (DOMPurify)
- SQL injection prevention
- Rate limiting (5/hour/IP)
- Input validation

## n8n Integration
Data flow: `Frontend` → `API (validation)` → `Database` → `n8n Webhook`

The API forwards validated data to your n8n webhook for automation (CRM, Slack, email sequences, etc.)
