import type { CommandHandler } from '../types'
import { getNode, resolvePath } from '../../file-system/virtual-fs'

export const lsHandler: CommandHandler = ({ currentPath, args }) => {
  const targetPath = args[0]
    ? resolvePath(currentPath, args[0])
    : currentPath

  const node = getNode(targetPath)

  if (!node) {
    return {
      output: `ls: cannot access '${args[0] || currentPath}': No such file or directory`,
      type: 'error'
    }
  }

  if (node.type !== 'directory' || !node.children) {
    return {
      output: `ls: ${args[0] || currentPath}: Not a directory`,
      type: 'error'
    }
  }

  const entries = Object.entries(node.children)
  if (entries.length === 0) {
    return {
      output: '',
      type: 'success'
    }
  }

  const output = entries
    .map(([name, file]) => {
      if (file.type === 'directory') {
        return `\x1b[34m${name}/\x1b[0m` // Blue for directories
      }
      return name
    })
    .join('  ')

  return {
    output,
    type: 'success'
  }
}
