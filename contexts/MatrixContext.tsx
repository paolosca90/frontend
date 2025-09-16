'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface MatrixSound {
  play: (soundType: 'typing' | 'beep' | 'error' | 'success' | 'glitch') => void
}

interface MatrixContextType {
  isJackedIn: boolean
  jackIn: () => void
  jackOut: () => void
  showGlitch: boolean
  triggerGlitch: () => void
  sound: MatrixSound
  terminalHistory: string[]
  addToHistory: (command: string) => void
  isTyping: boolean
  setIsTyping: (typing: boolean) => void
}

const MatrixContext = createContext<MatrixContextType | undefined>(undefined)

export const useMatrix = () => {
  const context = useContext(MatrixContext)
  if (context === undefined) {
    throw new Error('useMatrix must be used within a MatrixProvider')
  }
  return context
}

interface MatrixProviderProps {
  children: ReactNode
}

export const MatrixProvider: React.FC<MatrixProviderProps> = ({ children }) => {
  const [isJackedIn, setIsJackedIn] = useState(false)
  const [showGlitch, setShowGlitch] = useState(false)
  const [terminalHistory, setTerminalHistory] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(false)

  const jackIn = useCallback(() => {
    setIsJackedIn(true)
    // Add terminal message
    setTerminalHistory(prev => [...prev, '> NEURAL LINK ESTABLISHED'])
    setTerminalHistory(prev => [...prev, '> WELCOME TO THE MATRIX'])
  }, [])

  const jackOut = useCallback(() => {
    setIsJackedIn(false)
    setTerminalHistory(prev => [...prev, '> DISCONNECTING FROM MATRIX...'])
    setTerminalHistory(prev => [...prev, '> CONNECTION TERMINATED'])
  }, [])

  const triggerGlitch = useCallback(() => {
    setShowGlitch(true)
    setTimeout(() => setShowGlitch(false), 500)
  }, [])

  const addToHistory = useCallback((command: string) => {
    setTerminalHistory(prev => [...prev, `> ${command}`])
  }, [])

  // Sound system (placeholder for now - can be extended with actual audio)
  const sound: MatrixSound = {
    play: useCallback((soundType: 'typing' | 'beep' | 'error' | 'success' | 'glitch') => {
      // In a real implementation, this would play actual Matrix sound effects
      console.log(`🔊 Matrix Sound: ${soundType}`)

      // Visual feedback for sound
      if (soundType === 'glitch') {
        triggerGlitch()
      }
    }, [triggerGlitch])
  }

  const contextValue: MatrixContextType = {
    isJackedIn,
    jackIn,
    jackOut,
    showGlitch,
    triggerGlitch,
    sound,
    terminalHistory,
    addToHistory,
    isTyping,
    setIsTyping
  }

  return (
    <MatrixContext.Provider value={contextValue}>
      {children}
    </MatrixContext.Provider>
  )
}