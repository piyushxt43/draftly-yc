import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useQuest } from '../contexts/QuestContext'

const orbPositions = [
  { id: 0, top: '15%', left: '8%' },
  { id: 1, top: '60%', right: '5%' },
  { id: 2, bottom: '25%', left: '10%' }
]

export default function QuestOrbs() {
  const { questData, updateQuest, completeQuest, unlockBadge, addXP } = useQuest()
  const [clickedOrbs, setClickedOrbs] = useState<number[]>([])

  const handleOrbClick = (orbId: number) => {
    if (clickedOrbs.includes(orbId)) return
    
    setClickedOrbs([...clickedOrbs, orbId])
    addXP(50)
    
    if (clickedOrbs.length + 1 === 3) {
      completeQuest(2)
      unlockBadge('sharp-eye')
      addXP(100) // Bonus for completing all 3
    }
  }

  return (
    <>
      {orbPositions.map((orb) => {
        if (clickedOrbs.includes(orb.id)) return null
        
        return (
          <motion.button
            key={orb.id}
            onClick={() => handleOrbClick(orb.id)}
            className="fixed z-40 w-3 h-3 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 cursor-pointer group"
            style={{
              top: orb.top,
              left: orb.left,
              right: orb.right,
              bottom: orb.bottom
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.8 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-emerald-400/50 blur-md"
              animate={{
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />
            <Sparkles className="absolute inset-0 w-full h-full text-emerald-400 opacity-50" />
          </motion.button>
        )
      })}
    </>
  )
}

