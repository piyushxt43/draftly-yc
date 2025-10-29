import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Mail, Linkedin, Instagram, ArrowRight, Sparkles, Star, Heart, Zap, Layout
} from 'lucide-react'

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

      {/* Premium Header - Classy Design */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <nav className="py-5 flex items-center justify-center gap-8">
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
          </nav>
        </div>
      </header>

      {/* Main Content - World Class Design */}
      <main className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 py-24">
        <div className="max-w-6xl mx-auto w-full">
          
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

          {/* Premium Contact Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Mail,
                label: 'Email Us',
                title: 'Drop a Line',
                value: 'piyushsingh123443@gmail.com',
                href: 'mailto:piyushsingh123443@gmail.com',
                gradient: 'from-emerald-500 via-teal-500 to-emerald-600',
                accentColor: 'emerald'
              },
              {
                icon: Linkedin,
                label: 'LinkedIn',
                title: 'Connect Professionally',
                value: 'Join our network',
                href: 'https://linkedin.com',
                gradient: 'from-blue-500 via-cyan-500 to-blue-600',
                accentColor: 'blue'
              },
              {
                icon: Instagram,
                label: 'Instagram',
                title: 'Follow Our Work',
                value: 'Design inspiration daily',
                href: 'https://instagram.com',
                gradient: 'from-pink-500 via-purple-500 to-pink-600',
                accentColor: 'pink'
              }
            ].map((social, idx) => (
              <motion.a
                key={idx}
                href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + idx * 0.15, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-emerald-500/30 hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="relative">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${social.gradient} rounded-xl flex items-center justify-center mb-6`}>
                    <social.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </div>
                  
                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                      {social.label}
                    </h3>
                    <h2 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                      {social.title}
                    </h2>
                    <p className="text-sm text-gray-400 leading-relaxed break-words" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                      {social.value}
                    </p>
              </div>

                  {/* Arrow */}
                  <div className="mt-6 flex items-center gap-2 text-gray-500 group-hover:text-emerald-400 transition-colors">
                    <span className="text-sm font-medium" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                      Get in touch
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.a>
            ))}
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
