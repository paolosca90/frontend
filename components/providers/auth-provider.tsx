"use client"

import { useEffect } from 'react'
import { useAuthStore, initializeAuth } from '@/lib/store/auth'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { refreshToken, isAuthenticated, token } = useAuthStore()

  useEffect(() => {
    // Initialize auth from stored data
    initializeAuth()

    // Set up token refresh interval if authenticated
    if (isAuthenticated && token) {
      // Refresh token every 30 minutes
      const refreshInterval = setInterval(() => {
        refreshToken()
      }, 30 * 60 * 1000)

      return () => clearInterval(refreshInterval)
    }
    return undefined
  }, [isAuthenticated, token, refreshToken])

  return <>{children}</>
}