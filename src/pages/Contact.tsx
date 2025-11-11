import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Mail, Linkedin, Instagram, ArrowRight, Sparkles, Zap
} from 'lucide-react'
import Header from '../components/Header'

export default function Contact() {
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
        
        {/* Animated orbs */}
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-40 right-20 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
            filter: 'blur(100px)'
          }}
        />
        
        <motion.div 
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-40 left-20 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(20, 184, 166, 0.12) 0%, transparent 70%)',
            filter: 'blur(100px)'
          }}
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Header */}
      <Header />

      {/* Main Content - World Class Design */}
      <main className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 py-24">
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 backdrop-blur-sm rounded-full border border-emerald-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-emerald-400 font-semibold tracking-wide uppercase" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                Get In Touch
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif', letterSpacing: '-0.02em' }}>
              Let's Create Something
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Amazing Together</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
              Connect with our team of world-class designers and developers
            </p>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left Column - Social Links */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                Connect With Us
              </h2>
                <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    label: 'Email Us',
                    title: 'Drop a Line',
                    value: 'piyushsingh123443@gmail.com',
                    href: 'mailto:piyushsingh123443@gmail.com',
                    gradient: 'from-emerald-500 via-teal-500 to-emerald-600',
                  },
                  {
                    icon: Linkedin,
                    label: 'LinkedIn',
                    title: 'Connect Professionally',
                    value: 'Join our network',
                    href: 'https://www.linkedin.com/in/piyush-singh-023507359?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
                    gradient: 'from-blue-500 via-cyan-500 to-blue-600',
                  },
                  {
                    icon: Instagram,
                    label: 'Instagram',
                    title: 'Follow Our Work',
                    value: 'Design inspiration daily',
                    href: 'https://www.instagram.com/piyush.glitch?igsh=N2pxeG1hYzVpNTgz',
                    gradient: 'from-pink-500 via-purple-500 to-pink-600',
                  }
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    whileHover={{ x: 8 }}
                    className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-emerald-500/30 hover:bg-white/[0.05] transition-all duration-300 flex items-center gap-4"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${social.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <social.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>

                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-1" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                        {social.label}
                      </h3>
                      <p className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                        {social.title}
                      </p>
                      <p className="text-sm text-gray-400 mt-1 break-words" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                        {social.value}
                      </p>
              </div>

                    <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right Column - About Founder */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                  About the Founder
                </h2>
                
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
                    <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
                      <img 
                        src="/images/founder.jpg" 
                        alt="Piyush Singh" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                      Piyush Singh
                    </h3>
                    <p className="text-emerald-400 font-medium text-sm" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                      Founder & CEO
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-gray-300 text-sm leading-relaxed" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                  <p>
                    I've been working in the freelance and visual design industry for over six years, specializing in graphic design and UI aesthetics.
                  </p>
                  <p>
                    I'm building an AI trained on over 10,000 world-class UI designs, capable of producing layouts that look professional, modern, and beautifully balanced.
                  </p>
                  <p>
                    Unlike other AI tools that generate basic or repetitive structures, Draftly delivers premium-quality UIs with production-ready code.
                  </p>
                    </div>

                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 mt-6 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors group"
                  style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
                >
                  Read full story
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
                    </div>

          {/* Bottom CTA Section */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="relative"
          >
            <div className="relative bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-10 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
              
              <div className="relative text-center">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                  Ready to get started?
                </h3>
                <p className="text-base text-gray-400 mb-8 max-w-xl mx-auto" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                  Explore our pricing or check out examples
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/pricing"
                    className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 flex items-center gap-2"
                    style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
                  >
                    <span>View Pricing</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  
                  <Link
                    to="/dashboard"
                    className="px-8 py-3.5 bg-white/5 border border-white/20 text-white rounded-lg hover:bg-white/10 hover:border-white/30 transition-all duration-200 font-semibold flex items-center gap-2"
                    style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
                  >
                    <Zap className="w-4 h-4" />
                    <span>See Examples</span>
                  </Link>
                  </div>
                </div>
              </div>
            </motion.div>

        </div>
      </main>
    </div>
  )
}
