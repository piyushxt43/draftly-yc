import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Check, Sparkles, Mail, ArrowRight, Layout
} from 'lucide-react'
import Header from '../components/Header'

export default function Pricing() {
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
          className="absolute top-40 right-20 w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
            filter: 'blur(100px)'
          }}
        />
      </div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 sm:mb-20"
          >
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.2 }} 
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6 sm:mb-8"
            >
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <span className="text-xs text-gray-300 font-medium tracking-wide" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                SIMPLE PRICING
              </span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif', letterSpacing: '-0.02em' }}>
              Choose Your <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Plan</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
              Professional-grade UI generation for teams of all sizes
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20">
            {/* Starter Plan - FREE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                  Starter
                </h3>
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                      $0
                    </span>
                    <span className="text-gray-400 text-sm" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {[
                    '10 components/month',
                    'Basic templates',
                    'Community support'
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/15 transition-all font-semibold text-center text-sm flex items-center justify-center gap-2"
                  style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
                >
                  Get Started
                </Link>
              </div>
            </motion.div>

            {/* Pro Plan - POPULAR */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-sm border-2 border-emerald-500/40 rounded-2xl p-6 relative overflow-hidden transform scale-105"
            >
              <div className="absolute top-2 right-2 px-2 py-1 bg-emerald-500 rounded-full">
                <span className="text-xs text-white font-bold" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>POPULAR</span>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                  Pro
                </h3>
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                      $49
                    </span>
                    <span className="text-gray-400 text-sm" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {[
                    'Unlimited components',
                    'Custom brand styles',
                    'Priority support',
                    'Export to Figma/Code'
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all font-semibold text-center text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                  style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
                >
                  Get Started
                </Link>
              </div>
            </motion.div>

            {/* Team Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                  Team
                </h3>
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                      $199
                    </span>
                    <span className="text-gray-400 text-sm" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {[
                    'Everything in Pro',
                    'Team collaboration',
                    'API access',
                    'Custom training'
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/15 transition-all font-semibold text-center text-sm flex items-center justify-center gap-2"
                  style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
                >
                  Get Started
                </Link>
              </div>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                  Enterprise
                </h3>
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                      Custom
                    </span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {[
                    'SOC 2 compliance',
                    'Dedicated support',
                    'On-premise deploy'
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/15 transition-all font-semibold text-center text-sm flex items-center justify-center gap-2"
                  style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-20 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: 'Can I upgrade or downgrade my plan?',
                  a: 'Yes, you can change your plan at any time. Changes take effect immediately.'
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit cards, PayPal, and wire transfers for enterprise plans.'
                },
                {
                  q: 'Is there a free trial?',
                  a: 'Yes! All new users get a 14-day free trial with full access to Pro features.'
                },
                {
                  q: 'Do you offer refunds?',
                  a: 'We offer a 30-day money-back guarantee if you\'re not satisfied with our service.'
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                    {faq.q}
                  </h3>
                  <p className="text-gray-400" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
