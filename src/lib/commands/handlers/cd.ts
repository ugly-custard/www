import type { CommandHandler } from '../types'
import { getNode, resolvePath } from '../../file-system/virtual-fs'

export const cdHandler: CommandHandler = ({ currentPath, args }) => {
  if (args.length === 0) {
    return {
      output: '',
      type: 'success',
      newPath: '/home/ugly-custard'
    }
  }

  const targetPath = resolvePath(currentPath, args[0])
  const node = getNode(targetPath)

  if (!node) {
    return {
      output: `cd: ${args[0]}: No such file or directory`,
      type: 'error'
    }
  }

  if (node.type !== 'directory') {
    return {
      output: `cd: ${args[0]}: Not a directory`,
      type: 'error'
    }
  }

  return {
    output: '',
    type: 'success',
    newPath: targetPath
  }
}
