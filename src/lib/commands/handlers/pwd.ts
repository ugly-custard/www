import type { CommandHandler } from '../types'

export const pwdHandler: CommandHandler = ({ currentPath }) => {
  return {
    output: currentPath,
    type: 'success'
  }
}
