"use client"

import { useState, useCallback } from "react"
import { cornAPI, type PurchaseResponse, type RateLimitResponse } from "../services/api"

export interface PurchaseHistory {
  id: string
  timestamp: Date
  amount: number
  success: boolean
  message?: string
}

export interface UseCornPurchaseReturn {
  totalCorn: number
  purchaseHistory: PurchaseHistory[]
  isRateLimited: boolean
  timeUntilNextPurchase: number
  isLoading: boolean
  error: string | null
  purchaseCorn: () => Promise<void>
  clearError: () => void
}

export const useCornPurchase = (): UseCornPurchaseReturn => {
  const [totalCorn, setTotalCorn] = useState(0)
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistory[]>([])
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [timeUntilNextPurchase, setTimeUntilNextPurchase] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const purchaseCorn = useCallback(async () => {
    if (isRateLimited || isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      const response: PurchaseResponse = await cornAPI.purchaseCorn()

      // Successful purchase
      setTotalCorn((prev) => prev + response.amount)
      setIsRateLimited(true)
      setTimeUntilNextPurchase(60) // Start 60-second countdown

      const newPurchase: PurchaseHistory = {
        id: response.purchaseId,
        timestamp: new Date(response.timestamp),
        amount: response.amount,
        success: true,
        message: response.message,
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
    } catch (error: any) {
      if (error.status === 429) {
        // Handle rate limiting
        const rateLimitData: RateLimitResponse = error.data
        setIsRateLimited(true)
        setTimeUntilNextPurchase(rateLimitData.retryAfter)

        const newPurchase: PurchaseHistory = {
          id: Date.now().toString(),
          timestamp: new Date(),
          amount: 0,
          success: false,
          message: rateLimitData.message,
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

        setError("Rate limited. Please wait before trying again.")
      } else {
        // Handle other errors - fallback to demo mode
        console.warn("API not available, falling back to demo mode:", error.message)

        // Simulate successful purchase for demo
        setTotalCorn((prev) => prev + 200)
        setIsRateLimited(true)
        setTimeUntilNextPurchase(60)

        const newPurchase: PurchaseHistory = {
          id: Date.now().toString(),
          timestamp: new Date(),
          amount: 200,
          success: true,
          message: "Demo purchase (API not available)",
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

        setError("Running in demo mode - API server not available")
      }
    } finally {
      setIsLoading(false)
    }
  }, [isRateLimited, isLoading])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    totalCorn,
    purchaseHistory,
    isRateLimited,
    timeUntilNextPurchase,
    isLoading,
    error,
    purchaseCorn,
    clearError,
  }
}
