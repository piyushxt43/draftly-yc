# Draftly

A modern, world-class UI design platform built with React, Vite, and Framer Motion.

## 🚀 Features

- **AI-Powered UI Generation**: Generate stunning websites with Gemini AI
- **Premium Design**: Professional, clean UI with textured backgrounds
- **Smooth Animations**: Scroll-triggered animations and parallax effects
- **Fully Responsive**: Mobile-dynamic and viewable on any device
- **Modern Tech Stack**: React 19, Vite, Framer Motion, TypeScript
- **Firebase Auth**: User authentication and data storage
- **Custom Fonts & Colors**: AI selects fonts and colors based on your needs

## 📦 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Lucide React** - Icons
- **Tailwind CSS** - Styling

## 🛠️ Installation

```bash
npm install
```

## 🔐 Environment Setup

### For Local Development

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Fill in your API keys in `.env`:
```env
# Firebase Configuration (get from Firebase Console)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Gemini AI API Key (get from https://aistudio.google.com/apikey)
GEMINI_API_KEY=your_gemini_api_key
```

3. Start development server:
```bash
npm run dev
```

### For Vercel Deployment

Add all environment variables in Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add all variables from `.env.example`
3. Enable for Production, Preview, and Development
4. Redeploy your project

See `VERCEL_ENV_SETUP.md` and `FIREBASE_SETUP.md` for detailed instructions.

## 🏃 Development

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 🌐 Deployment

This project is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables (see above)
4. Vercel will auto-detect Vite configuration
5. Deploy with your custom domain

### Required Environment Variables

- **Firebase**: All `VITE_FIREBASE_*` variables
- **Gemini AI**: `GEMINI_API_KEY`

⚠️ **Important**: Never commit `.env` to GitHub! It's already in `.gitignore`.

## 📄 License

MIT

## 👨‍💻 Author

Draftly Team

