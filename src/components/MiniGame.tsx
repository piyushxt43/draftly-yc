import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Target, Trophy } from 'lucide-react'
import { useQuest } from '../contexts/QuestContext'

interface MiniGameProps {
  onClose: () => void
}

export default function MiniGame({ onClose }: MiniGameProps) {
  const { completeQuest, unlockBadge, addXP } = useQuest()
  const [score, setScore] = useState(0)
  const [targetPos, setTargetPos] = useState({ x: 50, y: 50 })
  const [timeLeft, setTimeLeft] = useState(15)
  const [isGameActive, setIsGameActive] = useState(true)

  // Move target randomly
  useEffect(() => {
    if (!isGameActive) return
    
    const interval = setInterval(() => {
      setTargetPos({
        x: Math.random() * 70 + 15,
        y: Math.random() * 60 + 20
      })
    }, 1000)
    
    return () => clearInterval(interval)
  }, [isGameActive])

  // Timer countdown
  useEffect(() => {
    if (!isGameActive) return
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsGameActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [isGameActive])

  const handleTargetClick = () => {
    if (!isGameActive) return
    setScore(prev => {
      const newScore = prev + 1
      
      // Quest 4: Complete mini-game (5 clicks)
      if (newScore === 5) {
        completeQuest(4)
        unlockBadge('champion')
        addXP(300)
      }
      
      return newScore
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-black/95 backdrop-blur-xl border border-white/10 rounded-3xl p-8 max-w-2xl w-full shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Catch the Pixel
              </h2>
              <p className="text-sm text-gray-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Click 5 times to complete the quest
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-3xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {score}/5
            </div>
            <div className={`text-xl font-bold ${timeLeft <= 5 ? 'text-red-400' : 'text-gray-400'}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {timeLeft}s
            </div>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
              initial={{ width: 0 }}
              animate={{ width: `${(score / 5) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="relative bg-gray-900/50 rounded-2xl p-8 min-h-[300px] overflow-hidden border border-white/5">
          {isGameActive ? (
            <motion.button
              onClick={handleTargetClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 cursor-pointer shadow-lg"
              style={{
                left: `${targetPos.x}%`,
                top: `${targetPos.y}%`
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <Trophy className="w-20 h-20 text-emerald-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {score >= 5 ? 'Quest Complete!' : 'Time\'s Up!'}
              </h3>
              <p className="text-gray-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {score >= 5 ? 'You completed the challenge!' : `You scored ${score}/5`}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

