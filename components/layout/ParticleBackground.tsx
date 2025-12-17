"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { resolvedTheme } = useTheme()

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let w = (canvas.width = window.innerWidth)
        let h = (canvas.height = window.innerHeight)

        // Elastic Grid Configuration
        // Elastic Grid Configuration
        const spacing = 45
        const mouseRadius = 120 // Very compact interaction
        const springFactor = 0.02 // Very slow, viscous return
        const friction = 0.90

        const points: Point[] = []

        class Point {
            x: number
            y: number
            originX: number
            originY: number
            vx: number
            vy: number
            color: string
            size: number
            targetSize: number

            constructor(x: number, y: number) {
                this.x = x
                this.y = y
                this.originX = x
                this.originY = y
                this.vx = 0
                this.vy = 0
                this.color = resolvedTheme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
                this.size = 1.5
                this.targetSize = 1.5
            }

            update(mouse: { x: number, y: number }) {
                // Determine distances
                const dx = mouse.x - this.x
                const dy = mouse.y - this.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                // Mouse Interaction Force (Repulsion / Magnetism)
                let forceX = 0
                let forceY = 0

                if (distance < mouseRadius) {
                    const force = (mouseRadius - distance) / mouseRadius
                    const angle = Math.atan2(dy, dx)
                    // Push away gently
                    const pushStrength = 8 * force
                    forceX = -Math.cos(angle) * pushStrength
                    forceY = -Math.sin(angle) * pushStrength

                    // Visual Flair: Grow when active
                    this.targetSize = 1.8 // Barely noticeable bump

                    // Dynamic Color
                    const intensity = Math.min(1, force * 2)
                    if (resolvedTheme === 'dark') {
                        // Cyan/Teal mix in dark mode
                        this.color = `rgba(48, 157, 196, ${0.4 + intensity * 0.6})`
                    } else {
                        // Orange mix in light mode
                        this.color = `rgba(231, 139, 63, ${0.4 + intensity * 0.6})`
                    }
                } else {
                    this.targetSize = 1.5
                    // Revert color slowly
                    this.color = resolvedTheme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
                }

                // Spring Physics (Return to Origin)
                const springDx = this.originX - this.x
                const springDy = this.originY - this.y

                forceX += springDx * springFactor
                forceY += springDy * springFactor

                // Apply Physics
                this.vx += forceX
                this.vy += forceY
                this.vx *= friction
                this.vy *= friction

                this.x += this.vx
                this.y += this.vy

                // Smooth Size Transition
                this.size += (this.targetSize - this.size) * 0.1
            }

            draw() {
                if (!ctx) return
                ctx.fillStyle = this.color
                ctx.beginPath()
                // Square/Diamond shape for "Tech" feel instead of circle? 
                // Let's stick to circles but sharp.
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        const initPoints = () => {
            points.length = 0
            // Offset rows slightly for a mesh look? No, keeping it strict grid for "Code" feel.
            for (let x = 0; x < w; x += spacing) {
                for (let y = 0; y < h; y += spacing) {
                    points.push(new Point(x, y))
                }
            }
        }

        initPoints()

        let animationFrameId: number
        const mouse = { x: -1000, y: -1000 } // Start off-screen

        const animate = () => {
            ctx.clearRect(0, 0, w, h)

            points.forEach(point => {
                point.update(mouse)
                point.draw()
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        animate()

        const handleResize = () => {
            w = canvas.width = window.innerWidth
            h = canvas.height = window.innerHeight
            initPoints()
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
        }

        window.addEventListener("resize", handleResize)
        window.addEventListener("mousemove", handleMouseMove)

        return () => {
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("mousemove", handleMouseMove)
            cancelAnimationFrame(animationFrameId)
        }
    }, [resolvedTheme])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[-1] bg-gradient-to-br from-white via-indigo-50/20 to-white dark:from-slate-950 dark:via-[#0F172A] dark:to-slate-950 transition-colors duration-1000"
        />
    )
}
