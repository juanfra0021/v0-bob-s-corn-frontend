"use client"

import { useState, useCallback } from "react"

export interface PurchaseHistory {
  id: string
  timestamp: Date
  amount: number
  success: boolean
  message?: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  requirement: number
  unlocked: boolean
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-purchase",
    name: "Primera Cosecha",
    description: "Compra tu primer maíz",
    icon: "🌱",
    requirement: 200,
    unlocked: false,
  },
  {
    id: "corn-collector",
    name: "Coleccionista",
    description: "Acumula 1,000 maíz",
    icon: "🌽",
    requirement: 1000,
    unlocked: false,
  },
  {
    id: "corn-master",
    name: "Maestro del Maíz",
    description: "Acumula 5,000 maíz",
    icon: "👑",
    requirement: 5000,
    unlocked: false,
  },
  {
    id: "corn-legend",
    name: "Leyenda Dorada",
    description: "Acumula 10,000 maíz",
    icon: "🏆",
    requirement: 10000,
    unlocked: false,
  },
  {
    id: "patient-farmer",
    name: "Granjero Paciente",
    description: "Realiza 10 compras exitosas",
    icon: "⏰",
    requirement: 10,
    unlocked: false,
  },
]

export interface UseCornPurchaseReturn {
  totalCorn: number
  purchaseHistory: PurchaseHistory[]
  isRateLimited: boolean
  timeUntilNextPurchase: number
  isLoading: boolean
  achievements: Achievement[]
  purchaseCorn: () => Promise<void>
  getNextAchievement: () => Achievement | null
}

export const useCornPurchase = (): UseCornPurchaseReturn => {
  const [totalCorn, setTotalCorn] = useState(0)
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistory[]>([])
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [timeUntilNextPurchase, setTimeUntilNextPurchase] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [achievements, setAchievements] = useState<Achievement[]>([])

  const checkAchievements = useCallback(
    (newTotalCorn: number, successfulPurchases: number) => {
      const newAchievements = [...achievements]
      let hasNewAchievement = false

      ACHIEVEMENTS.forEach((achievement) => {
        const isAlreadyUnlocked = newAchievements.some((a) => a.id === achievement.id)

        if (!isAlreadyUnlocked) {
          let shouldUnlock = false

          if (achievement.id === "patient-farmer") {
            shouldUnlock = successfulPurchases >= achievement.requirement
          } else {
            shouldUnlock = newTotalCorn >= achievement.requirement
          }

          if (shouldUnlock) {
            newAchievements.push({ ...achievement, unlocked: true })
            hasNewAchievement = true
          }
        }
      })

      if (hasNewAchievement) {
        setAchievements(newAchievements)
      }
    },
    [achievements],
  )

  const getNextAchievement = useCallback((): Achievement | null => {
    const successfulPurchases = purchaseHistory.filter((p) => p.success).length

    const unlockedIds = achievements.map((a) => a.id)
    const nextAchievements = ACHIEVEMENTS.filter((a) => !unlockedIds.includes(a.id))

    if (nextAchievements.length === 0) return null

    // Find the closest achievement based on current progress
    return nextAchievements.reduce((closest, current) => {
      const currentProgress = current.id === "patient-farmer" ? successfulPurchases : totalCorn
      const closestProgress = closest.id === "patient-farmer" ? successfulPurchases : totalCorn

      const currentDistance = current.requirement - currentProgress
      const closestDistance = closest.requirement - closestProgress

      return currentDistance < closestDistance ? current : closest
    })
  }, [totalCorn, purchaseHistory, achievements])

  const purchaseCorn = useCallback(async () => {
    if (isRateLimited || isLoading) return

    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate rate limiting (20% chance)
    const shouldRateLimit = Math.random() < 0.2 && purchaseHistory.length > 0

    if (shouldRateLimit) {
      // Rate limited
      setIsRateLimited(true)
      setTimeUntilNextPurchase(60)

      const newPurchase: PurchaseHistory = {
        id: Date.now().toString(),
        timestamp: new Date(),
        amount: 0,
        success: false,
        message: "Has alcanzado el límite de compras. Espera 1 minuto.",
      }

      setPurchaseHistory((prev) => [newPurchase, ...prev.slice(0, 9)])

      // Start countdown timer
      const timer = setInterval(() => {
        setTimeUntilNextPurchase((prev) => {
          if (prev <= 1) {
            setIsRateLimited(false)
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      // Successful purchase
      const purchaseAmount = 200
      const newTotalCorn = totalCorn + purchaseAmount

      setTotalCorn(newTotalCorn)
      setIsRateLimited(true)
      setTimeUntilNextPurchase(60)

      const newPurchase: PurchaseHistory = {
        id: Date.now().toString(),
        timestamp: new Date(),
        amount: purchaseAmount,
        success: true,
        message: "¡Compra exitosa! Maíz fresco de la granja de Bob.",
      }

      const newHistory = [newPurchase, ...purchaseHistory.slice(0, 9)]
      setPurchaseHistory(newHistory)

      // Check for new achievements
      const successfulPurchases = newHistory.filter((p) => p.success).length
      checkAchievements(newTotalCorn, successfulPurchases)

      // Start countdown timer
      const timer = setInterval(() => {
        setTimeUntilNextPurchase((prev) => {
          if (prev <= 1) {
            setIsRateLimited(false)
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    setIsLoading(false)
  }, [isRateLimited, isLoading, totalCorn, purchaseHistory, checkAchievements])

  return {
    totalCorn,
    purchaseHistory,
    isRateLimited,
    timeUntilNextPurchase,
    isLoading,
    achievements,
    purchaseCorn,
    getNextAchievement,
  }
}
