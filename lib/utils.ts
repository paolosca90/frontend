import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatPercentage(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function truncateAddress(address: string, length: number = 6): string {
  if (address.length <= length * 2) return address
  return `${address.slice(0, length)}...${address.slice(-length)}`
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

export function getSignalColor(type: 'BUY' | 'SELL' | 'NEUTRAL'): string {
  switch (type) {
    case 'BUY':
      return 'text-matrix-500'
    case 'SELL':
      return 'text-danger-500'
    default:
      return 'text-muted-foreground'
  }
}

export function getSignalBgColor(type: 'BUY' | 'SELL' | 'NEUTRAL'): string {
  switch (type) {
    case 'BUY':
      return 'bg-matrix-500/10 border-matrix-500/20'
    case 'SELL':
      return 'bg-danger-500/10 border-danger-500/20'
    default:
      return 'bg-muted/10 border-muted/20'
  }
}