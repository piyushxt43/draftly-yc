import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, List, Sparkles, Lock } from 'lucide-react'
import { useQuest } from '../contexts/QuestContext'

export default function QuestHUD() {
  const { questData, completeQuest, unlockBadge } = useQuest()
  const [showQuestLog, setShowQuestLog] = useState(false)
  const [showAchievements, setShowAchievements] = useState(false)
  const [xpAnimation, setXpAnimation] = useState(false)

  const quests = [
    { id: 1, name: 'The Explorer', description: 'Scroll through all sections', badge: 'explorer' },
    { id: 2, name: 'The Seeker', description: 'Find 3 hidden elements', badge: 'sharp-eye' },
    { id: 3, name: 'The Creator', description: 'Click logo 5 times', badge: 'creator' },
    { id: 4, name: 'The Challenger', description: 'Complete mini-game', badge: 'champion' },
    { id: 5, name: 'The Committed', description: 'Click any CTA button', badge: 'quest-master' }
  ]

  const xpPerLevel = 500
  const currentLevelXP = questData.xp % xpPerLevel
  const progressToNextLevel = (currentLevelXP / xpPerLevel) * 100

  // Animate XP when it changes
  useEffect(() => {
    setXpAnimation(true)
    const timer = setTimeout(() => setXpAnimation(false), 600)
    return () => clearTimeout(timer)
  }, [questData.xp])

  return (
    <>
      {/* Top-right: XP Counter, Level, Quest Progress */}
      <div className="fixed top-24 right-6 z-50 space-y-3">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-black/80 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-4 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <motion.span
                  animate={xpAnimation ? { scale: [1, 1.2, 1] } : {}}
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {questData.xp}
                </motion.span>
                <span className="text-sm text-emerald-400 font-semibold">XP</span>
              </div>
              <div className="text-xs text-gray-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Level {questData.level}
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
              initial={{ width: 0 }}
              animate={{ width: `${progressToNextLevel}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          <div className="mt-3 pt-3 border-t border-white/10 text-center">
            <div className="text-xs text-gray-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {questData.questsCompleted.length}/5 Quests
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom-left: Quest Log Icon */}
      <motion.button
        onClick={() => setShowQuestLog(true)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-black/80 backdrop-blur-xl border border-emerald-500/30 rounded-full flex items-center justify-center shadow-2xl hover:border-emerald-500/60 transition-all group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <List className="w-6 h-6 text-emerald-400 group-hover:text-white transition-colors" />
      </motion.button>

      {/* Bottom-right: Achievements Icon */}
      <motion.button
        onClick={() => setShowAchievements(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-black/80 backdrop-blur-xl border border-emerald-500/30 rounded-full flex items-center justify-center shadow-2xl hover:border-emerald-500/60 transition-all group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Award className="w-6 h-6 text-emerald-400 group-hover:text-white transition-colors" />
        {questData.badges.length > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-black">
            <span className="text-xs font-bold text-white">{questData.badges.length}</span>
          </div>
        )}
      </motion.button>

      {/* Quest Log Drawer */}
      <AnimatePresence>
        {showQuestLog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQuestLog(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[150]"
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute left-0 top-0 bottom-0 w-96 bg-black/95 backdrop-blur-xl border-r border-white/10 shadow-2xl p-8 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Quest Log
                </h2>
                <button
                  onClick={() => setShowQuestLog(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                {quests.map((quest) => {
                  const isCompleted = questData.questsCompleted.includes(quest.id)
                  return (
                    <motion.div
                      key={quest.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: quest.id * 0.1 }}
                      className={`p-4 rounded-xl border ${
                        isCompleted
                          ? 'border-emerald-500/50 bg-emerald-500/10'
                          : 'border-white/10 bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {isCompleted ? (
                          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm">✓</span>
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                            <Lock className="w-4 h-4 text-gray-500" />
                          </div>
                        )}
                        <h3 className={`font-bold ${isCompleted ? 'text-white' : 'text-gray-400'}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                          {quest.name}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-400 ml-11" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        {quest.description}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievements Drawer */}
      <AnimatePresence>
        {showAchievements && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAchievements(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[150]"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 bottom-0 w-96 bg-black/95 backdrop-blur-xl border-l border-white/10 shadow-2xl p-8 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Achievements
                </h2>
                <button
                  onClick={() => setShowAchievements(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                {[
                  { id: 'explorer', name: 'Explorer', description: 'Explored all sections' },
                  { id: 'sharp-eye', name: 'Sharp Eye', description: 'Found all hidden elements' },
                  { id: 'creator', name: 'Creator', description: 'Unlocked the logo secret' },
                  { id: 'champion', name: 'Champion', description: 'Conquered the mini-game' },
                  { id: 'quest-master', name: 'Quest Master', description: 'Completed all quests' }
                ].map((badge) => {
                  const isUnlocked = questData.badges.includes(badge.id)
                  return (
                    <motion.div
                      key={badge.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className={`p-4 rounded-xl border ${
                        isUnlocked
                          ? 'border-emerald-500/50 bg-emerald-500/10'
                          : 'border-white/10 bg-white/5 opacity-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isUnlocked
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-500'
                            : 'bg-gray-700'
                        }`}>
                          <Award className={`w-6 h-6 ${isUnlocked ? 'text-white' : 'text-gray-500'}`} />
                        </div>
                        <div>
                          <h3 className={`font-bold ${isUnlocked ? 'text-white' : 'text-gray-500'}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            {badge.name}
                          </h3>
                          <p className="text-xs text-gray-400" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            {badge.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

