'use client'

import React, { useState, useEffect } from 'react'

interface TypewriterTextProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  onComplete?: () => void
  showCursor?: boolean
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 50,
  delay = 0,
  className = '',
  onComplete,
  showCursor = true
}) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [showBlinkingCursor, setShowBlinkingCursor] = useState(true)

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        setIsTyping(true)
      }, delay)
      return () => clearTimeout(delayTimer)
    } else {
      setIsTyping(true)
    }
    return undefined
  }, [delay])

  useEffect(() => {
    if (!isTyping || currentIndex >= text.length) return

    const timer = setTimeout(() => {
      setDisplayText(text.slice(0, currentIndex + 1))
      setCurrentIndex(currentIndex + 1)
    }, speed)

    return () => clearTimeout(timer)
  }, [currentIndex, isTyping, text, speed])

  useEffect(() => {
    if (currentIndex >= text.length && isTyping) {
      setIsTyping(false)
      onComplete?.()
    }
  }, [currentIndex, text.length, isTyping, onComplete])

  // Cursor blinking effect
  useEffect(() => {
    if (!showCursor) return

    const cursorTimer = setInterval(() => {
      setShowBlinkingCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorTimer)
  }, [showCursor])

  return (
    <span className={`${className} font-mono`}>
      {displayText}
      {showCursor && (isTyping || showBlinkingCursor) && (
        <span className="text-matrix-green animate-pulse">|</span>
      )}
    </span>
  )
}

export default TypewriterText