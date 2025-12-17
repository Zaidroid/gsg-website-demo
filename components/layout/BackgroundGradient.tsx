"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function BackgroundGradient() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-white pointer-events-none">
            {/* Soft animated gradient blobs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -top-[10%] -left-[10%] h-[50vh] w-[50vh] rounded-full bg-blue-100 mix-blend-multiply blur-3xl opacity-30"
            />

            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.4, 0.3],
                    x: [0, -40, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute bottom-0 right-0 h-[60vh] w-[60vh] rounded-full bg-teal-50 mix-blend-multiply blur-3xl opacity-30"
            />

            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.4, 0.2],
                    x: [0, 60, 0],
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 4
                }}
                className="absolute top-[30%] left-[30%] h-[40vh] w-[40vh] rounded-full bg-orange-50 mix-blend-multiply blur-3xl opacity-20"
            />
        </div>
    )
}
