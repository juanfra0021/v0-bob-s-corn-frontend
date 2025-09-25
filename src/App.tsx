"use client"

import { useState, useEffect } from "react"
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
  Alert,
  Snackbar,
  IconButton,
} from "@mui/material"
import { Agriculture, TrendingUp, Eco, Close, CloudOff, CheckCircle } from "@mui/icons-material"
import { motion, AnimatePresence } from "framer-motion"
import CornPurchaseInterface from "./components/CornPurchaseInterface"
import CornInventory from "./components/CornInventory"
import RateLimitStatus from "./components/RateLimitStatus"
import AnimatedBackground from "./components/AnimatedBackground"
import { useCornPurchase } from "./hooks/useCornPurchase"
import { cornAPI } from "./services/api"

function App() {
  const {
    totalCorn,
    purchaseHistory,
    isRateLimited,
    timeUntilNextPurchase,
    isLoading,
    error,
    purchaseCorn,
    clearError,
  } = useCornPurchase()

  const [apiStatus, setApiStatus] = useState<"checking" | "available" | "unavailable">("checking")
  const [showApiAlert, setShowApiAlert] = useState(false)

  useEffect(() => {
    const checkAPI = async () => {
      try {
        const isAvailable = await cornAPI.isAPIAvailable()
        setApiStatus(isAvailable ? "available" : "unavailable")
        if (!isAvailable) {
          setShowApiAlert(true)
        }
      } catch {
        setApiStatus("unavailable")
        setShowApiAlert(true)
      }
    }

    checkAPI()
  }, [])

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
        py: 4,
        position: "relative",
      }}
    >
      <AnimatedBackground />

      <Snackbar
        open={showApiAlert}
        autoHideDuration={6000}
        onClose={() => setShowApiAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={apiStatus === "available" ? "success" : "info"}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => setShowApiAlert(false)}>
              <Close fontSize="small" />
            </IconButton>
          }
          icon={apiStatus === "available" ? <CheckCircle /> : <CloudOff />}
        >
          {apiStatus === "available"
            ? "Connected to Bob's Corn API server!"
            : "Running in demo mode - API server not available"}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={clearError}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="warning" onClose={clearError}>
          {error}
        </Alert>
      </Snackbar>

      <Container maxWidth="lg">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mx: "auto",
                mb: 2,
                bgcolor: "primary.main",
                fontSize: "2rem",
              }}
            >
              🌽
            </Avatar>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                color: "text.primary",
                mb: 2,
                fontWeight: 800,
              }}
            >
              Bob's Corn Farm
            </Typography>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                color: "text.secondary",
                mb: 1,
                fontWeight: 400,
              }}
            >
              Fresh Corn Direct from the Farm
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 1, flexWrap: "wrap" }}>
              <Chip
                icon={<Eco />}
                label="100% Organic & Fair Trade"
                color="secondary"
                sx={{ fontSize: "1rem", py: 2 }}
              />
              <Chip
                icon={apiStatus === "available" ? <CheckCircle /> : <CloudOff />}
                label={apiStatus === "available" ? "Live API" : "Demo Mode"}
                color={apiStatus === "available" ? "success" : "default"}
                variant="outlined"
                sx={{ fontSize: "0.875rem" }}
              />
            </Box>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {/* Main Purchase Interface */}
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <CornPurchaseInterface
                onPurchase={purchaseCorn}
                isRateLimited={isRateLimited}
                timeUntilNextPurchase={timeUntilNextPurchase}
                isLoading={isLoading}
              />
            </motion.div>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {/* Corn Inventory */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <CornInventory totalCorn={totalCorn} />
              </motion.div>

              {/* Rate Limit Status */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <RateLimitStatus isRateLimited={isRateLimited} timeUntilNextPurchase={timeUntilNextPurchase} />
              </motion.div>

              {/* Purchase History */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <TrendingUp color="primary" />
                      Recent Purchases
                    </Typography>
                    <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
                      <AnimatePresence>
                        {purchaseHistory.map((purchase, index) => (
                          <motion.div
                            key={purchase.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <Box
                              sx={{
                                p: 2,
                                mb: 1,
                                bgcolor: purchase.success ? "success.light" : "error.light",
                                borderRadius: 2,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Box>
                                <Typography variant="body2" fontWeight={600}>
                                  {purchase.success ? `+${purchase.amount} 🌽` : "Rate Limited"}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {purchase.timestamp.toLocaleTimeString()}
                                </Typography>
                                {purchase.message && (
                                  <Typography variant="caption" display="block" color="text.secondary">
                                    {purchase.message}
                                  </Typography>
                                )}
                              </Box>
                              {purchase.success ? (
                                <Chip label="Success" color="success" size="small" />
                              ) : (
                                <Chip label="Failed" color="error" size="small" />
                              )}
                            </Box>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {purchaseHistory.length === 0 && (
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 2 }}>
                          No purchases yet. Buy your first corn! 🌽
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Box>
          </Grid>
        </Grid>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card sx={{ mt: 6, bgcolor: "primary.light", color: "primary.contrastText" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Agriculture />
                About Bob's Fair Trade Policy
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Bob is committed to fair farming practices. To ensure sustainable agriculture and fair distribution,
                each customer can purchase a maximum of 1 corn per minute. This helps maintain quality and supports our
                local farming community.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Chip label="🌽 Fresh Daily" variant="outlined" />
                <Chip label="🚜 Local Farm" variant="outlined" />
                <Chip label="⏰ Fair Rate Limiting" variant="outlined" />
                <Chip label="💚 Sustainable" variant="outlined" />
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  )
}

export default App
