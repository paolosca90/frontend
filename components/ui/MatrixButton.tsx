'use client'

import React, { useState } from 'react'

interface MatrixButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'glow'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  loading?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const MatrixButton: React.FC<MatrixButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left'
}) => {
  const [isPressed, setIsPressed] = useState(false)

  const baseClasses = `
    matrix-button font-matrix font-bold uppercase tracking-wider
    transition-all duration-300 transform relative overflow-hidden
    touch-feedback gpu-optimized will-change-transform border-2
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-matrix-green/50
  `.trim()

  const sizeClasses = {
    sm: 'px-3 py-2 text-xs min-h-[36px] touch:min-h-[44px]',
    md: 'px-6 py-3 text-sm min-h-[44px] touch:min-h-[48px]',
    lg: 'px-8 py-4 text-base min-h-[52px] touch:min-h-[56px]',
    xl: 'px-10 py-5 text-lg min-h-[60px] touch:min-h-[64px]'
  }

  const variantClasses = {
    primary: `
      bg-transparent border-matrix-green text-matrix-green
      hover:bg-matrix-green hover:text-black hover:shadow-matrix-strong
      no-touch:hover:scale-105 active:scale-95
    `,
    secondary: `
      bg-transparent border-matrix-green/50 text-matrix-green/70
      hover:bg-matrix-green/10 hover:text-matrix-green hover:border-matrix-green
      no-touch:hover:scale-105 active:scale-95
    `,
    danger: `
      bg-transparent border-red-500 text-red-500
      hover:bg-red-500 hover:text-black hover:shadow-[0_0_30px_rgba(248,113,113,0.5)]
      no-touch:hover:scale-105 active:scale-95
    `,
    ghost: `
      bg-transparent border-transparent text-matrix-green
      hover:border-matrix-green hover:shadow-matrix
      no-touch:hover:scale-105 active:scale-95
    `,
    glow: `
      bg-matrix-green/10 border-matrix-green text-matrix-green
      shadow-matrix animate-pulse-matrix
      hover:bg-matrix-green/20 hover:shadow-matrix-strong
      no-touch:hover:scale-105 active:scale-95
    `
  }

  const widthClasses = fullWidth ? 'w-full' : ''

  const handleMouseDown = () => setIsPressed(true)
  const handleMouseUp = () => setIsPressed(false)
  const handleMouseLeave = () => setIsPressed(false)

  const LoadingSpinner = () => (
    <div className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
  )

  const content = (
    <>
      {/* Matrix glow effect */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-matrix-green/20 to-transparent animate-matrix-border-sweep" />
      </div>

      {/* Button content */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        {loading && <LoadingSpinner />}
        {!loading && icon && iconPosition === 'left' && (
          <span className="inline-flex items-center">{icon}</span>
        )}
        <span className={loading ? 'opacity-50' : ''}>{children}</span>
        {!loading && icon && iconPosition === 'right' && (
          <span className="inline-flex items-center">{icon}</span>
        )}
      </div>

      {/* Touch ripple effect */}
      {isPressed && (
        <div className="absolute inset-0 bg-matrix-green/30 animate-ping rounded-inherit pointer-events-none" />
      )}
    </>
  )

  return (
    <button
      type={type}
      onClick={disabled || loading ? undefined : onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${widthClasses}
        ${className}
      `.trim()}
    >
      {content}
    </button>
  )
}

export default MatrixButton