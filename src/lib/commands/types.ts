export interface CommandContext {
  currentPath: string
  args: string[]
}

export interface CommandResult {
  output: string
  type: 'success' | 'error' | 'info'
  newPath?: string
  clear?: boolean
  metadata?: Record<string, unknown>
}

export type CommandHandler = (context: CommandContext) => CommandResult | Promise<CommandResult>

export interface Command {
  name: string
  description: string
  usage: string
  handler: CommandHandler
  hidden?: boolean
}
