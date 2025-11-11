import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Zap, CheckCircle, Sparkles, ArrowRight, Crown } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ProModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ProModal({ isOpen, onClose }: ProModalProps) {
  const features = [
    'Unlimited UI generations',
    'Priority AI processing',
    'Advanced customization',
    'Export to multiple formats',
    'Priority support',
    'Early access to new features'
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-lg bg-gradient-to-br from-zinc-900 to-black border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden">
              {/* Gradient Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 opacity-50" />
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                <X className="w-4 h-4 text-white" />
              </button>

              <div className="relative p-8 sm:p-10">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-xl opacity-50" />
                    <div className="relative w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                      <Crown className="w-10 h-10 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Free Generations Used Up! 🎯
                  </h2>
                  <p className="text-gray-400 text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    You've used all 3 free generations. Upgrade to Pro for unlimited AI-powered UI generation!
                  </p>
                </div>

                {/* Features */}
                <div className="mb-8 space-y-3">
                  {features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="text-white text-sm font-medium" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Link
                    to="/pricing"
                    onClick={onClose}
                    className="block w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all flex items-center justify-center gap-2 text-center"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    <Crown className="w-5 h-5" />
                    Upgrade to Pro
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={onClose}
                    className="w-full px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    Maybe Later
                  </button>
                </div>

                {/* Footer Note */}
                <p className="text-center text-xs text-gray-500 mt-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Start generating unlimited UIs in seconds ✨
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
