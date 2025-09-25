"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, Typography, Box, LinearProgress, Grid, Paper, Divider, Tooltip } from "@mui/material"
import { Inventory, TrendingUp, EmojiEvents, ShowChart } from "@mui/icons-material"
import { motion, AnimatePresence } from "framer-motion"

interface CornInventoryProps {
  totalCorn: number
}

interface Achievement {
  id: string
  title: string
  description: string
  threshold: number
  icon: string
  unlocked: boolean
}

const CornInventory: React.FC<CornInventoryProps> = ({ totalCorn }) => {
  const [previousCorn, setPreviousCorn] = useState(0)
  const [showGrowthAnimation, setShowGrowthAnimation] = useState(false)
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "first_purchase",
      title: "First Harvest",
      description: "Made your first corn purchase",
      threshold: 200,
      icon: "🌱",
      unlocked: false,
    },
    {
      id: "corn_collector",
      title: "Corn Collector",
      description: "Collected 1,000 corn",
      threshold: 1000,
      icon: "🌽",
      unlocked: false,
    },
    {
      id: "farm_supporter",
      title: "Farm Supporter",
      description: "Collected 2,500 corn",
      threshold: 2500,
      icon: "🚜",
      unlocked: false,
    },
    {
      id: "corn_master",
      title: "Corn Master",
      description: "Collected 5,000 corn",
      threshold: 5000,
      icon: "👑",
      unlocked: false,
    },
  ])

  const maxDisplay = 5000
  const progress = Math.min((totalCorn / maxDisplay) * 100, 100)
  const cornGrowth = totalCorn - previousCorn

  useEffect(() => {
    if (totalCorn > previousCorn) {
      setShowGrowthAnimation(true)
      setTimeout(() => setShowGrowthAnimation(false), 2000)

      // Check for new achievements
      setAchievements((prev) =>
        prev.map((achievement) => ({
          ...achievement,
          unlocked: totalCorn >= achievement.threshold,
        })),
      )
    }
    setPreviousCorn(totalCorn)
  }, [totalCorn, previousCorn])

  const unlockedAchievements = achievements.filter((a) => a.unlocked)
  const nextAchievement = achievements.find((a) => !a.unlocked)

  const farmingStats = {
    efficiency: Math.min((totalCorn / 1000) * 100, 100),
    sustainability: Math.min((unlockedAchievements.length / achievements.length) * 100, 100),
    impact: Math.min((totalCorn / 2000) * 100, 100),
  }

  return (
    <Card sx={{ position: "relative", overflow: "visible" }}>
      <AnimatePresence>
        {showGrowthAnimation && cornGrowth > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: -30 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: -20,
              right: 20,
              zIndex: 1000,
              background: "linear-gradient(45deg, #4CAF50, #8BC34A)",
              color: "white",
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "0.875rem",
              fontWeight: 600,
              boxShadow: "0 4px 12px rgba(76, 175, 80, 0.3)",
            }}
          >
            +{cornGrowth} 🌽
          </motion.div>
        )}
      </AnimatePresence>

      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Inventory color="primary" />
          Your Corn Inventory
        </Typography>

        <Box sx={{ textAlign: "center", py: 3 }}>
          <motion.div
            key={totalCorn}
            initial={{ scale: 1 }}
            animate={{ scale: showGrowthAnimation ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 300 }}
          >
            <Typography
              variant="h2"
              component="div"
              color="primary"
              sx={{
                fontWeight: 800,
                mb: 1,
                textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                background: "linear-gradient(45deg, #F59E0B, #D97706)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {totalCorn.toLocaleString()}🌽
            </Typography>
          </motion.div>

          <Typography variant="body1" color="text.secondary" gutterBottom sx={{ fontWeight: 500 }}>
            Total Corn Harvested
          </Typography>

          <Box sx={{ mt: 3, mb: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Progress to {maxDisplay.toLocaleString()} milestone
              </Typography>
              <Typography variant="caption" color="primary" fontWeight={600}>
                {progress.toFixed(1)}%
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 12,
                borderRadius: 6,
                bgcolor: "grey.200",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 6,
                  background: "linear-gradient(90deg, #F59E0B, #10B981)",
                },
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
              {[0, 1000, 2500, 5000].map((milestone, index) => (
                <Box key={milestone} sx={{ textAlign: "center" }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: totalCorn >= milestone ? "success.main" : "grey.300",
                      mx: "auto",
                      mb: 0.5,
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {milestone.toLocaleString()}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ShowChart color="primary" />
            Farming Statistics
          </Typography>

          <Grid container spacing={2}>
            {[
              { label: "Efficiency", value: farmingStats.efficiency, icon: "⚡", color: "warning" },
              { label: "Sustainability", value: farmingStats.sustainability, icon: "🌱", color: "success" },
              { label: "Impact", value: farmingStats.impact, icon: "💚", color: "info" },
            ].map((stat, index) => (
              <Grid item xs={4} key={stat.label}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Paper
                    elevation={1}
                    sx={{
                      p: 1.5,
                      textAlign: "center",
                      bgcolor: `${stat.color}.light`,
                      color: `${stat.color}.dark`,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontSize: "1.2rem" }}>
                      {stat.icon}
                    </Typography>
                    <Typography variant="caption" display="block" fontWeight={600}>
                      {stat.value.toFixed(0)}%
                    </Typography>
                    <Typography variant="caption" display="block">
                      {stat.label}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <EmojiEvents color="primary" />
            Achievements ({unlockedAchievements.length}/{achievements.length})
          </Typography>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Tooltip
                  title={
                    <Box>
                      <Typography variant="subtitle2">{achievement.title}</Typography>
                      <Typography variant="caption">{achievement.description}</Typography>
                      <Typography variant="caption" display="block">
                        {achievement.unlocked ? "Unlocked!" : `Requires ${achievement.threshold.toLocaleString()} corn`}
                      </Typography>
                    </Box>
                  }
                >
                  <Paper
                    elevation={achievement.unlocked ? 3 : 1}
                    sx={{
                      p: 1,
                      minWidth: 40,
                      textAlign: "center",
                      bgcolor: achievement.unlocked ? "warning.light" : "grey.100",
                      opacity: achievement.unlocked ? 1 : 0.5,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <Typography variant="h6" sx={{ fontSize: "1.5rem" }}>
                      {achievement.icon}
                    </Typography>
                  </Paper>
                </Tooltip>
              </motion.div>
            ))}
          </Box>

          {nextAchievement && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  bgcolor: "info.light",
                  border: "1px solid",
                  borderColor: "info.main",
                }}
              >
                <Typography variant="body2" fontWeight={600} color="info.dark" gutterBottom>
                  Next Achievement: {nextAchievement.title} {nextAchievement.icon}
                </Typography>
                <Typography variant="caption" color="info.dark" display="block" sx={{ mb: 1 }}>
                  {nextAchievement.description}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(totalCorn / nextAchievement.threshold) * 100}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    bgcolor: "info.lighter",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 3,
                      bgcolor: "info.main",
                    },
                  }}
                />
                <Typography variant="caption" color="info.dark" sx={{ mt: 0.5, display: "block" }}>
                  {totalCorn.toLocaleString()} / {nextAchievement.threshold.toLocaleString()} corn
                </Typography>
              </Paper>
            </motion.div>
          )}
        </Box>

        {totalCorn > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Box
              sx={{
                mt: 3,
                p: 2,
                bgcolor: "success.light",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <TrendingUp color="success" />
              <Box>
                <Typography variant="body2" fontWeight={600} color="success.dark">
                  Excellent Progress! 🎉
                </Typography>
                <Typography variant="caption" color="success.dark">
                  You're making a real difference supporting sustainable farming practices
                </Typography>
              </Box>
            </Box>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

export default CornInventory
