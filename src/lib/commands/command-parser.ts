import type { CommandContext, CommandResult } from './types'
import { getCommand } from './registry'

export function parseCommand(input: string): { command: string; args: string[] } {
  const trimmed = input.trim()
  if (!trimmed) {
    return { command: '', args: [] }
  }

  const parts = trimmed.split(/\s+/)
  const command = parts[0]
  const args = parts.slice(1)

  return { command, args }
}

export async function executeCommand(
  input: string,
  currentPath: string
): Promise<CommandResult> {
  const { command: commandName, args } = parseCommand(input)

  if (!commandName) {
    return {
      output: '',
      type: 'info'
    }
  }

  const command = getCommand(commandName)

  if (!command) {
    return {
      output: `Command not found: ${commandName}\nType 'help' to see available commands`,
      type: 'error'
    }
  }

  const context: CommandContext = {
    currentPath,
    args
  }

  try {
    return await command.handler(context)
  } catch (error) {
    return {
      output: `Error executing command: ${error instanceof Error ? error.message : 'Unknown error'}`,
      type: 'error'
    }
  }
}
