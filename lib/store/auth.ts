import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  subscription?: {
    tier: 'FREE' | 'PREMIUM' | 'PRO'
    status: 'ACTIVE' | 'CANCELLED' | 'EXPIRED'
    expiresAt: string
  }
}

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean

  // Actions
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: (googleToken: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  refreshToken: () => Promise<void>
  clearError: () => void
  updateProfile: (updates: Partial<User>) => Promise<void>
}

// Get API base URL from environment
const API_BASE_URL = process.env['NEXT_PUBLIC_API_URL'] || 'https://aicash-revolution-server-production.up.railway.app'

// Configure axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null })

        try {
          const response = await api.post('/api/auth/login', { email, password })
          const { user, token } = response.data

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null
          })

          // Set token in axios headers for future requests
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`

        } catch (error: any) {
          const errorMessage = error.response?.data?.error || 'Login failed'
          set({
            error: errorMessage,
            isLoading: false,
            isAuthenticated: false
          })
          throw new Error(errorMessage)
        }
      },

      loginWithGoogle: async (googleToken: string) => {
        set({ isLoading: true, error: null })

        try {
          const response = await api.post('/api/auth/google', { token: googleToken })
          const { user, token } = response.data

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null
          })

          // Set token in axios headers
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`

        } catch (error: any) {
          const errorMessage = error.response?.data?.error || 'Google login failed'
          set({
            error: errorMessage,
            isLoading: false,
            isAuthenticated: false
          })
          throw new Error(errorMessage)
        }
      },

      register: async (email: string, password: string, name: string) => {
        set({ isLoading: true, error: null })

        try {
          const response = await api.post('/api/auth/register', {
            email,
            password,
            name
          })
          const { user, token } = response.data

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null
          })

          // Set token in axios headers
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`

        } catch (error: any) {
          const errorMessage = error.response?.data?.error || 'Registration failed'
          set({
            error: errorMessage,
            isLoading: false,
            isAuthenticated: false
          })
          throw new Error(errorMessage)
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null
        })

        // Remove token from axios headers
        delete api.defaults.headers.common['Authorization']
      },

      refreshToken: async () => {
        const { token } = get()
        if (!token) return

        try {
          const response = await api.post('/api/auth/refresh', {}, {
            headers: { Authorization: `Bearer ${token}` }
          })

          const { user, token: newToken } = response.data

          set({
            user,
            token: newToken,
            isAuthenticated: true
          })

          // Update token in axios headers
          api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`

        } catch (error) {
          // Token refresh failed, logout user
          get().logout()
        }
      },

      clearError: () => set({ error: null }),

      updateProfile: async (updates: Partial<User>) => {
        const { token, user } = get()
        if (!token || !user) return

        set({ isLoading: true })

        try {
          const response = await api.patch('/api/user/profile', updates, {
            headers: { Authorization: `Bearer ${token}` }
          })

          const updatedUser = response.data.user

          set({
            user: updatedUser,
            isLoading: false
          })

        } catch (error: any) {
          const errorMessage = error.response?.data?.error || 'Profile update failed'
          set({
            error: errorMessage,
            isLoading: false
          })
          throw new Error(errorMessage)
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
)

// Set up token from storage on app initialization
export const initializeAuth = () => {
  const { token } = useAuthStore.getState()
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}

// Export the configured axios instance for use in other parts of the app
export { api }