import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, Sparkles, Rocket, Zap, Trophy, Star } from 'lucide-react'
import { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../firebase'
import { useNavigate } from 'react-router-dom'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (user: any) => void
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError('')
    try {
      const result = await signInWithPopup(auth, googleProvider)
      setShowSuccess(true)
      setTimeout(() => {
        onSuccess(result.user)
        onClose()
      }, 1500)
    } catch (err: any) {
      setError(err.message)
    }
    setLoading(false)
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      if (isSignUp) {
        const result = await createUserWithEmailAndPassword(auth, email, password)
        setShowSuccess(true)
        setTimeout(() => {
          onSuccess(result.user)
          onClose()
        }, 1500)
      } else {
        const result = await signInWithEmailAndPassword(auth, email, password)
        setShowSuccess(true)
        setTimeout(() => {
          onSuccess(result.user)
          onClose()
        }, 1500)
      }
    } catch (err: any) {
      setError(err.message)
    }
    setLoading(false)
  }

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
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50"
          />

          {/* Floating Particles */}
          <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-emerald-400/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-md pointer-events-auto"
            >
              {/* Success Celebration */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-xl rounded-2xl"
                  >
                    <div className="text-center">
                      <motion.div
                        animate={{
                          rotate: [0, 360],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Trophy className="w-24 h-24 text-emerald-400 mx-auto mb-4" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Welcome Aboard! 🎉
                      </h3>
                      <p className="text-emerald-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Let's build something amazing!
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main Card */}
              <div className="relative bg-gradient-to-b from-black/90 to-black/70 backdrop-blur-2xl border-2 border-emerald-500/30 rounded-2xl p-8 shadow-2xl overflow-hidden">
                {/* Animated Border Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 rounded-2xl blur opacity-20 animate-pulse" />
                
                {/* Background Gradient Orbs */}
                <motion.div 
                  className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl"
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.3, 0.2, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors z-10"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>

                {/* Content */}
                <div className="relative z-10">
                  {/* Animated Header */}
                  <motion.div 
                    className="text-center mb-8"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {/* Icon */}
                    <motion.div
                      className="relative inline-block mb-4"
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-xl opacity-50" />
                      <div className="relative w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                        <Rocket className="w-10 h-10 text-white" strokeWidth={2.5} />
                      </div>
                      {/* Floating Stars */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute"
                          style={{
                            top: -10 + i * 10,
                            right: -10 + i * 5,
                          }}
                          animate={{
                            y: [0, -10, 0],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        >
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        </motion.div>
                      ))}
                    </motion.div>

                    <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {isSignUp ? '🎮 Level Up Your Journey!' : '👋 Welcome Back, Creator!'}
                    </h2>
                    <p className="text-sm text-gray-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {isSignUp ? 'Join 10,000+ designers creating magic' : 'Continue your epic design quest'}
                    </p>
                  </motion.div>

                  {/* Google Sign In - Gamified */}
                  <motion.button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-4 bg-white text-black rounded-xl font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-3 mb-6 disabled:opacity-50 shadow-xl relative overflow-hidden group"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <svg className="w-6 h-6 relative z-10" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="relative z-10">🚀 Quick Start with Google</span>
                  </motion.button>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-3 bg-black/90 text-gray-500 flex items-center gap-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        <Zap className="w-3 h-3 text-emerald-400" />
                        OR USE EMAIL
                        <Zap className="w-3 h-3 text-emerald-400" />
                      </span>
                    </div>
                  </div>

                  {/* Email Form - Gamified */}
                  <form onSubmit={handleEmailAuth} className="space-y-4">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-emerald-400 transition-colors" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="w-full pl-11 pr-4 py-3.5 bg-white/5 border-2 border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all"
                          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-emerald-400 transition-colors" />
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          className="w-full pl-11 pr-4 py-3.5 bg-white/5 border-2 border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all"
                          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                        />
                      </div>
                    </motion.div>

                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-xs text-center p-3 bg-red-500/10 rounded-lg border border-red-500/20"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        ⚠️ {error}
                      </motion.p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-teal-600 transition-all disabled:opacity-50 shadow-xl relative overflow-hidden group"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {loading ? '⏳ Loading...' : isSignUp ? '🎯 Create Account' : '⚡ Sign In'}
                      </span>
                    </motion.button>
                  </form>

                  {/* Toggle - Gamified */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-6 text-gray-500 text-xs"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {isSignUp ? '🎮 Already a player?' : '🆕 New to Draftly?'}{' '}
                    <button
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors underline decoration-dotted"
                    >
                      {isSignUp ? 'Sign In' : 'Join Now'}
                    </button>
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
