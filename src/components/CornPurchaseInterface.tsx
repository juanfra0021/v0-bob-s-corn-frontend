"use client"

import type React from "react"
import { useState } from "react"
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Paper,
  IconButton,
  CircularProgress,
} from "@mui/material"
import { ShoppingCart, Timer, CheckCircle, Agriculture, Eco, Star, Favorite } from "@mui/icons-material"
import { motion, AnimatePresence } from "framer-motion"

interface CornPurchaseInterfaceProps {
  onPurchase: () => void
  isRateLimited: boolean
  timeUntilNextPurchase: number
  isLoading?: boolean // Added loading state prop
}

const CornPurchaseInterface: React.FC<CornPurchaseInterfaceProps> = ({
  onPurchase,
  isRateLimited,
  timeUntilNextPurchase,
  isLoading = false, // Default loading state
}) => {
  const [showSuccess, setShowSuccess] = useState(false)
  const [cornParticles, setCornParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  const steps = ["Select Premium Corn", "Confirm Fair Trade Purchase", "Receive Fresh Corn"]

  const activeStep = isRateLimited ? 2 : 0

  const handlePurchaseClick = () => {
    if (isLoading || isRateLimited) return

    // Create corn particle animation
    const particles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 300,
      y: Math.random() * 200,
    }))
    setCornParticles(particles)

    // Clear particles after animation
    setTimeout(() => setCornParticles([]), 2000)

    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)

    onPurchase()
  }

  return (
    <Card sx={{ height: "fit-content", position: "relative", overflow: "visible" }}>
      {/* Floating corn particles */}
      <AnimatePresence>
        {cornParticles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              opacity: 1,
              scale: 1,
              x: particle.x,
              y: particle.y,
              rotate: 0,
            }}
            animate={{
              opacity: 0,
              scale: 0.5,
              y: particle.y - 100,
              rotate: 360,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{
              position: "absolute",
              fontSize: "2rem",
              pointerEvents: "none",
              zIndex: 1000,
            }}
          >
            🌽
          </motion.div>
        ))}
      </AnimatePresence>

      <CardContent sx={{ p: 4 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Typography variant="h4" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            >
              <ShoppingCart color="primary" />
            </motion.div>
            Purchase Fresh Corn
          </Typography>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Get premium quality corn directly from Bob's sustainable farm. Each purchase gives you 200🌽 of fresh,
            organic corn!
          </Typography>
        </motion.div>

        {/* Enhanced Steps with animations */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  StepIconComponent={({ active, completed }) => (
                    <motion.div
                      animate={active ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 1, repeat: active ? Number.POSITIVE_INFINITY : 0 }}
                    >
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          bgcolor: completed ? "success.main" : active ? "primary.main" : "grey.300",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontSize: "0.875rem",
                          fontWeight: 600,
                        }}
                      >
                        {completed ? <CheckCircle /> : index + 1}
                      </Box>
                    </motion.div>
                  )}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </motion.div>

        {/* Enhanced Purchase Section with more animations */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              bgcolor: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
              borderRadius: 3,
              mb: 3,
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background decoration */}
            <Box
              sx={{
                position: "absolute",
                top: -20,
                right: -20,
                width: 100,
                height: 100,
                borderRadius: "50%",
                bgcolor: "primary.light",
                opacity: 0.1,
              }}
            />

            <motion.div
              animate={{
                scale: isRateLimited ? 1 : [1, 1.1, 1],
                rotate: isRateLimited ? 0 : [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: isRateLimited ? 0 : Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <Typography variant="h1" sx={{ fontSize: "5rem", mb: 2, textShadow: "2px 2px 4px rgba(0,0,0,0.1)" }}>
                🌽
              </Typography>
            </motion.div>

            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: "primary.dark" }}>
              Premium Organic Corn
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
              <motion.div whileHover={{ scale: 1.1 }}>
                <IconButton sx={{ bgcolor: "success.light", color: "success.dark" }}>
                  <Eco />
                </IconButton>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <IconButton sx={{ bgcolor: "warning.light", color: "warning.dark" }}>
                  <Star />
                </IconButton>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <IconButton sx={{ bgcolor: "error.light", color: "error.dark" }}>
                  <Favorite />
                </IconButton>
              </motion.div>
            </Box>

            <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 600 }}>
              200🌽 per purchase
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Fresh, organic corn harvested daily from sustainable farms
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 1, flexWrap: "wrap" }}>
              {["🌱 Organic", "🚜 Local", "💚 Sustainable", "⭐ Premium"].map((tag, index) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                >
                  <Paper
                    elevation={1}
                    sx={{
                      px: 2,
                      py: 0.5,
                      bgcolor: "white",
                      borderRadius: 2,
                      fontSize: "0.875rem",
                    }}
                  >
                    {tag}
                  </Paper>
                </motion.div>
              ))}
            </Box>
          </Paper>
        </motion.div>

        {/* Enhanced Rate Limit Alert */}
        <AnimatePresence>
          {isRateLimited && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Alert
                severity="warning"
                icon={
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Timer />
                  </motion.div>
                }
                sx={{ mb: 3, borderRadius: 2 }}
              >
                <Typography variant="body2">
                  <strong>Fair Trade Cooldown:</strong> Please wait {timeUntilNextPurchase} seconds before your next
                  purchase. This ensures sustainable farming and fair distribution for all customers! 🌱
                </Typography>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Purchase Button */}
        <motion.div
          whileHover={{ scale: isRateLimited || isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isRateLimited || isLoading ? 1 : 0.98 }}
        >
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handlePurchaseClick}
            disabled={isRateLimited || isLoading} // Disable when loading
            startIcon={
              <motion.div
                animate={isRateLimited || isLoading ? {} : { rotate: [0, 360] }}
                transition={{
                  duration: 2,
                  repeat: isRateLimited || isLoading ? 0 : Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                {isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : isRateLimited ? (
                  <Timer />
                ) : (
                  <ShoppingCart />
                )}
              </motion.div>
            }
            sx={{
              py: 2.5,
              fontSize: "1.3rem",
              fontWeight: 700,
              background:
                isRateLimited || isLoading
                  ? "linear-gradient(45deg, #9E9E9E 30%, #BDBDBD 90%)"
                  : "linear-gradient(45deg, #F59E0B 30%, #D97706 90%)",
              boxShadow:
                isRateLimited || isLoading
                  ? "0 3px 5px 2px rgba(158, 158, 158, .3)"
                  : "0 3px 5px 2px rgba(245, 158, 11, .3)",
              "&:hover": {
                background:
                  isRateLimited || isLoading
                    ? "linear-gradient(45deg, #9E9E9E 30%, #BDBDBD 90%)"
                    : "linear-gradient(45deg, #D97706 30%, #B45309 90%)",
              },
            }}
          >
            {isLoading
              ? "Processing Purchase..."
              : isRateLimited
                ? `Cooling Down... ${timeUntilNextPurchase}s`
                : "Buy Fresh Corn (200🌽)"}
          </Button>
        </motion.div>

        {/* Enhanced Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
            >
              <Alert
                severity="success"
                icon={
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.6, repeat: 2 }}>
                    <CheckCircle />
                  </motion.div>
                }
                sx={{
                  mt: 2,
                  borderRadius: 2,
                  bgcolor: "success.light",
                  "& .MuiAlert-message": {
                    fontSize: "1rem",
                  },
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  🎉 Corn purchased successfully! Thank you for supporting Bob's sustainable farm! 🌽✨
                </Typography>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Additional Info Section */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}>
          <Box
            sx={{
              mt: 3,
              p: 2,
              bgcolor: "info.light",
              borderRadius: 2,
              border: "1px solid",
              borderColor: "info.main",
            }}
          >
            <Typography variant="body2" color="info.dark" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Agriculture />
              <strong>Bob's Promise:</strong> Every purchase supports sustainable farming practices and helps maintain
              fair prices for our farming community. 🌱
            </Typography>
          </Box>
        </motion.div>
      </CardContent>
    </Card>
  )
}

export default CornPurchaseInterface
