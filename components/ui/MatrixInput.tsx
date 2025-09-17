'use client'

import React, { forwardRef } from 'react'

interface MatrixInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const MatrixInput = forwardRef<HTMLInputElement, MatrixInputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    const baseClasses = 'matrix-input font-mono w-full px-4 py-3 bg-transparent transition-all duration-300'

    const errorClasses = error
      ? 'border-red-500 text-red-400 focus:border-red-500 focus:shadow-[0_0_10px_rgba(255,0,0,0.5)]'
      : ''

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-mono text-matrix-bright">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            ${baseClasses}
            ${errorClasses}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-400 font-mono">
            {'>'} ERROR: {error}
          </p>
        )}
      </div>
    )
  }
)

MatrixInput.displayName = 'MatrixInput'

export default MatrixInput