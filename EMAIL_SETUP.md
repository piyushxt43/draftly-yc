# Email Setup Instructions for Contact Form

## How to Enable Email Notifications

Your contact form is configured to send emails to: **piyushsingh123443@gmail.com**

### Option 1: Web3Forms (Recommended - FREE)

1. **Go to**: https://web3forms.com/
2. **Sign up** with your email (piyushsingh123443@gmail.com)
3. **Get your Access Key** from the dashboard
4. **Replace** in `src/pages/Contact.tsx` line 31:
   ```typescript
   access_key: 'YOUR_WEB3FORMS_KEY',
   ```
   With your actual key:
   ```typescript
   access_key: 'your-actual-key-here',
   ```

That's it! You'll now receive all contact form submissions at your email.

### Option 2: EmailJS (Alternative)

1. Go to https://www.emailjs.com/
2. Sign up and create a service
3. Install: `npm install @emailjs/browser`
4. Follow their setup guide

### Option 3: SendGrid (For Production)

1. Sign up at https://sendgrid.com/
2. Get API key
3. Create a backend endpoint to handle emails
4. Update the form to call your backend

## Current Setup

The contact form currently:
- ✅ Collects: Name, Email, Company, Project Type, Budget, Message
- ✅ Shows success animation
- ✅ Resets form after submission
- ⚠️ Needs API key to actually send emails

## Testing

Until you add the API key, the form will still show the success message but won't send actual emails. This is intentional for demo purposes.

