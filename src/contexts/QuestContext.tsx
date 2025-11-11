import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface QuestData {
  xp: number
  level: number
  questsCompleted: number[]
  badges: string[]
  firstVisit: boolean
  hiddenItemsFound: number[]
  miniGameCompleted: boolean
  logoClickCount: number
  lastLogoClickTime: number
  ctaClicked: boolean
}

interface QuestContextType {
  questData: QuestData
  updateQuest: (updates: Partial<QuestData>) => void
  addXP: (amount: number) => void
  completeQuest: (questId: number) => void
  unlockBadge: (badgeName: string) => void
  resetProgress: () => void
  showSplash: boolean
  setShowSplash: (show: boolean) => void
}

const defaultQuestData: QuestData = {
  xp: 0,
  level: 1,
  questsCompleted: [],
  badges: [],
  firstVisit: true,
  hiddenItemsFound: [],
  miniGameCompleted: false,
  logoClickCount: 0,
  lastLogoClickTime: 0,
  ctaClicked: false
}

const QuestContext = createContext<QuestContextType | undefined>(undefined)

export const QuestProvider = ({ children }: { children: ReactNode }) => {
  const [questData, setQuestData] = useState<QuestData>(defaultQuestData)
  const [showSplash, setShowSplash] = useState(false) // Always hide splash

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('draftlyQuest')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setQuestData(parsed)
      } catch (e) {
        console.error('Error loading quest data:', e)
      }
    }
  }, [])

  // Save to localStorage whenever questData changes
  useEffect(() => {
    if (questData.firstVisit === false) {
      localStorage.setItem('draftlyQuest', JSON.stringify(questData))
    }
  }, [questData])

  const updateQuest = (updates: Partial<QuestData>) => {
    setQuestData(prev => ({ ...prev, ...updates }))
  }

  const addXP = (amount: number) => {
    setQuestData(prev => {
      const newXP = prev.xp + amount
      const newLevel = Math.floor(newXP / 500) + 1
      return { 
        ...prev, 
        xp: newXP,
        level: newLevel
      }
    })
  }

  const completeQuest = (questId: number) => {
    setQuestData(prev => {
      if (prev.questsCompleted.includes(questId)) {
        return prev // Already completed
      }
      return {
        ...prev,
        questsCompleted: [...prev.questsCompleted, questId]
      }
    })
  }

  const unlockBadge = (badgeName: string) => {
    setQuestData(prev => {
      if (prev.badges.includes(badgeName)) {
        return prev // Already unlocked
      }
      return {
        ...prev,
        badges: [...prev.badges, badgeName]
      }
    })
  }

  const resetProgress = () => {
    setQuestData(defaultQuestData)
    localStorage.removeItem('draftlyQuest')
    setShowSplash(true)
  }

  return (
    <QuestContext.Provider value={{
      questData,
      updateQuest,
      addXP,
      completeQuest,
      unlockBadge,
      resetProgress,
      showSplash,
      setShowSplash
    }}>
      {children}
    </QuestContext.Provider>
  )
}

export const useQuest = () => {
  const context = useContext(QuestContext)
  if (!context) {
    throw new Error('useQuest must be used within QuestProvider')
  }
  return context
}

