"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ShoppingCart,
  Wheat,
  Clock,
  TrendingUp,
  Award,
  Sparkles,
  ChevronRight,
  Home,
  History,
  Trophy,
} from "lucide-react"
import { useCornPurchase } from "@/hooks/use-corn-purchase"

type Screen = "home" | "purchase" | "inventory" | "history"

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [windowDimensions, setWindowDimensions] = useState({ width: 1200, height: 800 })
  const [isClient, setIsClient] = useState(false)

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

  useEffect(() => {
    setIsClient(true)
    if (typeof window !== "undefined") {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })

      const handleResize = () => {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }

      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {isClient &&
          [...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl opacity-10"
              initial={{
                x: Math.random() * windowDimensions.width,
                y: windowDimensions.height + 100,
                rotate: 0,
              }}
              animate={{
                y: -100,
                rotate: 360,
                x: Math.random() * windowDimensions.width,
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
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.header
          className="bg-white/80 backdrop-blur-sm border-b border-yellow-200 sticky top-0 z-50"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl">
                  🌽
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Bob's Corn Farm</h1>
                  <p className="text-sm text-gray-600">Maíz fresco directo de la granja</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Sparkles className="w-4 h-4 mr-1" />
                {totalCorn} 🌽
              </Badge>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
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
        </main>

        {/* Bottom Navigation */}
        <motion.nav
          className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-yellow-200 z-50"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="container mx-auto px-4">
            <div className="flex justify-around py-3">
              {Object.entries(screens).map(([key, label]) => {
                const isActive = currentScreen === key
                const icons = {
                  home: Home,
                  purchase: ShoppingCart,
                  inventory: Wheat,
                  history: History,
                }
                const Icon = icons[key as keyof typeof icons]

                return (
                  <Button
                    key={key}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentScreen(key as Screen)}
                    className={`flex flex-col gap-1 h-auto py-2 px-3 ${
                      isActive ? "bg-yellow-500 hover:bg-yellow-600" : ""
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs">{label}</span>
                  </Button>
                )
              })}
            </div>
          </div>
        </motion.nav>
      </div>
    </div>
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
    <div className="space-y-6 pb-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">¡Bienvenido a la granja!</h2>
                <p className="text-yellow-100">Compra maíz fresco con nuestra política de comercio justo</p>
              </div>
              <div className="text-6xl">🌽</div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate("purchase")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-green-600" />
                Comprar Maíz
              </CardTitle>
              <CardDescription>Máximo 1 maíz por minuto - Política de comercio justo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-600">200 🌽</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate("inventory")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wheat className="w-5 h-5 text-yellow-600" />
                Mi Inventario
              </CardTitle>
              <CardDescription>Ve tu colección y logros desbloqueados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-yellow-600">{totalCorn} 🌽</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              Logros Recientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {achievements.length > 0 ? (
              <div className="space-y-2">
                {achievements.slice(0, 3).map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-purple-50 rounded-lg">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <p className="font-medium">{achievement.name}</p>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">¡Compra tu primer maíz para desbloquear logros!</p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
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
    <div className="space-y-6 pb-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-4xl mb-4">
              🌽
            </div>
            <CardTitle className="text-2xl">Comprar Maíz Fresco</CardTitle>
            <CardDescription>Cada compra te da 200 🌽 de maíz orgánico</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">200 🌽</div>
              <p className="text-gray-600">Por compra</p>
            </div>

            {isRateLimited && (
              <Alert>
                <Clock className="h-4 w-4" />
                <AlertDescription>
                  Debes esperar {timeUntilNextPurchase} segundos antes de tu próxima compra. Esta política asegura un
                  comercio justo para todos.
                </AlertDescription>
              </Alert>
            )}

            <Button
              onClick={onPurchase}
              disabled={isRateLimited || isLoading}
              size="lg"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                />
              ) : isRateLimited ? (
                `Esperar ${timeUntilNextPurchase}s`
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Comprar Maíz
                </>
              )}
            </Button>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Política de Comercio Justo</h3>
              <p className="text-blue-800 text-sm">
                Bob limita las compras a 1 maíz por minuto para mantener prácticas agrícolas sostenibles y asegurar que
                todos los clientes tengan acceso justo a productos frescos.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
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
    <div className="space-y-6 pb-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-6xl mb-4">🌽</div>
              <h2 className="text-3xl font-bold mb-2">{totalCorn}</h2>
              <p className="text-green-100">Total de maíz coleccionado</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {nextAchievement && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Próximo Logro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <span className="text-3xl">{nextAchievement.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold">{nextAchievement.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{nextAchievement.description}</p>
                  <Progress value={(totalCorn / nextAchievement.requirement) * 100} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    {totalCorn} / {nextAchievement.requirement} 🌽
                  </p>
                </div>
              </div>
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
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              Logros Desbloqueados ({achievements.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {achievements.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                  >
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <h4 className="font-medium text-yellow-900">{achievement.name}</h4>
                      <p className="text-sm text-yellow-700">{achievement.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🏆</div>
                <p className="text-gray-500">¡Compra maíz para desbloquear logros!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

// History Screen Component
function HistoryScreen({ purchaseHistory }: { purchaseHistory: any[] }) {
  return (
    <div className="space-y-6 pb-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5 text-blue-600" />
              Historial de Compras
            </CardTitle>
            <CardDescription>Últimas {purchaseHistory.length} transacciones</CardDescription>
          </CardHeader>
          <CardContent>
            {purchaseHistory.length > 0 ? (
              <div className="space-y-3">
                {purchaseHistory.map((purchase, index) => (
                  <motion.div
                    key={purchase.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-4 rounded-lg border ${
                      purchase.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{purchase.success ? "🌽" : "⏰"}</span>
                        <div>
                          <p className="font-medium">
                            {purchase.success ? `+${purchase.amount} maíz` : "Compra limitada"}
                          </p>
                          <p className="text-sm text-gray-600">{purchase.timestamp.toLocaleString()}</p>
                          {purchase.message && <p className="text-xs text-gray-500 mt-1">{purchase.message}</p>}
                        </div>
                      </div>
                      <Badge
                        variant={purchase.success ? "default" : "destructive"}
                        className={purchase.success ? "bg-green-600" : ""}
                      >
                        {purchase.success ? "Exitoso" : "Fallido"}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📋</div>
                <p className="text-gray-500">No hay compras registradas aún</p>
                <p className="text-sm text-gray-400 mt-2">¡Haz tu primera compra para ver el historial!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
