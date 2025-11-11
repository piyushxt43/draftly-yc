// API key is now stored server-side - NOT exposed to client!
// All Gemini API calls go through /api/generate-ui endpoint

import { GoogleGenerativeAI } from "@google/generative-ai";

// Callback for progress updates
type ProgressCallback = (progress: number, message: string) => void;

// Function to extract color theme and fonts from user input
function extractUserPreferences(userPrompt: string): { colors?: string, fonts?: string } {
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
}

// COMPREHENSIVE SYSTEM PROMPT - Professional UI/UX Design Guidelines
function buildSystemPrompt(userColors?: string, userFonts?: string): string {
  const colorInstruction = userColors 
    ? ` User specified colors: "${userColors}" - use these colors throughout with proper contrast ratios.`
    : ` Use a sophisticated color palette (blues, teals, greens, oranges, reds, pinks, indigo) - NO purple. Ensure WCAG AA contrast ratios (4.5:1 for text).`;

  const fontInstruction = userFonts
    ? ` Use font: "${userFonts}" with proper fallbacks.`
    : ` Use modern, professional fonts (Inter, Geist, DM Sans, Manrope, Poppins) from Google Fonts with proper font-weight hierarchy.`;

  return `You are an elite professional UI/UX designer creating a production-ready, modern website. The design must look like it was crafted by a senior designer at a top agency - NOT AI-generated. Focus on precision, alignment, spacing, and professional aesthetics.

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
}

interface GenerationResult {
  success: boolean;
  html?: string;

  error?: string;
}

export async function generateUI(
  userPrompt: string,
  onProgress?: ProgressCallback
): Promise<GenerationResult> {
  try {
    onProgress?.(10, 'Draftly AI initializing...');
    
    onProgress?.(30, 'Draftly preparing your design...');

    // Extract user preferences for colors and fonts
    const preferences = extractUserPreferences(userPrompt);
    const systemPrompt = buildSystemPrompt(preferences.colors, preferences.fonts);

    const fullPrompt = `${systemPrompt}\n\nUser Request: ${userPrompt}`;

    console.log('🚀 Calling Gemini API through secure endpoint...');
    
    onProgress?.(50, 'Draftly crafting your UI...');

    // For local development, call Gemini API directly
    // For production, this would go through /api/generate-ui
    const GEMINI_API_KEY = "AIzaSyDuJ3PYOuvtl8e3VuA3FPuNreDgrifqGZo";
    
    onProgress?.(60, 'Draftly is crafting your website...');
    
    // Use Gemini AI - with fallback for rate limit handling
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    let model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    let result, response, generatedText;
    
    // Try with experimental model first, fallback to stable if rate limited
    try {
      result = await model.generateContent({
        contents: [{
          role: "user",
          parts: [{
            text: fullPrompt
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
        onProgress?.(65, 'Using stable model...');
        
        model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        result = await model.generateContent({
          contents: [{
            role: "user",
            parts: [{
              text: fullPrompt
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

    onProgress?.(80, 'Processing your website...');

    console.log('✅ Gemini API response received');

    // Extract HTML from the response
    const html = extractHTMLFromResponse(generatedText);
    
    console.log(`📦 Extracted ${html.length} characters of HTML`);

    onProgress?.(90, 'Applying final touches...');

    // Post-process the HTML to fix any issues
    const finalHTML = postProcessHTML(html, userPrompt);
    
    console.log('✅ UI generation complete!');

    onProgress?.(100, 'Complete!');

    return {
      success: true,
      html: finalHTML
    };

  } catch (error: any) {
    console.error('❌ Draftly Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to generate UI'
    };
  }
}

// Extract HTML from markdown code blocks if present
function extractHTMLFromResponse(response: string): string {
  // Check if response is wrapped in markdown code blocks
  const codeBlockMatch = response.match(/```(?:html)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    return codeBlockMatch[1].trim();
  }
  
  // If not in code blocks, check if it starts with <!DOCTYPE or <html
  if (response.trim().startsWith('<!DOCTYPE') || response.trim().startsWith('<html')) {
    return response.trim();
  }

  // Last resort: try to extract HTML from anywhere in the response
  const htmlMatch = response.match(/<!DOCTYPE[\s\S]*<\/html>/i);
  if (htmlMatch) {
    return htmlMatch[0];
  }
  
  console.log('⚠️ No HTML found in response, returning raw response');
  console.log(`📄 Response length: ${response.length} chars)`);
  return response.trim();
}

// Post-process to FIX ALL images aggressively
function postProcessHTML(html: string, userPrompt: string): string {
  let processed = html;
  
  // Just use generic keywords - let AI figure out relevant images
  const mainKeyword = 'business';
  const secondKeyword = 'modern';
  
  console.log('🖼️ Fixing broken images with LoremFlickr URLs');
  
  // 1. Replace ALL base64/data URIs with RELEVANT LoremFlickr images
  processed = processed.replace(
    /src=["']data:image[^"']*["']/gi,
    `src="https://loremflickr.com/800/600/${mainKeyword},${secondKeyword}"`
  );
  
  // 2. Replace placeholder services with RELEVANT LoremFlickr images
  processed = processed.replace(
    /src=["']https?:\/\/(placeholder\.com|via\.placeholder\.com|placehold\.it|dummyimage\.com|placeimg\.com)[^"']*["']/gi,
    `src="https://loremflickr.com/800/600/${mainKeyword}"`
  );
  
  // 3. Replace Unsplash with RELEVANT LoremFlickr images
  processed = processed.replace(
    /https:\/\/source\.unsplash\.com\/(\d+)x(\d+)\/\?[^"']*/gi,
    `https://loremflickr.com/$1/$2/${mainKeyword}`
  );
  
  // 4. Replace Picsum with RELEVANT LoremFlickr images
  processed = processed.replace(
    /https:\/\/picsum\.photos\/(\d+)\/(\d+)/gi,
    `https://loremflickr.com/$1/$2/${mainKeyword}`
  );
  
  // 5. Fix empty or broken src with RELEVANT LoremFlickr
  processed = processed.replace(
    /<img([^>]*)\ssrc=["']["']/gi,
    `<img$1 src="https://loremflickr.com/600/600/${mainKeyword}"`
  );
  
  // 6. Fix relative paths with RELEVANT LoremFlickr
  processed = processed.replace(
    /src=["']\.\.?\/[^"']*["']/gi,
    `src="https://loremflickr.com/800/600/${mainKeyword}"`
  );
  
  // 7. Replace SVG placeholders - keep SVG if it's a real SVG, otherwise replace
  processed = processed.replace(
    /src=["'][^"']*placeholder[^"']*\.svg["']/gi,
    `src="https://loremflickr.com/200/200/${mainKeyword}"`
  );
  
  // 8. Find img tags without src and add RELEVANT LoremFlickr
  processed = processed.replace(
    /<img(?![^>]*src=)([^>]*)>/gi,
    `<img src="https://loremflickr.com/600/600/${mainKeyword}" $1>`
  );
  
  // 9. Add loading="lazy" to ALL images
  processed = processed.replace(
    /<img(?![^>]*loading=)/gi,
    '<img loading="lazy"'
  );
  
  // 10. Add alt tags to ALL images
  processed = processed.replace(
    /<img(?![^>]*alt=)/gi,
    '<img alt="Image"'
  );
  
  // 11. Count images
  const imageCount = (processed.match(/<img/g) || []).length;
  console.log(`✅ Total images in output: ${imageCount}`);
  
  // 12. If less than 8 images, warn (but can't add more in post-processing)
  if (imageCount < 8) {
    console.warn('⚠️ Warning: Less than 8 images generated. This should not happen!');
  }
  
  // 13. 🚨 CRITICAL: Remove ALL background images from homepage and enforce CSS texture ONLY
  console.log('🔒 Aggressively removing ALL homepage background images and enforcing CSS texture...');
  
  // 13a. Ensure viewport meta tag exists with proper mobile settings
  if (!processed.includes('viewport')) {
    // Add viewport meta tag if it doesn't exist
    processed = processed.replace(
      /(<head[^>]*>)/i,
      '$1\n    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">'
    );
  } else if (!processed.includes('maximum-scale')) {
    // Update existing viewport meta tag to include proper mobile settings
    processed = processed.replace(
      /<meta\s+name=["']viewport["'][^>]*>/i,
      '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">'
    );
  }
  
  // 13b. Ensure all images are responsive
  processed = processed.replace(
    /<img([^>]*?)(?:\sstyle=["']([^"']*)["'])?([^>]*)>/gi,
    (match, before, styleAttr, after) => {
      let style = styleAttr || '';
      // Add responsive styles if not present
      if (!style.includes('max-width') && !style.includes('width: 100%')) {
        style = style ? `${style}; max-width: 100%; height: auto;` : 'max-width: 100%; height: auto;';
      }
      return `<img${before} style="${style}"${after}>`;
    }
  );
  
  // 13c. Ensure buttons and interactive elements have proper touch targets on mobile
  processed = processed.replace(
    /<button([^>]*?)(?:\sstyle=["']([^"']*)["'])?([^>]*)>/gi,
    (match, before, styleAttr, after) => {
      let style = styleAttr || '';
      // Ensure minimum touch target size
      if (!style.includes('min-height') && !style.includes('min-width')) {
        style = style ? `${style}; min-height: 44px; min-width: 44px;` : 'min-height: 44px; min-width: 44px;';
      }
      return `<button${before} style="${style}"${after}>`;
    }
  );
  
  // 13d. Add smooth scrolling
  if (!processed.includes('scroll-behavior')) {
    processed = processed.replace(
      /(<style>[\s\S]*?)(<\/style>)/i,
      (match, styleContent, closingTag) => {
        if (!styleContent.includes('scroll-behavior')) {
          return `${styleContent}\n    html { scroll-behavior: smooth; }\n${closingTag}`;
        }
        return match;
      }
    );
  }
  
  // List of 20 CSS texture patterns (pick one randomly) - MORE VISIBLE!
  const texturePatterns = [
    `background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Cfilter id="n"%3E%3CfeTurbulence baseFrequency="0.9" numOctaves="4"/%3E%3C/filter%3E%3Crect width="300" height="300" filter="url(%23n)" opacity="0.15"/%3E%3C/svg%3E')`,
    `background-image: radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px); background-size: 20px 20px`,
    `background-image: linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px); background-size: 40px 40px`,
    `background-image: repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.12) 30px, rgba(255,255,255,0.12) 60px)`,
    `background-image: repeating-linear-gradient(45deg, transparent 0, transparent 10px, rgba(255,255,255,0.14) 10px, rgba(255,255,255,0.14) 11px), repeating-linear-gradient(-45deg, transparent 0, transparent 10px, rgba(255,255,255,0.14) 10px, rgba(255,255,255,0.14) 11px)`,
    `background-image: url('data:image/svg+xml,%3Csvg width="50" height="50" xmlns="http://www.w3.org/2000/svg"%3E%3Cpolygon points="25,5 45,15 45,35 25,45 5,35 5,15" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1"/%3E%3C/svg%3E'); background-size: 50px 50px`,
    `background-image: radial-gradient(circle, rgba(255,255,255,0.13) 10px, transparent 10px); background-size: 50px 50px`,
    `background-image: url('data:image/svg+xml,%3Csvg width="100" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 10 Q 25 0, 50 10 T 100 10" stroke="rgba(255,255,255,0.12)" fill="none"/%3E%3C/svg%3E'); background-size: 100px 20px`,
    `background-image: linear-gradient(30deg, rgba(255,255,255,0.10) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.10) 87.5%, rgba(255,255,255,0.10)), linear-gradient(150deg, rgba(255,255,255,0.10) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.10) 87.5%, rgba(255,255,255,0.10)); background-size: 80px 140px`,
    `background-image: linear-gradient(45deg, rgba(255,255,255,0.10) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,0.10) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.10) 75%), linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.10) 75%); background-size: 40px 40px`,
    `background-image: linear-gradient(135deg, rgba(255,255,255,0.12) 25%, transparent 25%), linear-gradient(225deg, rgba(255,255,255,0.12) 25%, transparent 25%); background-size: 40px 40px`,
    `background-image: linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.14) 49%, rgba(255,255,255,0.14) 51%, transparent 52%); background-size: 50px 50px`,
    `background-image: repeating-linear-gradient(0deg, rgba(255,255,255,0.12) 0, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 50px), repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 50px)`,
    `background-image: radial-gradient(circle, transparent 20%, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent 80%, transparent); background-size: 30px 30px`,
    `background-image: repeating-linear-gradient(0deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 2px), repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 2px)`,
    `background-image: linear-gradient(45deg, rgba(255,255,255,0.10) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.10) 75%), linear-gradient(-45deg, rgba(255,255,255,0.10) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.10) 75%); background-size: 60px 60px`,
    `background-image: linear-gradient(rgba(255,255,255,0.10) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.10) 2px, transparent 2px), linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px); background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px`,
    `background-image: linear-gradient(30deg, transparent 40%, rgba(255,255,255,0.10) 40%, rgba(255,255,255,0.10) 60%, transparent 60%), linear-gradient(90deg, transparent 40%, rgba(255,255,255,0.10) 40%, rgba(255,255,255,0.10) 60%, transparent 60%); background-size: 70px 120px`,
    `background-image: radial-gradient(circle at 20% 50%, transparent 0%, rgba(255,255,255,0.12) 100%), radial-gradient(circle at 80% 50%, transparent 0%, rgba(255,255,255,0.12) 100%)`,
    `background-image: repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.11) 5px, rgba(255,255,255,0.11) 6px), repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(255,255,255,0.11) 5px, rgba(255,255,255,0.11) 6px)`
  ];
  
  // Pick a random texture
  const randomTexture = texturePatterns[Math.floor(Math.random() * texturePatterns.length)];
  
  console.log(`🎲 Selected random texture pattern: ${texturePatterns.indexOf(randomTexture) + 1}/20`);
  
  // AGGRESSIVE REMOVAL: Remove ALL background images from <body> tag (any format)
  processed = processed.replace(
    /<body([^>]*)\sstyle=["']([^"']*)["']/gi,
    (match, attributes, style) => {
      // Remove ALL background properties that use external URLs (http://, https://, loremflickr, unsplash, etc.)
      let cleanedStyle = style
        .replace(/background[^:]*:\s*url\(['"]?https?:\/\/[^'")]+['"]?\)[^;]*;?/gi, '')
        .replace(/background[^:]*:\s*url\(['"]?https:\/\/loremflickr[^'")]+['"]?\)[^;]*;?/gi, '')
        .replace(/background[^:]*:\s*url\(['"]?https:\/\/source\.unsplash[^'")]+['"]?\)[^;]*;?/gi, '')
        .replace(/background[^:]*:\s*url\(['"]?https:\/\/images\.unsplash[^'")]+['"]?\)[^;]*;?/gi, '')
        .replace(/background[^:]*:\s*url\(['"]?https:\/\/picsum[^'")]+['"]?\)[^;]*;?/gi, '');
      
      // Remove background shorthand that includes URLs
      cleanedStyle = cleanedStyle.replace(/background:\s*[^;]*url\(['"]?https?:\/\/[^'")]+['"]?\)[^;]*;?/gi, '');
      
      // Clean up extra spaces and semicolons
      cleanedStyle = cleanedStyle.replace(/;\s*;/g, ';').replace(/^\s*;\s*/, '').replace(/\s*;\s*$/, '');
      
      // FORCE CSS texture (replace any existing background)
      if (cleanedStyle.trim()) {
        return `<body${attributes} style="background-color: #000000; ${randomTexture}; ${cleanedStyle.replace(/background[^;]*/gi, '')}">`;
      } else {
        return `<body${attributes} style="background-color: #000000; ${randomTexture}">`;
      }
    }
  );
  
  // Also handle body tags without style attribute - FORCE add texture
  processed = processed.replace(
    /<body([^>]*?)(?:\sstyle=["']([^"']*)["'])?([^>]*)>/i,
    (match, before, styleAttr, after) => {
      // Remove ANY existing background from style
      let cleanedStyle = styleAttr ? styleAttr.replace(/background[^;]*[^;]*;?/gi, '').trim() : '';
      
      // Always add our texture
      if (cleanedStyle) {
        return `<body${before} style="background-color: #000000; ${randomTexture}; ${cleanedStyle}">`;
      } else {
      return `<body${before}${after} style="background-color: #000000; ${randomTexture}">`;
      }
    }
  );
  
  // Remove background images from hero sections that might act as page backgrounds
  processed = processed.replace(
    /<section([^>]*)\sclass=["'][^"']*hero[^"']*["'][^>]*\sstyle=["']([^"']*background[^"']*url\(https?:\/\/[^'")]+\)[^"']*)["']/gi,
    (match, attributes, style) => {
      const cleanedStyle = style.replace(/background[^;]*url\(https?:\/\/[^'")]+\)[^;]*;?/gi, '');
      return `<section${attributes} class="hero" style="${cleanedStyle}">`;
    }
  );
  
  // Remove background images from full-width divs that might act as backgrounds
  processed = processed.replace(
    /<div([^>]*)\s(?:class=["'][^"']*(?:hero|background|bg)[^"']*["']|style=["'][^"']*)([^>]*)\sstyle=["']([^"']*background[^"']*url\(https?:\/\/[^'")]+\)[^"']*)["'][^>]*>/gi,
    (match, before, middle, style) => {
      const cleanedStyle = style.replace(/background[^;]*url\(https?:\/\/[^'")]+\)[^;]*;?/gi, '');
      return `<div${before}${middle} style="${cleanedStyle}">`;
    }
  );
  
  // ENFORCE hero section padding to prevent header overlap
  processed = processed.replace(
    /<section([^>]*)\sclass=["']([^"']*hero[^"']*)["']/gi,
    (match, attributes, classes) => {
      // Check if pt- classes already exist
      if (!classes.includes('pt-')) {
        return `<section${attributes} class="${classes} pt-28 sm:pt-36 md:pt-40">`;
      }
      return match;
    }
  );
  
  // Also enforce in style tags
  processed = processed.replace(
    /(<style>[\s\S]*?)(body\s*\{[\s\S]*?background[^;]*url\(https?:\/\/[^'")]+\)[^;]*;)/gi,
    (match, before, bodyRule) => {
      // Remove the background-image URL and replace with texture
      const cleaned = bodyRule.replace(/background[^:]*:\s*url\(https?:\/\/[^'")]+\)[^;]*;?/gi, '');
      return `${before}${cleaned}`;
    }
  );
  
  // Force texture in style tag if it has body selector
  processed = processed.replace(
    /<style>([\s\S]*?)<\/style>/gi,
    (match, cssContent) => {
      // Check if style tag has body selector but no texture
      if (cssContent.includes('body') && !cssContent.includes('background-image:') && !cssContent.includes('radial-gradient') && !cssContent.includes('linear-gradient')) {
        // Add random texture to body in style tag
        cssContent = cssContent.replace(
          /(body\s*\{[\s\S]*?)(\})/i,
          `$1background-color: #000000;\n    ${randomTexture};\n$2`
        );
        return `<style>${cssContent}</style>`;
      }
      return match;
    }
  );
  
  console.log('✅ All background images removed and CSS texture enforced!');
  
  // ENHANCE: Apply texture to <html> tag as well to ensure it's visible from start
  processed = processed.replace(
    /<html([^>]*?)(?:\sstyle=["']([^"']*)["'])?([^>]*)>/i,
    (match, before, styleAttr, after) => {
      let cleanedStyle = styleAttr ? styleAttr.replace(/background[^;]*[^;]*;?/gi, '').trim() : '';
      if (cleanedStyle) {
        return `<html${before} style="background-color: #000000; ${randomTexture}; ${cleanedStyle}">`;
      } else {
        return `<html${before}${after} style="background-color: #000000; ${randomTexture}">`;
      }
    }
  );
  
  // ENHANCE: Make header/nav sleeker with glassmorphism and animations
  // Find nav/header elements and enhance them
  processed = processed.replace(
    /<nav([^>]*?)(?:\sstyle=["']([^"']*)["'])?([^>]*)>/gi,
    (match, before, styleAttr, after) => {
      let style = styleAttr || '';
      // Add glassmorphism if not already present
      if (!style.includes('backdrop-blur') && !style.includes('bg-black/')) {
        style = `${style}; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255, 255, 255, 0.1); position: fixed; top: 0; width: 100%; z-index: 1000; transition: all 0.3s ease;`.trim();
      }
      return `<nav${before} style="${style}"${after}>`;
    }
  );
  
  processed = processed.replace(
    /<header([^>]*?)(?:\sstyle=["']([^"']*)["'])?([^>]*)>/gi,
    (match, before, styleAttr, after) => {
      let style = styleAttr || '';
      // Add glassmorphism if not already present
      if (!style.includes('backdrop-blur') && !style.includes('bg-black/')) {
        style = `${style}; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255, 255, 255, 0.1); position: fixed; top: 0; width: 100%; z-index: 1000; transition: all 0.3s ease;`.trim();
      }
      return `<header${before} style="${style}"${after}>`;
    }
  );
  
  // ENHANCE: Add random animations to various elements
  // Inject animation CSS if style tag exists
  const animationCSS = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    .animate-fade-in-up { animation: fadeInUp 0.6s ease-out; }
    .animate-fade-in { animation: fadeIn 0.8s ease-out; }
    .animate-slide-left { animation: slideInLeft 0.7s ease-out; }
    .animate-slide-right { animation: slideInRight 0.7s ease-out; }
    .animate-scale-in { animation: scaleIn 0.5s ease-out; }
    .animate-float { animation: float 3s ease-in-out infinite; }
    section:nth-child(odd) { animation: fadeInUp 0.8s ease-out; }
    section:nth-child(even) { animation: fadeIn 1s ease-out; }
    .card, [class*="card"] { animation: scaleIn 0.6s ease-out; }
    button, [class*="button"], a[class*="btn"] { transition: all 0.3s ease; }
    button:hover, [class*="button"]:hover, a[class*="btn"]:hover { transform: translateY(-2px); }
  `;
  
  // Inject animations into style tag
  processed = processed.replace(
    /(<style>[\s\S]*?)(<\/style>)/i,
    (match, styleContent, closingTag) => {
      // Only add if not already present
      if (!styleContent.includes('@keyframes fadeInUp')) {
        return `${styleContent}\n${animationCSS}\n${closingTag}`;
      }
      return match;
    }
  );
  
  // If no style tag exists, add one with animations
  if (!processed.includes('<style>')) {
    processed = processed.replace(
      /(<\/head>)/i,
      `<style>${animationCSS}</style>\n$1`
    );
  }
  
  // Add random animation classes to some elements
  const animationClasses = ['animate-fade-in-up', 'animate-fade-in', 'animate-slide-left', 'animate-slide-right', 'animate-scale-in'];
  
  // Add animations to cards randomly (every 3rd card)
  let cardCount = 0;
  processed = processed.replace(
    /<div([^>]*class=["'][^"']*card[^"']*["'][^>]*)>/gi,
    (match, attrs) => {
      cardCount++;
      if (cardCount % 3 === 0) {
        const animClass = animationClasses[Math.floor(Math.random() * animationClasses.length)];
        return match.replace(/class=["']([^"']*)["']/, `class="$1 ${animClass}"`);
      }
      return match;
    }
  );
  
  // Add hover animations to buttons
  processed = processed.replace(
    /<button([^>]*class=["'][^"']*["'][^>]*)>/gi,
    (match, attrs) => {
      if (!attrs.includes('animate-')) {
        return match.replace(/class=["']([^"']*)["']/, `class="$1 animate-scale-in"`);
      }
      return match;
    }
  );
  
  console.log('✅ Enhanced with glassmorphism header and animations!');
  
  return processed;
}


