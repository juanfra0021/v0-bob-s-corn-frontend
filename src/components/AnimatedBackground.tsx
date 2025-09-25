"use client"

import type React from "react"
import { Box } from "@mui/material"
import { motion } from "framer-motion"

const AnimatedBackground: React.FC = () => {
  const cornElements = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 30 + 20,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      {cornElements.map((corn) => (
        <motion.div
          key={corn.id}
          initial={{
            x: `${corn.x}vw`,
            y: `${corn.y}vh`,
            opacity: 0.1,
            scale: 0.5,
          }}
          animate={{
            y: [`${corn.y}vh`, `${corn.y - 20}vh`, `${corn.y}vh`],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1],
            scale: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: corn.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: corn.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            fontSize: `${corn.size}px`,
            color: "#F59E0B",
          }}
        >
          🌽
        </motion.div>
      ))}

      {/* Floating farm elements */}
      {[
        { emoji: "🚜", x: 10, y: 80, duration: 25 },
        { emoji: "🌾", x: 85, y: 15, duration: 18 },
        { emoji: "🏡", x: 75, y: 70, duration: 30 },
        { emoji: "☀️", x: 20, y: 10, duration: 40 },
        { emoji: "🌱", x: 60, y: 90, duration: 15 },
      ].map((element, index) => (
        <motion.div
          key={`farm-${index}`}
          initial={{
            x: `${element.x}vw`,
            y: `${element.y}vh`,
            opacity: 0.05,
          }}
          animate={{
            y: [`${element.y}vh`, `${element.y - 10}vh`, `${element.y}vh`],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: element.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            fontSize: "2rem",
          }}
        >
          {element.emoji}
        </motion.div>
      ))}
    </Box>
  )
}

export default AnimatedBackground
