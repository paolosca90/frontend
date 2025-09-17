'use client'

import React, { useState, useEffect, useCallback } from 'react'
import MatrixButton from '../ui/MatrixButton'
import MatrixTerminal from '../terminal/MatrixTerminal'

interface MatrixNavProps {
  className?: string
}

interface NavItem {
  id: string
  label: string
  icon: string
  command: string
  description: string
  children?: NavItem[]
}

const MatrixNav: React.FC<MatrixNavProps> = ({ className = '' }) => {
  const [activePath, setActivePath] = useState('/')
  const [showTerminal, setShowTerminal] = useState(false)
  const [terminalCommand, setTerminalCommand] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [breadCrumb, setBreadCrumb] = useState<string[]>(['ROOT'])

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: 'HOME',
      icon: '🏠',
      command: 'home',
      description: 'Return to main terminal'
    },
    {
      id: 'dashboard',
      label: 'COMMAND_CENTER',
      icon: '📊',
      command: 'dashboard',
      description: 'Access main command center'
    },
    {
      id: 'signals',
      label: 'SIGNALS',
      icon: '📈',
      command: 'signals',
      description: 'Trading signals and analysis',
      children: [
        {
          id: 'generate',
          label: 'GENERATE',
          icon: '🎯',
          command: 'signals generate',
          description: 'Generate new trading signals'
        },
        {
          id: 'history',
          label: 'HISTORY',
          icon: '📋',
          command: 'signals history',
          description: 'View signal history'
        },
        {
          id: 'analytics',
          label: 'ANALYTICS',
          icon: '📊',
          command: 'signals analytics',
          description: 'Signal performance analytics'
        }
      ]
    },
    {
      id: 'trading',
      label: 'TRADING',
      icon: '⚡',
      command: 'trading',
      description: 'Trading interface and execution',
      children: [
        {
          id: 'execute',
          label: 'EXECUTE',
          icon: '🚀',
          command: 'trading execute',
          description: 'Execute trading orders'
        },
        {
          id: 'positions',
          label: 'POSITIONS',
          icon: '📊',
          command: 'trading positions',
          description: 'Manage open positions'
        },
        {
          id: 'orders',
          label: 'ORDERS',
          icon: '📋',
          command: 'trading orders',
          description: 'View and manage orders'
        }
      ]
    },
    {
      id: 'portfolio',
      label: 'PORTFOLIO',
      icon: '💰',
      command: 'portfolio',
      description: 'Portfolio management and overview'
    },
    {
      id: 'analytics',
      label: 'ANALYTICS',
      icon: '🧠',
      command: 'analytics',
      description: 'Advanced AI analytics',
      children: [
        {
          id: 'neural',
          label: 'NEURAL_NETWORK',
          icon: '🧠',
          command: 'analytics neural',
          description: 'Neural network analysis'
        },
        {
          id: 'patterns',
          label: 'PATTERNS',
          icon: '🔍',
          command: 'analytics patterns',
          description: 'Pattern recognition'
        },
        {
          id: 'predictions',
          label: 'PREDICTIONS',
          icon: '🔮',
          command: 'analytics predictions',
          description: 'Market predictions'
        }
      ]
    },
    {
      id: 'settings',
      label: 'SETTINGS',
      icon: '⚙️',
      command: 'settings',
      description: 'System configuration',
      children: [
        {
          id: 'preferences',
          label: 'PREFERENCES',
          icon: '👤',
          command: 'settings preferences',
          description: 'User preferences'
        },
        {
          id: 'security',
          label: 'SECURITY',
          icon: '🔐',
          command: 'settings security',
          description: 'Security settings'
        },
        {
          id: 'api',
          label: 'API_CONFIG',
          icon: '🔌',
          command: 'settings api',
          description: 'API configuration'
        }
      ]
    }
  ]

  const handleNavigation = useCallback((path: string, command: string) => {
    setActivePath(path)
    setTerminalCommand(command)

    // Update breadcrumb
    const parts = path.split('/').filter(Boolean)
    setBreadCrumb(['ROOT', ...parts.map(p => p.toUpperCase())])

    // Close mobile menu
    setIsMobileMenuOpen(false)
  }, [])

  const handleTerminalCommand = useCallback((command: string) => {
    const cmd = command.toLowerCase().trim()

    // Navigation commands
    if (cmd === 'home' || cmd === 'cd /' || cmd === 'cd ~') {
      handleNavigation('/', 'home')
    } else if (cmd.startsWith('cd ')) {
      const target = cmd.substring(3).trim()
      const navItem = navItems.find(item =>
        item.command === target || item.id === target
      )
      if (navItem) {
        handleNavigation(`/${navItem.id}`, navItem.command)
      }
    } else if (cmd === 'ls' || cmd === 'dir') {
      // List current directory contents
      const currentItems = activePath === '/' ? navItems :
        navItems.find(item => `/${item.id}` === activePath)?.children || []
      return currentItems.map(item => `${item.icon} ${item.label}`).join('\n')
    } else if (cmd === 'clear') {
      // Clear handled by terminal
    } else if (cmd === 'help') {
      return `MATRIX NAVIGATION COMMANDS:
========================
home, cd /, cd ~     - Return to home
cd [location]        - Navigate to location
ls, dir              - List current contents
help                 - Show this help
clear                - Clear terminal
status               - System status
logout               - Exit system

AVAILABLE LOCATIONS:
${navItems.map(item => `  ${item.icon} ${item.label.toLowerCase()}`).join('\n')}`
    } else if (cmd === 'status') {
      return `SYSTEM STATUS:
==============
Neural Network:    ONLINE
Trading Engine:    ACTIVE
Market Data:       REAL-TIME
Security Level:    MAXIMUM
AI Core:           CONSCIOUS
Latency:           0.085ms
Uptime:            47h 33m 12s
Current Path:      ${activePath}`
    } else if (cmd === 'logout') {
      if (confirm('Are you sure you want to logout of the Matrix?')) {
        window.location.href = '/auth/logout'
      }
      return 'LOGOUT INITIATED...'
    } else {
      return `Command not found: ${command}
Type 'help' for available commands.`
    }
  }, [activePath, handleNavigation])

  const renderNavItem = (item: NavItem, level = 0) => {
    const isActive = activePath === `/${item.id}`
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.id} className={`${level > 0 ? 'ml-4' : ''}`}>
        <MatrixButton
          variant={isActive ? 'primary' : 'ghost'}
          size="sm"
          icon={<span>{item.icon}</span>}
          iconPosition="left"
          onClick={() => handleNavigation(`/${item.id}`, item.command)}
          className={`w-full justify-start ${
            isActive ? 'border-l-4 border-matrix-green' : ''
          }`}
        >
          <span className="flex-1 text-left">{item.label}</span>
          {hasChildren && <span>▶</span>}
        </MatrixButton>

        {hasChildren && (
          <div className="mt-1 space-y-1">
            {item.children!.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`hidden lg:block ${className}`}>
        <div className="matrix-glass border border-matrix-green/30 p-4">
          <div className="mb-4">
            <div className="matrix-glitch text-sm font-matrix text-matrix-green mb-2" data-text="MATRIX NAVIGATION">
              MATRIX NAVIGATION
            </div>
            <div className="text-xs font-matrix text-matrix-green/60">
              {breadCrumb.join(' / ')}
            </div>
          </div>

          <div className="space-y-1">
            {navItems.map(item => renderNavItem(item))}
          </div>

          <div className="mt-6 pt-4 border-t border-matrix-green/30">
            <MatrixButton
              variant="ghost"
              size="sm"
              icon={<span>💻</span>}
              iconPosition="left"
              onClick={() => setShowTerminal(true)}
              className="w-full justify-start"
            >
              TERMINAL MODE
            </MatrixButton>

            <MatrixButton
              variant="danger"
              size="sm"
              icon={<span>🚪</span>}
              iconPosition="left"
              onClick={() => handleTerminalCommand('logout')}
              className="w-full justify-start mt-2"
            >
              LOGOUT
            </MatrixButton>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className={`lg:hidden fixed inset-0 z-50 bg-black/95 backdrop-blur-sm ${
        isMobileMenuOpen ? 'block' : 'hidden'
      }`}>
        <div className="h-full flex">
          {/* Mobile Sidebar */}
          <div className="w-64 matrix-glass border-r border-matrix-green/30 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="matrix-glitch text-sm font-matrix text-matrix-green" data-text="NAVIGATION">
                NAVIGATION
              </div>
              <MatrixButton
                variant="ghost"
                size="sm"
                icon={<span>✕</span>}
                onClick={() => setIsMobileMenuOpen(false)}
              />
            </div>

            <div className="text-xs font-matrix text-matrix-green/60 mb-4">
              {breadCrumb.join(' / ')}
            </div>

            <div className="space-y-1">
              {navItems.map(item => renderNavItem(item))}
            </div>

            <div className="mt-6 pt-4 border-t border-matrix-green/30 space-y-2">
              <MatrixButton
                variant="ghost"
                size="sm"
                icon={<span>💻</span>}
                iconPosition="left"
                onClick={() => {
                  setShowTerminal(true)
                  setIsMobileMenuOpen(false)
                }}
                className="w-full justify-start"
              >
                TERMINAL
              </MatrixButton>

              <MatrixButton
                variant="danger"
                size="sm"
                icon={<span>🚪</span>}
                iconPosition="left"
                onClick={() => {
                  handleTerminalCommand('logout')
                  setIsMobileMenuOpen(false)
                }}
                className="w-full justify-start"
              >
                LOGOUT
              </MatrixButton>
            </div>
          </div>

          {/* Overlay */}
          <div
            className="flex-1"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed bottom-4 left-4 z-40">
        <MatrixButton
          variant="glow"
          size="md"
          icon={<span>☰</span>}
          onClick={() => setIsMobileMenuOpen(true)}
          className="shadow-matrix-strong"
        >
          MENU
        </MatrixButton>
      </div>

      {/* Terminal Overlay */}
      {showTerminal && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
          <div className="h-full flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
              <div className="flex items-center justify-between mb-4">
                <div className="matrix-glitch text-lg font-matrix font-bold text-matrix-green" data-text="MATRIX COMMAND TERMINAL">
                  MATRIX COMMAND TERMINAL
                </div>
                <MatrixButton
                  variant="ghost"
                  size="sm"
                  icon={<span>✕</span>}
                  onClick={() => setShowTerminal(false)}
                >
                  CLOSE
                </MatrixButton>
              </div>

              <MatrixTerminal
                height="70vh"
                onCommand={handleTerminalCommand}
                welcomeMessage={`AI CASH REVOLUTION - MATRIX NAVIGATION TERMINAL v2.0.1
=======================================================
Current Location: ${activePath}
Security Level: MAXIMUM • Encryption: QUANTUM
Available Commands: cd, ls, help, clear, status, logout

Type 'help' for navigation commands or 'status' for system information.`}
                commands={['help', 'status', 'ls']}
                autoType={true}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MatrixNav