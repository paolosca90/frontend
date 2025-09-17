'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'

interface MatrixSoundManagerProps {
  className?: string
}

interface SoundEffect {
  name: string
  file: string
  volume: number
}

const MatrixSoundManager: React.FC<MatrixSoundManagerProps> = ({ className = '' }) => {
  const audioContextRef = useRef<AudioContext | null>(null)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [volume, setVolume] = useState(0.3)

  // Sound effect definitions
  const soundEffects: SoundEffect[] = [
    { name: 'keypress', file: '/sounds/matrix-keypress.mp3', volume: 0.2 },
    { name: 'login', file: '/sounds/matrix-login.mp3', volume: 0.4 },
    { name: 'logout', file: '/sounds/matrix-logout.mp3', volume: 0.4 },
    { name: 'success', file: '/sounds/matrix-success.mp3', volume: 0.3 },
    { name: 'error', file: '/sounds/matrix-error.mp3', volume: 0.3 },
    { name: 'notification', file: '/sounds/matrix-notification.mp3', volume: 0.2 },
    { name: 'glitch', file: '/sounds/matrix-glitch.mp3', volume: 0.1 },
    { name: 'terminal_open', file: '/sounds/matrix-terminal-open.mp3', volume: 0.3 },
    { name: 'terminal_close', file: '/sounds/matrix-terminal-close.mp3', volume: 0.3 },
    { name: 'trading_execute', file: '/sounds/matrix-trading-execute.mp3', volume: 0.4 },
    { name: 'navigation', file: '/sounds/matrix-navigation.mp3', volume: 0.2 }
  ]

  // Initialize Web Audio API
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  // Create synthetic sound effects using Web Audio API
  const playSyntheticSound = useCallback((type: string) => {
    if (!soundEnabled || !audioContextRef.current) return

    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    gainNode.gain.value = volume

    switch (type) {
      case 'keypress':
        oscillator.frequency.setValueAtTime(800, ctx.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1)
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
        oscillator.start(ctx.currentTime)
        oscillator.stop(ctx.currentTime + 0.1)
        break

      case 'success':
        oscillator.frequency.setValueAtTime(523, ctx.currentTime) // C5
        oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.1) // E5
        oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.2) // G5
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)
        oscillator.start(ctx.currentTime)
        oscillator.stop(ctx.currentTime + 0.3)
        break

      case 'error':
        oscillator.type = 'sawtooth'
        oscillator.frequency.setValueAtTime(200, ctx.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2)
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2)
        oscillator.start(ctx.currentTime)
        oscillator.stop(ctx.currentTime + 0.2)
        break

      case 'notification':
        oscillator.frequency.setValueAtTime(1000, ctx.currentTime)
        gainNode.gain.setValueAtTime(volume * 0.5, ctx.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05)
        oscillator.start(ctx.currentTime)
        oscillator.stop(ctx.currentTime + 0.05)
        break

      case 'glitch':
        oscillator.type = 'square'
        oscillator.frequency.setValueAtTime(Math.random() * 1000 + 500, ctx.currentTime)
        oscillator.frequency.setValueAtTime(Math.random() * 1000 + 500, ctx.currentTime + 0.05)
        gainNode.gain.setValueAtTime(volume * 0.1, ctx.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05)
        oscillator.start(ctx.currentTime)
        oscillator.stop(ctx.currentTime + 0.05)
        break

      case 'terminal_open':
        oscillator.type = 'sawtooth'
        oscillator.frequency.setValueAtTime(400, ctx.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1)
        oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.2)
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2)
        oscillator.start(ctx.currentTime)
        oscillator.stop(ctx.currentTime + 0.2)
        break

      case 'trading_execute':
        oscillator.frequency.setValueAtTime(440, ctx.currentTime) // A4
        oscillator.frequency.setValueAtTime(554, ctx.currentTime + 0.1) // C#5
        oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.2) // E5
        oscillator.frequency.setValueAtTime(880, ctx.currentTime + 0.3) // A5
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4)
        oscillator.start(ctx.currentTime)
        oscillator.stop(ctx.currentTime + 0.4)
        break
    }
  }, [soundEnabled, volume])

  // Create ambient background sound
  useEffect(() => {
    if (!soundEnabled || !audioContextRef.current) return

    const ctx = audioContextRef.current
    const ambientOscillator = ctx.createOscillator()
    const ambientGain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    ambientOscillator.type = 'sine'
    ambientOscillator.frequency.setValueAtTime(60, ctx.currentTime) // Low frequency hum

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(200, ctx.currentTime)

    ambientOscillator.connect(filter)
    filter.connect(ambientGain)
    ambientGain.connect(ctx.destination)

    ambientGain.gain.setValueAtTime(0, ctx.currentTime)
    ambientGain.gain.linearRampToValueAtTime(volume * 0.05, ctx.currentTime + 2)

    ambientOscillator.start()

    // Add subtle frequency modulation for atmospheric effect
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()

    lfo.frequency.setValueAtTime(0.1, ctx.currentTime) // Very slow modulation
    lfoGain.gain.setValueAtTime(5, ctx.currentTime) // Small frequency variation

    lfo.connect(lfoGain)
    lfoGain.connect(ambientOscillator.frequency)
    lfo.start()

    return () => {
      ambientOscillator.stop()
      lfo.stop()
    }
  }, [soundEnabled, volume])

  // Global sound event listeners
  useEffect(() => {
    const handleSoundEvent = (event: CustomEvent) => {
      const { type } = event.detail
      playSyntheticSound(type)
    }

    window.addEventListener('matrix-sound', handleSoundEvent as EventListener)

    // Keyboard sound effects
    const handleKeyPress = () => {
      playSyntheticSound('keypress')
    }

    document.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('matrix-sound', handleSoundEvent as EventListener)
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [playSyntheticSound])

  // Global function to trigger sound effects
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).playMatrixSound = (type: string) => {
        playSyntheticSound(type)
      }
    }
  }, [playSyntheticSound])

  // Add sound controls to page
  useEffect(() => {
    if (typeof document === 'undefined') return

    const controls = document.createElement('div')
    controls.className = 'fixed top-4 right-4 z-50 matrix-glass p-2 border border-matrix-green/30'
    controls.innerHTML = `
      <div class="flex items-center gap-2 text-xs font-matrix">
        <span class="text-matrix-green/60">SOUND:</span>
        <button id="sound-toggle" class="matrix-button text-xs px-2 py-1">
          ${soundEnabled ? 'ON' : 'OFF'}
        </button>
        <input type="range" id="volume-control" min="0" max="1" step="0.1" value="${volume}"
               class="w-16 h-1 bg-matrix-green/30">
      </div>
    `

    document.body.appendChild(controls)

    const toggleButton = document.getElementById('sound-toggle')
    const volumeControl = document.getElementById('volume-control') as HTMLInputElement

    const handleToggle = () => {
      setSoundEnabled(prev => !prev)
      toggleButton!.textContent = soundEnabled ? 'OFF' : 'ON'
    }

    const handleVolumeChange = (e: Event) => {
      const newVolume = parseFloat((e.target as HTMLInputElement).value)
      setVolume(newVolume)
    }

    toggleButton?.addEventListener('click', handleToggle)
    volumeControl?.addEventListener('input', handleVolumeChange)

    return () => {
      document.body.removeChild(controls)
      toggleButton?.removeEventListener('click', handleToggle)
      volumeControl?.removeEventListener('input', handleVolumeChange)
    }
  }, [soundEnabled, volume])

  return null
}

// Hook for playing sound effects in components
export const useMatrixSound = () => {
  const playSound = useCallback((type: string) => {
    if (typeof window !== 'undefined') {
      // Trigger sound event
      window.dispatchEvent(new CustomEvent('matrix-sound', { detail: { type } }))

      // Also try to call global function
      if ((window as any).playMatrixSound) {
        (window as any).playMatrixSound(type)
      }
    }
  }, [])

  return { playSound }
}

export default MatrixSoundManager