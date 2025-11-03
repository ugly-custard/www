'use client'

import { useState, useEffect } from 'react'
import { Eye } from './eye'

export function Face() {
  const [clicked, setClicked] = useState(false)
  const [showAnger, setShowAnger] = useState(false)

  useEffect(() => {
    if (!showAnger) return
    const timer = setTimeout(() => setShowAnger(false), 2000)
    return () => clearTimeout(timer)
  }, [showAnger])

  const handleClick = () => {
    setClicked(!clicked)
  }

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowAnger(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setClicked(!clicked)
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      aria-pressed={clicked}
      aria-label="Face expression toggle"
      className="absolute right-4 top-1/2 hidden -translate-y-1/2 select-none items-center transition-transform duration-300 lg:flex"
    >
      <div className="flex items-center space-x-1.5">
        <Eye isAngry={showAnger} side="left" />
        <span className={`duration-0 ${(clicked || showAnger) && 'mt-5 rotate-180'}`}>‿</span>
        <Eye isAngry={showAnger} side="right" />
        {showAnger && (
          <sup><span className="text-ash-300">💢</span></sup>
        )}
      </div>
    </div>
  )
}
