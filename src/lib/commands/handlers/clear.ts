import type { CommandHandler } from '../types'

export const clearHandler: CommandHandler = () => {
  return {
    output: '',
    type: 'success',
    clear: true
  }
}
