# Seriaflow - AI Automation Agency Landing Page

Landing page untuk agency AI automation **Seriaflow** yang dibangun dengan Next.js 14, TypeScript, dan Tailwind CSS.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## 🎨 Design System

- **Theme**: Dark Mode Futuristik
- **Background**: `bg-gray-900` / `bg-black`
- **Accent Colors**: 
  - Cyan: `text-cyan-400`, `border-cyan-500`
  - Purple: `text-purple-400`, `text-purple-500`
- **Typography**: Inter (Sans-serif)

## 📁 Struktur Folder

```
Website-Seriaflow/
├── app/
│   ├── components/          # Section components
│   │   └── services.tsx     # Services section
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/
│   └── layout/              # Layout components (Navbar, Footer)
├── public/                  # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🛠️ Setup & Installation

### 1. Install Dependencies

```powershell
npm install
```

atau dengan yarn:

```powershell
yarn install
```

### 2. Jalankan Development Server

```powershell
npm run dev
```

atau:

```powershell
yarn dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

### 3. Build untuk Production

```powershell
npm run build
npm start
```

## 📦 Dependencies

### Production
- `react` ^18.3.1
- `react-dom` ^18.3.1
- `next` 14.2.15
- `lucide-react` ^0.446.0

### Development
- `typescript` ^5.6.3
- `@types/node` ^22.8.4
- `@types/react` ^18.3.11
- `@types/react-dom` ^18.3.1
- `tailwindcss` ^3.4.14
- `postcss` ^8.4.47
- `eslint` ^8.57.1
- `eslint-config-next` 14.2.15

## 🎯 Fitur yang Sudah Diimplementasikan

✅ Setup Next.js 14 dengan App Router  
✅ Konfigurasi TypeScript  
✅ Setup Tailwind CSS dengan dark mode  
✅ Google Fonts (Inter)  
✅ Global CSS dengan custom scrollbar  
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
