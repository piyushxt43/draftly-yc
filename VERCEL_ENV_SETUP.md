# 🔐 Vercel Environment Variable Setup Guide

## Quick Steps to Fix "API key not configured" Error

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Login to your account
3. Find and click on your **draftly-yc** project

### Step 2: Navigate to Environment Variables
1. Click on **Settings** (top navigation)
2. Click on **Environment Variables** (left sidebar)

### Step 3: Add GEMINI_API_KEY
1. Click **Add New** button
2. Fill in:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: `YOUR_ACTUAL_GEMINI_API_KEY_HERE`
   - **Environments**: ✅ Select all (Production, Preview, Development)
3. Click **Save**

### Step 4: Redeploy (IMPORTANT!)
After adding the environment variable, you MUST redeploy:

**Option A: Auto-redeploy**
- Vercel will automatically detect the new variable
- Go to **Deployments** tab
- Wait for deployment or manually trigger a new deployment

**Option B: Manual redeploy**
1. Go to **Deployments** tab
2. Click **...** (three dots) on the latest deployment
3. Click **Redeploy**
4. Select **Use existing Build Cache** (optional)
5. Click **Redeploy**

### Step 5: Verify
1. Wait for deployment to complete
2. Try generating a UI on your site
3. The error should be gone! ✅

## Important Notes

✅ **CORRECT Environment Variable:**
- Name: `GEMINI_API_KEY` (NO VITE_ prefix!)
- Used in: `api/generate-ui.ts` (server-side only)

❌ **WRONG (Don't use this):**
- `VITE_GEMINI_API_KEY` (this would expose your key to clients!)

## Where to Find Your Gemini API Key

1. Go to: https://aistudio.google.com/apikey
2. Or: https://makersuite.google.com/app/apikey
3. Copy your API key
4. Paste it into Vercel environment variable

## Troubleshooting

**Error still shows after adding variable?**
- Make sure you redeployed after adding the variable
- Check that the variable name is exactly `GEMINI_API_KEY` (case-sensitive!)
- Verify it's enabled for all environments (Production, Preview, Development)

**Variable not showing in code?**
- Vercel environment variables are available at `process.env.VARIABLE_NAME`
- Serverless functions (`api/` folder) have access to `process.env`
- Client-side code (`src/` folder) only sees `VITE_` prefixed variables

## Security Checklist

- ✅ API key stored in Vercel (not in code)
- ✅ Variable name has NO `VITE_` prefix (server-side only)
- ✅ `.env` file is in `.gitignore`
- ✅ API key is NOT in GitHub repository

---

**After setup, your API will work and all traffic will be tracked!** 🎉

