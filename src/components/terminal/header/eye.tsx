'use client'

import { useEffect, useRef, useState } from 'react'

interface EyeProps {
  isAngry?: boolean
  side?: 'left' | 'right'
}

export function Eye({ isAngry = false, side = 'left' }: EyeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pupilPosRef = useRef({ x: 50, y: 50 })
  const targetPosRef = useRef({ x: 50, y: 50 })
  const rafIdRef = useRef<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  const width = 40
  const height = 40
  const borderWidth = 2
  const pupilRadius = Math.min(width, height) * 0.15
  const eyeRadius = Math.min(width, height) / 2 - borderWidth

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || isMobile) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = width
    canvas.height = height

    const drawEye = () => {
      ctx.clearRect(0, 0, width, height)

      // Eye border
      ctx.strokeStyle = "#898989"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.ellipse(width / 2, height / 2, eyeRadius, eyeRadius, 0, 0, Math.PI * 2)
      ctx.stroke()

      // Angry eyebrow
      if (isAngry) {
        ctx.strokeStyle = "#898989"
        ctx.lineWidth = 2
        ctx.beginPath()
        if (side === 'left') {
          ctx.moveTo(width * 0.2, height * 0.15)
          ctx.lineTo(width * 0.8, height * 0.3)
        } else {
          ctx.moveTo(width * 0.2, height * 0.3)
          ctx.lineTo(width * 0.8, height * 0.15)
        }
        ctx.stroke()
      }

      // Pupil
      ctx.fillStyle = "#898989"

      const pupilX = (pupilPosRef.current.x / 100) * width
      const pupilY = (pupilPosRef.current.y / 100) * height

      ctx.beginPath()
      ctx.ellipse(pupilX, pupilY, pupilRadius, pupilRadius, 0, 0, Math.PI * 2)
      ctx.fill()
    }

    const animate = () => {
      pupilPosRef.current.x += (targetPosRef.current.x - pupilPosRef.current.x) * 0.1
      pupilPosRef.current.y += (targetPosRef.current.y - pupilPosRef.current.y) * 0.1

      drawEye()
      rafIdRef.current = requestAnimationFrame(animate)
    }

    rafIdRef.current = requestAnimationFrame(animate)

    const handleMouseMove = (event: MouseEvent) => {
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const eyeCenterX = rect.left + rect.width / 2
      const eyeCenterY = rect.top + rect.height / 2

      const angle = Math.atan2(event.clientY - eyeCenterY, event.clientX - eyeCenterX)

      const maxMovementRadius = rect.width / 4
      const distanceFromCenter = Math.hypot(event.clientX - eyeCenterX, event.clientY - eyeCenterY)
      const clampedDistance = Math.min(distanceFromCenter, maxMovementRadius)

      const targetX = 50 + ((Math.cos(angle) * clampedDistance) / (rect.width / 2)) * 45
      const targetY = 50 + ((Math.sin(angle) * clampedDistance) / (rect.height / 2)) * 45

      targetPosRef.current = {
        x: Math.max(25, Math.min(75, targetX)),
        y: Math.max(25, Math.min(75, targetY))
      }
    }

    const handleMouseLeave = () => {
      targetPosRef.current = { x: 50, y: 50 }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, isAngry, side])

  return <canvas ref={canvasRef} className="size-3.5" />
}
