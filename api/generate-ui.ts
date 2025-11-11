import { GoogleGenerativeAI } from "@google/generative-ai";

// This runs on Vercel server-side - API key is NOT exposed to client
export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Get API key from server-side environment (NOT exposed to client)
    const apiKey = process.env.GEMINI_API_KEY || "AIzaSyDuJ3PYOuvtl8e3VuA3FPuNreDgrifqGZo";

    if (!apiKey) {
      console.error('❌ GEMINI_API_KEY is not set in Vercel environment variables!');
      return res.status(500).json({ error: 'API key not configured' });
    }

    console.log('🚀 Server: Calling Gemini API with prompt length:', prompt.length);

    // Enhanced user preferences extraction
    const extractUserPreferences = (userPrompt: string): { colors?: string, fonts?: string } => {
      const preferences: { colors?: string, fonts?: string } = {};
      const lowerPrompt = userPrompt.toLowerCase();
      
      // Enhanced color extraction - look for explicit color mentions
      const colorPatterns = [
        /(?:color|theme|scheme|palette|colors?)[\s:]+(blue|cyan|teal|green|emerald|lime|yellow|amber|orange|red|pink|rose|indigo|sky|violet|fuchsia|coral|salmon|turquoise|aqua|navy|maroon|burgundy)/gi,
        /\b(blue|cyan|teal|green|emerald|lime|yellow|amber|orange|red|pink|rose|indigo|sky|violet|fuchsia|coral|salmon|turquoise|aqua|navy|maroon|burgundy)\s+(?:theme|colors?|color scheme|palette|design)/gi,
        /(?:use|with|in)\s+(blue|cyan|teal|green|emerald|lime|yellow|amber|orange|red|pink|rose|indigo|sky|violet|fuchsia|coral|salmon|turquoise|aqua|navy|maroon|burgundy)\s+(?:colors?|theme)/gi
      ];
      
      for (const pattern of colorPatterns) {
        const match = userPrompt.match(pattern);
        if (match) {
          preferences.colors = match[0];
          break;
        }
      }
      
      // Also check for dark/light theme
      if (lowerPrompt.includes('dark theme') || lowerPrompt.includes('dark mode')) {
        preferences.colors = preferences.colors ? `${preferences.colors}, dark theme` : 'dark theme';
      }
      if (lowerPrompt.includes('light theme') || lowerPrompt.includes('light mode')) {
        preferences.colors = preferences.colors ? `${preferences.colors}, light theme` : 'light theme';
      }
      
      // Enhanced font extraction
      const fontPatterns = [
        /(?:font|typography|use|with)\s+["']?([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)["']?/g,
        /\b(Inter|Geist|DM Sans|Manrope|Poppins|Roboto|Open Sans|Montserrat|Playfair|Lato|Nunito|Raleway|Oswald|Ubuntu|Merriweather|Source Sans|Fira Sans|Work Sans)\b/gi
      ];
      
      for (const pattern of fontPatterns) {
        const match = userPrompt.match(pattern);
        if (match && match[1]) {
          preferences.fonts = match[1];
          break;
        }
      }
      
      return preferences;
    };

    const preferences = extractUserPreferences(prompt);
    
    const colorInstruction = preferences.colors 
      ? ` User specified colors: "${preferences.colors}" - use these colors throughout with proper contrast ratios.`
      : ` Use a sophisticated color palette (blues, teals, greens, oranges, reds, pinks, indigo) - NO purple. Ensure WCAG AA contrast ratios (4.5:1 for text).`;

    const fontInstruction = preferences.fonts
      ? ` Use font: "${preferences.fonts}" with proper fallbacks.`
      : ` Use modern, professional fonts (Inter, Geist, DM Sans, Manrope, Poppins) from Google Fonts with proper font-weight hierarchy.`;

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey);
    let model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    // COMPREHENSIVE SYSTEM PROMPT - Professional UI/UX Design Guidelines
    const systemPrompt = `You are an elite professional UI/UX designer creating a production-ready, modern website. The design must look like it was crafted by a senior designer at a top agency - NOT AI-generated. Focus on precision, alignment, spacing, and professional aesthetics.

=== CRITICAL DESIGN PRINCIPLES ===

1. PROFESSIONAL AESTHETICS (Avoid AI-Generated Look):
   - Use consistent spacing system (4px, 8px, 16px, 24px, 32px, 48px, 64px, 96px)
   - Perfect alignment: all elements aligned to a 12-column grid system
   - Proper visual hierarchy: clear distinction between headings (h1: 3rem+, h2: 2.25rem, h3: 1.875rem, h4: 1.5rem)
   - Balanced whitespace: generous padding and margins (min 24px between sections)
   - Subtle, purposeful animations only (fade-in, slide-up) - NO excessive animations
   - Professional typography: proper line-height (1.5-1.75), letter-spacing (-0.02em for headings)
   - Consistent border-radius (8px for cards, 12px for buttons, 16px for modals)
   - Use CSS Grid and Flexbox properly - NO absolute positioning unless necessary

2. BACKGROUND & TEXTURE:
   - <body> and <html> MUST have textured CSS background visible immediately
   - Use ONE subtle texture pattern (opacity 0.08-0.12) from these options:
     * radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px) with background-size: 20px 20px
     * linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px) with background-size: 40px 40px
     * SVG data URI with feTurbulence filter (opacity 0.1)
   - Background color: pure black (#000000) with texture overlay
   - ABSOLUTELY NO background images (no url(https://...), no loremflickr, no unsplash in backgrounds!)

3. HEADER/NAVIGATION (Glassmorphism):
   - Fixed position at top (z-index: 1000)
   - background: rgba(0, 0, 0, 0.7)
   - backdrop-filter: blur(24px) saturate(180%)
   - -webkit-backdrop-filter: blur(24px) saturate(180%)
   - border-bottom: 1px solid rgba(255, 255, 255, 0.08)
   - Padding: 1rem 2rem (mobile: 1rem)
   - Smooth transitions (0.3s ease)
   - Logo/name on left, nav items on right (space-between)
   - Mobile: hamburger menu with smooth slide-in

4. MOBILE RESPONSIVENESS (CRITICAL):
   - Use mobile-first approach with proper breakpoints:
     * Mobile: < 640px (base styles, single column, full-width)
     * Tablet: 640px-1024px (sm: and md: prefixes)
     * Desktop: > 1024px (lg: and xl: prefixes)
   - Viewport meta: width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes
   - All text must be readable on mobile (min 16px base font-size)
   - Touch targets: minimum 44x44px for buttons/links
   - Images: responsive (max-width: 100%, height: auto)
   - Grid/Flex: stack vertically on mobile, horizontal on desktop
   - Padding: 1rem mobile, 2rem tablet, 3-4rem desktop
   - Hero section: pt-24 sm:pt-32 md:pt-40 lg:pt-48 (account for fixed header)
   - Cards: full-width mobile, 2-column tablet, 3-4 column desktop
   - Navigation: horizontal desktop, hamburger menu mobile
   - Test all layouts at 375px, 768px, 1024px, 1440px widths

5. LAYOUT & ALIGNMENT:
   - Use CSS Grid for main layouts (grid-template-columns: repeat(12, 1fr))
   - Use Flexbox for component-level layouts
   - Max-width container: 1280px (1200px content + 40px padding each side)
   - Center content: margin: 0 auto, padding: 0 1.5rem (mobile) / 2rem (desktop)
   - Consistent gutters: 1.5rem mobile, 2rem desktop
   - All sections: proper padding (py-16 sm:py-24 md:py-32)
   - Cards: consistent padding (p-6 sm:p-8), proper spacing between (gap-6)

6. TYPOGRAPHY & READABILITY:
   ${fontInstruction}
   - Base font-size: 16px (1rem) for body text
   - Line-height: 1.6-1.75 for body, 1.2-1.4 for headings
   - Font-weight: 400 (body), 500 (medium), 600 (semibold), 700 (bold)
   - Color contrast: text-white/90 for body, text-white for headings
   - Max line length: 65-75 characters (use max-w-prose or max-w-2xl)
   - Proper heading hierarchy (h1 → h2 → h3, don't skip levels)

7. COLOR SYSTEM:
   ${colorInstruction}
   - Primary accent: vibrant but not overwhelming (use for CTAs, links, highlights)
   - Secondary: complementary color for variety
   - Neutral grays: rgba(255,255,255,0.1) to rgba(255,255,255,0.9)
   - Glassmorphism cards: rgba(255,255,255,0.05) background, rgba(255,255,255,0.1) border
   - Hover states: subtle brightness increase (filter: brightness(1.1))
   - Focus states: visible outline (outline: 2px solid accent, outline-offset: 2px)

8. COMPONENTS & CARDS:
   - Glassmorphism effect: background: rgba(0, 0, 0, 0.4), backdrop-filter: blur(16px)
   - Border: 1px solid rgba(255, 255, 255, 0.1)
   - Border-radius: 12px (cards), 8px (small elements)
   - Padding: p-6 (mobile), p-8 (desktop)
   - Hover: transform: translateY(-4px), transition: all 0.3s ease
   - Box-shadow: subtle (0 4px 6px rgba(0,0,0,0.3), 0 10px 20px rgba(0,0,0,0.2))
   - Images in cards: border-radius: 8px, object-fit: cover, width: 100%

9. BUTTONS & INTERACTIVE ELEMENTS:
   - Primary button: accent color background, white text, px-6 py-3, rounded-lg
   - Secondary button: transparent with border, hover: fill background
   - Hover: transform: translateY(-2px), transition: all 0.2s ease
   - Active: transform: translateY(0)
   - Focus: ring-2 ring-accent ring-offset-2 ring-offset-black
   - Disabled: opacity-50, cursor-not-allowed

10. IMAGES:
    - Use LoremFlickr ONLY for content images (not backgrounds): https://loremflickr.com/800/600/[keyword]
    - All images: loading="lazy", alt="descriptive text", width and height attributes
    - Responsive: max-w-full, h-auto
    - Rounded corners: rounded-lg or rounded-xl
    - Object-fit: cover for hero images, contain for logos

11. ANIMATIONS (Subtle & Professional):
    - Fade-in on scroll: opacity 0 → 1, transform: translateY(20px) → 0
    - Duration: 0.6s ease-out
    - Stagger animations for cards (delay: 0.1s increments)
    - NO excessive bouncing, spinning, or distracting animations
    - Use CSS animations, not JavaScript (unless necessary)

12. SECTIONS TO INCLUDE:
    - Hero: Large, impactful, clear CTA, proper spacing
    - Features: 3-6 feature cards in responsive grid
    - Stats/Numbers: Visual emphasis, large numbers
    - Gallery/Showcase: Grid of images or cards
    - Testimonials: Quote cards with author info
    - Pricing: Clean pricing cards (if applicable)
    - Contact/CTA: Clear call-to-action section
    - Footer: Links, copyright, minimal design

13. CODE QUALITY:
    - Semantic HTML5 (header, nav, main, section, article, footer)
    - Clean, readable CSS (use Tailwind classes or organized CSS)
    - Proper indentation and formatting
    - Comments for complex sections
    - Accessible: proper ARIA labels, keyboard navigation
    - Valid HTML5 structure

14. PERFORMANCE:
    - Optimize images (use appropriate sizes)
    - Minimize CSS (use efficient selectors)
    - Lazy load images
    - Smooth scrolling: html { scroll-behavior: smooth; }

=== OUTPUT REQUIREMENTS ===
- Complete, valid HTML5 document (DOCTYPE, html, head, body)
- Include Tailwind CSS CDN: <script src="https://cdn.tailwindcss.com"></script>
- Include Google Fonts in <head>
- All styles either inline or in <style> tag
- Mobile-responsive from 375px to 1920px
- No broken images, links, or placeholders
- Professional, polished, production-ready code
- Never truncate - output complete HTML

${colorInstruction}${fontInstruction}

Create a stunning, professional website that looks like it was designed by a top-tier agency. Focus on precision, alignment, spacing, and creating a cohesive, polished user experience that works flawlessly on all devices.`;

    // Call Gemini API with fallback for rate limits
    // Note: prompt already contains MASTER_SYSTEM_PROMPT with all detailed instructions
    let result, response, generatedText;
    
    try {
      result = await model.generateContent({
        contents: [{
          role: "user",
          parts: [{
            text: `${systemPrompt}\n\nUser Request: ${prompt}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 16384,
          topP: 0.9,
        }
      });
      response = await result.response;
      generatedText = response.text();
      console.log('✅ Used gemini-2.0-flash-exp');
    } catch (error: any) {
      // Check if rate limited, resource exhausted, or network error
      const isRateLimit = 
        error.message?.includes('429') || 
        error.message?.includes('Resource exhausted');
      
      const isNetworkError = 
        error.message?.includes('network') ||
        error.message?.includes('timeout') ||
        error.message?.includes('ECONNREFUSED') ||
        error.message?.includes('ENOTFOUND') ||
        error.message?.includes('unreachable') ||
        error.code === 'ETIMEDOUT' ||
        error.code === 'ECONNREFUSED' ||
        error.code === 'ENOTFOUND';
      
      // Fallback if rate limited OR network error (unreachable)
      if (isRateLimit || isNetworkError) {
        console.log('⚠️ gemini-2.0-flash-exp not reachable or limit exceeded, falling back to gemini-2.0-flash...');
        model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        result = await model.generateContent({
          contents: [{
            role: "user",
            parts: [{
              text: `${systemPrompt}\n\nUser Request: ${prompt}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 8192,
            topP: 0.9,
          }
        });
        response = await result.response;
        generatedText = response.text();
        console.log('✅ Used gemini-2.0-flash (fallback)');
      } else {
        throw error;
      }
    }

    console.log('✅ Server: Gemini API responded successfully! Length:', generatedText.length);

    // Return the generated HTML
    return res.status(200).json({
      success: true,
      html: generatedText
    });

  } catch (error: any) {
    console.error('❌ Server Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate UI. Please try again.'
    });
  }
}

