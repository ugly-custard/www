'use client'

import { useEffect, useRef } from 'react'

interface Circle {
  x: number
  y: number
  translateX: number
  translateY: number
  size: number
  alpha: number
  targetAlpha: number
  dx: number
  dy: number
}

interface ParticleBackgroundProps {
  quantity?: number
  size?: number
  vx?: number
  vy?: number
}

export function ParticleBackground({
  quantity = 500,
  size = 0.4,
  vx = 0,
  vy = 0,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const circlesRef = useRef<Circle[]>([])
  const rafIdRef = useRef<number | null>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const canvasSizeRef = useRef({ w: 0, h: 0 })

  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1

  const createCircleParams = (w: number, h: number): Circle => {
    return {
      x: Math.floor(Math.random() * w),
      y: Math.floor(Math.random() * h),
      translateX: 0,
      translateY: 0,
      size: Math.max(1, Math.floor(Math.random() * 2) + size),
      alpha: 0,
      targetAlpha: Number((Math.random() * 0.5 + 0.1).toFixed(1)),
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
    }
  }

  const drawCircle = (circle: Circle, update = false) => {
    const ctx = contextRef.current
    if (!ctx) return

    ctx.save()
    ctx.translate(circle.translateX, circle.translateY)
    ctx.beginPath()
    ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${circle.alpha})`
    ctx.fill()
    ctx.restore()

    if (!update) circlesRef.current.push(circle)
  }

  const animate = () => {
    const ctx = contextRef.current
    if (!ctx) return

    const { w, h } = canvasSizeRef.current
    ctx.clearRect(0, 0, w, h)

    const circles = circlesRef.current

    for (let i = circles.length - 1; i >= 0; i--) {
      const circle = circles[i]

      // Calculate edge distances
      const edgeDistances = [
        circle.x + circle.translateX - circle.size,
        w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        h - circle.y - circle.translateY - circle.size,
      ]

      const closestEdge = Math.min(...edgeDistances)
      const alphaModifier = Math.max(Math.min(closestEdge / 20, 1), 0)

      // Smooth alpha transition
      circle.alpha += alphaModifier > 0.5 ? (circle.alpha < circle.targetAlpha ? 0.02 : 0) : circle.targetAlpha * alphaModifier

      // Update position
      circle.x += circle.dx + vx
      circle.y += circle.dy + vy

      drawCircle(circle, true)

      // Replace out-of-bounds particles
      if (
        circle.x < -circle.size ||
        circle.x > w + circle.size ||
        circle.y < -circle.size ||
        circle.y > h + circle.size
      ) {
        circles.splice(i, 1)
        const newCircle = createCircleParams(w, h)
        drawCircle(newCircle)
      }
    }

    rafIdRef.current = window.requestAnimationFrame(animate)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const controller = new AbortController()

    // Initialize canvas size first
    const newSize = {
      w: container.offsetWidth,
      h: container.offsetHeight,
    }
    canvasSizeRef.current = newSize

    canvas.width = newSize.w * dpr
    canvas.height = newSize.h * dpr
    canvas.style.width = `${newSize.w}px`
    canvas.style.height = `${newSize.h}px`

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.scale(dpr, dpr)
    contextRef.current = ctx

    // Generate initial particles using the newSize we just set
    circlesRef.current = []
    for (let i = 0; i < quantity; i++) {
      const circle = createCircleParams(newSize.w, newSize.h)
      drawCircle(circle)
    }

    // Start animation
    animate()

    const handleResize = () => {
      const resizeSize = {
        w: container.offsetWidth,
        h: container.offsetHeight,
      }
      canvasSizeRef.current = resizeSize

      canvas.width = resizeSize.w * dpr
      canvas.height = resizeSize.h * dpr
      canvas.style.width = `${resizeSize.w}px`
      canvas.style.height = `${resizeSize.h}px`

      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.scale(dpr, dpr)
        contextRef.current = ctx
      }

      circlesRef.current = []
      for (let i = 0; i < quantity; i++) {
        const circle = createCircleParams(resizeSize.w, resizeSize.h)
        drawCircle(circle)
      }
    }

    window.addEventListener('resize', handleResize, { signal: controller.signal })

    return () => {
      controller.abort()
      if (rafIdRef.current != null) {
        window.cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }
      contextRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity, size, vx, vy])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute left-0 top-0 h-dvh w-dvw"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  )
}
