'use client'

import { useEffect, useRef } from 'react'
import { useTerminal } from '@/contexts/terminal-context'
import { executeCommand } from '@/lib/commands/command-parser'
import { Prompt } from './prompt'
import { Output } from './output'

export function TerminalSession() {
  const {
    currentPath,
    outputLines,
    isExecuting,
    setCurrentPath,
    addToHistory,
    navigateHistory,
    addOutput,
    clearOutput,
    setExecuting
  } = useTerminal()

  const terminalRef = useRef<HTMLDivElement>(null)
  const hasInitialized = useRef(false)

  // Auto-scroll to bottom when new output is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [outputLines])

  // Run fastfetch on mount
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true
      handleCommand('fastfetch')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCommand = async (command: string) => {
    // Add command to history
    addToHistory(command)

    // Create prompt display with colors
    const displayPath = currentPath.replace('/home/ugly', '~')
    const promptDisplay = `<span class="text-cyan font-semibold">ugly</span><span class="text-ash-500">@</span><span class="text-cyan font-semibold">custard</span><span class="text-ash-500">:</span><span class="text-ash-400">${displayPath}</span>`

    // Add command to output
    addOutput({
      type: 'command',
      content: `${promptDisplay}$ ${command}`
    })

    setExecuting(true)

    try {
      const result = await executeCommand(command, currentPath)

      // Handle clear command
      if (result.clear) {
        clearOutput()
        setExecuting(false)
        return
      }

      // Handle path change
      if (result.newPath) {
        setCurrentPath(result.newPath)
      }

      // Handle fastfetch special case
      if (result.output === '__FASTFETCH__') {
        addOutput({
          type: 'fastfetch',
          content: '',
          metadata: result.metadata
        })
      } else if (result.output) {
        // Add command output
        addOutput({
          type: result.type === 'error' ? 'error' : result.type === 'info' ? 'info' : 'output',
          content: result.output
        })
      }
    } catch (error) {
      addOutput({
        type: 'error',
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      })
    } finally {
      setExecuting(false)
    }
  }

  return (
    <div
      ref={terminalRef}
      className="h-full overflow-y-auto overflow-x-hidden p-4 lg:p-6"
      onClick={(e) => {
        // Focus input when clicking anywhere in the terminal
        const input = (e.currentTarget as HTMLElement).querySelector('input')
        input?.focus()
      }}
    >
      <div className="flex flex-col gap-2">
        <Output lines={outputLines} />
        <Prompt
          currentPath={currentPath}
          onSubmit={handleCommand}
          onHistoryNavigate={navigateHistory}
          disabled={isExecuting}
        />
      </div>
    </div>
  )
}
