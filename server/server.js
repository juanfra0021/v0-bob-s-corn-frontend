import express from "express"
import cors from "cors"
import rateLimit from "express-rate-limit"

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// In-memory storage for rate limiting (in production, use Redis or database)
const userPurchases = new Map()

// Rate limiter middleware - 1 request per minute per IP
const cornPurchaseRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 1, // limit each IP to 1 request per windowMs
  message: {
    error: "Too Many Requests",
    message: "You can only purchase corn once per minute. Please wait before trying again.",
    retryAfter: 60,
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      error: "Too Many Requests",
      message: "You can only purchase corn once per minute. Please wait before trying again.",
      retryAfter: 60,
    })
  },
})

// Custom rate limiting logic for more precise control
const checkRateLimit = (req, res, next) => {
  const clientId = req.ip || req.connection.remoteAddress
  const now = Date.now()
  const oneMinute = 60 * 1000

  if (userPurchases.has(clientId)) {
    const lastPurchase = userPurchases.get(clientId)
    const timeDiff = now - lastPurchase

    if (timeDiff < oneMinute) {
      const remainingTime = Math.ceil((oneMinute - timeDiff) / 1000)
      return res.status(429).json({
        error: "Too Many Requests",
        message: "You can only purchase corn once per minute. Please wait before trying again.",
        retryAfter: remainingTime,
        nextPurchaseAllowed: new Date(lastPurchase + oneMinute).toISOString(),
      })
    }
  }

  // Update last purchase time
  userPurchases.set(clientId, now)
  next()
}

// Routes
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    message: "Bob's Corn API is running!",
    timestamp: new Date().toISOString(),
  })
})

// Corn purchase endpoint with rate limiting
app.post("/api/purchase-corn", checkRateLimit, (req, res) => {
  try {
    // Simulate corn purchase logic
    const cornAmount = 200 // Bob gives 200 corn per purchase
    const purchaseId = `purchase_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Log the purchase (in production, save to database)
    console.log(`Corn purchase successful: ${cornAmount} corn for client ${req.ip}`)

    res.status(200).json({
      success: true,
      message: "Corn purchased successfully!",
      amount: cornAmount,
      purchaseId: purchaseId,
      timestamp: new Date().toISOString(),
      emoji: "🌽".repeat(Math.min(cornAmount / 50, 10)), // Visual representation
    })
  } catch (error) {
    console.error("Error processing corn purchase:", error)
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to process corn purchase. Please try again later.",
    })
  }
})

// Get rate limit status for a client
app.get("/api/rate-limit-status", (req, res) => {
  const clientId = req.ip || req.connection.remoteAddress
  const now = Date.now()
  const oneMinute = 60 * 1000

  if (userPurchases.has(clientId)) {
    const lastPurchase = userPurchases.get(clientId)
    const timeDiff = now - lastPurchase

    if (timeDiff < oneMinute) {
      const remainingTime = Math.ceil((oneMinute - timeDiff) / 1000)
      return res.json({
        rateLimited: true,
        remainingTime: remainingTime,
        nextPurchaseAllowed: new Date(lastPurchase + oneMinute).toISOString(),
        message: `Please wait ${remainingTime} seconds before your next purchase.`,
      })
    }
  }

  res.json({
    rateLimited: false,
    remainingTime: 0,
    message: "You can purchase corn now!",
  })
})

// Get purchase history (mock endpoint)
app.get("/api/purchase-history", (req, res) => {
  // In a real app, this would fetch from a database
  res.json({
    purchases: [],
    totalPurchases: 0,
    totalCorn: 0,
    message: "Purchase history would be stored in a database in production",
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err)
  res.status(500).json({
    error: "Internal Server Error",
    message: "Something went wrong on our end. Please try again later.",
  })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested endpoint does not exist.",
  })
})

app.listen(PORT, () => {
  console.log(`🌽 Bob's Corn API server running on port ${PORT}`)
  console.log(`🚀 Health check: http://localhost:${PORT}/api/health`)
  console.log(`🛒 Purchase corn: POST http://localhost:${PORT}/api/purchase-corn`)
})

export default app
