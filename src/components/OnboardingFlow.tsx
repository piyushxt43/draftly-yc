import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Briefcase, Sparkles, Rocket, CheckCircle, ArrowRight, Palette, Code, Building2, TrendingUp, Target, BookOpen, Trophy } from 'lucide-react'
import { db, doc, setDoc } from '../firebase'

interface OnboardingFlowProps {
  user: any
  onComplete: () => void
}

const industries = [
  { value: 'freelancer', label: 'Freelancer', icon: Briefcase, color: 'from-blue-400 to-cyan-400' },
  { value: 'designer', label: 'Designer', icon: Palette, color: 'from-purple-400 to-pink-400' },
  { value: 'developer', label: 'Web Developer', icon: Code, color: 'from-green-400 to-emerald-400' },
  { value: 'entrepreneur', label: 'Entrepreneur', icon: Rocket, color: 'from-orange-400 to-red-400' },
  { value: 'agency', label: 'Agency Owner', icon: Building2, color: 'from-indigo-400 to-purple-400' },
  { value: 'marketer', label: 'Marketer', icon: TrendingUp, color: 'from-pink-400 to-rose-400' },
  { value: 'product_manager', label: 'Product Manager', icon: Target, color: 'from-teal-400 to-cyan-400' },
  { value: 'artist', label: 'Visual Artist', icon: Palette, color: 'from-yellow-400 to-orange-400' },
  { value: 'student', label: 'Student', icon: BookOpen, color: 'from-emerald-400 to-teal-400' },
  { value: 'other', label: 'Other', icon: Sparkles, color: 'from-gray-400 to-gray-500' }
]

export default function OnboardingFlow({ user, onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('')
  const [loading, setLoading] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  const handleComplete = async () => {
    if (!selectedIndustry || !name.trim()) return
    
    setLoading(true)
    setShowCelebration(true)
    
    // Save in background
    setDoc(doc(db, 'users', user.uid), {
      name: name.trim(),
      industry: selectedIndustry,
      email: user.email,
      createdAt: new Date().toISOString(),
      onboarded: true
    }).catch(error => {
      console.error('Error saving user data:', error)
    })
    
    // Redirect after 2.5 seconds (better UX with new celebration)
    setTimeout(() => {
      onComplete()
    }, 2500)
  }

  const progress = ((step - 1) / 2) * 100

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4">
      {/* Success Celebration - Better Design */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-50 bg-black/95 backdrop-blur-xl"
          >
            {/* Animated Background Circles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${100 + i * 60}px`,
                  height: `${100 + i * 60}px`,
                  border: `2px solid rgba(16, 185, 129, ${0.1 - i * 0.01})`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.2, 1],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.15,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
            ))}

            {/* Main Content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="relative text-center max-w-md px-6"
            >
              {/* Glowing Icon Container */}
              <div className="relative mb-8 flex justify-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                  className="relative"
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur-2xl opacity-50 animate-pulse" />
                  
                  {/* Icon Container */}
                  <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl">
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <CheckCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  You're All Set! 🚀
                </h2>
                <p className="text-xl text-emerald-400 mb-2 font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Profile Created Successfully
                </p>
                <p className="text-gray-400 text-sm mt-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Start generating amazing UIs with AI
                </p>
              </motion.div>

              {/* Progress Indicator */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, delay: 0.6, ease: 'easeInOut' }}
                className="mt-8 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 rounded-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-2xl bg-gradient-to-b from-zinc-900 to-black border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl"
      >
        {/* Progress Bar */}
        {step > 1 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-500 font-medium" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Step {step - 1} of 2
              </span>
              <span className="text-xs text-emerald-400 font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: Welcome */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Welcome to Draftly
              </h2>
              <p className="text-base text-gray-400 mb-8 max-w-md mx-auto" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Let's set up your profile in 2 quick steps
              </p>

              <button
                onClick={() => setStep(2)}
                className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all flex items-center gap-2 mx-auto"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {/* Step 2: Name */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <User className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                What's your name?
              </h2>
              <p className="text-gray-400 mb-8 text-center text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                This is how others will see you
              </p>

              <div className="max-w-md mx-auto">
                <div className="relative mb-6">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && name.trim() && setStep(3)}
                    placeholder="Enter your name..."
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    autoFocus
                  />
                  {name && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    </motion.div>
                  )}
                </div>

                <button
                  onClick={() => name.trim() && setStep(3)}
                  disabled={!name.trim()}
                  className="w-full px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Industry */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                What do you do?
              </h2>
              <p className="text-gray-400 mb-8 text-center text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Select your profession
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 max-h-80 overflow-y-auto">
                {industries.map((industry, idx) => {
                  const Icon = industry.icon
                  const isSelected = selectedIndustry === industry.value
                  return (
                    <motion.button
                      key={industry.value}
                      onClick={() => setSelectedIndustry(industry.value)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative p-4 rounded-xl border transition-all ${
                        isSelected
                          ? 'border-emerald-500/50 bg-emerald-500/10'
                          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <motion.div 
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${industry.color} flex items-center justify-center mx-auto mb-2`}
                        animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
                      </motion.div>
                      <div className="text-xs font-semibold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        {industry.label}
                      </div>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2"
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                        </motion.div>
                      )}
                    </motion.button>
                  )
                })}
              </div>

              <button
                onClick={handleComplete}
                disabled={!selectedIndustry || loading}
                className="w-full px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {loading ? 'Saving...' : 'Complete Setup'}
                <CheckCircle className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
