'use client'

import React, { ReactNode } from 'react'

interface MatrixButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const MatrixButton: React.FC<MatrixButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = ''
}) => {
  const baseClasses = 'matrix-button font-mono font-bold uppercase tracking-wider transition-all duration-300 relative overflow-hidden'

  const variantClasses = {
    primary: 'border-matrix-green text-matrix-green hover:bg-matrix-green/10 hover:text-matrix-bright hover:shadow-matrix',
    secondary: 'border-matrix-green/50 text-matrix-green/70 hover:bg-matrix-green/5 hover:text-matrix-green hover:border-matrix-green',
    danger: 'border-red-500 text-red-500 hover:bg-red-500/10 hover:text-red-400 hover:shadow-[0_0_20px_rgba(255,0,0,0.5)]'
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed hover:bg-transparent hover:shadow-none'
    : 'cursor-pointer'

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabledClasses}
        ${className}
      `}
    >
      {children}
    </button>
  )
}

export default MatrixButton