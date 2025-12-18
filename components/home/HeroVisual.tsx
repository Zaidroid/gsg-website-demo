"use client"

import { motion } from "framer-motion"
import { Code, Zap } from "lucide-react"
import { useState, useEffect } from "react"

const codeSnippets = [
    {
        fn: "buildFuture",
        vision: '"Palestine"',
        tech: '["AI", "Web3", "Data"]',
        impact: "Infinity"
    },
    {
        fn: "empowerYouth",
        vision: '"Global"',
        tech: '["React", "Node", "Cloud"]',
        impact: "High"
    },
    {
        fn: "elevateBusiness",
        vision: '"Sustainability"',
        tech: '["Digital", "Export", "Growth"]',
        impact: "Economic"
    }
]

export function HeroVisual() {
    const [index, setIndex] = useState(0)
    const [text, setText] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)
    const [loopNum, setLoopNum] = useState(0)
    const [typingSpeed, setTypingSpeed] = useState(150)

    useEffect(() => {
        const handleTyping = () => {
            const i = loopNum % codeSnippets.length
            const fullText = codeSnippets[i].fn

            setText(isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1)
            )

            setTypingSpeed(isDeleting ? 50 : 150)

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 2000)
            } else if (isDeleting && text === "") {
                setIsDeleting(false)
                setLoopNum(loopNum + 1)
            }
        }

        const timer = setTimeout(handleTyping, typingSpeed)
        return () => clearTimeout(timer)
    }, [text, isDeleting, loopNum, typingSpeed])

    const currentSnippet = codeSnippets[loopNum % codeSnippets.length]

    return (
        <div className="relative h-[400px] w-full max-w-[500px] perspective-1000">
            {/* Floating Card Stack */}
            <motion.div
                initial={{ rotateY: -20, rotateX: 10, opacity: 0 }}
                animate={{ rotateY: -5, rotateX: 5, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative h-full w-full preserve-3d"
            >
                {/* Main Interface Card */}
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-x-0 top-10 z-20 h-[300px] rounded-2xl bg-white/90 dark:bg-slate-900/90 p-6 shadow-2xl backdrop-blur-md border border-white/50 dark:border-slate-700 transition-colors"
                >
                    <div className="flex items-center gap-2 mb-4 max-w-[100px]">
                        <div className="h-3 w-3 rounded-full bg-red-400" />
                        <div className="h-3 w-3 rounded-full bg-yellow-400" />
                        <div className="h-3 w-3 rounded-full bg-green-400" />
                    </div>
                    <div className="space-y-3">
                        <div className="h-4 w-3/4 rounded bg-gray-100/80 dark:bg-slate-800/80 animate-pulse" />
                        <div className="h-4 w-1/2 rounded bg-gray-100/80 dark:bg-slate-800/80 animate-pulse delay-75" />
                        <div className="h-32 w-full rounded bg-gray-50/50 dark:bg-slate-800/50 p-4 font-mono text-xs text-secondary dark:text-blue-300 shadow-inner transition-colors">
                            <span className="text-primary dark:text-pink-400">const</span> <span className="text-blue-600 dark:text-cyan-300">future</span> = <span className="text-primary dark:text-pink-400">await</span> <span className="text-secondary dark:text-blue-400">{text}</span><span className="animate-pulse">|</span>({"{"}<br />
                            &nbsp;&nbsp;vision: <span className="text-green-600 dark:text-green-400">{currentSnippet.vision}</span>,<br />
                            &nbsp;&nbsp;tech: <span className="text-green-600 dark:text-green-400">{currentSnippet.tech}</span>,<br />
                            &nbsp;&nbsp;impact: <span className="text-primary dark:text-pink-400">{currentSnippet.impact}</span><br />
                            {"}"});
                        </div>
                    </div>
                </motion.div>

                {/* Floating Elements with Parallax-like feel */}
                <motion.div
                    animate={{ y: [0, 20, 0], rotate: [0, 8, 0], x: [0, 5, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                    className="absolute -right-8 top-0 z-30 flex h-20 w-20 items-center justify-center rounded-2xl bg-white dark:bg-slate-800 p-3 shadow-lg shadow-black/5 dark:shadow-black/20 ring-1 ring-black/5 dark:ring-white/10 transition-colors"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo.png" alt="GSG" className="h-full w-full object-contain dark:brightness-0 dark:invert" />
                </motion.div>

                <motion.div
                    animate={{ y: [0, -25, 0], rotate: [0, -10, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                    className="absolute -left-8 bottom-20 z-30 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gsg-teal to-blue-600 text-white shadow-xl shadow-gsg-teal/30"
                >
                    <Zap className="h-8 w-8 fill-white" />
                </motion.div>

                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -right-10 bottom-0 z-10 h-32 w-32 rounded-full bg-blue-400/20 blur-2xl dark:bg-blue-500/10"
                />
            </motion.div>
        </div>
    )
}
