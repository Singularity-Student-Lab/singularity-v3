'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export function LogoParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let animId: number
    const tweens: gsap.core.Tween[] = []
    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? 380 : 750

    // Create an offscreen pre-rendered glowing particle sprite
    // This replaces ctx.shadowBlur (which causes severe software CPU Gaussian blur lag)
    // with 100% GPU-accelerated drawImage
    const spriteCanvas = document.createElement("canvas")
    const spriteSize = 24
    spriteCanvas.width = spriteSize
    spriteCanvas.height = spriteSize
    const spriteCtx = spriteCanvas.getContext("2d")
    if (spriteCtx) {
      const gradient = spriteCtx.createRadialGradient(
        spriteSize / 2, spriteSize / 2, 0,
        spriteSize / 2, spriteSize / 2, spriteSize / 2
      )
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)")
      gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.8)")
      gradient.addColorStop(0.6, "rgba(255, 255, 255, 0.15)")
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
      spriteCtx.fillStyle = gradient
      spriteCtx.fillRect(0, 0, spriteSize, spriteSize)
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2

    interface Particle {
      angle: number
      radius: number
      x: number
      y: number
      speed: number
    }

    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * Math.max(window.innerWidth, window.innerHeight)

      const p: Particle = {
        angle,
        radius,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        speed: 0.0015 + Math.random() * 0.001
      }

      particles.push(p)

      const tw = gsap.to(p, {
        radius: Math.random() * 40,
        duration: 3,
        delay: 0.2 + Math.random() * 0.2,
        ease: "expo.out"
      })
      tweens.push(tw)
    }

    const halfSprite = spriteSize / 2
    const width = window.innerWidth
    const height = window.innerHeight

    function draw() {
      ctx!.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.angle += p.speed
        p.x = centerX + Math.cos(p.angle) * p.radius
        p.y = centerY + Math.sin(p.angle) * p.radius

        ctx!.drawImage(spriteCanvas, p.x - halfSprite, p.y - halfSprite)
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      tweens.forEach(tw => tw.kill())
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-40 pointer-events-none z-0"
    />
  )
}