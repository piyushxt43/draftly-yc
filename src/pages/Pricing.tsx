import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Check, Sparkles, Mail, ArrowRight, Layout
} from 'lucide-react'

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
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-sm border border-emerald-500/20 rounded-3xl p-8 sm:p-10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                    Pro
                  </h2>
                  <div className="px-3 py-1 bg-emerald-500/20 rounded-full">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl sm:text-6xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                      $200
                    </span>
                    <span className="text-gray-400" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>/month</span>
                  </div>
                  <p className="text-gray-400 mt-2" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                    Perfect for professionals and small teams
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    'Unlimited UI generations',
                    'Export to React, Vue, HTML',
                    'Advanced design system',
                    'Priority support',
                    'Team collaboration (up to 5)',
                    'Custom branding',
                    'API access'
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all font-semibold text-center flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                  style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>

            {/* Custom Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8 sm:p-10 relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                    Custom
                  </h2>
                  <div className="px-3 py-1 bg-white/10 rounded-full">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl sm:text-6xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                      Custom
                    </span>
                  </div>
                  <p className="text-gray-400 mt-2" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                    Tailored solutions for enterprises
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    'Everything in Pro',
                    'Unlimited team members',
                    'Dedicated account manager',
                    'Custom AI model training',
                    'On-premise deployment',
                    'SLA guarantee',
                    '24/7 premium support',
                    'Custom integrations'
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/15 transition-all font-semibold text-center flex items-center justify-center gap-2"
                  style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
                >
                  Contact Us
                  <ArrowRight className="w-5 h-5" />
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
