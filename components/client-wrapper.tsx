"use client"

import type React from "react"

import { Suspense } from "react"

interface ClientWrapperProps {
  children: React.ReactNode
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto animate-pulse">
          🌽
        </div>
        <p className="text-gray-600">Cargando Bob's Corn Farm...</p>
      </div>
    </div>
  )
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  return <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
}
