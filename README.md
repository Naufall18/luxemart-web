<div align="center">

# 🌐 LuxeMart Web

### Premium Luxury Marketplace - Next.js Application

[![Next.js](https://img.shields.io/badge/Next.js-14+-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.0+-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**Fast. Responsive. SEO-Optimized.**

[Features](#-features) • [Demo](#-demo) • [Quick Start](#-quick-start) • [Deployment](#-deployment)

</div>

---

## 🎯 Overview

LuxeMart Web is a **modern, responsive web application** built with Next.js 14, delivering exceptional performance and SEO optimization for luxury e-commerce. Server-side rendering ensures fast page loads and excellent search engine visibility.

### Why Next.js?

- ⚡ **Lightning Fast** - Server-side rendering & static generation
- 🔍 **SEO Optimized** - Perfect for search engines
- 📱 **Responsive** - Desktop, tablet, mobile support
- 🎨 **Modern UI** - Tailwind CSS with custom design system
- 🚀 **Production Ready** - Built for scale

---

## ✨ Features

### 🛍️ Customer Portal
- **Product Catalog** - Advanced search & filtering
- **Live Shopping** - Real-time streaming integration
- **Shopping Cart** - Multi-vendor support
- **Checkout** - Secure payment processing
- **Order Tracking** - Real-time status updates
- **User Dashboard** - Order history & profile

### 👨‍💼 Vendor Portal
- **Dashboard** - Sales analytics & insights
- **Product Management** - Easy inventory control
- **Order Management** - Streamlined fulfillment
- **Live Shopping Studio** - Host live sessions
- **Analytics** - Performance metrics
- **Payout Management** - Track earnings

### 🔧 Admin Panel
- **User Management** - Complete user control
- **Vendor Approval** - Onboarding workflow
- **Product Moderation** - Quality control
- **Order Oversight** - System-wide monitoring
- **Analytics Dashboard** - Business intelligence
- **Content Management** - Site configuration

---

## 🏗️ Architecture

### Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 14+ (App Router) |
| **Language** | TypeScript 5.0+ |
| **Styling** | Tailwind CSS 3.0+ |
| **UI Components** | Shadcn/ui + Radix UI |
| **State Management** | Zustand / Redux Toolkit |
| **Data Fetching** | React Query (TanStack Query) |
| **Forms** | React Hook Form + Zod |
| **Charts** | Recharts |
| **Maps** | Google Maps React |
| **Real-time** | Socket.io Client |
| **Payment** | Stripe.js |
| **Analytics** | Google Analytics 4 |

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js >= 18.0.0
npm >= 9.0.0
```

### Installation

```bash
# Clone repository
git clone https://github.com/Naufall18/luxemart-web.git
cd luxemart-web

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
luxemart-web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth routes
│   │   ├── (customer)/        # Customer routes
│   │   ├── (vendor)/          # Vendor routes
│   │   ├── (admin)/           # Admin routes
│   │   ├── api/               # API routes
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── ui/               # UI components
│   │   ├── forms/            # Form components
│   │   ├── layouts/          # Layout components
│   │   └── shared/           # Shared components
│   ├── lib/                   # Utilities
│   │   ├── api/              # API client
│   │   ├── hooks/            # Custom hooks
│   │   ├── utils/            # Helper functions
│   │   └── validations/      # Zod schemas
│   ├── store/                 # State management
│   ├── styles/                # Global styles
│   └── types/                 # TypeScript types
├── public/                    # Static assets
├── .env.example              # Environment template
├── next.config.js            # Next.js config
├── tailwind.config.ts        # Tailwind config
├── tsconfig.json             # TypeScript config
└── package.json              # Dependencies
```

---

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Type check
npm run type-check

# Format code
npm run format
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Fix linting issues
npm run lint:fix

# Format with Prettier
npm run format

# Type check
npm run type-check
```

---

## 🎨 Design System

### Color Palette

```css
:root {
  --primary: #1A1F3A;      /* Deep Navy */
  --secondary: #E8B4A0;    /* Rose Gold */
  --accent: #2D5F5D;       /* Emerald Green */
  --background: #FAF8F5;   /* Soft Cream */
  --text: #2C2C2C;         /* Charcoal */
  --success: #7FA99B;      /* Sage Green */
  --error: #8B2635;        /* Burgundy */
}
```

### Typography

- **Headings**: Playfair Display
- **Body**: Inter
- **Accent**: Cormorant Garamond

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Docker

```bash
# Build image
docker build -t luxemart-web .

# Run container
docker run -p 3000:3000 luxemart-web
```

### Manual Deployment

```bash
# Build
npm run build

# Start
npm run start
```

---

## 📊 Performance

- ⚡ Server-side rendering (SSR)
- ⚡ Static site generation (SSG)
- ⚡ Image optimization
- ⚡ Code splitting
- ⚡ Lazy loading
- ⚡ CDN integration
- ⚡ Caching strategies

---

## 🔐 Security

- ✅ HTTPS only
- ✅ CSRF protection
- ✅ XSS prevention
- ✅ Content Security Policy
- ✅ Rate limiting
- ✅ Input validation
- ✅ Secure headers

---

## 📝 Environment Variables

```env
# API
NEXT_PUBLIC_API_URL=https://api.luxemart.com
NEXT_PUBLIC_SOCKET_URL=wss://api.luxemart.com

# Payment
NEXT_PUBLIC_STRIPE_KEY=pk_xxx

# Maps
NEXT_PUBLIC_GOOGLE_MAPS_KEY=xxx

# Analytics
NEXT_PUBLIC_GA_ID=G-xxx

# App
NEXT_PUBLIC_APP_URL=https://luxemart.com
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file.

---

## 👥 Team

- **Web Lead**: [Your Name]
- **Frontend Developer**: [Name]
- **UI/UX Designer**: [Name]

---

## 📞 Support

- 📧 Email: support@luxemart.com
- 📚 Docs: https://docs.luxemart.com
- 🐛 Issues: [GitHub Issues](https://github.com/Naufall18/luxemart-web/issues)

---

<div align="center">

**Built with ❤️ using Next.js**

⭐ Star us on GitHub!

</div>
