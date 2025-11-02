// API key is now stored server-side - NOT exposed to client!
// All Gemini API calls go through /api/generate-ui endpoint

// Callback for progress updates
type ProgressCallback = (progress: number, message: string) => void;

// VERSATILE SYSTEM PROMPT - Creates UNIQUE designs for each industry
const MASTER_SYSTEM_PROMPT = `You are an ELITE UI/UX DESIGNER AI creating STUNNING, UNIQUE websites.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚨 CRITICAL RULES - READ THIS FIRST!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. ALWAYS use DARK MODE (black/dark backgrounds) - unless user specifically requests light mode!
2. Use UNIQUE, SLEEK fonts - NOT commonly used ones! Try: Satoshi, Cal Sans, General Sans, Clash Display, etc.
3. Use subtle gradients and glassmorphism for premium, sleek look!
4. Include 5-7 sections minimum with unique layouts!
5. Make it look PREMIUM and SLEEK - like Apple, Linear, or Vercel websites!
6. 🚨🚨🚨 MAIN BACKGROUND MUST USE ONLY ONE OF THE 20 CSS TEXTURE PATTERNS - ABSOLUTELY NO BACKGROUND IMAGES! 🚨🚨🚨
7. 🚨 MUST BE 100% MOBILE RESPONSIVE - Test on 375px, 768px, 1440px widths!

## CORE PRINCIPLES:
• DARK, SLEEK, PREMIUM designs (black/dark gray backgrounds with subtle glows!)
• Modern, unique styling (like Apple, Linear, Vercel, Stripe websites!)
• Industry-specific content with VARIED, RELEVANT images (LoremFlickr)
• Multiple sections with glassmorphism, subtle animations
• Use UNIQUE fonts (NOT the commonly used ones!)
• Premium, polished, sleek look (NOT typical agency templates!)
• Subtle gradients, CSS textures (NOT Draftly's grain!), glassmorphism effects
• Make it look EXPENSIVE and MODERN!
• 🚨 EVERY GENERATION MUST USE A DIFFERENT BACKGROUND TEXTURE FROM THE 20 OPTIONS!

## DESIGN VARIETY (Choose ONE RANDOM layout style per website):

**Style 1 - FULL SCREEN HERO:**
• Hero takes full viewport with parallax image
• Text overlay with huge typography
• CTA buttons front and center
• Fonts: Playfair Display + Inter

**Style 2 - SPLIT SCREEN:**
• 50/50 split hero (image left, content right)
• Bold asymmetric layouts
• Fonts: Montserrat + Open Sans

**Style 3 - MINIMAL CENTERED:**
• Centered content with generous whitespace
• Small hero image, focus on typography
• Fonts: Space Grotesk + Inter

**Style 4 - GRID MASONRY:**
• Pinterest-style grid layout
• Image-heavy with cards
• Fonts: Poppins + Nunito

**Style 5 - STORYTELLING:**
• Vertical scrolling narrative
• Alternating image/text sections
• Fonts: Merriweather + Raleway

**Style 6 - BOLD & COLORFUL:**
• Vibrant colors, large shapes
• Memphis design elements
• Fonts: Outfit + Work Sans

🚨 IMPORTANT: RANDOMLY pick one style per generation - DON'T repeat the same layout!

## LAYOUT PRINCIPLES:
• Max-width: max-w-6xl or max-w-7xl
• Padding: py-16, py-20, py-24 for sections
• Gaps: gap-6, gap-8, gap-12
• Rounded: rounded-xl, rounded-2xl, rounded-3xl
• Everything is centered and balanced

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🖼️ IMAGES - ⚠️ ABSOLUTELY CRITICAL! ⚠️
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ NEVER EVER USE:
• base64 images (data:image/...)
• Empty src=""
• Placeholder.com
• Relative paths (./images/...)
• SVG placeholders
• Icon placeholders

✅ USE LOREMFLICKR WITH INDUSTRY-SPECIFIC KEYWORDS:

Format: https://loremflickr.com/[WIDTH]/[HEIGHT]/[KEYWORD1],[KEYWORD2]

🚨 CRITICAL: Extract keywords from user's prompt and use ONLY relevant images!

**For MEDICAL/DOCTOR website:**
<img src="https://loremflickr.com/1920/1080/doctor,hospital" class="w-full h-full object-cover" alt="Medical Hero" loading="lazy" />
<img src="https://loremflickr.com/600/400/healthcare,clinic" class="w-full h-48 object-cover rounded-2xl" alt="Service 1" loading="lazy" />
<img src="https://loremflickr.com/600/400/stethoscope,medicine" class="w-full h-48 object-cover rounded-2xl" alt="Service 2" loading="lazy" />
<img src="https://loremflickr.com/600/400/hospital,patient" class="w-full h-48 object-cover rounded-2xl" alt="Service 3" loading="lazy" />

**For FASHION/KURTI website:**
<img src="https://loremflickr.com/1920/1080/fashion,clothing" class="w-full h-full object-cover" alt="Fashion Hero" loading="lazy" />
<img src="https://loremflickr.com/600/400/style,outfit" class="w-full h-48 object-cover rounded-2xl" alt="Design 1" loading="lazy" />
<img src="https://loremflickr.com/600/400/fabric,textile" class="w-full h-48 object-cover rounded-2xl" alt="Design 2" loading="lazy" />
<img src="https://loremflickr.com/600/400/dress,wardrobe" class="w-full h-48 object-cover rounded-2xl" alt="Design 3" loading="lazy" />

**For RESTAURANT/CAFE:**
<img src="https://loremflickr.com/1920/1080/restaurant,dining" class="w-full h-full object-cover" alt="Restaurant Hero" loading="lazy" />
<img src="https://loremflickr.com/600/400/food,dish" class="w-full h-48 object-cover rounded-2xl" alt="Dish 1" loading="lazy" />
<img src="https://loremflickr.com/600/400/cuisine,meal" class="w-full h-48 object-cover rounded-2xl" alt="Dish 2" loading="lazy" />
<img src="https://loremflickr.com/600/400/coffee,beverage" class="w-full h-48 object-cover rounded-2xl" alt="Drinks" loading="lazy" />

**For FITNESS/GYM:**
<img src="https://loremflickr.com/1920/1080/gym,fitness" class="w-full h-full object-cover" alt="Gym Hero" loading="lazy" />
<img src="https://loremflickr.com/600/400/workout,exercise" class="w-full h-48 object-cover rounded-2xl" alt="Training 1" loading="lazy" />
<img src="https://loremflickr.com/600/400/athlete,running" class="w-full h-48 object-cover rounded-2xl" alt="Training 2" loading="lazy" />
<img src="https://loremflickr.com/600/400/yoga,wellness" class="w-full h-48 object-cover rounded-2xl" alt="Training 3" loading="lazy" />

🚨 CRITICAL: Use DIFFERENT keyword combinations for EACH image to avoid duplicates!

🎯 ALWAYS use keywords that match the user's industry - NO RANDOM IMAGES!

⚠️ CRITICAL RULES:
1. Use MINIMUM 20 images per page using LoremFlickr with RELEVANT keywords
2. Hero: https://loremflickr.com/1920/1080/[INDUSTRY_KEYWORD]
3. Features: https://loremflickr.com/600/400/[SPECIFIC_KEYWORD1], /600/400/[SPECIFIC_KEYWORD2]
4. Gallery: https://loremflickr.com/800/600/[RELEVANT_KEYWORD] (use different keywords!)
5. Team: https://loremflickr.com/400/400/person,professional
6. NEVER use base64, data:image, placeholder.com, Unsplash, or Picsum
7. Every <img> tag MUST have LoremFlickr URL with INDUSTRY-SPECIFIC keywords
8. LoremFlickr format: https://loremflickr.com/WIDTH/HEIGHT/keyword1,keyword2

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 REQUIRED WEBSITE SECTIONS (Include ALL of these!):

1. **HERO SECTION** - Full screen with:
   • Hero can have an image element (<img>), but <body> background MUST be CSS texture only!
   • DO NOT use background-image on hero section - use <img> tag instead
   • Animated gradient overlays
   • Large heading with gradient text
   • Subheading with description
   • 2-3 CTA buttons
   • Floating decorative icons (industry-specific CSS/SVG, NOT emojis)
   • Stats counters (100+ clients, 5-star rating, etc.)

2. **FEATURES/SERVICES** - Rich cards with:
   • Icon for each feature (CSS shapes or minimal SVG, NOT emojis)
   • Feature image (https://loremflickr.com/600/400/[SPECIFIC_FEATURE])
   • Title and description
   • "Learn More" link
   • Hover effects and animations
   • 4-6 cards in grid

3. **STATS/NUMBERS** - Impressive metrics:
   • Large numbers with animated counters
   • Icons next to each stat
   • 4 stats in a row
   • Examples: "10K+ Users", "99% Satisfaction", "24/7 Support"

4. **ABOUT/HOW IT WORKS** - Process timeline:
   • Step-by-step visual flow
   • Icons or numbers for each step
   • Images for each step
   • 3-4 steps

5. **GALLERY/SHOWCASE** - Image grid:
   • 8-12 images in masonry or grid layout
   • Hover effects (zoom, overlay)
   • Category filters (optional)

6. **TESTIMONIALS** - Social proof:
   • Customer photos (https://loremflickr.com/200/200/person,professional)
   • Star ratings (⭐⭐⭐⭐⭐)
   • Quote text
   • Name and company
   • 3-6 testimonial cards

7. **PRICING** (if relevant) - Pricing cards:
   • 3 tiers (Basic, Pro, Enterprise)
   • Feature lists with checkmarks
   • Highlighted "Popular" plan
   • Pricing and CTA buttons

8. **CTA/CONTACT** - Final conversion:
   • Eye-catching background
   • Large heading
   • Email signup or contact form
   • Social media icons

Each section needs VISUAL ELEMENTS, not just text blocks!

🚨 NEVER create simple, text-only websites!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 VISUAL ELEMENTS BY INDUSTRY (Add these based on user input!)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**RECRUITING/HR SAAS:**
• Professional gradient cards with job listings
• Animated hiring funnel visualization (SVG or CSS)
• Interactive skill tag clouds
• Chart graphics using CSS (bar charts, progress circles)
• Clean, corporate design elements
• Use minimal emojis (1-2 max), focus on: gradient cards, charts, visual data
• Stats: "10K+ Candidates Placed", "500+ Companies", "95% Match Rate"
• Colors: Blue, teal, professional tones
• Images: office, teamwork, business, professional (from LoremFlickr)
• Example: https://loremflickr.com/800/600/office,teamwork

**E-COMMERCE/SHOP:**
• Product grid with real product images
• CSS-based rating stars (★★★★★)
• Percentage discount badges with CSS
• Secure checkout icons (SVG or CSS)
• Category filter buttons with hover effects
• Use minimal emojis (0-1), focus on: product photos, sale badges, visual hierarchy
• Stats: "10K+ Products", "50K+ Happy Customers", "Free Shipping"
• Colors: Orange, red, yellow (exciting)
• Images: products, shopping, ecommerce, store (from LoremFlickr)
• Example: https://loremflickr.com/800/600/product,shopping

**FITNESS/GYM:**
• 💪 Strength icons
• 🏃 Activity illustrations
• 📊 Progress charts
• ⏱️ Workout timers
• 🥇 Achievement badges
• Use emojis: 🏋️ 🔥 ⚡ 💯 🎯
• Stats: "5K+ Members", "100+ Classes", "24/7 Access"
• Colors: Red, orange, energetic

**RESTAURANT/CAFE:**
• ☕ Coffee/food icons
• 🍽️ Menu items
• ⭐ Review ratings
• 🕐 Opening hours
• 📍 Location pins
• Use emojis: ☕ 🍰 🥐 ⭐ 🌟
• Stats: "1000+ 5-Star Reviews", "Since 2010", "Fresh Daily"
• Colors: Warm browns, oranges, creams

**TECH/STARTUP:**
• 💻 Code/tech icons
• 🚀 Rocket launch graphics
• 📱 Device mockups
• ⚡ Speed/performance icons
• 🔒 Security badges
• Use emojis: 💻 🚀 ⚡ 🔐 📊
• Stats: "99.9% Uptime", "1M+ API Calls", "SOC 2 Certified"
• Colors: Blue, purple, techy

**REAL ESTATE:**
• 🏠 House icons
• 📍 Location markers
• 🔑 Key visuals
• 📈 Price trends
• 🏆 Award badges
• Use emojis: 🏡 🔑 📍 💼 ⭐
• Stats: "500+ Properties", "95% Sold", "$2B+ in Sales"
• Colors: Blue, green, trustworthy

🚨 MINIMIZE EMOJIS - Use 0-3 emojis maximum!
Instead, use:
• Real images from LoremFlickr with industry-specific keywords
• CSS-based visual elements (gradients, shapes, patterns)
• SVG icons (basic shapes, not emojis)
• Actual product/service photos
• Visual design elements (cards, badges, charts)
• Professional photos that match the user's prompt (kurti → fashion photos, cafe → food photos)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 PREMIUM COMPONENT PATTERNS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### FEATURE CARDS WITH REAL IMAGES (NO EMOJIS):
<div class="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all">
  <img src="https://loremflickr.com/600/400/[INDUSTRY_KEYWORD]" class="w-full h-48 object-cover" loading="lazy" />
  <div class="p-6">
    <h3 class="text-2xl font-bold mb-2">Feature Title</h3>
    <p class="text-gray-600 mb-4">Description here</p>
    <a href="#" onclick="return false" class="text-blue-600 font-semibold hover:underline">Learn More →</a>
  </div>
</div>

### STAT COUNTERS WITH CSS ICONS (NO EMOJIS):
<div class="text-center p-6">
  <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
    <div class="text-3xl font-bold text-white">10K</div>
  </div>
  <div class="text-4xl font-bold text-gray-900 mb-1">10,000+</div>
  <div class="text-gray-600 font-medium">Happy Customers</div>
</div>

### CALL-TO-ACTION BUTTONS (MINIMAL EMOJIS):
<button class="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all text-xl font-bold">
  Get Started Free →
</button>

### TESTIMONIAL WITH STARS:
<div class="bg-white rounded-2xl p-8 shadow-lg">
  <div class="flex items-center gap-4 mb-4">
    <img src="https://loremflickr.com/200/200/person,professional" class="w-16 h-16 rounded-full object-cover" loading="lazy" />
    <div>
      <div class="font-bold text-lg">Sarah Johnson</div>
      <div class="text-sm text-gray-600">CEO, TechCorp</div>
    </div>
  </div>
  <div class="text-2xl mb-3">⭐⭐⭐⭐⭐</div>
  <p class="text-gray-700 italic">"This product changed our business completely!"</p>
</div>

### PROCESS STEPS WITH VISUALS:
<div class="flex items-center gap-6 bg-gray-50 rounded-2xl p-6">
  <div class="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center text-3xl font-bold flex-shrink-0">1</div>
  <div class="flex-1">
    <h4 class="font-bold text-2xl mb-2">📝 Sign Up</h4>
    <p class="text-gray-600">Create your account in 60 seconds</p>
  </div>
  <img src="https://picsum.photos/250/180" class="w-64 h-40 object-cover rounded-xl flex-shrink-0" />
</div>

### STATS CARDS:
<div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
  <div class="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
    10,000+
  </div>
  <div class="text-sm text-gray-400">Metric Label</div>
</div>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 HTML OUTPUT REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚨 CRITICAL: Your response MUST be COMPLETE, VALID HTML!

1. Start with <!DOCTYPE html>
2. Include ALL sections (Hero, Features, Stats, About, Gallery, Testimonials, Contact)
3. Include 25+ images with Unsplash URLs
4. Include Tailwind CDN in <head>
5. Include Google Fonts link
6. Make it a FULL, COMPLETE website (5000-8000 characters minimum!)
7. DO NOT truncate or summarize - output the ENTIRE HTML!

Example structure:

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Based on User Request]</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { 
            font-family: 'Space Grotesk', system-ui, sans-serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body { 
            background: #000000; 
            color: #ffffff;
            overflow-x: hidden;
        }
        
        /* Grain texture - EXACTLY like Draftly */
        .grain-texture {
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 50;
            opacity: 0.15;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            background-repeat: repeat;
        }
        
        /* Smooth scroll */
        html { scroll-behavior: smooth; }
        
        /* Prevent navigation */
        a { cursor: pointer; }
    </style>
    <script>
        // Prevent all navigation
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('a').forEach(a => {
                a.addEventListener('click', e => e.preventDefault());
            });
        });
    </script>
</head>
<body class="relative overflow-x-hidden bg-black text-white">
    <!-- Grain texture overlay for premium feel -->
    <div class="fixed inset-0 opacity-[0.02] pointer-events-none" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"300\" height=\"300\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence baseFrequency=\"0.9\" numOctaves=\"4\"/%3E%3C/filter%3E%3Crect width=\"300\" height=\"300\" filter=\"url(%23n)\" opacity=\"1\"/%3E%3C/svg%3E');"></div>
    
    <!-- Subtle gradient glow orbs -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
        <div class="absolute inset-0 bg-black"></div>
        <div class="absolute inset-0" style="background: radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.08) 0%, rgba(20, 184, 166, 0.04) 30%, transparent 60%)"></div>
    </div>
    
    <!-- NAVIGATION -->
    <nav class="fixed top-0 w-full bg-white/5 backdrop-blur-sm border-b border-white/10 z-40">
        <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div class="text-xl font-bold text-white">Brand</div>
            <div class="flex gap-6 items-center">
                <a href="#" class="text-gray-400 hover:text-white transition">Features</a>
                <a href="#" class="text-gray-400 hover:text-white transition">Pricing</a>
                <a href="#" class="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl text-white hover:from-emerald-500 hover:to-teal-500 transition">
                    Get Started
                </a>
            </div>
        </div>
    </nav>
    
    <!-- HERO SECTION - MUST HAVE IMAGE -->
    <section class="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
        <div class="max-w-6xl mx-auto w-full text-center space-y-8 relative z-10">
            <!-- Badge -->
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                <span class="text-xs text-gray-400 font-medium tracking-wider">PRODUCT TAGLINE</span>
            </div>
            
            <!-- Headline -->
            <h1 class="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight">
                Create Amazing
                <br/>
                <span class="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    [User's Topic]
                </span>
            </h1>
            
            <!-- Subheadline -->
            <p class="text-xl text-gray-400 max-w-2xl mx-auto">
                [Compelling description based on user's request]
            </p>
            
            <!-- CTA -->
            <button class="px-10 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl text-white font-semibold hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg shadow-emerald-500/20">
                Get Started Free
            </button>
        </div>
    </section>
    
    <!-- FEATURES SECTION - MUST HAVE IMAGES -->
    <section class="py-32 px-6 relative z-10">
        <div class="max-w-6xl mx-auto">
            <h2 class="text-5xl font-bold text-center mb-16">
                <span class="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    Key Features
                </span>
            </h2>
            
            <div class="grid md:grid-cols-3 gap-8">
                <!-- Feature Card 1 -->
                <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-emerald-500/30 transition-all">
                    <img src="https://source.unsplash.com/400x400/?abstract,technology" 
                         class="w-20 h-20 rounded-xl object-cover mb-6" 
                         alt="Feature" />
                    <h3 class="text-2xl font-bold mb-4 text-white">Feature One</h3>
                    <p class="text-gray-400">Description of this amazing feature.</p>
                </div>
                
                <!-- Repeat for more features with different Unsplash keywords -->
            </div>
        </div>
    </section>
    
    <!-- Add more sections: Pricing, Testimonials (with images), CTA, Footer -->
    
</body>
</html>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ QUALITY CHECKLIST (EVERY OUTPUT MUST HAVE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☑ Pure black background (#000)
☑ Grain texture overlay (opacity 0.15)
☑ Space Grotesk font throughout
☑ Emerald/Teal gradients ONLY (no purple/pink!)
☑ Glass-morphism cards (bg-white/5 backdrop-blur-sm)
☑ 8-10+ Unsplash images with real keywords
☑ Generous spacing (py-20, py-32)
☑ Rounded corners (rounded-2xl, rounded-3xl)
☑ Subtle gradient orbs in background
☑ All links href="#"
☑ Mobile responsive (sm:, md:, lg:)
☑ Professional, minimal, clean
☑ NOT flashy or over-designed

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 NOW GENERATE FOR USER'S REQUEST:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

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

    // Detect color scheme from prompt
    const colorScheme = detectColorScheme(userPrompt);
    const colorInstructions = getColorInstructions(colorScheme);
    
    onProgress?.(30, 'Draftly preparing your design...');

    const fullPrompt = `${MASTER_SYSTEM_PROMPT}\n\n${colorInstructions}\n\n${userPrompt}`;

    console.log('🚀 Calling Gemini API through secure endpoint...');
    console.log('Color scheme:', colorScheme);
    
    onProgress?.(50, 'Draftly crafting your UI...');

    // Call our serverless API endpoint (API key is server-side, not exposed!)
    const apiUrl = '/api/generate-ui';
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: fullPrompt })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `API request failed with status ${response.status}`);
    }
    
    console.log('✅ Gemini API responded successfully!');

    onProgress?.(80, 'Draftly polishing details...');
    
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to generate UI');
    }

    const generatedText = data.html;

    console.log('✅ UI Generated by Draftly!');
    console.log('📄 Raw response length:', generatedText.length, 'characters');

    onProgress?.(95, 'Draftly finalizing...');

    let htmlCode = extractHTMLFromResponse(generatedText);
    console.log('📝 Extracted HTML length:', htmlCode.length, 'characters');
    
    htmlCode = postProcessHTML(htmlCode, userPrompt);
    console.log('🔧 Post-processed HTML length:', htmlCode.length, 'characters');
    
    // Count and log images for debugging
    const imgMatches = htmlCode.match(/<img/gi);
    console.log(`🖼️ Total images in output: ${imgMatches ? imgMatches.length : 0}`);
    
    // Show first 3 image URLs
    const imgSrcMatches = htmlCode.matchAll(/<img[^>]*src=["']([^"']+)["']/gi);
    let counter = 0;
    for (const match of imgSrcMatches) {
      if (counter++ < 3) console.log(`  Image ${counter}: ${match[1]}`);
    }

    onProgress?.(100, 'Complete!');

    return {
      success: true,
      html: htmlCode
    };
  } catch (error: any) {
    console.error('❌ Draftly Error:', error);
    onProgress?.(0, 'Something went wrong');
    return {
      success: false,
      error: error.message || 'Failed to generate UI. Please try again.'
    };
  }
}

// Detect color scheme from user prompt
function detectColorScheme(prompt: string): string {
  const lower = prompt.toLowerCase();
  
  // Industry-specific colors
  if (lower.includes('tech') || lower.includes('saas') || lower.includes('software')) return 'blue';
  if (lower.includes('health') || lower.includes('medical') || lower.includes('wellness')) return 'green';
  if (lower.includes('finance') || lower.includes('bank') || lower.includes('crypto')) return 'blue';
  if (lower.includes('food') || lower.includes('restaurant') || lower.includes('cafe')) return 'orange';
  if (lower.includes('fashion') || lower.includes('beauty') || lower.includes('luxury')) return 'pink';
  if (lower.includes('fitness') || lower.includes('gym') || lower.includes('sport')) return 'red';
  if (lower.includes('education') || lower.includes('learn') || lower.includes('course')) return 'purple';
  if (lower.includes('creative') || lower.includes('art') || lower.includes('design')) return 'purple';
  if (lower.includes('travel') || lower.includes('vacation') || lower.includes('hotel')) return 'cyan';
  if (lower.includes('music') || lower.includes('entertainment')) return 'pink';
  
  // Random professional colors if no match
  const colors = ['blue', 'purple', 'pink', 'orange', 'teal', 'indigo'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Get color instructions based on scheme
function getColorInstructions(scheme: string): string {
  const colorMap: { [key: string]: { primary: string, secondary: string, gradient: string } } = {
    'blue': {
      primary: 'blue-500',
      secondary: 'cyan-500',
      gradient: 'from-blue-500 to-cyan-500'
    },
    'purple': {
      primary: 'purple-500',
      secondary: 'pink-500',
      gradient: 'from-purple-500 to-pink-500'
    },
    'pink': {
      primary: 'pink-500',
      secondary: 'rose-500',
      gradient: 'from-pink-500 to-rose-500'
    },
    'orange': {
      primary: 'orange-500',
      secondary: 'amber-500',
      gradient: 'from-orange-500 to-amber-500'
    },
    'green': {
      primary: 'green-500',
      secondary: 'emerald-500',
      gradient: 'from-green-500 to-emerald-500'
    },
    'teal': {
      primary: 'teal-500',
      secondary: 'cyan-500',
      gradient: 'from-teal-500 to-cyan-500'
    },
    'red': {
      primary: 'red-500',
      secondary: 'orange-500',
      gradient: 'from-red-500 to-orange-500'
    },
    'cyan': {
      primary: 'cyan-500',
      secondary: 'blue-500',
      gradient: 'from-cyan-500 to-blue-500'
    },
    'indigo': {
      primary: 'indigo-500',
      secondary: 'purple-500',
      gradient: 'from-indigo-500 to-purple-500'
    }
  };
  
  const colors = colorMap[scheme] || colorMap['blue'];
  
  const bgGradient = `radial-gradient(circle at 50% 0%, rgba(${getRGB(colors.primary)}, 0.15) 0%, rgba(${getRGB(colors.secondary)}, 0.08) 30%, transparent 60%)`;
  
  return `
🎨 SLEEK DARK MODE COLOR SCHEME:
• Background: Pure black (#000000) or dark gray (#0a0a0a, #111111)
• Primary Accent: ${colors.primary} with glow effects
• Secondary Accent: ${colors.secondary} for highlights
• Text: White (text-white) with gray-400 for secondary text
• Cards: bg-white/5 or bg-zinc-900 with backdrop-blur-xl (glassmorphism!)
• Subtle gradients: Use sparingly for accents and hover effects
• Grain texture overlay: Add subtle noise for premium feel
• Glows: Add subtle box-shadow with color/20 for depth

🎨 20 TEXTURED BACKGROUNDS - YOU MUST PICK EXACTLY ONE FOR <body> TAG - NO IMAGES ALLOWED!:

These are CSS-only patterns, NOT images. Pick ONE per website generation:

1. **Fine Grain Noise** (like Draftly): background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Cfilter id="n"%3E%3CfeTurbulence baseFrequency="0.9" numOctaves="4"/%3E%3C/filter%3E%3Crect width="300" height="300" filter="url(%23n)" opacity="0.08"/%3E%3C/svg%3E');

2. **Subtle Dots**: background-image: radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px); background-size: 20px 20px;

3. **Grid Lines**: background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 40px 40px;

4. **Diagonal Stripes**: background-image: repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.02) 30px, rgba(255,255,255,0.02) 60px);

5. **Cross Hatch**: background-image: repeating-linear-gradient(45deg, transparent 0, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 11px), repeating-linear-gradient(-45deg, transparent 0, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 11px);

6. **Hexagon Pattern**: background-image: url('data:image/svg+xml,%3Csvg width="50" height="50" xmlns="http://www.w3.org/2000/svg"%3E%3Cpolygon points="25,5 45,15 45,35 25,45 5,35 5,15" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/%3E%3C/svg%3E'); background-size: 50px 50px;

7. **Circle Grid**: background-image: radial-gradient(circle, rgba(255,255,255,0.05) 10px, transparent 10px); background-size: 50px 50px;

8. **Wave Pattern**: background-image: url('data:image/svg+xml,%3Csvg width="100" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 10 Q 25 0, 50 10 T 100 10" stroke="rgba(255,255,255,0.04)" fill="none"/%3E%3C/svg%3E'); background-size: 100px 20px;

9. **Triangular Grid**: background-image: linear-gradient(30deg, rgba(255,255,255,0.02) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.02) 87.5%, rgba(255,255,255,0.02)), linear-gradient(150deg, rgba(255,255,255,0.02) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.02) 87.5%, rgba(255,255,255,0.02)); background-size: 80px 140px;

10. **Checkerboard**: background-image: linear-gradient(45deg, rgba(255,255,255,0.02) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,0.02) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.02) 75%), linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.02) 75%); background-size: 40px 40px;

11. **Zig Zag**: background-image: linear-gradient(135deg, rgba(255,255,255,0.03) 25%, transparent 25%), linear-gradient(225deg, rgba(255,255,255,0.03) 25%, transparent 25%); background-size: 40px 40px;

12. **Diamond Pattern**: background-image: linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.03) 49%, rgba(255,255,255,0.03) 51%, transparent 52%); background-size: 50px 50px;

13. **Plus Signs**: background-image: repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 50px), repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 50px);

14. **Perforated**: background-image: radial-gradient(circle, transparent 20%, rgba(0,0,0,0.02) 20%, rgba(0,0,0,0.02) 80%, transparent 80%, transparent); background-size: 30px 30px;

15. **Carbon Fiber**: background-image: repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 2px), repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 2px);

16. **Woven**: background-image: linear-gradient(45deg, rgba(255,255,255,0.02) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.02) 75%), linear-gradient(-45deg, rgba(255,255,255,0.02) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.02) 75%); background-size: 60px 60px;

17. **Blueprint**: background-image: linear-gradient(rgba(255,255,255,0.02) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.02) 2px, transparent 2px), linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px); background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;

18. **Isometric Grid**: background-image: linear-gradient(30deg, transparent 40%, rgba(255,255,255,0.02) 40%, rgba(255,255,255,0.02) 60%, transparent 60%), linear-gradient(90deg, transparent 40%, rgba(255,255,255,0.02) 40%, rgba(255,255,255,0.02) 60%, transparent 60%); background-size: 70px 120px;

19. **Organic Dots**: background-image: radial-gradient(circle at 20% 50%, transparent 0%, rgba(255,255,255,0.03) 100%), radial-gradient(circle at 80% 50%, transparent 0%, rgba(255,255,255,0.03) 100%);

20. **Fine Crosshatch**: background-image: repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.015) 5px, rgba(255,255,255,0.015) 6px), repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(255,255,255,0.015) 5px, rgba(255,255,255,0.015) 6px);

🚨🚨🚨 CRITICAL RULES FOR BACKGROUNDS - READ THIS CAREFULLY! 🚨🚨🚨

❌ ABSOLUTELY FORBIDDEN:
- NO background images (no url(https://...), no url(https://loremflickr.com/...), no url(https://source.unsplash.com/...))
- NO full-page background photos
- NO background-image with external URLs on <body> or main container
- NO parallax background images
- NO hero background images that cover the entire page

✅ REQUIRED - YOU MUST:
1. Pick EXACTLY ONE of the 20 CSS texture patterns listed above
2. Apply it to the <body> tag using inline style like: style="background-color: #000000; background-image: [ONE OF THE 20 PATTERNS]"
3. The <body> tag MUST have: background-color: #000000 (or #0a0a0a or #111111) + ONE of the 20 CSS texture patterns
4. These 20 patterns are CSS-only (gradients, SVG data URIs, repeating patterns) - NOT images!
5. Hero sections CAN have images, but the main page background (<body>) MUST use ONLY CSS texture from the 20 options
6. Each generation should use a DIFFERENT texture for variety
7. Example: <body style="background-color: #000000; background-image: radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px); background-size: 20px 20px;">

🎯 CORRECT <body> EXAMPLE:
<body style="background-color: #000000; background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 40px 40px;">

❌ WRONG <body> EXAMPLE (DO NOT DO THIS):
<body style="background-image: url('https://loremflickr.com/1920/1080/business')"> ← FORBIDDEN!
<body style="background: url('https://source.unsplash.com/1920x1080/?dark')"> ← FORBIDDEN!

🚨 IF YOU USE ANY BACKGROUND IMAGE ON <body>, THE ENTIRE GENERATION IS WRONG! 🚨

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 MOBILE RESPONSIVENESS - MANDATORY!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚨 EVERY ELEMENT MUST BE MOBILE-FIRST AND RESPONSIVE!

**Mobile Breakpoints (Tailwind):**
- Mobile: Default (320px-639px) - Use base classes
- Tablet: sm: (640px+) - Use sm: prefix
- Desktop: md: (768px+), lg: (1024px+), xl: (1280px+)

**CRITICAL MOBILE RULES:**

1. **Typography Scaling:**
   - Mobile: text-2xl → Desktop: text-4xl lg:text-5xl xl:text-6xl
   - Mobile: text-base → Desktop: text-lg lg:text-xl
   - Always use responsive font sizes: text-sm sm:text-base md:text-lg

2. **Spacing & Padding:**
   - Mobile: px-4 py-8 → Desktop: px-6 md:px-8 lg:px-12
   - Mobile: gap-4 → Desktop: gap-6 md:gap-8 lg:gap-12
   - Use responsive spacing everywhere!

3. **Grid & Layout:**
   - Mobile: grid-cols-1 → Tablet: sm:grid-cols-2 → Desktop: lg:grid-cols-3 xl:grid-cols-4
   - Mobile: flex-col → Desktop: md:flex-row
   - Always stack vertically on mobile!

4. **Images:**
   - Use w-full h-auto for fluid images
   - Max widths: max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl
   - Object-fit: object-cover for consistency

5. **Navigation:**
   - Mobile: Hamburger menu (hidden on desktop)
   - Desktop: Full horizontal nav (hidden on mobile)
   - Example: <div class="md:hidden"> for mobile-only

6. **Buttons & CTAs:**
   - Mobile: w-full (full width)
   - Desktop: w-auto md:w-auto (auto width)
   - Touch-friendly: min-h-12 (48px minimum)

7. **Hero Sections:**
   - Mobile: h-screen min-h-[600px]
   - Responsive text: text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
   - Padding: py-20 md:py-32 lg:py-40

8. **Containers:**
   - Always use: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
   - Never fixed widths without responsive classes

**EXAMPLE RESPONSIVE STRUCTURE:**

<body class="bg-black" style="background-image: [TEXTURE-PATTERN]">
  <!-- Mobile-first hero -->
  <section class="min-h-screen px-4 py-20 md:px-8 md:py-32">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
        Responsive Title
      </h1>
      <!-- Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        <!-- Cards here -->
      </div>
    </div>
  </section>
</body>

🚨 TEST YOUR DESIGN AT:
- Mobile: 375px width (iPhone)
- Tablet: 768px width (iPad)
- Desktop: 1440px+ width

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 ADVANCED UI DESIGN PRINCIPLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. **Visual Hierarchy:**
   - Large headings: 48-72px (desktop), 32-48px (mobile)
   - Body text: 16-18px (desktop), 14-16px (mobile)
   - Use font-weight: 700 for headings, 400-500 for body

2. **Spacing System:**
   - 8px base unit: Use multiples of 8 (8, 16, 24, 32, 48, 64, 96, 128)
   - Consistent padding within components
   - Generous whitespace for premium feel

3. **Color Theory:**
   - Primary: 60% (backgrounds, large areas)
   - Secondary: 30% (cards, sections)
   - Accent: 10% (CTAs, highlights)
   - Use opacity for depth: bg-white/5, bg-white/10, bg-white/20

4. **Glassmorphism Effect:**
   - backdrop-blur-sm, backdrop-blur-md, backdrop-blur-lg
   - bg-white/5 or bg-white/10
   - border border-white/10 or border-white/20
   - Subtle shadows: shadow-lg, shadow-xl

5. **Interactive States:**
   - Hover: scale-105, brightness-110, border-white/30
   - Active: scale-95
   - Focus: ring-2 ring-offset-2 ring-blue-500
   - Transitions: transition-all duration-300

6. **Card Design:**
   - Rounded corners: rounded-xl, rounded-2xl, rounded-3xl
   - Padding: p-6 sm:p-8 md:p-10
   - Hover effects: hover:scale-105 hover:shadow-2xl
   - Border glow: border border-white/10 hover:border-white/20

7. **Button Hierarchy:**
   - Primary: Solid gradient, large, prominent
   - Secondary: Outlined, medium size
   - Tertiary: Text only, subtle hover
   - All with: px-6 py-3 rounded-xl transition-all

8. **Image Composition:**
   - Use images strategically (15-20 per page)
   - Not as backgrounds, but as content elements
   - Always with: rounded-xl object-cover
   - Aspect ratios: aspect-square, aspect-video, aspect-[4/3]

9. **Section Layouts:**
   - Hero: Full screen, centered content
   - Features: 3-4 column grid on desktop, 1 column mobile
   - Gallery: Masonry or grid layout
   - CTA: Centered, bold, action-oriented

10. **Performance:**
    - Lazy loading: loading="lazy" on all images
    - Minimal animations (use Tailwind transitions)
    - Efficient CSS (no heavy libraries beyond Tailwind)

🚨 FOCUS ON UI COMPONENTS, NOT IMAGE GALLERIES!
- Build with cards, buttons, forms, navigation
- Images support content, they don't replace it
- Every section should have purpose and function
`;
}

// Get RGB values for dynamic gradients
function getRGB(tailwindColor: string): string {
  const colorMap: { [key: string]: string } = {
    'blue-500': '59, 130, 246',
    'cyan-500': '6, 182, 212',
    'purple-500': '168, 85, 247',
    'pink-500': '236, 72, 153',
    'rose-500': '244, 63, 94',
    'orange-500': '249, 115, 22',
    'amber-500': '245, 158, 11',
    'green-500': '34, 197, 94',
    'emerald-500': '16, 185, 129',
    'teal-500': '20, 184, 166',
    'red-500': '239, 68, 68',
    'indigo-500': '99, 102, 241'
  };
  return colorMap[tailwindColor] || '59, 130, 246';
}

// Extract HTML from response - FIXED VERSION
function extractHTMLFromResponse(response: string): string {
  console.log('🔍 Extracting HTML from AI response...');
  
  // Try 1: Look for ```html code blocks
  const htmlBlockRegex = /```html\s*([\s\S]*?)```/gi;
  const htmlMatches = [...response.matchAll(htmlBlockRegex)];
  
  if (htmlMatches.length > 0 && htmlMatches[0][1].length > 500) {
    console.log(`✅ Found HTML in \`\`\`html block (${htmlMatches[0][1].length} chars)`);
    return htmlMatches[0][1].trim();
  }

  // Try 2: Look for generic ``` code blocks
  const genericBlockRegex = /```\s*([\s\S]*?)```/gi;
  const genericMatches = [...response.matchAll(genericBlockRegex)];
  
  if (genericMatches.length > 0) {
    const content = genericMatches[0][1].trim();
    if ((content.includes('<!DOCTYPE') || content.includes('<html>')) && content.length > 500) {
      console.log(`✅ Found HTML in \`\`\` block (${content.length} chars)`);
      return content;
    }
  }

  // Try 3: Look for <!DOCTYPE or <html> tags directly in response
  const doctypeMatch = response.match(/<!DOCTYPE[\s\S]*$/i);
  if (doctypeMatch && doctypeMatch[0].length > 500) {
    console.log(`✅ Found <!DOCTYPE in response (${doctypeMatch[0].length} chars)`);
    return doctypeMatch[0].trim();
  }
  
  const htmlMatch = response.match(/<html[\s\S]*$/i);
  if (htmlMatch && htmlMatch[0].length > 500) {
    console.log(`✅ Found <html> tag in response (${htmlMatch[0].length} chars)`);
    return htmlMatch[0].trim();
  }

  // Try 4: Check if entire response is HTML
  if (response.trim().startsWith('<!DOCTYPE') || response.trim().startsWith('<html>')) {
    console.log(`✅ Entire response is HTML (${response.length} chars)`);
    return response.trim();
  }

  // Fallback: Return full response with warning
  console.warn(`⚠️ HTML extraction may have failed. Returning full response (${response.length} chars)`);
  return response.trim();
}

// Post-process to FIX ALL images aggressively
function postProcessHTML(html: string, userPrompt: string): string {
  let processed = html;
  
  const keywords = extractKeywords(userPrompt);
  const mainKeyword = keywords[0] || 'business';
  const secondKeyword = keywords[1] || 'modern';
  
  console.log(`🖼️ Fixing broken images with RELEVANT LoremFlickr URLs: ${mainKeyword}, ${secondKeyword}`);
  
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
  
  // 7. Add loading="lazy" to ALL images
  processed = processed.replace(
    /<img(?![^>]*loading=)/gi,
    '<img loading="lazy"'
  );
  
  // 8. Add alt tags to ALL images
  processed = processed.replace(
    /<img(?![^>]*alt=)/gi,
    '<img alt="Image"'
  );
  
  // 9. Count images
  const imageCount = (processed.match(/<img/g) || []).length;
  console.log(`✅ Total images in output: ${imageCount}`);
  
  // 10. If less than 8 images, warn (but can't add more in post-processing)
  if (imageCount < 8) {
    console.warn('⚠️ Warning: Less than 8 images generated. This should not happen!');
  }
  
  // 11. 🚨 CRITICAL: Remove background images from <body> tag and replace with CSS texture
  console.log('🔒 Ensuring <body> uses CSS texture only (no background images)...');
  
  // List of 20 CSS texture patterns (pick one randomly)
  const texturePatterns = [
    `background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Cfilter id="n"%3E%3CfeTurbulence baseFrequency="0.9" numOctaves="4"/%3E%3C/filter%3E%3Crect width="300" height="300" filter="url(%23n)" opacity="0.08"/%3E%3C/svg%3E')`,
    `background-image: radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px); background-size: 20px 20px`,
    `background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 40px 40px`,
    `background-image: repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.02) 30px, rgba(255,255,255,0.02) 60px)`,
    `background-image: repeating-linear-gradient(45deg, transparent 0, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 11px), repeating-linear-gradient(-45deg, transparent 0, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 11px)`,
    `background-image: url('data:image/svg+xml,%3Csvg width="50" height="50" xmlns="http://www.w3.org/2000/svg"%3E%3Cpolygon points="25,5 45,15 45,35 25,45 5,35 5,15" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/%3E%3C/svg%3E'); background-size: 50px 50px`,
    `background-image: radial-gradient(circle, rgba(255,255,255,0.05) 10px, transparent 10px); background-size: 50px 50px`,
    `background-image: url('data:image/svg+xml,%3Csvg width="100" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 10 Q 25 0, 50 10 T 100 10" stroke="rgba(255,255,255,0.04)" fill="none"/%3E%3C/svg%3E'); background-size: 100px 20px`,
    `background-image: linear-gradient(30deg, rgba(255,255,255,0.02) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.02) 87.5%, rgba(255,255,255,0.02)), linear-gradient(150deg, rgba(255,255,255,0.02) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.02) 87.5%, rgba(255,255,255,0.02)); background-size: 80px 140px`,
    `background-image: linear-gradient(45deg, rgba(255,255,255,0.02) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,0.02) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.02) 75%), linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.02) 75%); background-size: 40px 40px`,
    `background-image: linear-gradient(135deg, rgba(255,255,255,0.03) 25%, transparent 25%), linear-gradient(225deg, rgba(255,255,255,0.03) 25%, transparent 25%); background-size: 40px 40px`,
    `background-image: linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.03) 49%, rgba(255,255,255,0.03) 51%, transparent 52%); background-size: 50px 50px`,
    `background-image: repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 50px), repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 50px)`,
    `background-image: radial-gradient(circle, transparent 20%, rgba(0,0,0,0.02) 20%, rgba(0,0,0,0.02) 80%, transparent 80%, transparent); background-size: 30px 30px`,
    `background-image: repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 2px), repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 2px)`,
    `background-image: linear-gradient(45deg, rgba(255,255,255,0.02) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.02) 75%), linear-gradient(-45deg, rgba(255,255,255,0.02) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.02) 75%); background-size: 60px 60px`,
    `background-image: linear-gradient(rgba(255,255,255,0.02) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.02) 2px, transparent 2px), linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px); background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px`,
    `background-image: linear-gradient(30deg, transparent 40%, rgba(255,255,255,0.02) 40%, rgba(255,255,255,0.02) 60%, transparent 60%), linear-gradient(90deg, transparent 40%, rgba(255,255,255,0.02) 40%, rgba(255,255,255,0.02) 60%, transparent 60%); background-size: 70px 120px`,
    `background-image: radial-gradient(circle at 20% 50%, transparent 0%, rgba(255,255,255,0.03) 100%), radial-gradient(circle at 80% 50%, transparent 0%, rgba(255,255,255,0.03) 100%)`,
    `background-image: repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.015) 5px, rgba(255,255,255,0.015) 6px), repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(255,255,255,0.015) 5px, rgba(255,255,255,0.015) 6px)`
  ];
  
  // Pick a random texture
  const randomTexture = texturePatterns[Math.floor(Math.random() * texturePatterns.length)];
  
  // Remove any background-image URLs from <body> tag (loremflickr, unsplash, etc.)
  processed = processed.replace(
    /<body([^>]*)\sstyle=["']([^"']*background[^"']*url\([^)]+\)[^"']*)["']/gi,
    (match, attributes, style) => {
      // Remove background-image with URLs, keep other styles, add CSS texture
      const cleanedStyle = style.replace(/background[^;]*url\([^)]+\)[^;]*;?/gi, '');
      return `<body${attributes} style="${cleanedStyle} background-color: #000000; ${randomTexture}"`;
    }
  );
  
  // Also check for body tags without proper background texture
  if (!processed.match(/<body[^>]*style=["'][^"']*background-image[^"']*(?:gradient|url\(data:)/i)) {
    // Add texture if body doesn't have one
    processed = processed.replace(
      /<body([^>]*)>/i,
      `<body$1 style="background-color: #000000; ${randomTexture}">`
    );
  }
  
  console.log('✅ Body background texture enforced!');
  
  return processed;
}

// Extract keywords from prompt
function extractKeywords(prompt: string): string[] {
  const lowerPrompt = prompt.toLowerCase();
  const keywords: string[] = [];
  
  // MORE SPECIFIC KEYWORD MATCHING - Use regex patterns
  const keywordMap: { [key: string]: string[] } = {
    'restaurant|cafe|food|dining|menu|chef|bakery|pizza': ['restaurant', 'food', 'chef', 'dining'],
    'ecommerce|shop|store|retail|buy|product': ['shopping', 'product', 'store', 'retail'],
    'portfolio|personal|freelance|designer|artist': ['creative', 'design', 'art', 'workspace'],
    'saas|software|app|startup|ai': ['technology', 'innovation', 'digital', 'modern'],
    'fitness|gym|health|wellness|yoga|workout': ['fitness', 'gym', 'workout', 'health'],
    'travel|tourism|vacation|hotel|trip': ['travel', 'vacation', 'beach', 'adventure'],
    'photography|photo|camera|studio': ['photography', 'camera', 'portrait', 'photo'],
    'music|band|concert|artist|dj|audio': ['music', 'concert', 'performance', 'audio'],
    'education|learning|course|school|academy': ['education', 'student', 'learning', 'books'],
    'healthcare|medical|hospital|clinic|doctor': ['medical', 'health', 'hospital', 'care'],
    'finance|banking|investment|money|crypto': ['finance', 'money', 'business', 'chart'],
    'fashion|clothing|boutique|style|apparel': ['fashion', 'style', 'clothing', 'model'],
    'property|housing|apartment|home|estate': ['architecture', 'house', 'building', 'home'],
    'beauty|spa|salon|makeup|skincare': ['beauty', 'spa', 'wellness', 'relaxation'],
    'car|automotive|vehicle|garage': ['car', 'vehicle', 'automotive', 'drive'],
    'pet|animal|veterinary|dog|cat': ['pet', 'animal', 'dog', 'cute'],
    'event|wedding|party|celebration': ['event', 'party', 'celebration', 'people'],
    'law|legal|lawyer|attorney': ['law', 'business', 'professional', 'office'],
    'gaming|game|esports|streamer': ['gaming', 'game', 'digital', 'technology'],
    'blog|news|magazine|article|content': ['writing', 'blog', 'content', 'media'],
    'dashboard|analytics|data': ['analytics', 'data', 'chart', 'business'],
    'tech|technology': ['technology', 'innovation', 'modern', 'digital'],
    'landing|business': ['business', 'modern', 'professional', 'office']
  };
  
  // Find matching pattern using regex
  for (const [pattern, values] of Object.entries(keywordMap)) {
    const regex = new RegExp(pattern);
    if (regex.test(lowerPrompt)) {
      keywords.push(...values);
      console.log(`🎯 Matched keywords for "${pattern}": ${values.join(', ')}`);
      break;
    }
  }
  
  // Fallback if no match
  if (keywords.length === 0) {
    keywords.push('business', 'modern', 'professional', 'office');
    console.log('⚠️ No keyword match, using default: business, modern');
  }
  
  return keywords;
}

// Enhance user prompt
export function enhancePrompt(userPrompt: string): string {
  const enhancements: string[] = [];

  if (userPrompt.toLowerCase().includes('landing') || userPrompt.toLowerCase().includes('homepage')) {
    enhancements.push('Include: Hero section, features with images, social proof, pricing, CTA, footer');
  }

  if (userPrompt.toLowerCase().includes('dashboard')) {
    enhancements.push('Include: Sidebar navigation, stats cards, charts, data tables');
  }

  if (userPrompt.toLowerCase().includes('ecommerce') || userPrompt.toLowerCase().includes('shop')) {
    enhancements.push('Include: Product grid with high-quality images, filters, featured products');
  }

  if (userPrompt.toLowerCase().includes('portfolio')) {
    enhancements.push('Include: Hero with photo, project gallery with images, skills, contact');
  }

  // Get keywords for images
  const keywords = extractKeywords(userPrompt);
  const imageKeyword = keywords[0] || 'business';
  
  // CRITICAL requirements with RELEVANT images
  enhancements.push(`🚨 IMAGES: Use 15-20 Unsplash images - VARY keywords for EACH to avoid duplicates!`);
  enhancements.push(`🚨 Hero: https://source.unsplash.com/1920x1080/?${imageKeyword},professional,dark`);
  enhancements.push(`🚨 Feature 1: https://source.unsplash.com/400x300/?${imageKeyword},service,modern`);
  enhancements.push(`🚨 Feature 2: https://source.unsplash.com/400x300/?${imageKeyword},innovation,tech (DIFFERENT!)`);
  enhancements.push(`🚨 Feature 3: https://source.unsplash.com/400x300/?${imageKeyword},premium,quality (DIFFERENT!)`);
  enhancements.push(`🚨 Gallery: VARY keywords - ?${imageKeyword},workspace, ?${imageKeyword},team, ?${imageKeyword},product`);
  enhancements.push('🚨 Team: https://source.unsplash.com/300x300/?person,professional,portrait (vary each!)');
  enhancements.push('🚨 SECTIONS: Include ALL 8 sections (Hero, Features, Stats, About, Gallery, Testimonials, Pricing, Contact)');
  enhancements.push(`🎨 DARK MODE: bg-black or bg-zinc-950 + grain texture overlay + ONE CSS pattern from 20 options`);
  enhancements.push(`🎨 FONT: Use Inter, Geist, or other MODERN fonts - NOT Space Grotesk, Poppins, Montserrat!`);
  enhancements.push(`🎨 GLASSMORPHISM: bg-white/5 backdrop-blur-xl border border-white/10 for cards`);
  enhancements.push(`🎨 SUBTLE GRADIENTS: Use for accents, glows, hover effects (NOT everywhere!)`);
  enhancements.push(`🚨 NO EMOJIS as visuals! Use real photos and sleek CSS elements`);
  enhancements.push(`🎨 SLEEK STYLE: Like Apple, Linear, Vercel, Stripe - premium and modern!`);
  enhancements.push('🎨 STATS: Include impressive numbers with animated counters');
  enhancements.push('🎨 ANIMATIONS: Smooth transitions, subtle hover lifts, fade-ins');
  enhancements.push('🚨 MAKE IT PREMIUM: NOT typical templates - unique, sleek, expensive-looking!');
  enhancements.push('🔗 LINKS: All href="#" with onclick="return false"');
  enhancements.push('🌟 SLEEK & MODERN: Dark, premium, unique - NOT commonly seen designs!');

  if (enhancements.length > 0) {
    return `${userPrompt}\n\n✨ REQUIREMENTS:\n${enhancements.map((e, i) => `${i + 1}. ${e}`).join('\n')}`;
  }

  return userPrompt;
}
