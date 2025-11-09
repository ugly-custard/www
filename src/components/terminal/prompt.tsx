'use client'

import { useEffect, useRef, useState } from 'react'

interface PromptProps {
  currentPath: string
  onSubmit: (command: string) => void
  onHistoryNavigate: (direction: 'up' | 'down') => string | null
  disabled?: boolean
}

export function Prompt({ currentPath, onSubmit, onHistoryNavigate, disabled }: PromptProps) {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Focus input on mount and keep it focused
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !disabled) {
      onSubmit(input)
      setInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      const direction = e.key === 'ArrowUp' ? 'up' : 'down'
      const historyCommand = onHistoryNavigate(direction)
      if (historyCommand !== null) {
        setInput(historyCommand)
      }
    }
  }

  // Simplified path display
  const displayPath = currentPath.replace('/home/ugly', '~')

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 text-sm">
      <div className="flex items-center flex-shrink-0">
        <span className="text-cyan font-semibold">ugly</span>
        <span className="text-ash-500">@</span>
        <span className="text-cyan font-semibold">custard</span>
        <span className="text-ash-500">:</span>
        <span className="text-ash-400">{displayPath}</span>
        <span className="text-ash-300 ml-1">$</span>
      </div>
      <div className="flex-1 relative">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="w-full bg-transparent outline-none text-ash-300 caret-ash-300 disabled:opacity-50"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck="false"
        />
        {!input && (
          <span className="absolute left-0 inline-block w-2 h-4 bg-ash-300 animate-blink" />
        )}
      </div>
    </form>
  )
}
