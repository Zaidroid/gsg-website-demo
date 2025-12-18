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

        let animationFrameId: number
        let w = 0
        let h = 0
        let dpr = 1

        // Configuration for Premium Feel
        const spacing = 50
        const mouseRadius = 180
        const springFactor = 0.04 // Snappy return
        const friction = 0.92 // Heavy, premium slide
        const baseSize = 1.5

        interface Point {
            x: number
            y: number
            originX: number
            originY: number
            vx: number
            vy: number
            color: string
            size: number
            targetSize: number
        }

        const points: Point[] = []

        const initPoints = () => {
            points.length = 0
            // Ensure we cover the whole screen + buffer
            const cols = Math.ceil(w / spacing) + 1
            const rows = Math.ceil(h / spacing) + 1

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * spacing
                    const y = j * spacing
                    points.push({
                        x,
                        y,
                        originX: x,
                        originY: y,
                        vx: 0,
                        vy: 0,
                        color: resolvedTheme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                        size: baseSize,
                        targetSize: baseSize
                    })
                }
            }
        }

        const handleResize = () => {
            dpr = window.devicePixelRatio || 1
            w = window.innerWidth
            h = window.innerHeight

            // Set actual canvas size (integers)
            canvas.width = w * dpr
            canvas.height = h * dpr

            // Normalize CSS size
            canvas.style.width = `${w}px`
            canvas.style.height = `${h}px`

            // Scale context
            ctx.scale(dpr, dpr)

            initPoints()
        }

        // Initial setup
        handleResize()

        const mouse = { x: -1000, y: -1000 }

        const animate = () => {
            ctx.clearRect(0, 0, w, h)

            points.forEach(point => {
                // Determine distances
                const dx = mouse.x - point.x
                const dy = mouse.y - point.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                // Mouse Interaction (Magnetic Repulsion)
                let forceX = 0
                let forceY = 0

                if (distance < mouseRadius) {
                    const power = 1 - distance / mouseRadius
                    const angle = Math.atan2(dy, dx)

                    // Smooth repulsion curve
                    const pushStrength = 15 * power * power

                    forceX = -Math.cos(angle) * pushStrength
                    forceY = -Math.sin(angle) * pushStrength

                    // Visual Flair: Subtle bloom
                    point.targetSize = baseSize * 1.5

                    // Dynamic Color
                    if (resolvedTheme === 'dark') {
                        // Cyan/Teal mix in dark mode
                        point.color = `rgba(48, 157, 196, ${0.1 + power * 0.4})`
                    } else {
                        // Orange mix in light mode
                        point.color = `rgba(231, 139, 63, ${0.1 + power * 0.4})`
                    }
                } else {
                    point.targetSize = baseSize
                    point.color = resolvedTheme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
                }

                // Spring Physics (Return to Origin)
                const springDx = point.originX - point.x
                const springDy = point.originY - point.y

                forceX += springDx * springFactor
                forceY += springDy * springFactor

                // Apply Physics
                point.vx += forceX
                point.vy += forceY
                point.vx *= friction
                point.vy *= friction

                point.x += point.vx
                point.y += point.vy

                // Smooth Size Transition
                point.size += (point.targetSize - point.size) * 0.1

                // Draw
                ctx.beginPath()
                ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2)
                ctx.fillStyle = point.color
                ctx.fill()
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        animate()

        const handleMouseMove = (e: MouseEvent) => {
            // Get correct Client coordinates
            const rect = canvas.getBoundingClientRect()
            mouse.x = e.clientX - rect.left
            mouse.y = e.clientY - rect.top
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
            className="fixed inset-0 z-[-1] bg-gradient-to-br from-[#FAFAFA] via-[#F4F6F8] to-[#FFFFFF] dark:from-[#0B1120] dark:via-[#16202C] dark:to-[#0B1120] transition-colors duration-1000 pointer-events-none"
            style={{ touchAction: "none" }}
        />
    )
}
