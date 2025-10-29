# Deployment Guide - Draftly

This guide will help you deploy Draftly to Vercel with a custom domain.

## ✅ Project is Now Deployment-Ready!

Your code has been successfully pushed to:
**https://github.com/piyushxt43/draftly-yc**

## 🚀 Deploy to Vercel

### Step 1: Connect to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign in with your GitHub account
3. Click **"Add New Project"**
4. Import **piyushxt43/draftly-yc** from your GitHub repositories

### Step 2: Configure Project

Vercel will auto-detect the settings, but verify:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 3: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for the build to complete
3. Your site will be live at `https://draftly-yc.vercel.app`

### Step 4: Add Custom Domain

1. In your Vercel project dashboard, go to **Settings** → **Domains**
2. Add your custom domain (e.g., `draftly.com`)
3. Follow the DNS configuration instructions:
   - For root domain: Add `A` record pointing to Vercel's IP
   - For subdomain: Add `CNAME` record pointing to `cname.vercel-dns.com`
4. Wait for DNS propagation (5-30 minutes)

## 📋 Vercel Configuration

Your project includes a `vercel.json` file with:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures:
- ✅ React Router works correctly
- ✅ All routes redirect to `index.html`
- ✅ Custom domain support
- ✅ Automatic HTTPS

## 🔧 Environment Variables

No environment variables needed for basic deployment!

## 🌐 Custom Domain DNS Settings

### For Root Domain (example.com)

Add these DNS records in your domain provider:

**A Record:**
- Name: `@`
- Value: `76.76.21.21`

### For Subdomain (www.example.com)

**CNAME Record:**
- Name: `www`
- Value: `cname.vercel-dns.com`

## ✨ Features Included

- ✅ Fully responsive design
- ✅ Smooth scroll animations
- ✅ Parallax effects
- ✅ Page transitions
- ✅ SEO-friendly routing
- ✅ Production-optimized build
- ✅ Fast loading times
- ✅ Mobile-first approach

## 📱 Testing Your Deployment

After deployment, test:

1. **Homepage**: All animations and scroll effects work
2. **Navigation**: All pages load correctly
3. **Contact Form**: Redirects work properly
4. **Mobile View**: Responsive on all screen sizes
5. **Performance**: Fast load times

## 🔄 Continuous Deployment

Once connected to Vercel:

- Every push to `main` branch automatically deploys
- Pull request previews are generated automatically
- Rollback to previous deployments anytime

## 🎯 Production Checklist

- [x] Code pushed to GitHub
- [x] Vercel configuration added
- [x] Build command verified
- [x] Router configuration set
- [x] .gitignore configured
- [x] README documentation added

## 🆘 Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure TypeScript errors are fixed
- Verify Node version (use Node 18+)

### Routes Don't Work
- The `vercel.json` rewrites are configured
- All routes redirect to `/index.html`

### Custom Domain Issues
- Wait 5-30 minutes for DNS propagation
- Verify DNS records are correct
- Use [DNS Checker](https://dnschecker.org) to verify

## 📞 Support

For issues, contact: piyushsingh123443@gmail.com

---

**Ready to deploy!** 🚀

