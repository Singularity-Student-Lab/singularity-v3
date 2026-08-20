"use client"

import { cn } from "../../lib/utils"
import React, { useEffect, useRef } from "react"

interface ParticlesProps {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  size?: number
  refresh?: boolean
  color?: string
  vx?: number
  vy?: number
}

function hexToRgb(hex: string): [number, number, number] {
  hex = hex.replace("#", "")

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("")
  }

  const hexInt = parseInt(hex, 16) || 0
  const red = (hexInt >> 16) & 255
  const green = (hexInt >> 8) & 255
  const blue = hexInt & 255
  return [red, green, blue]
}

type Circle = {
  x: number
  y: number
  translateX: number
  translateY: number
  size: number
  alpha: number
  targetAlpha: number
  dx: number
  dy: number
  magnetism: number
}

const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const circles = useRef<Circle[]>([])
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 })
  const rafId = useRef<number | null>(null)
  const isVisibleRef = useRef<boolean>(true)

  const rgb = useRef<[number, number, number]>(hexToRgb(color))
  useEffect(() => {
    rgb.current = hexToRgb(color)
  }, [color])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    context.current = canvas.getContext("2d", { alpha: true })

    // Track mouse position directly via ref - ZERO React re-renders!
    const handleMouseMove = (event: MouseEvent) => {
      if (!canvasRef.current) return
      const rect = canvasRef.current.getBoundingClientRect()
      const { w, h } = canvasSize.current
      const x = event.clientX - rect.left - w / 2
      const y = event.clientY - rect.top - h / 2
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2
      if (inside) {
        mouse.current.x = x
        mouse.current.y = y
      }
    }

    // Visibility change: pause when tab is inactive to save battery/CPU
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden
      if (isVisibleRef.current && !rafId.current) {
        animate()
      }
    }

    const initCanvas = () => {
      resizeCanvas()
      drawParticles()
    }

    let resizeTimer: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(initCanvas, 150)
    }

    const resizeCanvas = () => {
      if (canvasContainerRef.current && canvasRef.current && context.current) {
        circles.current.length = 0
        const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2)
        canvasSize.current.w = canvasContainerRef.current.offsetWidth
        canvasSize.current.h = canvasContainerRef.current.offsetHeight
        canvasRef.current.width = canvasSize.current.w * dpr
        canvasRef.current.height = canvasSize.current.h * dpr
        canvasRef.current.style.width = `${canvasSize.current.w}px`
        canvasRef.current.style.height = `${canvasSize.current.h}px`
        context.current.setTransform(dpr, 0, 0, dpr, 0, 0)
      }
    }

    const circleParams = (): Circle => {
      const x = Math.floor(Math.random() * canvasSize.current.w)
      const y = Math.floor(Math.random() * canvasSize.current.h)
      const translateX = 0
      const translateY = 0
      const pSize = Math.floor(Math.random() * 2) + size
      const alpha = 0
      const targetAlpha = parseFloat((Math.random() * 0.5 + 0.5).toFixed(1))
      const dx = (Math.random() - 0.5) * 0.1
      const dy = (Math.random() - 0.5) * 0.1
      const magnetism = 0.1 + Math.random() * 4
      return {
        x,
        y,
        translateX,
        translateY,
        size: pSize,
        alpha,
        targetAlpha,
        dx,
        dy,
        magnetism,
      }
    }

    const drawCircle = (circle: Circle, update = false) => {
      if (context.current) {
        const { x, y, translateX, translateY, size, alpha } = circle
        const [r, g, b] = rgb.current
        context.current.beginPath()
        context.current.arc(x + translateX, y + translateY, size, 0, 2 * Math.PI)
        context.current.fillStyle = `rgba(${r},${g},${b},${alpha})`
        context.current.fill()

        if (!update) {
          circles.current.push(circle)
        }
      }
    }

    const clearContext = () => {
      if (context.current) {
        context.current.clearRect(
          0,
          0,
          canvasSize.current.w,
          canvasSize.current.h,
        )
      }
    }

    let scrollTimeout: ReturnType<typeof setTimeout>
    const isMobileDevice = typeof window !== "undefined" && (window.innerWidth < 768 || "ontouchstart" in window)

    const handleScroll = () => {
      if (isMobileDevice) {
        isVisibleRef.current = false
        clearTimeout(scrollTimeout)
        scrollTimeout = setTimeout(() => {
          isVisibleRef.current = !document.hidden
          if (isVisibleRef.current && !rafId.current) {
            animate()
          }
        }, 120)
      }
    }

    const drawParticles = () => {
      clearContext()
      // Adapt particle count to device viewport width
      const isMobile = canvasSize.current.w < 768
      const particleCount = isMobile ? Math.min(35, Math.round(quantity * 0.25)) : quantity
      for (let i = 0; i < particleCount; i++) {
        const circle = circleParams()
        drawCircle(circle)
      }
    }

    const remapValue = (
      value: number,
      start1: number,
      end1: number,
      start2: number,
      end2: number,
    ): number => {
      const remapped =
        ((value - start1) * (end2 - start2)) / (end1 - start1) + start2
      return remapped > 0 ? remapped : 0
    }

    const animate = () => {
      if (!isVisibleRef.current) {
        rafId.current = null
        return
      }

      clearContext()
      const w = canvasSize.current.w
      const h = canvasSize.current.h

      for (let i = circles.current.length - 1; i >= 0; i--) {
        const circle = circles.current[i]
        const edge = [
          circle.x + circle.translateX - circle.size,
          w - circle.x - circle.translateX - circle.size,
          circle.y + circle.translateY - circle.size,
          h - circle.y - circle.translateY - circle.size,
        ]
        const closestEdge = Math.min(...edge)
        const remapClosestEdge = remapValue(closestEdge, 0, 20, 0, 1)

        if (remapClosestEdge > 1) {
          circle.alpha += 0.02
          if (circle.alpha > circle.targetAlpha) {
            circle.alpha = circle.targetAlpha
          }
        } else {
          circle.alpha = circle.targetAlpha * remapClosestEdge
        }

        circle.x += circle.dx + vx
        circle.y += circle.dy + vy
        circle.translateX +=
          (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
          ease
        circle.translateY +=
          (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
          ease

        drawCircle(circle, true)

        if (
          circle.x < -circle.size ||
          circle.x > w + circle.size ||
          circle.y < -circle.size ||
          circle.y > h + circle.size
        ) {
          circles.current.splice(i, 1)
          const newCircle = circleParams()
          drawCircle(newCircle)
        }
      }

      rafId.current = window.requestAnimationFrame(animate)
    }

    initCanvas()
    animate()

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("resize", handleResize, { passive: true })
    window.addEventListener("scroll", handleScroll, { passive: true })
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      if (rafId.current) {
        window.cancelAnimationFrame(rafId.current)
      }
      clearTimeout(resizeTimer)
      clearTimeout(scrollTimeout)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [quantity, staticity, ease, size, refresh, vx, vy])

  return (
    <div
      className={cn("pointer-events-none", className)}
      ref={canvasContainerRef}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="size-full pointer-events-none" />
    </div>
  )
}

export { Particles }