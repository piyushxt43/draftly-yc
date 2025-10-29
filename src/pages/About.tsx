import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, Target, Rocket } from 'lucide-react'
import Header from '../components/Header'

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Grain Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-10 opacity-[0.15]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Background gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-black" />
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.08) 0%, rgba(20, 184, 166, 0.04) 30%, transparent 60%)',
          }}
        />
      </div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.2 }} 
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-8"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-gray-300 font-medium tracking-wide" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                ABOUT DRAFTLY
              </span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif', letterSpacing: '-0.02em' }}>
              Meet the <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Founder</span>
            </h1>
          </motion.div>

          {/* Founder Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="grid md:grid-cols-3 gap-8 items-start mb-8">
                {/* Photo */}
                <div className="md:col-span-1 flex justify-center">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
                    <div className="relative w-56 h-56 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
                      <img 
                        src="/images/founder.jpg" 
                        alt="Piyush Singh" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="md:col-span-2">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                    Piyush Singh
                  </h2>
                  <p className="text-emerald-400 font-semibold mb-6" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                    Founder & CEO
                  </p>
                  
                  <div className="space-y-4 text-gray-300 leading-relaxed" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                    <p>
                      I've been working in the freelance and visual design industry for over six years, specializing in graphic design and UI aesthetics. During this time, I've seen how rapidly the AI and no-code space is evolving—yet most AI-generated websites still lack true visual quality.
                    </p>
                    <p>
                      That's where my idea for Draftly comes in. I'm building an AI trained on over 10,000 world-class UI designs, capable of producing layouts that look professional, modern, and beautifully balanced.
                    </p>
                    <p>
                      Unlike other AI tools that generate basic or repetitive structures, Draftly delivers premium-quality UIs with production-ready code. You can connect it seamlessly to platforms like Vercel, Lovable, or GitHub, or download a ready-to-launch zip to instantly turn your idea into a working MVP.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mission & Values */}
              <div className="grid sm:grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/10">
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Target className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                    Mission
                  </h3>
                  <p className="text-sm text-gray-400" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                    Democratize world-class UI design through AI
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                    Vision
                  </h3>
                  <p className="text-sm text-gray-400" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                    AI that understands beautiful design at scale
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Rocket className="w-6 h-6 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                    Goal
                  </h3>
                  <p className="text-sm text-gray-400" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                    Ship MVPs in minutes, not months
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-400 mb-6" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
              Ready to transform your design workflow?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all font-semibold shadow-lg shadow-emerald-500/20"
              style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
            >
              Get Started
              <Sparkles className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <p className="text-gray-500 text-sm" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
              © 2025 Draftly. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-gray-500 hover:text-white text-sm transition-colors" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>Home</Link>
            <Link to="/pricing" className="text-gray-500 hover:text-white text-sm transition-colors" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>Pricing</Link>
            <Link to="/contact" className="text-gray-500 hover:text-white text-sm transition-colors" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

