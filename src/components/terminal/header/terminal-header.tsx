'use client'

import { Face } from './face'

interface TerminalHeaderProps {
  isFullscreen: boolean
  onMouseDown: (e: React.MouseEvent) => void
  onDoubleClick: () => void
  onToggleFullscreen: () => void
}

export function TerminalHeader({
  isFullscreen,
  onMouseDown,
  onDoubleClick,
  onToggleFullscreen,
}: TerminalHeaderProps) {
  return (
    <header
      className={`relative flex items-center justify-between overflow-hidden px-4 py-3 ${isFullscreen ? 'cursor-default lg:cursor-pointer' : 'cursor-default lg:cursor-grab lg:active:cursor-grabbing'
        }`}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      {/* Window controls */}
      <div className="group absolute left-4 top-1/2 hidden -translate-y-1/2 items-center lg:flex">
        <button
          className="grid h-6 w-6 place-items-center rounded-full"
          onClick={(e) => {
            e.stopPropagation()
            window.close()
          }}
          aria-label="Close"
        >
          <div className="h-3 w-3 rounded-full bg-[#898989] transition-colors group-hover:bg-[#FF6057]" />
        </button>
        <button
          className="grid h-6 w-6 place-items-center rounded-full"
          onClick={(e) => {
            e.stopPropagation()
          }}
          aria-label="Minimize"
        >
          <div className="h-3 w-3 rounded-full bg-[#898989] transition-colors group-hover:bg-[#FEBC2D]" />
        </button>
        <button
          className="grid h-6 w-6 place-items-center rounded-full"
          onClick={(e) => {
            e.stopPropagation()
            onToggleFullscreen()
          }}
          aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          <div className="h-3 w-3 rounded-full bg-[#898989] transition-colors group-hover:bg-[#2BC840]" />
        </button>
      </div>

      {/* Title */}
      <p className="mx-auto hidden select-none font-semibold text-ash-300 lg:block">
        ugly-custard
      </p>
      <p className="mx-auto block select-none font-semibold text-ash-300 lg:hidden">
        Portfolio
      </p>

      {/* Face expression */}
      <Face />
    </header>
  )
}
