export interface PurchaseResponse {
  success: boolean
  message: string
  amount: number
  purchaseId: string
  timestamp: string
  emoji?: string
}

export interface RateLimitResponse {
  error: string
  message: string
  retryAfter: number
  nextPurchaseAllowed?: string
}

export interface RateLimitStatusResponse {
  rateLimited: boolean
  remainingTime: number
  nextPurchaseAllowed?: string
  message: string
}

export interface HealthResponse {
  status: string
  message: string
  timestamp: string
}

class CornAPI {
  private baseURL: string

  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || "/api"
  }

  async healthCheck(): Promise<HealthResponse> {
    try {
      const response = await fetch(`${this.baseURL}/health`)
      if (!response.ok) {
        throw new Error(`Health check failed: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error("Health check failed:", error)
      throw error
    }
  }

  async purchaseCorn(): Promise<PurchaseResponse> {
    try {
      const response = await fetch(`${this.baseURL}/purchase-corn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (response.status === 429) {
        // Rate limited - throw specific error
        const rateLimitError = new Error("Rate limited") as any
        rateLimitError.status = 429
        rateLimitError.data = data as RateLimitResponse
        throw rateLimitError
      }

      if (!response.ok) {
        throw new Error(data.message || `Purchase failed: ${response.status}`)
      }

      return data as PurchaseResponse
    } catch (error: any) {
      console.error("Purchase corn failed:", error)
      throw error
    }
  }

  async getRateLimitStatus(): Promise<RateLimitStatusResponse> {
    try {
      const response = await fetch(`${this.baseURL}/rate-limit-status`)
      if (!response.ok) {
        throw new Error(`Rate limit status check failed: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error("Rate limit status check failed:", error)
      throw error
    }
  }

  // Utility method to check if API is available
  async isAPIAvailable(): Promise<boolean> {
    try {
      await this.healthCheck()
      return true
    } catch {
      return false
    }
  }
}

export const cornAPI = new CornAPI()
