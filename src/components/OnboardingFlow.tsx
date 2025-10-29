import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Briefcase, Sparkles, Rocket, CheckCircle, ArrowRight, Palette, Code, Building2, TrendingUp, Target, BookOpen, Trophy, Star, Zap, Crown, Heart } from 'lucide-react'
import { db, doc, setDoc } from '../firebase'

interface OnboardingFlowProps {
  user: any
  onComplete: () => void
}

const industries = [
  { value: 'freelancer', label: 'Freelancer', icon: Briefcase, color: 'from-blue-400 to-cyan-400', emoji: '💼' },
  { value: 'designer', label: 'Designer', icon: Palette, color: 'from-purple-400 to-pink-400', emoji: '🎨' },
  { value: 'developer', label: 'Web Developer', icon: Code, color: 'from-green-400 to-emerald-400', emoji: '💻' },
  { value: 'entrepreneur', label: 'Entrepreneur', icon: Rocket, color: 'from-orange-400 to-red-400', emoji: '🚀' },
  { value: 'agency', label: 'Agency Owner', icon: Building2, color: 'from-indigo-400 to-purple-400', emoji: '🏢' },
  { value: 'marketer', label: 'Marketer', icon: TrendingUp, color: 'from-pink-400 to-rose-400', emoji: '📊' },
  { value: 'product_manager', label: 'Product Manager', icon: Target, color: 'from-teal-400 to-cyan-400', emoji: '🎯' },
  { value: 'artist', label: 'Visual Artist', icon: Palette, color: 'from-yellow-400 to-orange-400', emoji: '🎭' },
  { value: 'student', label: 'Student', icon: BookOpen, color: 'from-emerald-400 to-teal-400', emoji: '📚' },
  { value: 'other', label: 'Other', icon: Sparkles, color: 'from-gray-400 to-gray-500', emoji: '✨' }
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
    
    // Show quick celebration immediately
    setShowCelebration(true)
    
    // Save in background and redirect quickly
    const savePromise = setDoc(doc(db, 'users', user.uid), {
      name: name.trim(),
      industry: selectedIndustry,
      email: user.email,
      createdAt: new Date().toISOString(),
      onboarded: true,
      level: 1,
      xp: 100
    }).catch(error => {
      console.error('Error saving user data:', error)
    })
    
    // Redirect after just 1.5 seconds, don't wait for save
    setTimeout(() => {
      onComplete()
    }, 1500)
  }

  const progress = ((step - 1) / 2) * 100

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-hidden">
      {/* Animated Background Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-emerald-400/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 2, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Quick Success Message */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center z-50 bg-black/90 backdrop-blur-xl"
          >
            {/* Quick Confetti */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  backgroundColor: ['#10b981', '#14b8a6', '#f59e0b'][i % 3],
                }}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: (Math.random() - 0.5) * 600,
                  y: Math.random() * 400 - 200,
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 1.2,
                  ease: 'easeOut',
                }}
              />
            ))}

            <motion.div
              initial={{ scale: 0.5, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative z-10 text-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 2 }}
              >
                <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-4" strokeWidth={2} />
              </motion.div>
              <h2 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                🎉 Welcome!
              </h2>
              <p className="text-xl text-emerald-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Profile Created
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-2xl bg-gradient-to-b from-black/90 to-black/70 backdrop-blur-2xl border-2 border-emerald-500/30 rounded-2xl p-8 sm:p-12 shadow-2xl"
      >
        {/* Animated Border */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 rounded-2xl blur opacity-30"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <div className="absolute inset-0 bg-black/40 rounded-2xl" />

        {/* Progress Bar - Gamified */}
        {step > 1 && (
          <div className="relative z-10 mb-8">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-gray-400 font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  QUEST {step - 1} OF 2
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-xs text-emerald-400 font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {Math.round(progress)}% XP
                </span>
              </div>
            </div>
            <div className="h-3 bg-white/5 rounded-full overflow-hidden relative border border-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 relative"
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </motion.div>
            </div>
          </div>
        )}

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {/* Step 1: Welcome */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <motion.div
                  className="relative inline-block mb-6"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl blur-2xl opacity-50" />
                  <div className="relative w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                    <Rocket className="w-10 h-10 text-white" strokeWidth={2.5} />
                  </div>
                  {/* Orbiting Stars */}
                  {[0, 120, 240].map((angle, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2"
                      style={{
                        originX: 0.5,
                        originY: 0.5,
                      }}
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: i * 0.3,
                      }}
                    >
                      <Star
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                        style={{
                          transform: `translate(-50%, -50%) translateX(50px) rotate(${-angle}deg)`,
                        }}
                      />
                    </motion.div>
                  ))}
                </motion.div>

                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  🎮 Ready Player One?
                </h2>
                <p className="text-base text-gray-400 mb-8 max-w-sm mx-auto" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Let's level up your profile in just 2 quick quests!
                </p>

                <motion.button
                  onClick={() => setStep(2)}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-teal-600 transition-all flex items-center gap-3 mx-auto shadow-xl relative overflow-hidden"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Zap className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Start Adventure</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                </motion.button>
              </motion.div>
            )}

            {/* Step 2: Name */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-16 h-16 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur-xl opacity-50 animate-pulse" />
                  <div className="relative w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <User className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  👤 What's your hero name?
                </h2>
                <p className="text-gray-400 mb-8 text-center text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  This is how other creators will know you
                </p>

                <div className="max-w-md mx-auto">
                  <div className="relative mb-6">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && name.trim() && setStep(3)}
                      placeholder="Enter your name..."
                      className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all text-base"
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

                  <motion.button
                    onClick={() => name.trim() && setStep(3)}
                    disabled={!name.trim()}
                    whileHover={{ scale: name.trim() ? 1.02 : 1 }}
                    whileTap={{ scale: name.trim() ? 0.98 : 1 }}
                    className="group w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-teal-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden shadow-xl"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative z-10">Continue Quest</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Industry */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-16 h-16 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl blur-xl opacity-50 animate-pulse" />
                  <div className="relative w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  🎯 Choose your class!
                </h2>
                <p className="text-gray-400 mb-8 text-center text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Select your role in the creative universe
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 max-h-96 overflow-y-auto pr-2">
                  {industries.map((industry, idx) => {
                    const Icon = industry.icon
                    const isSelected = selectedIndustry === industry.value
                    return (
                      <motion.button
                        key={industry.value}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => setSelectedIndustry(industry.value)}
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-4 rounded-xl border-2 transition-all relative overflow-hidden group ${
                          isSelected
                            ? 'border-emerald-500/70 bg-emerald-500/20 shadow-lg shadow-emerald-500/20'
                            : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                        }`}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${industry.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                        
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="absolute top-2 right-2 z-10"
                          >
                            <Crown className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                          </motion.div>
                        )}
                        
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${industry.color} flex items-center justify-center mx-auto mb-2 relative`}>
                          <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                        </div>
                        
                        <div className="text-xs font-bold text-white mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                          {industry.label}
                        </div>
                        <div className="text-lg">{industry.emoji}</div>
                      </motion.button>
                    )
                  })}
                </div>

                <motion.button
                  onClick={handleComplete}
                  disabled={!selectedIndustry || loading}
                  whileHover={{ scale: selectedIndustry && !loading ? 1.02 : 1 }}
                  whileTap={{ scale: selectedIndustry && !loading ? 0.98 : 1 }}
                  className="group w-full px-8 py-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-orange-500/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden shadow-xl"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Trophy className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">{loading ? '🎮 Saving Progress...' : '🏆 Complete & Claim Reward'}</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
