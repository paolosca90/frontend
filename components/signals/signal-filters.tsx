'use client'

import React, { useState } from 'react'
import MatrixButton from '@/components/ui/MatrixButton'

interface SignalFiltersProps {
  onFiltersChange?: (filters: SignalFilters) => void
  className?: string
}

interface SignalFilters {
  symbols: string[]
  types: ('BUY' | 'SELL')[]
  status: ('active' | 'executed' | 'completed' | 'cancelled')[]
  strength: { min: number; max: number }
  timeframe: '1h' | '4h' | '1d' | '1w' | 'all'
}

const SignalFiltersComponent: React.FC<SignalFiltersProps> = ({ onFiltersChange, className = '' }) => {
  const [filters, setFilters] = useState<SignalFilters>({
    symbols: [],
    types: [],
    status: [],
    strength: { min: 0, max: 100 },
    timeframe: 'all'
  })

  const [showAdvanced, setShowAdvanced] = useState(false)

  const availableSymbols = ['EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF', 'AUDUSD', 'USDCAD', 'NZDUSD', 'XAUUSD', 'XAGUSD', 'BTCUSD']
  const availableStatus = ['active', 'executed', 'completed', 'cancelled'] as const

  const handleSymbolToggle = (symbol: string) => {
    const newSymbols = filters.symbols.includes(symbol)
      ? filters.symbols.filter(s => s !== symbol)
      : [...filters.symbols, symbol]

    const newFilters = { ...filters, symbols: newSymbols }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const handleTypeToggle = (type: 'BUY' | 'SELL') => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type]

    const newFilters = { ...filters, types: newTypes }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const handleStatusToggle = (status: typeof availableStatus[number]) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status]

    const newFilters = { ...filters, status: newStatus }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const handleTimeframeChange = (timeframe: SignalFilters['timeframe']) => {
    const newFilters = { ...filters, timeframe }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const handleStrengthChange = (type: 'min' | 'max', value: number) => {
    const newStrength = { ...filters.strength, [type]: value }
    const newFilters = { ...filters, strength: newStrength }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const clearAllFilters = () => {
    const clearedFilters: SignalFilters = {
      symbols: [],
      types: [],
      status: [],
      strength: { min: 0, max: 100 },
      timeframe: 'all'
    }
    setFilters(clearedFilters)
    onFiltersChange?.(clearedFilters)
  }

  const getFilterCount = () => {
    let count = 0
    if (filters.symbols.length > 0) count++
    if (filters.types.length > 0) count++
    if (filters.status.length > 0) count++
    if (filters.strength.min > 0 || filters.strength.max < 100) count++
    if (filters.timeframe !== 'all') count++
    return count
  }

  return (
    <div className={`matrix-terminal p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-mono text-lg text-matrix-bright glow-matrix">
          {'>'} NEURAL_FILTERS
        </h3>
        <div className="flex items-center space-x-2">
          {getFilterCount() > 0 && (
            <span className="font-mono text-xs px-2 py-1 bg-matrix-green/20 text-matrix-green rounded">
              {getFilterCount()} active
            </span>
          )}
          <MatrixButton
            onClick={() => setShowAdvanced(!showAdvanced)}
            variant="secondary"
            size="sm"
          >
            {showAdvanced ? 'BASIC' : 'ADVANCED'}
          </MatrixButton>
          <MatrixButton
            onClick={clearAllFilters}
            variant="danger"
            size="sm"
          >
            CLEAR
          </MatrixButton>
        </div>
      </div>

      {/* Basic Filters */}
      <div className="space-y-6">
        {/* Timeframe */}
        <div>
          <label className="font-mono text-sm text-matrix-dim block mb-2">TIMEFRAME</label>
          <div className="flex flex-wrap gap-2">
            {(['1h', '4h', '1d', '1w', 'all'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => handleTimeframeChange(tf)}
                className={`
                  font-mono text-xs px-3 py-2 border transition-all
                  ${filters.timeframe === tf
                    ? 'border-matrix-green text-matrix-bright bg-matrix-green/10 glow-matrix'
                    : 'border-matrix-green/30 text-matrix-green hover:border-matrix-green'
                  }
                `}
              >
                {tf.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Signal Types */}
        <div>
          <label className="font-mono text-sm text-matrix-dim block mb-2">SIGNAL TYPE</label>
          <div className="flex gap-2">
            <button
              onClick={() => handleTypeToggle('BUY')}
              className={`
                font-mono text-xs px-4 py-2 border transition-all
                ${filters.types.includes('BUY')
                  ? 'border-matrix-green text-matrix-bright bg-matrix-green/10'
                  : 'border-matrix-green/30 text-matrix-green hover:border-matrix-green'
                }
              `}
            >
              BUY
            </button>
            <button
              onClick={() => handleTypeToggle('SELL')}
              className={`
                font-mono text-xs px-4 py-2 border transition-all
                ${filters.types.includes('SELL')
                  ? 'border-red-400 text-red-400 bg-red-400/10'
                  : 'border-red-400/30 text-red-400 hover:border-red-400'
                }
              `}
            >
              SELL
            </button>
          </div>
        </div>

        {/* Symbols - Always Show Popular */}
        <div>
          <label className="font-mono text-sm text-matrix-dim block mb-2">INSTRUMENTS</label>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            {availableSymbols.slice(0, showAdvanced ? availableSymbols.length : 5).map((symbol) => (
              <button
                key={symbol}
                onClick={() => handleSymbolToggle(symbol)}
                className={`
                  font-mono text-xs px-2 py-2 border transition-all text-center
                  ${filters.symbols.includes(symbol)
                    ? 'border-matrix-green text-matrix-bright bg-matrix-green/10'
                    : 'border-matrix-green/30 text-matrix-green hover:border-matrix-green'
                  }
                `}
              >
                {symbol}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="mt-6 pt-6 border-t border-matrix-green/20 space-y-6">
          {/* Signal Status */}
          <div>
            <label className="font-mono text-sm text-matrix-dim block mb-2">STATUS</label>
            <div className="flex flex-wrap gap-2">
              {availableStatus.map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusToggle(status)}
                  className={`
                    font-mono text-xs px-3 py-2 border transition-all capitalize
                    ${filters.status.includes(status)
                      ? 'border-matrix-green text-matrix-bright bg-matrix-green/10'
                      : 'border-matrix-green/30 text-matrix-green hover:border-matrix-green'
                    }
                  `}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Signal Strength Range */}
          <div>
            <label className="font-mono text-sm text-matrix-dim block mb-2">
              STRENGTH RANGE: {filters.strength.min}% - {filters.strength.max}%
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.strength.min}
                  onChange={(e) => handleStrengthChange('min', Number(e.target.value))}
                  className="w-full h-2 bg-matrix-green/20 rounded-lg appearance-none cursor-pointer slider-matrix"
                />
                <div className="font-mono text-xs text-matrix-dim mt-1">MIN: {filters.strength.min}%</div>
              </div>
              <div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.strength.max}
                  onChange={(e) => handleStrengthChange('max', Number(e.target.value))}
                  className="w-full h-2 bg-matrix-green/20 rounded-lg appearance-none cursor-pointer slider-matrix"
                />
                <div className="font-mono text-xs text-matrix-dim mt-1">MAX: {filters.strength.max}%</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Apply/Reset Actions */}
      <div className="mt-6 pt-6 border-t border-matrix-green/20 flex justify-between items-center">
        <div className="font-mono text-xs text-matrix-dim">
          {getFilterCount() === 0 ? 'No filters active' : `${getFilterCount()} filter${getFilterCount() === 1 ? '' : 's'} applied`}
        </div>
        <div className="flex space-x-2">
          <MatrixButton
            onClick={() => window.location.reload()}
            variant="secondary"
            size="sm"
          >
            REFRESH
          </MatrixButton>
          <MatrixButton
            onClick={() => onFiltersChange?.(filters)}
            size="sm"
          >
            APPLY_FILTERS
          </MatrixButton>
        </div>
      </div>
    </div>
  )
}

export default SignalFiltersComponent