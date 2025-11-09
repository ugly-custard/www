'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export interface OutputLine {
  id: string
  type: 'command' | 'output' | 'error' | 'info' | 'fastfetch'
  content: string
  timestamp: number
  metadata?: Record<string, unknown>
}

interface TerminalContextType {
  currentPath: string
  commandHistory: string[]
  historyIndex: number
  outputLines: OutputLine[]
  isExecuting: boolean

  setCurrentPath: (path: string) => void
  addToHistory: (command: string) => void
  navigateHistory: (direction: 'up' | 'down') => string | null
  addOutput: (line: Omit<OutputLine, 'id' | 'timestamp'>) => void
  clearOutput: () => void
  setExecuting: (isExecuting: boolean) => void
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined)

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [currentPath, setCurrentPath] = useState('/home/ugly')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [outputLines, setOutputLines] = useState<OutputLine[]>([])
  const [isExecuting, setExecuting] = useState(false)

  const addToHistory = useCallback((command: string) => {
    if (!command.trim() || command === commandHistory[commandHistory.length - 1]) {
      return
    }
    setCommandHistory(prev => [...prev, command])
    setHistoryIndex(-1)
  }, [commandHistory])

  const navigateHistory = useCallback((direction: 'up' | 'down'): string | null => {
    if (commandHistory.length === 0) return null

    let newIndex = historyIndex

    if (direction === 'up') {
      if (historyIndex === -1) {
        newIndex = commandHistory.length - 1
      } else if (historyIndex > 0) {
        newIndex = historyIndex - 1
      }
    } else {
      if (historyIndex === -1) {
        return null
      } else if (historyIndex < commandHistory.length - 1) {
        newIndex = historyIndex + 1
      } else {
        newIndex = -1
        setHistoryIndex(newIndex)
        return ''
      }
    }

    setHistoryIndex(newIndex)
    return commandHistory[newIndex] || null
  }, [commandHistory, historyIndex])

  const addOutput = useCallback((line: Omit<OutputLine, 'id' | 'timestamp'>) => {
    setOutputLines(prev => [
      ...prev,
      {
        ...line,
        id: Math.random().toString(36).substring(7),
        timestamp: Date.now()
      }
    ])
  }, [])

  const clearOutput = useCallback(() => {
    setOutputLines([])
  }, [])

  return (
    <TerminalContext.Provider
      value={{
        currentPath,
        commandHistory,
        historyIndex,
        outputLines,
        isExecuting,
        setCurrentPath,
        addToHistory,
        navigateHistory,
        addOutput,
        clearOutput,
        setExecuting
      }}
    >
      {children}
    </TerminalContext.Provider>
  )
}

export function useTerminal() {
  const context = useContext(TerminalContext)
  if (!context) {
    throw new Error('useTerminal must be used within TerminalProvider')
  }
  return context
}
