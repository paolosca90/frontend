'use client'

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import axios from 'axios'

interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  subscriptionTier: 'FREE' | 'BASIC' | 'PRO' | 'ENTERPRISE'
  isActive: boolean
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>
  logout: () => void
  googleLogin: (googleToken: string) => Promise<void>
  error: string | null
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

const API_BASE_URL = process.env['NEXT_PUBLIC_API_URL'] || 'http://localhost:3000'

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password
      })

      const { token, user: userData } = response.data

      // Store token in localStorage
      localStorage.setItem('matrix_token', token)

      // Set authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      setUser(userData)
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Login failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(async (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  ) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        email,
        password,
        firstName,
        lastName
      })

      const { token, user: userData } = response.data

      // Store token in localStorage
      localStorage.setItem('matrix_token', token)

      // Set authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      setUser(userData)
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Registration failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const googleLogin = useCallback(async (googleToken: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/google`, {
        token: googleToken
      })

      const { token, user: userData } = response.data

      // Store token in localStorage
      localStorage.setItem('matrix_token', token)

      // Set authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      setUser(userData)
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Google login failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    // Remove token from localStorage
    localStorage.removeItem('matrix_token')

    // Remove authorization header
    delete axios.defaults.headers.common['Authorization']

    setUser(null)
    setError(null)
  }, [])

  // Check for existing token on mount
  useEffect(() => {
    const checkExistingAuth = async () => {
      const token = localStorage.getItem('matrix_token')

      if (token) {
        try {
          // Set authorization header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

          // Validate token with backend
          const response = await axios.get(`${API_BASE_URL}/api/auth/me`)
          setUser(response.data.user)
        } catch (err) {
          // Token is invalid, remove it
          localStorage.removeItem('matrix_token')
          delete axios.defaults.headers.common['Authorization']
        }
      }

      setIsLoading(false)
    }

    checkExistingAuth()
  }, [])

  const contextValue: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    googleLogin,
    error,
    clearError
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}