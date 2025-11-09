import type { CommandHandler } from '../types'

export const helpHandler: CommandHandler = () => {
  const helpText = `Available Commands:

  help              Show this help message
  fastfetch         Display system information with ASCII art
  clear             Clear the terminal screen
  ls [path]         List directory contents
  cd <path>         Change directory
  pwd               Print working directory
  cat <file>        Display file contents

Navigation:
  Use ↑/↓ arrows to navigate command history
  Press Tab for command completion (coming soon)

Color codes:
  🟢 Success - Command executed successfully
  🔴 Error - Something went wrong
  🔵 Info - Informational message

Try 'ls' to see what's available!`

  return {
    output: helpText,
    type: 'info'
  }
}
