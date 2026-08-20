'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

class Vector2D {
    constructor(public x: number, public y: number) {}
    static random(min: number, max: number): number {
        return min + Math.random() * (max - min)
    }
}

class Vector3D {
    constructor(public x: number, public y: number, public z: number) {}
    static random(min: number, max: number): number {
        return min + Math.random() * (max - min)
    }
}

class AnimationController {
    private timeline: gsap.core.Timeline
    private time = 0
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private dpr: number
    private size: number
    private stars: Star[] = []
    
    private readonly changeEventTime = 0.32
    private readonly cameraZ = -400
    private readonly cameraTravelDistance = 3400
    private readonly startDotYOffset = 28
    private readonly viewZoom = 100
    private readonly numberOfStars: number
    private readonly trailLength = 70
    
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, dpr: number, size: number, numberOfStars = 3500) {
        this.canvas = canvas
        this.ctx = ctx
        this.dpr = dpr
        this.size = size
        this.numberOfStars = numberOfStars
        this.timeline = gsap.timeline({ repeat: -1 })
        this.setupRandomGenerator()
        this.createStars()
        this.setupTimeline()
    }
    
    private setupRandomGenerator() {
        const originalRandom = Math.random
        const customRandom = () => {
            let seed = 1234
            return () => {
                seed = (seed * 9301 + 49297) % 233280
                return seed / 233280
            }
        }
        Math.random = customRandom()
        this.createStars()
        Math.random = originalRandom
    }
    
    private createStars() {
        for (let i = 0; i < this.numberOfStars; i++) {
            this.stars.push(new Star(this.cameraZ, this.cameraTravelDistance))
        }
    }
    
    private setupTimeline() {
        this.timeline.to(this, {
            time: 1,
            duration: 15,
            repeat: -1,
            ease: "none",
            onUpdate: () => this.render()
        })
    }
    
    public ease(p: number, g: number): number {
        if (p < 0.5) return 0.5 * Math.pow(2 * p, g)
        else return 1 - 0.5 * Math.pow(2 * (1 - p), g)
    }
    
    public easeOutElastic(x: number): number {
        const c4 = (2 * Math.PI) / 4.5
        if (x <= 0) return 0
        if (x >= 1) return 1
        return Math.pow(2, -8 * x) * Math.sin((x * 8 - 0.75) * c4) + 1
    }
    
    public map(value: number, start1: number, stop1: number, start2: number, stop2: number): number {
        return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
    }
    
    public constrain(value: number, min: number, max: number): number {
        return Math.min(Math.max(value, min), max)
    }
    
    public lerp(start: number, end: number, t: number): number {
        return start * (1 - t) + end * t
    }
    
    public spiralPath(p: number): Vector2D {
        p = this.constrain(1.2 * p, 0, 1)
        p = this.ease(p, 1.8)
        const numberOfSpiralTurns = 6
        const theta = 2 * Math.PI * numberOfSpiralTurns * Math.sqrt(p)
        const r = 170 * Math.sqrt(p)
        return new Vector2D(r * Math.cos(theta), r * Math.sin(theta) + this.startDotYOffset)
    }
    
    public rotate(v1: Vector2D, v2: Vector2D, p: number, orientation: boolean): Vector2D {
        const middle = new Vector2D((v1.x + v2.x) / 2, (v1.y + v2.y) / 2)
        const dx = v1.x - middle.x
        const dy = v1.y - middle.y
        const angle = Math.atan2(dy, dx)
        const o = orientation ? -1 : 1
        const r = Math.sqrt(dx * dx + dy * dy)
        const bounce = Math.sin(p * Math.PI) * 0.05 * (1 - p)
        return new Vector2D(
            middle.x + r * (1 + bounce) * Math.cos(angle + o * Math.PI * this.easeOutElastic(p)),
            middle.y + r * (1 + bounce) * Math.sin(angle + o * Math.PI * this.easeOutElastic(p))
        )
    }
    
    public showProjectedDot(position: Vector3D, sizeFactor: number) {
        const t2 = this.constrain(this.map(this.time, this.changeEventTime, 1, 0, 1), 0, 1)
        const newCameraZ = this.cameraZ + this.ease(Math.pow(t2, 1.2), 1.8) * this.cameraTravelDistance
        if (position.z > newCameraZ) {
            const dotDepthFromCamera = position.z - newCameraZ
            const x = this.viewZoom * position.x / dotDepthFromCamera
            const y = this.viewZoom * position.y / dotDepthFromCamera
            const sw = 400 * sizeFactor / dotDepthFromCamera
            this.ctx.lineWidth = sw
            this.ctx.beginPath()
            this.ctx.arc(x, y, 0.5, 0, Math.PI * 2)
            this.ctx.fill()
        }
    }
    
    private drawStartDot() {
        if (this.time > this.changeEventTime) {
            const dy = this.cameraZ * this.startDotYOffset / this.viewZoom
            const position = new Vector3D(0, dy, this.cameraTravelDistance)
            this.showProjectedDot(position, 2.5)
        }
    }
    
    public render() {
        const ctx = this.ctx
        if (!ctx) return
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, this.size, this.size)
        ctx.save()
        ctx.translate(this.size / 2, this.size / 2)
        const t1 = this.constrain(this.map(this.time, 0, this.changeEventTime + 0.25, 0, 1), 0, 1)
        const t2 = this.constrain(this.map(this.time, this.changeEventTime, 1, 0, 1), 0, 1)
        ctx.rotate(-Math.PI * this.ease(t2, 2.7))
        this.drawTrail(t1)
        ctx.fillStyle = 'white'
        for (const star of this.stars) { star.render(t1, this) }
        this.drawStartDot()
        ctx.restore()
    }
    
    private drawTrail(t1: number) {
        for (let i = 0; i < this.trailLength; i++) {
            const f = this.map(i, 0, this.trailLength, 1.1, 0.1)
            const sw = (1.3 * (1 - t1) + 3.0 * Math.sin(Math.PI * t1)) * f
            this.ctx.fillStyle = 'white'
            this.ctx.lineWidth = sw
            const pathTime = t1 - 0.00015 * i
            const position = this.spiralPath(pathTime)
            const rotated = this.rotate(position, new Vector2D(position.x + 5, position.y + 5), Math.sin(this.time * Math.PI * 2) * 0.5 + 0.5, i % 2 === 0)
            this.ctx.beginPath()
            this.ctx.arc(rotated.x, rotated.y, sw / 2, 0, Math.PI * 2)
            this.ctx.fill()
        }
    }
    public destroy() { this.timeline.kill() }
}

class Star {
    private dx: number; private dy: number; private spiralLocation: number; private strokeWeightFactor: number;
    private z: number; private angle: number; private distance: number; private rotationDirection: number;
    private expansionRate: number; private finalScale: number;
    
    constructor(cameraZ: number, cameraTravelDistance: number) {
        this.angle = Math.random() * Math.PI * 2
        this.distance = 30 * Math.random() + 15
        this.rotationDirection = Math.random() > 0.5 ? 1 : -1
        this.expansionRate = 1.2 + Math.random() * 0.8
        this.finalScale = 0.7 + Math.random() * 0.6
        this.dx = this.distance * Math.cos(this.angle)
        this.dy = this.distance * Math.sin(this.angle)
        this.spiralLocation = (1 - Math.pow(1 - Math.random(), 3.0)) / 1.3
        const lerp = (s: number, e: number, t: number) => s * (1 - t) + e * t
        this.z = lerp(Vector2D.random(0.5 * cameraZ, cameraTravelDistance + cameraZ), cameraTravelDistance / 2, 0.3 * this.spiralLocation)
        this.strokeWeightFactor = Math.pow(Math.random(), 2.0)
    }
    
    render(p: number, controller: AnimationController) {
        const spiralPos = controller.spiralPath(this.spiralLocation)
        const q = p - this.spiralLocation
        if (q > 0) {
            const dP = controller.constrain(4 * q, 0, 1)
            let easing = dP < 0.3 ? controller.lerp(dP, Math.pow(dP, 2), dP / 0.3) : dP < 0.7 ? controller.lerp(Math.pow(dP, 2), controller.easeOutElastic(dP), (dP - 0.3) / 0.4) : controller.easeOutElastic(dP)
            let sX, sY;
            if (dP < 0.3) {
                sX = controller.lerp(spiralPos.x, spiralPos.x + this.dx * 0.3, easing / 0.3)
                sY = controller.lerp(spiralPos.y, spiralPos.y + this.dy * 0.3, easing / 0.3)
            } else if (dP < 0.7) {
                const mP = (dP - 0.3) / 0.4; const cS = Math.sin(mP * Math.PI) * this.rotationDirection * 1.5;
                sX = controller.lerp(spiralPos.x + this.dx * 0.3, spiralPos.x + this.dx * 0.7, mP) + (-this.dy * 0.4 * cS) * mP
                sY = controller.lerp(spiralPos.y + this.dy * 0.3, spiralPos.y + this.dy * 0.7, mP) + (this.dx * 0.4 * cS) * mP
            } else {
                const fP = (dP - 0.7) / 0.3; const tD = this.distance * this.expansionRate * 1.5;
                const sA = this.angle + (1.2 * this.rotationDirection) * fP * Math.PI;
                sX = controller.lerp(spiralPos.x + this.dx * 0.7, spiralPos.x + tD * Math.cos(sA), fP)
                sY = controller.lerp(spiralPos.y + this.dy * 0.7, spiralPos.y + tD * Math.sin(sA), fP)
            }
            const position = new Vector3D((this.z - (-400)) * sX / 100, (this.z - (-400)) * sY / 100, this.z)
            const dotSize = 8.5 * this.strokeWeightFactor * (dP < 0.6 ? 1.0 + dP * 0.2 : 1.2 * (1.0 - (dP - 0.6) / 0.4) + this.finalScale * ((dP - 0.6) / 0.4))
            controller.showProjectedDot(position, dotSize)
        }
    }
}

export function SpiralAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<AnimationController | null>(null);
    const [dim, setDim] = useState({ w: typeof window !== 'undefined' ? window.innerWidth : 1920, h: typeof window !== 'undefined' ? window.innerHeight : 1080 });

    useEffect(() => {
        let resizeTimer: ReturnType<typeof setTimeout>;
        const res = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => setDim({ w: window.innerWidth, h: window.innerHeight }), 100);
        };
        window.addEventListener('resize', res, { passive: true });
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const isMobile = dim.w < 768;
        const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.75);
        const size = Math.max(dim.w, dim.h);
        canvas.width = size * dpr; canvas.height = size * dpr;
        canvas.style.width = `${dim.w}px`; canvas.style.height = `${dim.h}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        animationRef.current = new AnimationController(canvas, ctx, dpr, size, isMobile ? 2200 : 4000);
        return () => { 
            clearTimeout(resizeTimer);
            window.removeEventListener('resize', res); 
            animationRef.current?.destroy(); 
        };
    }, [dim]);

    return <div className="relative w-full h-full bg-black"><canvas ref={canvasRef} className="absolute inset-0 w-full h-full" /></div>;
}