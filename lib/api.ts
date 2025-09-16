import axios from 'axios'

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds for signal generation
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('matrix_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('matrix_token')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// Authentication API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/api/auth/login', { email, password })
    return response.data
  },

  register: async (email: string, password: string, firstName?: string, lastName?: string) => {
    const response = await api.post('/api/auth/register', {
      email,
      password,
      firstName,
      lastName
    })
    return response.data
  },

  googleAuth: async (googleToken: string) => {
    const response = await api.post('/api/auth/google', { token: googleToken })
    return response.data
  },

  getCurrentUser: async () => {
    const response = await api.get('/api/auth/me')
    return response.data
  },

  logout: async () => {
    const response = await api.post('/api/auth/logout')
    return response.data
  }
}

// Trading Signals API
export const signalsAPI = {
  generateSignal: async (instrument?: string) => {
    const response = await api.post('/api/signals/generate', { instrument })
    return response.data
  },

  getSignals: async (limit?: number) => {
    const response = await api.get(`/api/signals${limit ? `?limit=${limit}` : ''}`)
    return response.data
  },

  getSignal: async (signalId: string) => {
    const response = await api.get(`/api/signals/${signalId}`)
    return response.data
  },

  updateSignal: async (signalId: string, updates: any) => {
    const response = await api.patch(`/api/signals/${signalId}`, updates)
    return response.data
  }
}

// Trading API
export const tradingAPI = {
  getInstruments: async () => {
    const response = await api.get('/api/trading/instruments')
    return response.data
  },

  getMarketData: async (instrument: string) => {
    const response = await api.get(`/api/trading/market-data/${instrument}`)
    return response.data
  },

  placeOrder: async (orderData: {
    instrument: string
    type: 'BUY' | 'SELL'
    size: number
    stopLoss?: number
    takeProfit?: number
  }) => {
    const response = await api.post('/api/trading/orders', orderData)
    return response.data
  },

  getPositions: async () => {
    const response = await api.get('/api/trading/positions')
    return response.data
  },

  closePosition: async (positionId: string) => {
    const response = await api.delete(`/api/trading/positions/${positionId}`)
    return response.data
  },

  modifyPosition: async (positionId: string, modifications: {
    stopLoss?: number
    takeProfit?: number
  }) => {
    const response = await api.patch(`/api/trading/positions/${positionId}`, modifications)
    return response.data
  }
}

// Portfolio API
export const portfolioAPI = {
  getPortfolio: async () => {
    const response = await api.get('/api/portfolio')
    return response.data
  },

  getTradeHistory: async (limit?: number) => {
    const response = await api.get(`/api/portfolio/history${limit ? `?limit=${limit}` : ''}`)
    return response.data
  },

  getPerformanceMetrics: async () => {
    const response = await api.get('/api/portfolio/metrics')
    return response.data
  },

  getAnalytics: async (period?: string) => {
    const response = await api.get(`/api/portfolio/analytics${period ? `?period=${period}` : ''}`)
    return response.data
  }
}

// WebSocket Connection for Real-time Updates
export class MatrixWebSocket {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000

  constructor(private url: string) {}

  connect(onMessage: (data: any) => void, onError?: (error: Event) => void) {
    try {
      const wsUrl = this.url.replace('http', 'ws')
      this.ws = new WebSocket(wsUrl)

      this.ws.onopen = () => {
        console.log('🔗 Matrix WebSocket connected')
        this.reconnectAttempts = 0
      }

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          onMessage(data)
        } catch (error) {
          console.error('❌ WebSocket message parsing error:', error)
        }
      }

      this.ws.onclose = () => {
        console.log('🔌 Matrix WebSocket disconnected')
        this.attemptReconnect(onMessage, onError)
      }

      this.ws.onerror = (error) => {
        console.error('❌ Matrix WebSocket error:', error)
        if (onError) onError(error)
      }
    } catch (error) {
      console.error('❌ WebSocket connection error:', error)
      if (onError) onError(error as Event)
    }
  }

  private attemptReconnect(onMessage: (data: any) => void, onError?: (error: Event) => void) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      console.log(`🔄 Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`)

      setTimeout(() => {
        this.connect(onMessage, onError)
      }, this.reconnectDelay * this.reconnectAttempts)
    } else {
      console.error('❌ Max reconnection attempts reached')
    }
  }

  send(data: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
    } else {
      console.error('❌ WebSocket not connected')
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN
  }
}

// Export the configured API instance
export default api

// Utility function to handle API errors
export const handleAPIError = (error: any): string => {
  if (error.response) {
    // Server responded with error status
    return error.response.data?.error || error.response.data?.message || 'Server error'
  } else if (error.request) {
    // Request was made but no response received
    return 'Network error - please check your connection'
  } else {
    // Something else happened
    return error.message || 'Unknown error occurred'
  }
}

// Types for API responses
export interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  subscriptionTier: 'FREE' | 'BASIC' | 'PRO' | 'ENTERPRISE'
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface TradingSignal {
  id: string
  instrument: string
  direction: 'BUY' | 'SELL'
  entryPrice: number
  stopLoss?: number
  takeProfit?: number
  confidence: number
  analysis: string[]
  aiReasoning: string
  status: 'ACTIVE' | 'EXECUTED' | 'EXPIRED'
  createdAt: string
  updatedAt: string
}

export interface MarketData {
  instrument: string
  bid: number
  ask: number
  spread: number
  high: number
  low: number
  volume: number
  timestamp: string
}

export interface Position {
  id: string
  instrument: string
  type: 'BUY' | 'SELL'
  size: number
  entryPrice: number
  currentPrice: number
  pnl: number
  pnlPercent: number
  stopLoss?: number
  takeProfit?: number
  openTime: string
}

export interface PortfolioSummary {
  totalBalance: number
  availableMargin: number
  usedMargin: number
  equity: number
  totalPnL: number
  dailyPnL: number
  winRate: number
  totalTrades: number
  activePositions: number
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH'
}