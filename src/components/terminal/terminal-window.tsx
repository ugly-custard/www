'use client'

import { useEffect, useState } from 'react'
import { Header } from './header'

interface TerminalWindowProps {
  children: React.ReactNode
}

export function TerminalWindow({ children }: TerminalWindowProps) {
  const [dragging, setDragging] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleFullscreen = () => {
    if (isMobile) return

    const container = document.getElementById('terminal-container')

    if (!isFullscreen && container) {
      container.requestFullscreen().catch(() => { })
    } else {
      document.exitFullscreen().catch(() => { })
      setPosition({ x: 0, y: 0 })
    }

    setIsFullscreen(!isFullscreen)
  }

  const onMouseDown = (e: React.MouseEvent) => {
    if (isMobile || isFullscreen) return
    setDragging(true)
    setOffset({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  useEffect(() => {
    const handleMouseUp = () => setDragging(false)

    const handleMouseMove = (e: MouseEvent) => {
      if (dragging) {
        setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y })
      }
    }

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false)
      }
    }

    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [dragging, offset])

  // Calculate effective position (mobile always at 0,0)
  const effectivePosition = isMobile ? { x: 0, y: 0 } : position

  return (
    <main
      id="terminal-container"
      className={`z-10 flex h-dvh w-dvw flex-col overflow-hidden bg-gradient-to-tr from-ash-800 to-ash-700 opacity-100 lg:h-[75dvh] lg:w-[70dvw] ${isFullscreen || isMobile ? 'rounded-none' : 'rounded-xl animate-wave-shadow'
        }`}
      style={{
        transform: `translate(${effectivePosition.x}px, ${effectivePosition.y}px)`,
        transition: dragging ? 'none' : 'all 0.2s ease-out',
      }}
    >
      <Header
        isFullscreen={isFullscreen}
        onMouseDown={onMouseDown}
        onDoubleClick={toggleFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </main>
  )
}
