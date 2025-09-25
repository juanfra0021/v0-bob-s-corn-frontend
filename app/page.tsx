"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Chip,
  LinearProgress,
  Alert,
  AlertTitle,
  Box,
  Container,
  AppBar,
  Toolbar,
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material"
import {
  ShoppingCart,
  Wheat,
  Schedule,
  TrendingUp,
  EmojiEvents,
  AutoAwesome,
  ChevronRight,
  Home,
  History,
  Trophy,
} from "@mui/icons-material"
import { useCornPurchase } from "@/hooks/use-corn-purchase"

type Screen = "home" | "purchase" | "inventory" | "history"

export default function Page() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const {
    totalCorn,
    purchaseHistory,
    isRateLimited,
    timeUntilNextPurchase,
    isLoading,
    achievements,
    purchaseCorn,
    getNextAchievement,
  } = useCornPurchase()

  const nextAchievement = getNextAchievement()

  const screens = {
    home: "Inicio",
    purchase: "Comprar",
    inventory: "Inventario",
    history: "Historial",
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen onNavigate={setCurrentScreen} totalCorn={totalCorn} achievements={achievements} />
      case "purchase":
        return (
          <PurchaseScreen
            onPurchase={purchaseCorn}
            isRateLimited={isRateLimited}
            timeUntilNextPurchase={timeUntilNextPurchase}
            isLoading={isLoading}
          />
        )
      case "inventory":
        return <InventoryScreen totalCorn={totalCorn} achievements={achievements} nextAchievement={nextAchievement} />
      case "history":
        return <HistoryScreen purchaseHistory={purchaseHistory} />
      default:
        return <HomeScreen onNavigate={setCurrentScreen} totalCorn={totalCorn} achievements={achievements} />
    }
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Animated Background */}
      <Box sx={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              fontSize: "2rem",
              opacity: 0.1,
            }}
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
              y: (typeof window !== "undefined" ? window.innerHeight : 800) + 100,
              rotate: 0,
            }}
            animate={{
              y: -100,
              rotate: 360,
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          >
            🌽
          </motion.div>
        ))}
      </Box>

      <Box sx={{ position: "relative", zIndex: 10 }}>
        {/* Header */}
        <motion.div initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}>
          <AppBar position="sticky" sx={{ bgcolor: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(8px)" }}>
            <Toolbar>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexGrow: 1 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    background: "linear-gradient(135deg, #eab308 0%, #f59e0b 100%)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                  }}
                >
                  🌽
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ color: "text.primary", fontWeight: 700 }}>
                    Bob's Corn Farm
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Maíz fresco directo de la granja
                  </Typography>
                </Box>
              </Box>
              <Chip icon={<AutoAwesome />} label={`${totalCorn} 🌽`} color="secondary" variant="outlined" />
            </Toolbar>
          </AppBar>
        </motion.div>

        {/* Main Content */}
        <Container maxWidth="md" sx={{ py: 4 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </Container>

        {/* Bottom Navigation */}
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <Paper
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 50,
              bgcolor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(8px)",
            }}
            elevation={3}
          >
            <BottomNavigation value={currentScreen} onChange={(_, newValue) => setCurrentScreen(newValue)} showLabels>
              <BottomNavigationAction label="Inicio" value="home" icon={<Home />} />
              <BottomNavigationAction label="Comprar" value="purchase" icon={<ShoppingCart />} />
              <BottomNavigationAction label="Inventario" value="inventory" icon={<Wheat />} />
              <BottomNavigationAction label="Historial" value="history" icon={<History />} />
            </BottomNavigation>
          </Paper>
        </motion.div>
      </Box>
    </Box>
  )
}

// Home Screen Component
function HomeScreen({
  onNavigate,
  totalCorn,
  achievements,
}: {
  onNavigate: (screen: Screen) => void
  totalCorn: number
  achievements: any[]
}) {
  return (
    <Box sx={{ pb: 10 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card
          sx={{
            background: "linear-gradient(135deg, #eab308 0%, #f59e0b 100%)",
            color: "white",
            mb: 3,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  ¡Bienvenido a la granja!
                </Typography>
                <Typography sx={{ opacity: 0.9 }}>Compra maíz fresco con nuestra política de comercio justo</Typography>
              </Box>
              <Typography sx={{ fontSize: "4rem" }}>🌽</Typography>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card
              sx={{ cursor: "pointer", "&:hover": { boxShadow: 4 }, transition: "box-shadow 0.2s" }}
              onClick={() => onNavigate("purchase")}
            >
              <CardHeader
                avatar={<ShoppingCart color="success" />}
                title="Comprar Maíz"
                subheader="Máximo 1 maíz por minuto - Política de comercio justo"
              />
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: "success.main" }}>
                    200 🌽
                  </Typography>
                  <ChevronRight color="disabled" />
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card
              sx={{ cursor: "pointer", "&:hover": { boxShadow: 4 }, transition: "box-shadow 0.2s" }}
              onClick={() => onNavigate("inventory")}
            >
              <CardHeader
                avatar={<Wheat color="warning" />}
                title="Mi Inventario"
                subheader="Ve tu colección y logros desbloqueados"
              />
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: "warning.main" }}>
                    {totalCorn} 🌽
                  </Typography>
                  <ChevronRight color="disabled" />
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card>
          <CardHeader avatar={<EmojiEvents sx={{ color: "purple" }} />} title="Logros Recientes" />
          <CardContent>
            {achievements.length > 0 ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {achievements.slice(0, 3).map((achievement, index) => (
                  <Paper
                    key={index}
                    sx={{
                      p: 2,
                      bgcolor: "rgba(156, 39, 176, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Typography sx={{ fontSize: "1.5rem" }}>{achievement.icon}</Typography>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {achievement.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {achievement.description}
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </Box>
            ) : (
              <Typography color="text.secondary" sx={{ textAlign: "center", py: 2 }}>
                ¡Compra tu primer maíz para desbloquear logros!
              </Typography>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  )
}

// Purchase Screen Component
function PurchaseScreen({
  onPurchase,
  isRateLimited,
  timeUntilNextPurchase,
  isLoading,
}: {
  onPurchase: () => void
  isRateLimited: boolean
  timeUntilNextPurchase: number
  isLoading: boolean
}) {
  return (
    <Box sx={{ pb: 10 }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Card sx={{ textAlign: "center" }}>
          <CardContent sx={{ p: 4 }}>
            <Box
              sx={{
                width: 96,
                height: 96,
                background: "linear-gradient(135deg, #eab308 0%, #f59e0b 100%)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2.5rem",
                mx: "auto",
                mb: 3,
              }}
            >
              🌽
            </Box>
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
              Comprar Maíz Fresco
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
              Cada compra te da 200 🌽 de maíz orgánico
            </Typography>

            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: "success.main", mb: 1 }}>
                200 🌽
              </Typography>
              <Typography color="text.secondary">Por compra</Typography>
            </Box>

            {isRateLimited && (
              <Alert severity="warning" sx={{ mb: 3, textAlign: "left" }}>
                <AlertTitle>Límite de compra alcanzado</AlertTitle>
                Debes esperar {timeUntilNextPurchase} segundos antes de tu próxima compra. Esta política asegura un
                comercio justo para todos.
              </Alert>
            )}

            <Button
              onClick={onPurchase}
              disabled={isRateLimited || isLoading}
              variant="contained"
              color="success"
              size="large"
              fullWidth
              sx={{ py: 2, fontSize: "1.1rem", mb: 3 }}
              startIcon={
                isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : isRateLimited ? (
                  <Schedule />
                ) : (
                  <ShoppingCart />
                )
              }
            >
              {isLoading ? "Procesando..." : isRateLimited ? `Esperar ${timeUntilNextPurchase}s` : "Comprar Maíz"}
            </Button>

            <Paper sx={{ p: 3, bgcolor: "rgba(33, 150, 243, 0.1)" }}>
              <Typography variant="h6" sx={{ color: "primary.dark", mb: 1, fontWeight: 600 }}>
                Política de Comercio Justo
              </Typography>
              <Typography variant="body2" sx={{ color: "primary.dark" }}>
                Bob limita las compras a 1 maíz por minuto para mantener prácticas agrícolas sostenibles y asegurar que
                todos los clientes tengan acceso justo a productos frescos.
              </Typography>
            </Paper>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  )
}

// Inventory Screen Component
function InventoryScreen({
  totalCorn,
  achievements,
  nextAchievement,
}: {
  totalCorn: number
  achievements: any[]
  nextAchievement: any
}) {
  return (
    <Box sx={{ pb: 10 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card
          sx={{
            background: "linear-gradient(135deg, #16a34a 0%, #3b82f6 100%)",
            color: "white",
            mb: 3,
          }}
        >
          <CardContent sx={{ p: 4, textAlign: "center" }}>
            <Typography sx={{ fontSize: "4rem", mb: 2 }}>🌽</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
              {totalCorn}
            </Typography>
            <Typography sx={{ opacity: 0.9 }}>Total de maíz coleccionado</Typography>
          </CardContent>
        </Card>
      </motion.div>

      {nextAchievement && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card sx={{ mb: 3 }}>
            <CardHeader avatar={<TrendingUp color="primary" />} title="Próximo Logro" />
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography sx={{ fontSize: "2rem" }}>{nextAchievement.icon}</Typography>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {nextAchievement.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {nextAchievement.description}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={(totalCorn / nextAchievement.requirement) * 100}
                    sx={{ height: 8, borderRadius: 4, mb: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {totalCorn} / {nextAchievement.requirement} 🌽
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card>
          <CardHeader
            avatar={<Trophy sx={{ color: "gold" }} />}
            title={`Logros Desbloqueados (${achievements.length})`}
          />
          <CardContent>
            {achievements.length > 0 ? (
              <Grid container spacing={2}>
                {achievements.map((achievement, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Paper
                        sx={{
                          p: 2,
                          bgcolor: "rgba(255, 193, 7, 0.1)",
                          border: "1px solid rgba(255, 193, 7, 0.3)",
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <Typography sx={{ fontSize: "1.5rem" }}>{achievement.icon}</Typography>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "warning.dark" }}>
                            {achievement.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "warning.dark", opacity: 0.8 }}>
                            {achievement.description}
                          </Typography>
                        </Box>
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography sx={{ fontSize: "3rem", mb: 2 }}>🏆</Typography>
                <Typography color="text.secondary">¡Compra maíz para desbloquear logros!</Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  )
}

// History Screen Component
function HistoryScreen({ purchaseHistory }: { purchaseHistory: any[] }) {
  return (
    <Box sx={{ pb: 10 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card>
          <CardHeader
            avatar={<History color="primary" />}
            title="Historial de Compras"
            subheader={`Últimas ${purchaseHistory.length} transacciones`}
          />
          <CardContent>
            {purchaseHistory.length > 0 ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {purchaseHistory.map((purchase, index) => (
                  <motion.div
                    key={purchase.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Paper
                      sx={{
                        p: 2,
                        bgcolor: purchase.success ? "rgba(76, 175, 80, 0.1)" : "rgba(244, 67, 54, 0.1)",
                        border: purchase.success
                          ? "1px solid rgba(76, 175, 80, 0.3)"
                          : "1px solid rgba(244, 67, 54, 0.3)",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <Typography sx={{ fontSize: "1.5rem" }}>{purchase.success ? "🌽" : "⏰"}</Typography>
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {purchase.success ? `+${purchase.amount} maíz` : "Compra limitada"}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {purchase.timestamp.toLocaleString()}
                            </Typography>
                            {purchase.message && (
                              <Typography variant="caption" color="text.secondary">
                                {purchase.message}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                        <Chip
                          label={purchase.success ? "Exitoso" : "Fallido"}
                          color={purchase.success ? "success" : "error"}
                          size="small"
                        />
                      </Box>
                    </Paper>
                  </motion.div>
                ))}
              </Box>
            ) : (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography sx={{ fontSize: "3rem", mb: 2 }}>📋</Typography>
                <Typography color="text.secondary" sx={{ mb: 1 }}>
                  No hay compras registradas aún
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ¡Haz tu primera compra para ver el historial!
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  )
}
