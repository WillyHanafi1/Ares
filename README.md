# 🚀 Seriaflow - AI Automation Agency

> Landing page modern untuk agency AI automation yang dibangun dengan Next.js 14, TypeScript, dan Tailwind CSS. Menampilkan efek cursor trail interaktif dengan physics-based animation.

[![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.14-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## ✨ Fitur Utama

- 🎨 **Interactive Cursor Trail** - Efek cursor trail dengan spring physics dan warna dinamis
- 🌙 **Dark Mode Premium** - Desain futuristik dengan gradient cyan-purple
- ⚡ **Performance Optimized** - Built dengan Next.js 14 App Router
- 📱 **Fully Responsive** - Optimal di semua device (desktop, tablet, mobile)
- ♿ **Accessibility First** - Reduced motion support & semantic HTML
- 🎯 **SEO Ready** - Metadata optimization & structured data

## 🛠️ Tech Stack

### Core Framework
- **[Next.js 14.2.15](https://nextjs.org/)** - React framework dengan App Router
- **[React 18.3.1](https://react.dev/)** - UI library
- **[TypeScript 5.6.3](https://www.typescriptlang.org/)** - Type-safe development

### Styling & UI
- **[Tailwind CSS 3.4.14](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React 0.446.0](https://lucide.dev/)** - Modern icon library
- **[Inter Font](https://fonts.google.com/specimen/Inter)** - Google Fonts typography

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--bg-primary: #111827    /* gray-900 */
--bg-secondary: #1f2937  /* gray-800 */

/* Accent Colors */
--cyan-accent: #22d3ee   /* cyan-400 */
--purple-accent: #a855f7 /* purple-500 */
--text-primary: #ffffff  /* white */
--text-secondary: #9ca3af /* gray-400 */

/* Borders */
--border-default: #374151 /* gray-700 */
```

### Typography
- **Font Family**: Inter (Sans-serif)
- **Headings**: 2.5rem - 4rem (40px - 64px)
- **Body**: 1rem - 1.25rem (16px - 20px)

### Spacing
- **Container Max Width**: 1280px (80rem)
- **Section Padding**: 5rem (80px) vertical
- **Card Padding**: 1.5rem (24px)

## 📁 Struktur Proyek

```
Website-Seriaflow/
├── .github/
│   └── workflows/          # GitHub Actions workflows
├── app/
│   ├── components/         
│   │   └── services.tsx    # Services section component
│   ├── globals.css         # Global styles & animations
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Homepage
├── components/
│   ├── ClientProviders.tsx # Client-side components wrapper
│   └── CursorTrail.tsx     # Interactive cursor trail effect
├── public/                 # Static assets
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore rules
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies & scripts
├── postcss.config.mjs      # PostCSS configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.x atau lebih tinggi
- **npm** atau **yarn** atau **pnpm**

### Installation

1. **Clone repository**
```bash
git clone https://github.com/WillyHanafi1/Ares.git
cd Ares
```

2. **Install dependencies**
```bash
npm install
# atau
yarn install
# atau
pnpm install
```

3. **Jalankan development server**
```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

4. **Buka browser**
   
   Akses [http://localhost:3000](http://localhost:3000)

### Build untuk Production

```bash
# Build aplikasi
npm run build

# Start production server
npm start
```

### Linting

```bash
npm run lint
```

## 💻 Komponen Utama

### 1. CursorTrail Component
Efek cursor trail interaktif dengan physics-based animation:

**Features:**
- ✨ 20 animated trails dengan spring physics
- 🌈 Dynamic HSL color cycling
- 📱 Touch device support
- ♿ Reduced motion detection
- 🎯 Performance optimized dengan canvas API

**Technical Details:**
- Canvas-based rendering
- Spring dampening system
- Quadratic bezier curves
- RAF (RequestAnimationFrame) optimization

### 2. Services Section
Showcase layanan AI automation:

**Services:**
1. **Automasi Proses Bisnis (BPA)**
   - Icon: CPU (Lucide)
   - Color: Cyan accent

2. **Chatbot & Asisten Virtual Cerdas**
   - Icon: Bot (Lucide)
   - Color: Purple accent

3. **Analisis & Prediksi Data**
   - Icon: BarChart (Lucide)
   - Color: Cyan accent

**Features:**
- Hover animations dengan scale & shadow
- Smooth color transitions
- Border glow effects
- Responsive grid layout

### 3. Hero Section
Landing hero dengan gradient text:

**Features:**
- Large typography (text-5xl to text-7xl)
- Gradient text effect (cyan to purple)
- Centered layout
- Responsive sizing

## 🎯 Optimasi & Performance

### Performance Features
- ✅ Server-side rendering (SSR)
- ✅ Automatic code splitting
- ✅ Image optimization ready
- ✅ Font optimization dengan `next/font`
- ✅ CSS minification
- ✅ Tree shaking

### Accessibility
- ✅ Semantic HTML elements
- ✅ ARIA labels ready
- ✅ Keyboard navigation support
- ✅ `prefers-reduced-motion` detection
- ✅ Touch device optimization

### SEO Optimization
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: "Seriaflow - AI Automation Agency",
  description: "Solusi AI kustom untuk mengotomatisasi bisnis Anda",
  keywords: ["AI", "Automation", "Business Process", "Chatbot"],
};
```

## 📦 Dependencies

### Production Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| next | 14.2.15 | React framework |
| react | 18.3.1 | UI library |
| react-dom | 18.3.1 | React DOM renderer |
| lucide-react | 0.446.0 | Icon library |

### Development Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| typescript | 5.6.3 | Type checking |
| @types/node | 22.8.4 | Node.js types |
| @types/react | 18.3.11 | React types |
| @types/react-dom | 18.3.1 | React DOM types |
| tailwindcss | 3.4.14 | CSS framework |
| postcss | 8.4.47 | CSS processing |
| autoprefixer | 10.4.22 | CSS prefixing |
| eslint | 8.57.1 | Code linting |
| eslint-config-next | 14.2.15 | Next.js ESLint config |

## 🔧 Konfigurasi

### Tailwind CSS
```typescript
// tailwind.config.ts
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui'],
      },
    },
  },
};
```

### TypeScript
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "bundler",
    "strict": true,
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## 🌐 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Build Manual
```bash
npm run build
npm start
```

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build untuk production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## 🎯 Roadmap

### Phase 1 - Foundation ✅
- [x] Setup Next.js 14 dengan App Router
- [x] Konfigurasi TypeScript
- [x] Setup Tailwind CSS
- [x] Implementasi cursor trail effect
- [x] Services section
- [x] Hero section
- [x] Footer basic

### Phase 2 - Enhancement (Coming Soon)
- [ ] Navbar dengan smooth scroll
- [ ] About section
- [ ] Portfolio/Case studies
- [ ] Contact form dengan validation
- [ ] Blog section
- [ ] Animated statistics counter
- [ ] Client testimonials

### Phase 3 - Advanced Features
- [ ] CMS integration (Sanity/Contentful)
- [ ] Multi-language support (i18n)
- [ ] Dark/Light mode toggle
- [ ] Advanced animations (Framer Motion)
- [ ] Newsletter integration
- [ ] Analytics integration
- [ ] Loading states & skeleton screens

## 🤝 Contributing

Contributions are welcome! Silakan buat pull request atau buka issue untuk diskusi.

### Development Workflow
1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Willy Hanafi**
- GitHub: [@WillyHanafi1](https://github.com/WillyHanafi1)
- Repository: [Ares](https://github.com/WillyHanafi1/Ares)

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org/) - Amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Lucide Icons](https://lucide.dev/) - Beautiful icon library
- [Vercel](https://vercel.com/) - Deployment platform

---

<div align="center">

**[⭐ Star this repo](https://github.com/WillyHanafi1/Ares)** if you find it helpful!

Made with ❤️ by Willy Hanafi

</div>  
✅ Root Layout dengan metadata SEO  
✅ Homepage dengan hero section  
✅ Services Section dengan:
  - 3 kartu layanan (BPA, Chatbot, Data Analytics)
  - Ikon dari Lucide React
  - Efek hover neon futuristik
  - Responsive grid layout

## 🎨 Components

### Services Section (`app/components/services.tsx`)

Menampilkan 3 layanan utama dengan desain futuristik:

1. **Automasi Proses Bisnis (BPA)** - Icon: CPU
2. **Chatbot & Asisten Virtual Cerdas** - Icon: Bot
3. **Analisis & Prediksi Data** - Icon: BarChart

**Features**:
- TypeScript interface untuk type safety
- Responsive grid (1 kolom mobile → 3 kolom desktop)
- Hover effects dengan neon glow
- Border animation on hover
- Icon scale animation

## 📝 Cara Menambahkan Section Baru

1. Buat file baru di `app/components/`, contoh: `hero.tsx`
2. Implementasikan komponen dengan TypeScript
3. Import dan gunakan di `app/page.tsx`

```typescript
import Hero from "./components/hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
    </main>
  );
}
```

## 🎨 Tailwind Custom Classes

Gunakan utility classes berikut untuk konsistensi:

- **Backgrounds**: `bg-gray-900`, `bg-gray-800`, `bg-black`
- **Text Colors**: `text-white`, `text-gray-300`, `text-gray-400`
- **Accent Colors**: `text-cyan-400`, `text-purple-400`
- **Gradients**: `bg-gradient-to-r from-cyan-400 to-purple-500`
- **Borders**: `border-gray-700`, `border-cyan-500`
- **Shadows**: `shadow-cyan-500/20`, `shadow-purple-500/20`

## 📄 License

Private - © 2025 Seriaflow
