"use client"

import { useRef, useEffect, ReactNode } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

// --- TYPES ---
interface CardProps {
    id: string | number
    className?: string
    onClick?: () => void
    children: ReactNode
    delay?: number
}

interface ExpandedCardProps {
    id: string | number
    title: string
    onClose: () => void
    headerGradient?: string
    children: ReactNode
}

// --- UTILS ---
function useScrollLock(lock: boolean) {
    useEffect(() => {
        if (lock) {
            const width = document.body.clientWidth
            document.body.style.overflow = "hidden"
            document.body.style.paddingRight = `${window.innerWidth - width}px`
        } else {
            document.body.style.overflow = ""
            document.body.style.paddingRight = ""
        }
        return () => {
            document.body.style.overflow = ""
            document.body.style.paddingRight = ""
        }
    }, [lock])
}

// --- CONSTANTS ---
const TRANSITION = {
    type: "spring",
    damping: 30,
    stiffness: 300,
    mass: 0.8
}

// --- COMPONENTS ---

// 1. The Collapsed Card (Source)
export function Card({ id, className, onClick, children, delay = 0 }: CardProps) {
    return (
        <motion.div
            layout // Explicit layout prop is often needed fixes snapping
            layoutId={`card-container-${id}`}
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...TRANSITION, delay }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={cn(
                "group relative flex flex-col justify-between overflow-hidden cursor-pointer",
                // Visibility Fix: Stronger white background and gray border in light mode
                "bg-white/80 dark:bg-slate-900/40 backdrop-blur-lg",
                "border border-gray-200 dark:border-white/10",
                "shadow-lg hover:shadow-xl transition-all",
                "rounded-3xl",
                className
            )}
            style={{ borderRadius: "1.5rem" }}
        >
            <div className="flex flex-col h-full w-full">
                {children}
            </div>
        </motion.div>
    )
}

// 2. The Overlay (Backdrop)
export function ExpandedCardOverlay({ onClose }: { onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[90]"
            transition={{ duration: 0.2 }}
        />
    )
}

// 3. The Expanded Card (Target)
export function ExpandedCard({ id, title, onClose, headerGradient, children }: ExpandedCardProps) {
    useScrollLock(true)

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [onClose])

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
                layout // Explicit layout prop
                layoutId={`card-container-${id}`}
                className={cn(
                    "w-full max-w-2xl bg-white dark:bg-slate-900 shadow-2xl overflow-hidden pointer-events-auto",
                    "flex flex-col max-h-[90vh]",
                    "rounded-3xl"
                )}
                transition={TRANSITION}
                style={{ borderRadius: "1.5rem" }}
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: 0.15 }}
                    className="flex flex-col w-full h-full relative"
                >
                    {/* Header */}
                    <div className={cn(
                        "relative h-32 flex items-center justify-center overflow-hidden flex-shrink-0",
                        headerGradient || "bg-gradient-to-r from-gsg-orange/20 to-secondary/20"
                    )}>
                        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                        <button
                            onClick={(e) => { e.stopPropagation(); onClose(); }}
                            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-gray-900 dark:text-white transition-colors z-20"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-3xl font-black text-primary dark:text-white drop-shadow-sm px-8 text-center bg-clip-text">
                            {title}
                        </h2>
                    </div>

                    {/* Body */}
                    <div className="p-8 overflow-y-auto custom-scrollbar">
                        {children}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}
