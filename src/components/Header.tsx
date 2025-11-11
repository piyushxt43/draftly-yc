import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, User as UserIcon } from 'lucide-react'
import { auth } from '../firebase'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="py-4 sm:py-5 flex items-center relative" style={{ marginLeft: '-20px' }}>
          {/* Mobile: Hamburger Menu Button (Far Left) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors z-30 flex-shrink-0"
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
            <Link to="/" className="group mx-4 flex items-center gap-2">
              <img 
                src="/logo.png" 
                alt="Draftly" 
                className="w-8 h-8 object-contain group-hover:scale-110 transition-transform" 
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              <span className="text-2xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors whitespace-nowrap" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                Draftly
              </span>
            </Link>

            <a href="/#features" className="text-sm text-gray-400 hover:text-white transition-colors font-medium whitespace-nowrap" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>Features</a>
            <Link to="/pricing" className="text-sm text-gray-400 hover:text-white transition-colors font-medium whitespace-nowrap" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>Pricing</Link>
          </div>

          {/* Mobile: Draftly Logo - Slightly Right of Center */}
          <Link to="/" className="lg:hidden absolute left-1/2 group z-10 pointer-events-auto flex items-center gap-1.5" style={{ transform: 'translateX(-40%)' }}>
            <img 
              src="/logo.png" 
              alt="Draftly" 
              className="w-6 h-6 object-contain group-hover:scale-110 transition-transform" 
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors whitespace-nowrap" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
              Draftly
            </span>
          </Link>
          
          {/* Profile Icon (only when logged in) - Far Right (Both mobile & desktop) */}
          {user && (
            <button
              onClick={() => navigate('/profile')}
              className="group ml-auto lg:absolute lg:right-0 z-20 flex-shrink-0"
            >
              <img 
                src="/profile-default.png" 
                alt="Profile" 
                className="w-9 h-9 rounded-full object-cover border border-white/10"
              />
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
                  href="/#features" 
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
  )
}

