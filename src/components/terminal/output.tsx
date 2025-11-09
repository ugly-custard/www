import { FastfetchDisplay } from '@/features/fastfetch/fastfetch-display'
import type { OutputLine } from '@/contexts/terminal-context'
import type { LainQuote } from '@/utils/lain-quotes'

interface OutputProps {
  lines: OutputLine[]
}

export function Output({ lines }: OutputProps) {
  return (
    <div className="flex flex-col gap-2 text-sm">
      {lines.map((line) => {
        if (line.type === 'command') {
          const displayPath = line.content.split('$')[0] || ''
          const command = line.content.split('$')[1] || ''
          
          return (
            <div key={line.id} className="flex items-center gap-1">
              <span className="text-ash-500" dangerouslySetInnerHTML={{ __html: displayPath }} />
              <span className="text-ash-300">$</span>
              <span className="text-ash-300">{command}</span>
            </div>
          )
        }

        if (line.type === 'fastfetch') {
          return (
            <div key={line.id} className="my-4">
              <FastfetchDisplay quote={line.metadata?.quote as LainQuote} />
            </div>
          )
        }

        if (line.type === 'error') {
          return (
            <div key={line.id} className="text-red-400 whitespace-pre-wrap">
              {line.content}
            </div>
          )
        }

        if (line.type === 'info') {
          return (
            <div key={line.id} className="text-cyan whitespace-pre-wrap">
              {line.content}
            </div>
          )
        }

        // Parse ANSI color codes for directory listings
        const renderWithColors = (text: string) => {
          // Simple ANSI color parser for blue directories
          const parts = text.split(/(\x1b\[\d+m)/g)
          let currentColor = 'text-ash-300'

          return parts.map((part, i) => {
            if (part === '\x1b[34m') {
              currentColor = 'text-cyan'
              return null
            }
            if (part === '\x1b[0m') {
              currentColor = 'text-ash-300'
              return null
            }
            return (
              <span key={i} className={currentColor}>
                {part}
              </span>
            )
          })
        }

        return (
          <div key={line.id} className="text-ash-300 whitespace-pre-wrap">
            {renderWithColors(line.content)}
          </div>
        )
      })}
    </div>
  )
}
