# Seriaflow

AI Automation Agency website - Built with Astro, React, TypeScript, and Tailwind CSS v4.

## Features
- 🌙 Dark mode glassmorphism design
- 📱 Fully responsive
- ♿ Accessibility (reduced motion, skip nav)
- 🎯 SEO optimized (OpenGraph, JSON-LD, Sitemap, Robots.txt)
- 📬 Secure contact form (reCAPTCHA v3)
- 🔒 Backend security (SSR cookie authentication, Magic Bytes validation)
- 🤖 n8n webhook integration for lead captures

## Tech Stack
- Astro (SSR enabled with Node adapter)
- React
- TypeScript
- Tailwind CSS v4
- reCAPTCHA v3
- n8n (Webhooks)

## Quick Start
```bash
npm install
cp .env.example .env  # Fill in your variables
npm run dev
```

## Project Structure
```
seriaflow/
├── src/
│   ├── components/            # React UI blocks and globals
│   ├── layouts/               # Astro layouts (HTML shells)
│   ├── pages/                 # Astro pages & API endpoints (SSR)
│   └── styles/                # Tailwind v4 configuration (global.css)
├── public/                    # Static assets & downloadable resources
└── astro.config.mjs           # Astro framework configuration
```

## Environment Variables
See `.env.example` for required variables.

## Deploy
Push to GitHub → Import to hosting platform (Vercel, Render, VPS) → Add environment variables → Deploy

---
**Seriaflow** - AI Automation Agency Indonesia

