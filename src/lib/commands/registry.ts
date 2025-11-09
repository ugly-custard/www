import type { Command } from './types'
import {
  helpHandler,
  fastfetchHandler,
  clearHandler,
  lsHandler,
  cdHandler,
  pwdHandler,
  catHandler
} from './handlers'

export const commands: Record<string, Command> = {
  help: {
    name: 'help',
    description: 'Show available commands',
    usage: 'help',
    handler: helpHandler
  },
  fastfetch: {
    name: 'fastfetch',
    description: 'Display system information',
    usage: 'fastfetch',
    handler: fastfetchHandler
  },
  // Hidden alias: neofetch -> fastfetch
  neofetch: {
    name: 'neofetch',
    description: 'Display system information',
    usage: 'neofetch',
    handler: fastfetchHandler,
    hidden: true
  },
  clear: {
    name: 'clear',
    description: 'Clear the terminal screen',
    usage: 'clear',
    handler: clearHandler
  },
  ls: {
    name: 'ls',
    description: 'List directory contents',
    usage: 'ls [path]',
    handler: lsHandler
  },
  cd: {
    name: 'cd',
    description: 'Change directory',
    usage: 'cd <path>',
    handler: cdHandler
  },
  pwd: {
    name: 'pwd',
    description: 'Print working directory',
    usage: 'pwd',
    handler: pwdHandler
  },
  cat: {
    name: 'cat',
    description: 'Display file contents',
    usage: 'cat <file>',
    handler: catHandler
  }
}

export function getCommand(name: string): Command | undefined {
  return commands[name]
}

export function getAllCommands(): Command[] {
  return Object.values(commands)
}
