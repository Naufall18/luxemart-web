# 🌐 LuxeMart Web Application

Premium Multi-Vendor Marketplace Web Platform

## 🎯 Overview

Modern, responsive web application built with React and TypeScript for luxury e-commerce marketplace.

## ✨ Features

- Responsive design (Desktop, Tablet, Mobile)
- Advanced product search & filters
- Live shopping integration
- Multi-vendor cart & checkout
- Real-time order tracking
- Admin dashboard
- Vendor portal
- SEO optimized

## 🛠️ Tech Stack

- **Framework:** React 18+ / Next.js 14+
- **Language:** TypeScript
- **State Management:** Redux Toolkit / Zustand
- **Styling:** Tailwind CSS / Styled Components
- **UI Library:** Material-UI / Ant Design
- **API Client:** Axios / React Query
- **Real-time:** Socket.io Client
- **Forms:** React Hook Form + Yup
- **Charts:** Recharts / Chart.js
- **Maps:** Google Maps React
- **Payment:** Stripe.js

## 🚀 Getting Started

### Prerequisites
```bash
node >= 18.0.0
npm >= 9.0.0
```

### Installation
```bash
git clone https://github.com/yourusername/luxemart-web.git
cd luxemart-web
npm install
cp .env.example .env.local
npm run dev
```

## 📁 Project Structure

```
luxemart-web/
├── src/
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   ├── layouts/        # Layout components
│   ├── store/          # State management
│   ├── services/       # API services
│   ├── hooks/          # Custom hooks
│   ├── utils/          # Utilities
│   ├── styles/         # Global styles
│   ├── types/          # TypeScript types
│   └── assets/         # Static assets
├── public/             # Public files
├── .env.example
├── package.json
└── README.md
```

## 🔧 Development

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run linter
npm run test         # Run tests
```

## 🚀 Deployment

### Vercel
```bash
vercel --prod
```

### Docker
```bash
docker build -t luxemart-web .
docker run -p 3000:3000 luxemart-web
```

## 📝 Environment Variables

```env
NEXT_PUBLIC_API_URL=https://api.luxemart.com
NEXT_PUBLIC_SOCKET_URL=wss://api.luxemart.com
NEXT_PUBLIC_STRIPE_KEY=pk_xxx
NEXT_PUBLIC_GOOGLE_MAPS_KEY=xxx
```

## 📄 License

MIT License

---

**Built with ❤️ by LuxeMart Team**
