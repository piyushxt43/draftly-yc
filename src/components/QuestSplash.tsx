import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Rocket, Zap } from 'lucide-react'

interface QuestSplashProps {
  onStart: () => void
}

export default function QuestSplash({ onStart }: QuestSplashProps) {
  const [isStarting, setIsStarting] = useState(false)

  const handleStart = () => {
    setIsStarting(true)
    setTimeout(() => {
      onStart()
    }, 600)
  }

  return (
    <AnimatePresence>
      {!isStarting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-[200] flex items-center justify-center p-6"
        >
          {/* Textured Background - Dot Grid */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }}
            />
          </div>

          {/* Grain Textures */}
          <div 
            className="absolute inset-0 pointer-events-none z-0 opacity-[0.15]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
            }}
          />
          <div 
            className="absolute inset-0 pointer-events-none z-0 opacity-[0.08]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grainyFilter'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grainyFilter)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
            }}
          />

          {/* Subtle Emerald Gradient Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: 'radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.08) 0%, rgba(20, 184, 166, 0.04) 30%, transparent 60%), radial-gradient(circle at 50% 100%, rgba(20, 184, 166, 0.06) 0%, rgba(16, 185, 129, 0.02) 40%, transparent 70%)',
            }}
          />

          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden z-[1]">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-emerald-400/20"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: 0,
                }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 text-center max-w-2xl">
            {/* Premium Badge */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.1 }} 
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6"
            >
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-400 font-medium tracking-wider" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                QUEST MODE UNLOCKED
              </span>
            </motion.div>

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="mb-8"
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-emerald-500/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 blur-2xl" />
                <Rocket className="w-10 h-10 text-emerald-400 relative z-10" strokeWidth={1.5} />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl sm:text-6xl font-bold text-white mb-4"
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, letterSpacing: '0.03em' }}
            >
              Draftly Quest
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl text-gray-400 mb-12 max-w-md mx-auto"
              style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
            >
              Complete challenges to unlock the content
            </motion.p>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="relative px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-lg shadow-emerald-500/20 group overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: 'linear',
                }}
              />
              <span className="relative text-white font-bold text-base flex items-center gap-2" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
                <Sparkles className="w-5 h-5" />
                Start Quest
                <Sparkles className="w-5 h-5" />
              </span>
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-16 flex flex-wrap items-center justify-center gap-6 text-gray-400"
            >
              {[
                { icon: Sparkles, text: '5 Quests' },
                { icon: Zap, text: 'Unlock Badges' },
                { icon: Rocket, text: 'Level Up' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
                  <item.icon className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-medium" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

