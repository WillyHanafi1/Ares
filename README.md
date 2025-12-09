# Seriaflow

AI Automation Agency website - Built with Next.js 14, TypeScript, Tailwind CSS.

## Features
- 🌙 Dark mode glassmorphism design
- 📱 Fully responsive
- ♿ Accessibility (reduced motion, skip nav)
- 🎯 SEO optimized (OpenGraph, JSON-LD, Sitemap, Robots.txt)
- 📬 Secure contact form (reCAPTCHA v3)
- 🔒 Backend security (XSS, SQL injection protection)
- 📧 Email notifications (Resend)
- 🗄️ PostgreSQL database (Supabase)
- 🤖 n8n webhook integration
- 🧪 Jest testing infrastructure

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- PostgreSQL / Supabase
- Resend (email)
- reCAPTCHA v3
- Jest + Testing Library

## Quick Start

```bash
npm install
cp .env.example .env.local  # Fill in your credentials
npm run db:init
npm run dev
```

## Project Structure

```
seriaflow/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── sitemap.ts         # Dynamic sitemap generation
│   ├── robots.ts          # Robots.txt configuration
│   └── [pages]/           # Page components
├── components/            # Reusable components
│   ├── sections/          # Page section components
│   │   ├── Contact.tsx
│   │   ├── CTA.tsx
│   │   ├── Process.tsx
│   │   └── Services.tsx
│   ├── Header.tsx
│   └── ParticlesBackground.tsx
├── lib/                   # Utility functions
│   ├── __tests__/         # Unit tests
│   ├── validation.ts
│   ├── database.ts
│   └── email.ts
└── public/                # Static assets
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Documentation
- [Quick Start](QUICKSTART.md)
- [Backend Setup](BACKEND_SETUP.md)
- [API Reference](API_REFERENCE.md)

## Environment Variables
See `.env.example` for required variables.

## Deploy
Push to GitHub → Import to Vercel → Add env vars → Deploy

## Changelog

### v0.4.0 - 2025-12-09
- Added dynamic sitemap.xml generation
- Added robots.txt configuration
- Restructured components (app/components → components/sections)
- Added Jest testing infrastructure
- Added validation and reCAPTCHA unit tests

### v0.3.0 - 2025-12-07
- n8n webhook integration
- SEO improvements (OpenGraph, JSON-LD)
- Accessibility improvements
- Performance optimizations
- Fixed mixed language text

### v0.2.0 - 2025-11-16
- Process section
- CTA section
- Contact form

### v0.1.0 - 2025-11-16
- Initial release

---
**Seriaflow** - AI Automation Agency Indonesia

