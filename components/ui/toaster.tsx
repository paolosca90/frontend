'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

interface ToasterContextType {
  toast: (message: string, type?: Toast['type'], duration?: number) => void
}

const ToasterContext = createContext<ToasterContextType | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToasterContext)
  if (!context) {
    throw new Error('useToast must be used within a ToasterProvider')
  }
  return context
}

interface ToasterProps {
  children?: ReactNode
}

export const Toaster: React.FC<ToasterProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback((message: string, type: Toast['type'] = 'info', duration = 5000) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: Toast = { id, message, type, duration }

    setToasts(prev => [...prev, newToast])

    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, duration)
    }
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const ToastComponent: React.FC<{ toast: Toast }> = ({ toast: t }) => {
    const typeStyles = {
      success: 'border-matrix-green text-matrix-bright shadow-[0_0_20px_rgba(0,255,136,0.5)]',
      error: 'border-red-500 text-red-400 shadow-[0_0_20px_rgba(255,0,0,0.5)]',
      warning: 'border-yellow-500 text-yellow-400 shadow-[0_0_20px_rgba(255,255,0,0.5)]',
      info: 'border-blue-500 text-blue-400 shadow-[0_0_20px_rgba(0,100,255,0.5)]'
    }

    return (
      <div
        className={`
          matrix-notification
          p-4 mb-4 rounded-none border
          font-mono text-sm
          animate-matrix-slide-in
          ${typeStyles[t.type]}
        `}
        onClick={() => removeToast(t.id)}
        style={{ cursor: 'pointer' }}
      >
        <div className="flex items-center space-x-2">
          <span className="text-xs opacity-70">
            {t.type.toUpperCase()}:
          </span>
          <span>{t.message}</span>
        </div>
      </div>
    )
  }

  if (typeof document === 'undefined') {
    return null
  }

  return (
    <ToasterContext.Provider value={{ toast }}>
      {children}
      {createPortal(
        <div className="fixed top-4 right-4 z-50 max-w-md w-full">
          {toasts.map(t => (
            <ToastComponent key={t.id} toast={t} />
          ))}
        </div>,
        document.body
      )}
    </ToasterContext.Provider>
  )
}

// Simple version for layout.tsx
export const SimpleToaster: React.FC = () => {
  return <div id="toast-root" className="fixed top-4 right-4 z-50 max-w-md w-full" />
}