# Quick Start

## Prerequisites
- Node.js 18+
- Supabase account (free)
- Google reCAPTCHA v3
- Resend account (free)

## Setup

### 1. Clone & Install
```bash
git clone https://github.com/WillyHanafi1/Ares.git
cd Ares
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local` and fill:
```env
DATABASE_URL=postgresql://...
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=...
RECAPTCHA_SECRET_KEY=...
RESEND_API_KEY=...
NOTIFICATION_EMAIL=your@email.com
N8N_WEBHOOK_URL=... (optional)
```

### 3. Initialize Database
```bash
npm run db:init
```

### 4. Run
```bash
npm run dev
```
Open http://localhost:3000

## Deploy to Vercel
1. Push to GitHub
2. Import in Vercel
3. Add env variables
4. Deploy
