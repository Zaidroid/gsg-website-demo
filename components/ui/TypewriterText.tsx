"use client"

import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect, useState } from "react"

export interface TypewriterTextProps {
    texts: string[]
    className?: string
}

export function TypewriterText({ texts, className }: TypewriterTextProps) {
    const [textIndex, setTextIndex] = useState(0)
    const count = useMotionValue(0)
    const rounded = useTransform(count, (latest) => Math.round(latest))
    const displayText = useTransform(rounded, (latest) =>
        texts[textIndex].slice(0, latest)
    )

    useEffect(() => {
        const controls = animate(count, texts[textIndex].length, {
            type: "tween",
            duration: 2,
            ease: "easeInOut",
            onComplete: () => {
                setTimeout(() => {
                    // Wait before deleting
                    const deleteControls = animate(count, 0, {
                        type: "tween",
                        duration: 1.5,
                        ease: "easeInOut",
                        onComplete: () => {
                            setTextIndex((prev) => (prev + 1) % texts.length)
                        }
                    })
                    return () => deleteControls.stop()
                }, 2000)
            },
        })
        return () => controls.stop()
    }, [textIndex, texts, count])

    return (
        <span className={className}>
            <motion.span>{displayText}</motion.span>
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block w-[2px] h-[1em] bg-secondary ms-1 align-middle"
            />
        </span>
    )
}
