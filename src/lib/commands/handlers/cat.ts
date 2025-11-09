import type { CommandHandler } from '../types'
import { getNode, resolvePath } from '../../file-system/virtual-fs'

export const catHandler: CommandHandler = ({ currentPath, args }) => {
  if (args.length === 0) {
    return {
      output: 'cat: missing file operand\nTry \'cat <filename>\' to display file contents',
      type: 'error'
    }
  }

  const targetPath = resolvePath(currentPath, args[0])
  const node = getNode(targetPath)

  if (!node) {
    return {
      output: `cat: ${args[0]}: No such file or directory`,
      type: 'error'
    }
  }

  if (node.type !== 'file') {
    return {
      output: `cat: ${args[0]}: Is a directory`,
      type: 'error'
    }
  }

  return {
    output: node.content || '',
    type: 'success'
  }
}
