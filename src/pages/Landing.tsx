import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { 
  ArrowRight, Palette, Code2, Zap, Shield, Users, 
  Plus, Mic, Upload, Sparkles, Star, Rocket, Globe,
  Layers, Layout, Smartphone, Monitor,
  TrendingUp, Award, CheckCircle, Heart,
  Wand2, Send, Paperclip, Building2, Briefcase, 
  Target, Headphones, BarChart3, Activity, User as UserIcon,
  Menu, X
} from 'lucide-react'
import { auth, db, doc, getDoc } from '../firebase'
import AuthModal from '../components/AuthModal'
import OnboardingFlow from '../components/OnboardingFlow'

const chatPlaceholders = [
  "Design a modern SaaS landing page...",
  "Create an e-commerce dashboard...",
  "Build a mobile app interface...",
  "Generate a portfolio website...",
  "Design a pricing page with animations...",
  "Create a hero section with gradient...",
  "Build a contact form with validation...",
  "Generate a feature showcase section..."
]

export default function Landing() {
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [chatInput, setChatInput] = useState('')
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, 200])
  const y2 = useTransform(scrollY, [0, 1000], [0, -100])

  // Auth state listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        // Check if user has completed onboarding
        const docRef = doc(db, 'users', currentUser.uid)
        const docSnap = await getDoc(docRef)
        if (!docSnap.exists() || !docSnap.data().onboarded) {
          setShowOnboarding(true)
        }
      } else {
        setUser(null)
      }
    })
    return () => unsubscribe()
  }, [])

  // Typewriter effect
  useEffect(() => {
    const targetText = chatPlaceholders[placeholderIndex]
    let currentIndex = 0
    setDisplayedText('')
    setIsTyping(true)

    const typingInterval = setInterval(() => {
      if (currentIndex < targetText.length) {
        setDisplayedText(targetText.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        setIsTyping(false)
        clearInterval(typingInterval)
        
        // Wait 1.5 seconds before moving to next placeholder
        setTimeout(() => {
          setPlaceholderIndex((prev) => (prev + 1) % chatPlaceholders.length)
        }, 1500)
      }
    }, 50) // Type speed: 50ms per character

    return () => clearInterval(typingInterval)
  }, [placeholderIndex])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Grain Texture Overlay - Enhanced */}
      <div 
        className="fixed inset-0 pointer-events-none z-10 opacity-[0.15]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Additional Grain Layer */}
      <div 
        className="fixed inset-0 pointer-events-none z-10 opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grainyFilter'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grainyFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Grainy Black Background with Parallax */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 bg-black"
        />
        
        {/* Subtle Emerald Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.08) 0%, rgba(20, 184, 166, 0.04) 30%, transparent 60%), radial-gradient(circle at 50% 100%, rgba(20, 184, 166, 0.06) 0%, rgba(16, 185, 129, 0.02) 40%, transparent 70%)',
          }}
        />
        
        {/* Very subtle orb - top (with parallax) - Responsive sizing */}
        <motion.div 
          className="absolute top-0 left-1/2 w-[300px] sm:w-[500px] lg:w-[800px] h-[200px] sm:h-[300px] lg:h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.03) 0%, transparent 70%)',
            filter: 'blur(60px)',
            x: '-50%',
            y: y1
          }}
        />
        
        {/* Very subtle orb - bottom (with parallax) - Responsive sizing */}
        <motion.div 
          className="absolute bottom-0 left-1/2 w-[300px] sm:w-[500px] lg:w-[800px] h-[200px] sm:h-[300px] lg:h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(20, 184, 166, 0.02) 0%, transparent 70%)',
            filter: 'blur(60px)',
            x: '-50%',
            y: y2
          }}
        />
      </div>

      {/* Premium Header - Classy Design */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="py-4 sm:py-5 flex items-center relative">
            {/* Mobile: Hamburger Menu Button (Far Left) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors z-20"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden lg:flex items-center justify-center gap-8 flex-1">
              <Link to="/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors font-medium whitespace-nowrap" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>Dashboard</Link>
              <Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors font-medium whitespace-nowrap" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>Contact</Link>

              {/* Draftly Logo - Desktop */}
              <Link to="/" className="group mx-4">
                <span className="text-2xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors whitespace-nowrap" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                  Draftly
                </span>
              </Link>

              <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors font-medium whitespace-nowrap" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>Features</a>
              <Link to="/pricing" className="text-sm text-gray-400 hover:text-white transition-colors font-medium whitespace-nowrap" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>Pricing</Link>
            </div>

            {/* Mobile: Draftly Logo - Centered */}
            <Link to="/" className="lg:hidden absolute left-1/2 -translate-x-1/2 group z-10">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors whitespace-nowrap" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                Draftly
              </span>
          </Link>

            {/* Profile Icon (only when logged in) - Far Right (Both mobile & desktop) */}
            {user && (
              <button
                onClick={() => navigate('/profile')}
                className="group ml-auto lg:absolute lg:right-0 z-20"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur opacity-30 group-hover:opacity-60 transition-opacity" />
                <div className="relative w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center border border-white/10">
                  <UserIcon className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
              </button>
            )}
          </nav>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl overflow-hidden z-40"
              >
                <div className="px-4 py-6 space-y-2">
                  <Link 
                    to="/dashboard" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-base text-gray-300 hover:text-white hover:bg-emerald-500/10 rounded-lg transition-all font-medium"
                    style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
                  >
                    Dashboard
                  </Link>
                  <a 
                    href="#features" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-base text-gray-300 hover:text-white hover:bg-emerald-500/10 rounded-lg transition-all font-medium"
                    style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
                  >
              Features
            </a>
                  <Link 
                    to="/pricing" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-base text-gray-300 hover:text-white hover:bg-emerald-500/10 rounded-lg transition-all font-medium"
                    style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
                  >
                    Pricing
                  </Link>
                  <Link 
                    to="/contact" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-base text-gray-300 hover:text-white hover:bg-emerald-500/10 rounded-lg transition-all font-medium"
                    style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
                  >
                    Contact
            </Link>
          </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
      </motion.header>

      {/* Hero Section - Premium Design */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-32 pb-20 z-20">
        <div className="max-w-6xl mx-auto w-full relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }} 
            className="flex flex-col items-center space-y-10"
          >
            {/* Premium Badge - Perfectly Centered */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.2 }} 
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10"
            >
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-400 font-medium tracking-wider" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                LOVABLE FOR UI DESIGNS
              </span>
            </motion.div>

            {/* Main Heading - Perfectly Centered */}
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white text-center w-full font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, letterSpacing: '0.03em', lineHeight: 1.1 }}
            >
              <span className="block mb-1">Create World Class</span>
              <span className="block">
                Ui With Draftly
              </span>
            </motion.h1>

            {/* Value Proposition - Clear & Concise */}
            <motion.div 
              className="max-w-4xl text-center px-4 w-full space-y-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <p className="text-base sm:text-lg text-emerald-400 font-medium" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                For frontend teams shipping <span className="font-bold">10x better</span>
              </p>
              <p className="text-sm sm:text-base text-gray-400" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                <span className="line-through text-white">$50,000 design budget</span> → <span className="text-emerald-400 font-bold">$50 with Draftly</span>
              </p>
            </motion.div>

            {/* Join Waitlist Button - Centered Below Tagline */}
            {!user && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex items-center justify-center"
              >
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="group relative px-6 py-2.5 bg-white/5 backdrop-blur-sm border border-emerald-500/30 rounded-full hover:border-emerald-500/60 transition-all overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative text-sm text-emerald-400 font-semibold flex items-center gap-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Join Waitlist
                    <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                  </span>
                </button>
              </motion.div>
            )}

            {/* Main Chat Input Area with B2B Elements - Centered */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.7, duration: 0.7, type: "spring", stiffness: 100 }}
              className="w-full max-w-4xl relative px-4 sm:px-6"
            >
              {/* B2B Value Props - Top Left - Hidden on mobile, visible on large screens */}
              <motion.div 
                className="hidden lg:block absolute -top-32 lg:-left-32 xl:-left-48"
                initial={{ opacity: 0, x: -20, rotate: -12 }}
                animate={{ opacity: 1, x: 0, rotate: 6 }}
                whileHover={{ rotate: 12, scale: 1.05 }}
                transition={{ delay: 0.8 }}
              >
                <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl border border-emerald-500/20 px-4 py-3 backdrop-blur-sm shadow-lg cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-semibold text-emerald-400" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>ROI BOOST</span>
                  </div>
                  <p className="text-xs text-gray-400" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>3x faster development</p>
                </div>
              </motion.div>

              {/* B2B Value Props - Top Right - Hidden on mobile, visible on large screens */}
              <motion.div 
                className="hidden lg:block absolute -top-32 lg:-right-32 xl:-right-48"
                initial={{ opacity: 0, x: 20, rotate: 12 }}
                animate={{ opacity: 1, x: 0, rotate: -6 }}
                whileHover={{ rotate: -12, scale: 1.05 }}
                transition={{ delay: 0.9 }}
              >
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20 px-4 py-3 backdrop-blur-sm shadow-lg cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-semibold text-purple-400" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>ENTERPRISE</span>
                  </div>
                  <p className="text-xs text-gray-400" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>Trusted by 500+ teams</p>
                </div>
              </motion.div>

              {/* Floating Icon Cards Around Chat - Only on extra large screens */}
              <motion.div 
                className="absolute -left-32 xl:-left-48 top-4 hidden xl:block"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0 }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/20 flex items-center justify-center backdrop-blur-sm rotate-6 hover:rotate-12 transition-transform cursor-pointer">
                  <Code2 className="w-10 h-10 text-blue-400/60" />
                </div>
              </motion.div>

              <motion.div 
                className="absolute -right-40 lg:-right-64 xl:-right-96 top-4 hidden xl:block"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl border border-orange-500/20 flex items-center justify-center backdrop-blur-sm -rotate-6 hover:-rotate-12 transition-transform cursor-pointer">
                  <Rocket className="w-10 h-10 text-orange-400/60" />
                </div>
              </motion.div>

              {/* Additional Decorative Elements */}
              <motion.div 
                className="absolute -left-32 lg:-left-56 xl:-left-80 top-20 hidden lg:block"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20 flex items-center justify-center backdrop-blur-sm rotate-12">
                  <Wand2 className="w-6 h-6 text-green-400/60" />
                </div>
              </motion.div>

              <motion.div 
                className="absolute -right-32 lg:-right-56 xl:-right-80 top-20 hidden lg:block"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-xl border border-pink-500/20 flex items-center justify-center backdrop-blur-sm -rotate-12">
                  <Sparkles className="w-6 h-6 text-pink-400/60" />
                </div>
              </motion.div>

              {/* Bottom Cards - B2B Focused */}
              <motion.div 
                className="absolute -bottom-24 left-8 sm:left-32 lg:left-48 xl:left-72 hidden sm:block"
                initial={{ opacity: 0, y: 10, rotate: -8 }}
                animate={{ opacity: 1, y: 0, rotate: 3 }}
                whileHover={{ rotate: 8, scale: 1.05 }}
                transition={{ delay: 1.4 }}
              >
                <div className="bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-xl border border-emerald-500/20 px-3 py-2 backdrop-blur-sm flex items-center gap-2 shadow-lg cursor-pointer">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-gray-400" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>SOC 2 Compliant</span>
                </div>
              </motion.div>

              <motion.div 
                className="absolute -bottom-24 right-8 sm:right-32 lg:right-48 xl:right-72 hidden sm:block"
                initial={{ opacity: 0, y: 10, rotate: 8 }}
                animate={{ opacity: 1, y: 0, rotate: -3 }}
                whileHover={{ rotate: -8, scale: 1.05 }}
                transition={{ delay: 1.5 }}
              >
                <div className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-xl border border-purple-500/20 px-3 py-2 backdrop-blur-sm flex items-center gap-2 shadow-lg cursor-pointer">
                  <Zap className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-gray-400" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>99.9% Uptime</span>
                </div>
              </motion.div>

              {/* Chat input - Centered */}
              <div className="relative bg-[#18181b] rounded-2xl border border-white/10 p-1 shadow-2xl hover:border-emerald-500/30 transition-all">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000" />
                <div className="relative">
                  <textarea
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={displayedText + (isTyping ? '|' : '')}
                    className="w-full bg-transparent text-white placeholder-gray-500 px-5 py-4 resize-none focus:outline-none text-base"
                    rows={2}
                    style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
                  />
                  <div className="flex items-center justify-between px-3 py-2 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                      <Link to="/contact" className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 rounded-md transition-colors flex items-center gap-1.5 text-gray-500">
                        <Upload className="w-3 h-3" />
                        <span style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>Attach</span>
                      </Link>
                      <div className="px-3 py-1.5 text-xs bg-emerald-500/10 rounded-md text-emerald-400">
                        <span style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>Public</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <Mic className="w-4 h-4 text-gray-600" />
                      </button>
                      <Link to="/contact" className="p-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg shadow-emerald-500/20">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions with More Options - Centered */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 flex flex-wrap items-center justify-center gap-2"
              >
                {[
                  { icon: Palette, text: "Landing Page", color: "from-purple-500 to-pink-500" },
                  { icon: Layout, text: "Dashboard", color: "from-blue-500 to-cyan-500" },
                  { icon: Smartphone, text: "Mobile App", color: "from-green-500 to-emerald-500" },
                  { icon: Code2, text: "Component", color: "from-orange-500 to-red-500" }
                ].map((prompt, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <Link 
                      to="/contact"
                      className="group px-4 py-2 text-xs bg-white/5 hover:bg-white/10 border border-white/5 hover:border-emerald-500/30 rounded-lg text-gray-400 hover:text-white transition-all flex items-center gap-2 relative overflow-hidden"
                      style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${prompt.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                      <prompt.icon className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">{prompt.text}</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* B2B Trust Indicators Below Chat - Centered */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 w-full"
              >
                {[
                  { icon: CheckCircle, label: 'Instant Deploy', color: 'emerald', gradient: 'from-emerald-500 to-teal-500' },
                  { icon: Shield, label: 'Enterprise Security', color: 'blue', gradient: 'from-blue-500 to-cyan-500' },
                  { icon: Star, label: 'Custom Branding', color: 'purple', gradient: 'from-purple-500 to-pink-500' },
                  { icon: Globe, label: 'Global CDN', color: 'orange', gradient: 'from-orange-500 to-red-500' }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.7 + idx * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative bg-white/5 border border-white/10 rounded-xl px-3 py-4 flex flex-col items-center text-center hover:border-emerald-500/30 transition-all group overflow-hidden cursor-pointer"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                    <item.icon className={`w-6 h-6 text-${item.color}-400 mb-2 group-hover:scale-110 transition-transform relative z-10`} />
                    <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors relative z-10" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>{item.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Social Proof Section - B2B */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="mt-16 flex flex-col items-center relative z-30"
            >
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
                <p className="text-xs text-white font-semibold tracking-wider" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                  POWERING INNOVATION AT
                </p>
                <div className="w-8 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
                {[
                  { name: 'SaaS Companies', icon: Globe, color: 'from-blue-400 to-cyan-400' },
                  { name: 'Digital Agencies', icon: Users, color: 'from-purple-400 to-pink-400' },
                  { name: 'Enterprise Teams', icon: Shield, color: 'from-emerald-400 to-teal-400' },
                  { name: 'Startups', icon: Rocket, color: 'from-orange-400 to-red-400' }
                ].map((company, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.9 + idx * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-3 text-white hover:text-emerald-400 transition-colors cursor-pointer group px-4 py-2 relative z-30"
                  >
                    <div className="w-14 h-14 rounded-xl bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10 group-hover:border-white/20 group-hover:bg-white/10 transition-all relative overflow-hidden">
                      {React.createElement([Globe, Users, Building2, Rocket][idx], {
                        className: "w-7 h-7 text-gray-400 group-hover:text-white relative z-10 transition-colors",
                        strokeWidth: 1.5
                      })}
                    </div>
                    <span className="text-sm font-medium whitespace-nowrap" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>{company.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </motion.div>
          
          {/* Trust Bar - User Types with Icons */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: false, amount: 0.3 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-20 border-t border-white/10 dark:border-white/10 light:border-gray-200 pt-12 relative z-30"
          >
            <div className="flex items-center justify-center gap-3 mb-10 relative z-30">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              <p className="text-center text-sm font-semibold text-white relative z-30" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif', letterSpacing: '0.1em' }}>
                TRUSTED BY
              </p>
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
            </div>
             <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
               {[
                 { name: 'Shopkeepers', color: 'from-emerald-400 to-teal-400', icon: Monitor },
                 { name: 'Designers', color: 'from-purple-400 to-pink-400', icon: Palette },
                 { name: 'Visual Artists', color: 'from-orange-400 to-red-400', icon: Layers },
                 { name: 'Developers', color: 'from-green-400 to-emerald-400', icon: Code2 },
                 { name: 'Entrepreneurs', color: 'from-yellow-400 to-orange-400', icon: TrendingUp },
                 { name: 'Agencies', color: 'from-indigo-400 to-purple-400', icon: Users }
               ].map((user, idx) => (
          <motion.div
                  key={idx} 
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="flex flex-col items-center gap-3 relative z-30 group"
                >
                  <div className="w-20 h-20 rounded-2xl bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10 group-hover:border-white/20 group-hover:bg-white/10 transition-all relative overflow-hidden">
                    {React.createElement([Monitor, Palette, Layers, Code2, Rocket, Building2][idx], {
                      className: "w-9 h-9 text-gray-400 group-hover:text-white relative z-10 transition-colors",
                      strokeWidth: 1.5
                    })}
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-gray-400 group-hover:text-white transition-colors" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif', letterSpacing: '-0.01em' }}>
                    {user.name}
                  </span>
                </motion.div>
               ))}
             </div>
           </motion.div>

         {/* Stats Section - Enhanced with Icons */}
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 relative z-30"
         >
            {[
              { value: '10,000+', label: 'Pages Analyzed', color: 'from-emerald-400 to-teal-600', icon: Layout },
              { value: '99.9%', label: 'Uptime', color: 'from-purple-400 to-purple-600', icon: CheckCircle },
              { value: '5min', label: 'Generation Time', color: 'from-green-400 to-green-600', icon: Zap },
              { value: '24/7', label: 'Support', color: 'from-orange-400 to-orange-600', icon: Heart }
              ].map((stat, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center bg-white/[0.02] dark:bg-white/[0.02] light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-200 rounded-2xl p-6 hover:border-emerald-500/30 transition-all group relative z-30"
            >
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center border-2 border-white/20 group-hover:border-emerald-500/50 transition-all relative overflow-hidden">
                  {React.createElement([BarChart3, CheckCircle, Zap, Headphones][idx], {
                    className: "w-10 h-10 text-gray-400 group-hover:text-emerald-400 relative z-10 transition-colors",
                    strokeWidth: 1.5
                  })}
                </div>
              </div>
              <div className={`text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`} style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-400 dark:text-gray-400 light:text-gray-600 font-medium" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                {stat.label}
               </div>
            </motion.div>
              ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section - Enhanced with More Visual Interest */}
      <section id="features" className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            className="text-center mb-20"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
              <span className="text-sm font-semibold text-emerald-400 dark:text-emerald-400 light:text-emerald-600 tracking-wider" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                POWERFUL FEATURES
              </span>
              <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white dark:text-white light:text-gray-900 mb-6" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif', letterSpacing: '-0.02em' }}>
              Enterprise-Grade Features
            </h2>
            <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
              Professional tools for professional results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: Palette, 
                title: 'Design Systems', 
                description: 'Consistent, scalable design tokens and components',
                color: 'from-purple-500 to-pink-500',
                bgColor: 'purple-500/10'
              },
              { 
                icon: Code2, 
                title: 'Clean Exports', 
                description: 'Production-ready code in React, Vue, or HTML',
                color: 'from-emerald-500 to-teal-500',
                bgColor: 'emerald-500/10'
              },
              { 
                icon: Zap, 
                title: 'Instant Generation', 
                description: 'From concept to prototype in seconds',
                color: 'from-yellow-500 to-orange-500',
                bgColor: 'yellow-500/10'
              },
              { 
                icon: Shield, 
                title: 'Enterprise Security', 
                description: 'Bank-level encryption and compliance',
                color: 'from-blue-500 to-cyan-500',
                bgColor: 'blue-500/10'
              },
              { 
                icon: Users, 
                title: 'Team Workspaces', 
                description: 'Collaborate seamlessly with your team',
                color: 'from-pink-500 to-red-500',
                bgColor: 'pink-500/10'
              },
              { 
                icon: Rocket, 
                title: 'Continuous Updates', 
                description: 'Always improving with latest AI models',
                color: 'from-indigo-500 to-purple-500',
                bgColor: 'indigo-500/10'
              },
            ].map((feature, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 10 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: idx * 0.05 }} 
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative bg-white/[0.02] dark:bg-white/[0.02] light:bg-gray-50 backdrop-blur-sm rounded-2xl p-8 border border-white/5 dark:border-white/5 light:border-gray-200 hover:border-emerald-500/20 transition-all group overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 bg-${feature.bgColor} dark:bg-${feature.bgColor} light:bg-gray-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-7 h-7 text-emerald-400 dark:text-emerald-400 light:text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-white dark:text-white light:text-gray-900 mb-3" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>{feature.title}</h3>
                  <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>{feature.description}</p>
                </div>
                
                {/* Corner decoration */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Award className="w-5 h-5 text-emerald-400/30" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced with Icons */}
      <section id="showcase" className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            className="relative bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-emerald-500/10 dark:from-emerald-500/10 dark:via-teal-500/10 dark:to-emerald-500/10 light:from-emerald-50 light:via-teal-50 light:to-emerald-50 border border-emerald-500/20 rounded-3xl p-12 sm:p-16 overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-6 left-6">
              <Rocket className="w-8 h-8 text-emerald-400/30 animate-pulse" />
                </div>
            <div className="absolute bottom-6 right-6">
              <Globe className="w-8 h-8 text-teal-400/30 animate-pulse" />
          </div>
            <div className="absolute top-1/2 right-12 transform -translate-y-1/2">
              <Sparkles className="w-6 h-6 text-emerald-400/20" />
        </div>
            
            <div className="relative z-10 text-center space-y-8">
              <div className="flex items-center justify-center gap-2">
                <Star className="w-5 h-5 text-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-emerald-400 dark:text-emerald-400 light:text-emerald-600 tracking-wider" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                  GET STARTED TODAY
                </span>
                <Star className="w-5 h-5 text-emerald-400 animate-pulse" />
              </div>
              
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white dark:text-white light:text-gray-900" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif', letterSpacing: '-0.02em' }}>
                Start building today
                </h2>
              <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                Join teams at top companies using Draftly
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link to="/contact" className="group px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/dashboard" className="px-10 py-4 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 text-white dark:text-white light:text-gray-900 font-semibold rounded-xl hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-gray-50 hover:border-white/20 transition-all" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                  View Examples
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium Footer with Icons */}
      <footer className="relative py-16 px-6 border-t border-white/5 dark:border-white/5 light:border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <Link to="/" className="group flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Layout className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-semibold text-white dark:text-white light:text-gray-900 hover:text-emerald-400 transition-colors" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                Draftly
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <p className="text-gray-500 dark:text-gray-500 light:text-gray-600 text-sm" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                Professional UI generation platform
              </p>
            </div>

            <div className="flex items-center gap-8">
              <Link to="/pricing" className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition-colors text-sm font-medium" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                Pricing
              </Link>
              <Link to="/contact" className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition-colors text-sm font-medium" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                Contact
              </Link>
              <Link to="/dashboard" className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 transition-colors text-sm font-medium" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                Dashboard
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 dark:border-white/5 light:border-gray-200 text-center">
            <p className="text-gray-600 dark:text-gray-600 light:text-gray-500 text-xs flex items-center justify-center gap-2" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
              © {new Date().getFullYear()} Draftly. All rights reserved.
              <Heart className="w-3 h-3 text-emerald-400 animate-pulse" />
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onSuccess={(authUser) => {
          setUser(authUser)
          setShowOnboarding(true)
        }}
      />

      {/* Onboarding Flow */}
      {showOnboarding && user && (
        <OnboardingFlow 
          user={user} 
          onComplete={() => {
            setShowOnboarding(false)
            // Redirect to homepage immediately, profile icon will appear
            window.location.href = '/'
          }}
        />
      )}
    </div>
  )
}
