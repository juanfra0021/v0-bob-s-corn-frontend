"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, Typography, Box, CircularProgress, Chip, LinearProgress, Paper, Grid } from "@mui/material"
import { Timer, CheckCircle, Schedule, Speed, AccessTime, TrendingUp } from "@mui/icons-material"
import { motion, AnimatePresence } from "framer-motion"

interface RateLimitStatusProps {
  isRateLimited: boolean
  timeUntilNextPurchase: number
}

const RateLimitStatus: React.FC<RateLimitStatusProps> = ({ isRateLimited, timeUntilNextPurchase }) => {
  const [totalWaitTime, setTotalWaitTime] = useState(0)
  const [purchaseCount, setPurchaseCount] = useState(0)

  const progress = isRateLimited ? ((60 - timeUntilNextPurchase) / 60) * 100 : 100

  useEffect(() => {
    if (isRateLimited && timeUntilNextPurchase === 60) {
      setPurchaseCount((prev) => prev + 1)
      setTotalWaitTime((prev) => prev + 60)
    }
  }, [isRateLimited, timeUntilNextPurchase])

  const efficiency = purchaseCount > 0 ? ((purchaseCount * 60) / (totalWaitTime + purchaseCount * 60)) * 100 : 0
  const avgWaitTime = purchaseCount > 0 ? totalWaitTime / purchaseCount : 0

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Schedule color="primary" />
          Purchase Status
        </Typography>

        <Box sx={{ textAlign: "center", py: 2 }}>
          <AnimatePresence mode="wait">
            {isRateLimited ? (
              <motion.div
                key="rate-limited"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{ position: "relative", display: "inline-flex", mb: 2 }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <CircularProgress
                      variant="determinate"
                      value={progress}
                      size={100}
                      thickness={6}
                      sx={{
                        color: "warning.main",
                        "& .MuiCircularProgress-circle": {
                          strokeLinecap: "round",
                        },
                      }}
                    />
                  </motion.div>
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Typography variant="h5" component="div" color="warning.main" fontWeight={700}>
                        {timeUntilNextPurchase}
                      </Typography>
                    </motion.div>
                    <Typography variant="caption" color="text.secondary">
                      seconds
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            ) : (
              <motion.div
                key="ready"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <CheckCircle sx={{ fontSize: 100, color: "success.main", mb: 2 }} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            {isRateLimited ? "Fair Trade Cooldown" : "Ready to Purchase!"}
          </Typography>

          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
            <Chip
              icon={isRateLimited ? <Timer /> : <CheckCircle />}
              label={isRateLimited ? "Rate Limited" : "Available"}
              color={isRateLimited ? "warning" : "success"}
              variant="filled"
              sx={{
                fontSize: "0.875rem",
                fontWeight: 600,
                px: 2,
                py: 1,
              }}
            />
          </motion.div>
        </Box>

        {purchaseCount > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                mb: 2,
                bgcolor: "primary.light",
                color: "primary.contrastText",
              }}
            >
              <Typography variant="subtitle2" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <TrendingUp />
                Your Purchase Stats
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h6" fontWeight={700}>
                      {purchaseCount}
                    </Typography>
                    <Typography variant="caption">Purchases</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h6" fontWeight={700}>
                      {efficiency.toFixed(0)}%
                    </Typography>
                    <Typography variant="caption">Efficiency</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h6" fontWeight={700}>
                      {Math.round(avgWaitTime)}s
                    </Typography>
                    <Typography variant="caption">Avg Wait</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        )}

        {isRateLimited && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Cooldown Progress
                </Typography>
                <Typography variant="caption" color="warning.main" fontWeight={600}>
                  {progress.toFixed(0)}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: "grey.200",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 4,
                    background: "linear-gradient(90deg, #FF9800, #F57C00)",
                  },
                }}
              />
            </Box>
          </motion.div>
        )}

        <Box
          sx={{
            mt: 2,
            p: 2,
            bgcolor: "info.light",
            borderRadius: 2,
            border: "1px solid",
            borderColor: "info.main",
          }}
        >
          <Typography variant="body2" color="info.dark" sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
            <AccessTime sx={{ fontSize: "1.2rem", mt: 0.1 }} />
            <Box>
              <Typography variant="body2" fontWeight={600} color="info.dark" gutterBottom>
                Fair Trade Policy
              </Typography>
              <Typography variant="caption" color="info.dark">
                Maximum 1 purchase per minute ensures sustainable farming practices and fair distribution. This policy
                supports our local farming community and maintains premium quality standards.
              </Typography>
            </Box>
          </Typography>
        </Box>

        {!isRateLimited && purchaseCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Box
              sx={{
                mt: 2,
                p: 2,
                bgcolor: "success.light",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "success.main",
              }}
            >
              <Typography variant="body2" color="success.dark" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Speed />
                <Box>
                  <Typography variant="body2" fontWeight={600} color="success.dark">
                    Perfect Timing! 🎯
                  </Typography>
                  <Typography variant="caption" color="success.dark">
                    You're ready for your next purchase. Keep supporting sustainable farming!
                  </Typography>
                </Box>
              </Typography>
            </Box>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

export default RateLimitStatus
