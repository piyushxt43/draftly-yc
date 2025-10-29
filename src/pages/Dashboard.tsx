import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Sparkles, Zap, Database, Cpu, TrendingUp, Clock, Shield, Globe, Layout, User
} from 'lucide-react'
import { auth } from '../firebase'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Grain Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-10 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Subtle Grid Pattern */}
      <div 
        className="fixed inset-0 pointer-events-none z-10 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Subtle Background with Gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
          }}
        />
        
        <div 
          className="absolute top-40 left-20 w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
            filter: 'blur(100px)'
          }}
        />
      </div>

      {/* Premium Header - Classy Design */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <nav className="py-5 flex items-center justify-center gap-8" style={{ marginLeft: '-20px' }}>
            {/* Dashboard, Contact */}
            <Link to="/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors font-medium" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>Dashboard</Link>
            <Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors font-medium" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>Contact</Link>

            {/* Draftly Logo */}
            <Link to="/" className="group mx-4">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                Draftly
              </span>
            </Link>

            {/* Features, Pricing */}
            <a href="/#features" className="text-sm text-gray-400 hover:text-white transition-colors font-medium" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>Features</a>
            <Link to="/pricing" className="text-sm text-gray-400 hover:text-white transition-colors font-medium" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>Pricing</Link>
            
            {/* Profile Button */}
            {user && (
              <button
                onClick={() => navigate('/profile')}
                className="group ml-6 relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur opacity-30 group-hover:opacity-60 transition-opacity" />
                <div className="relative w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center border border-white/10">
                  <User className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 sm:mb-16"
          >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 backdrop-blur-sm rounded-full border border-yellow-500/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-xs text-yellow-400 font-medium tracking-wide" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                AI MODEL IN TRAINING
              </span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif', letterSpacing: '-0.02em' }}>
              We're Building Something
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Extraordinary
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
              Our AI is learning from the best 10,000+ pages on the internet to deliver world-class UI generation
            </p>
          </motion.div>

          {/* Training Progress Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-10 mb-8 sm:mb-12"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Database className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400" />
                  </div>
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                  Training Progress
                </h2>
                <p className="text-gray-400" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                  Currently analyzing world-class designs from top companies
                </p>
                            </div>
                  </div>

            {/* Progress Stats */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-400 font-semibold" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>Pages Analyzed</span>
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-emerald-400" strokeWidth={2.5} />
                            </div>
                          </div>
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-1" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                  3,200
                        </div>
                <div className="text-xs text-gray-500" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                  out of 10,000
                      </div>
                {/* Progress Bar */}
                <div className="mt-4 h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '32%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                  />
                  </div>
                  </div>

              <div className="bg-white/5 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-400 font-semibold" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>Est. Complete</span>
                  <div className="w-10 h-10 bg-teal-500/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-teal-400" strokeWidth={2.5} />
                        </div>
                      </div>
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent mb-1" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                  50 days
                  </div>
                <div className="text-xs text-gray-500" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                  Based on current rate
                        </div>
                      </div>
                  </div>

            {/* Training Details */}
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                What We're Learning
              </h3>
                <div className="space-y-3">
                  {[
                  { icon: Cpu, text: 'Advanced design patterns from industry leaders' },
                  { icon: Zap, text: 'State-of-the-art UI/UX best practices' },
                  { icon: Shield, text: 'Accessibility and performance optimization' },
                  { icon: Globe, text: 'Cross-platform responsive design techniques' }
                ].map((item, idx) => (
                  <motion.div
                      key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    className="flex items-center gap-3 text-gray-300"
                    >
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-emerald-400" />
                      </div>
                    <span className="text-sm" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>{item.text}</span>
                  </motion.div>
                  ))}
                </div>
                </div>
              </motion.div>

          {/* Info Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: 'Premium Quality',
                description: 'Training on the world\'s best designs',
                color: 'emerald'
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Optimized for speed and efficiency',
                color: 'yellow'
              },
              {
                icon: Shield,
                title: 'Enterprise Ready',
                description: 'Built for production environments',
                color: 'blue'
              }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-all"
              >
                <div className={`w-12 h-12 bg-${card.color}-500/20 rounded-xl flex items-center justify-center mb-4`}>
                  <card.icon className={`w-6 h-6 text-${card.color}-400`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                  {card.title}
                </h3>
                <p className="text-sm text-gray-400" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
