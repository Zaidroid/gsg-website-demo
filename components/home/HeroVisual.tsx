"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Zap } from "lucide-react"
import { useState, useEffect } from "react"

// Terminal phases
type TerminalPhase = "typing_command" | "executing" | "showing_output" | "pausing" | "clearing"

interface CodeSnippet {
    fn: string
    command: string
    vision: string
    tech: string
    impact: string
}

const DEFAULT_SNIPPETS: CodeSnippet[] = [
    {
        fn: "buildFuture",
        command: "node buildFuture.js",
        vision: '"Palestine"',
        tech: '["AI", "Web3", "Data"]',
        impact: "Infinity"
    },
    {
        fn: "empowerYouth",
        command: "node empowerYouth.js",
        vision: '"Global"',
        tech: '["React", "Node", "Cloud"]',
        impact: "High"
    },
    {
        fn: "elevateBusiness",
        command: "node elevateBusiness.js",
        vision: '"Sustainability"',
        tech: '["Digital", "Export", "Growth"]',
        impact: "Economic"
    }
]

interface HeroVisualProps {
    snippets?: string | null // JSON string
}

export function HeroVisual({ snippets }: HeroVisualProps) {
    const [loopNum, setLoopNum] = useState(0)
    const [phase, setPhase] = useState<TerminalPhase>("typing_command")
    const [commandText, setCommandText] = useState("")
    const [outputLines, setOutputLines] = useState<string[]>([])
    const [currentOutputIndex, setCurrentOutputIndex] = useState(0)
    const [parsedSnippets, setParsedSnippets] = useState<CodeSnippet[]>(DEFAULT_SNIPPETS)

    useEffect(() => {
        if (snippets) {
            try {
                const parsed = JSON.parse(snippets)
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setParsedSnippets(parsed)
                }
            } catch (e) {
                console.error("Failed to parse terminal snippets, using defaults", e)
            }
        }
    }, [snippets])

    const currentSnippet = parsedSnippets[loopNum % parsedSnippets.length]

    // Generate output lines for current snippet
    const generateOutputLines = () => [
        `→ Starting ${currentSnippet.fn}...`,
        ``,
        `const future = await ${currentSnippet.fn}({`,
        `  vision: ${currentSnippet.vision},`,
        `  tech: ${currentSnippet.tech},`,
        `  impact: ${currentSnippet.impact}`,
        `});`,
        ``,
        `✓ Execution complete`,
        `✓ Impact: ${currentSnippet.impact}`
    ]

    useEffect(() => {
        let timer: NodeJS.Timeout

        switch (phase) {
            case "typing_command":
                // Type the command character by character
                if (commandText.length < currentSnippet.command.length) {
                    timer = setTimeout(() => {
                        setCommandText(currentSnippet.command.substring(0, commandText.length + 1))
                    }, 80)
                } else {
                    // Command fully typed, move to executing
                    timer = setTimeout(() => setPhase("executing"), 500)
                }
                break

            case "executing":
                // Brief pause to simulate execution start
                timer = setTimeout(() => {
                    setOutputLines(generateOutputLines())
                    setCurrentOutputIndex(0)
                    setPhase("showing_output")
                }, 600)
                break

            case "showing_output":
                // Show output lines progressively
                const allLines = generateOutputLines()
                if (currentOutputIndex < allLines.length) {
                    timer = setTimeout(() => {
                        setCurrentOutputIndex(currentOutputIndex + 1)
                    }, 200)
                } else {
                    // All output shown, pause before clearing
                    timer = setTimeout(() => setPhase("pausing"), 2000)
                }
                break

            case "pausing":
                // Hold the complete output
                timer = setTimeout(() => setPhase("clearing"), 1500)
                break

            case "clearing":
                // Clear and reset for next snippet
                setCommandText("")
                setOutputLines([])
                setCurrentOutputIndex(0)
                setLoopNum(loopNum + 1)
                setPhase("typing_command")
                break
        }

        return () => clearTimeout(timer)
    }, [phase, commandText, currentOutputIndex, loopNum, currentSnippet.command, currentSnippet])

    return (
        <div className="relative h-[400px] w-full max-w-[500px] perspective-1000">
            {/* Floating Card Stack */}
            <motion.div
                initial={{ rotateY: -20, rotateX: 10, opacity: 0 }}
                animate={{ rotateY: -5, rotateX: 5, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative h-full w-full preserve-3d"
            >
                {/* Main Terminal Card */}
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-x-0 top-10 z-20 h-[300px] rounded-2xl bg-white/90 dark:bg-slate-900/90 p-6 shadow-2xl backdrop-blur-md border border-white/50 dark:border-slate-700 transition-colors"
                >
                    {/* Terminal Header */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="h-3 w-3 rounded-full bg-red-400" />
                        <div className="h-3 w-3 rounded-full bg-yellow-400" />
                        <div className="h-3 w-3 rounded-full bg-green-400" />
                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 font-mono">
                            terminal — gsg-impact
                        </span>
                    </div>

                    {/* Terminal Content */}
                    <div className="h-[220px] rounded-lg bg-gray-50/50 dark:bg-slate-800/50 p-4 font-mono text-xs overflow-hidden shadow-inner transition-colors" dir="ltr">
                        <div className="space-y-1">
                            {/* Command Line */}
                            <div className="flex items-center gap-2">
                                <span className="text-green-600 dark:text-green-400 font-bold">$</span>
                                <span className="text-gray-800 dark:text-gray-200">
                                    {commandText}
                                </span>
                                {phase === "typing_command" && (
                                    <motion.span
                                        animate={{ opacity: [1, 0] }}
                                        transition={{ duration: 0.8, repeat: Infinity }}
                                        className="inline-block w-2 h-4 bg-green-600 dark:bg-green-400"
                                    />
                                )}
                            </div>

                            {/* Executing Indicator */}
                            {phase === "executing" && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400"
                                >
                                    <motion.span
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    >
                                        ⟳
                                    </motion.span>
                                    <span>Running script...</span>
                                </motion.div>
                            )}

                            {/* Output Lines */}
                            <AnimatePresence mode="popLayout">
                                {phase === "showing_output" || phase === "pausing" ? (
                                    <div className="space-y-1 mt-2">
                                        {outputLines.slice(0, currentOutputIndex).map((line, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}

                                                transition={{ duration: 0.2 }}
                                                className={`
                                                    ${line.startsWith('→') ? 'text-blue-600 dark:text-blue-400' : ''}
                                                    ${line.startsWith('✓') ? 'text-green-600 dark:text-green-400 font-semibold' : ''}
                                                    ${line.startsWith('const') ? 'text-purple-600 dark:text-purple-400' : ''}
                                                    ${!line.startsWith('→') && !line.startsWith('✓') && !line.startsWith('const') && line.length > 0 ? 'text-gray-700 dark:text-gray-300' : ''}
                                                `}
                                            >
                                                {line.includes('const future') && (
                                                    <>
                                                        <span className="text-purple-600 dark:text-purple-400">const</span>{' '}
                                                        <span className="text-blue-600 dark:text-cyan-300">future</span>{' '}
                                                        <span className="text-gray-600 dark:text-gray-400">=</span>{' '}
                                                        <span className="text-purple-600 dark:text-purple-400">await</span>{' '}
                                                        <span className="text-yellow-600 dark:text-yellow-300">{currentSnippet.fn}</span>
                                                        <span className="text-gray-600 dark:text-gray-400">({"{"}</span>
                                                    </>
                                                )}
                                                {line.includes('vision:') && (
                                                    <>
                                                        <span className="text-gray-600 dark:text-gray-400">  vision: </span>
                                                        <span className="text-green-600 dark:text-green-400">{currentSnippet.vision}</span>
                                                        <span className="text-gray-600 dark:text-gray-400">,</span>
                                                    </>
                                                )}
                                                {line.includes('tech:') && (
                                                    <>
                                                        <span className="text-gray-600 dark:text-gray-400">  tech: </span>
                                                        <span className="text-green-600 dark:text-green-400">{currentSnippet.tech}</span>
                                                        <span className="text-gray-600 dark:text-gray-400">,</span>
                                                    </>
                                                )}
                                                {line.includes('impact:') && !line.startsWith('✓') && (
                                                    <>
                                                        <span className="text-gray-600 dark:text-gray-400">  impact: </span>
                                                        <span className="text-orange-600 dark:text-orange-400">{currentSnippet.impact}</span>
                                                    </>
                                                )}
                                                {line === '});' && (
                                                    <span className="text-gray-600 dark:text-gray-400">{"});"}</span>
                                                )}
                                                {line.startsWith('→') && line}
                                                {line.startsWith('✓') && line}
                                                {line === '' && <br />}
                                            </motion.div>
                                        ))}
                                        {(phase === "showing_output" || phase === "pausing") && currentOutputIndex === outputLines.length && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="flex items-center gap-2 mt-2"
                                            >
                                                <span className="text-green-600 dark:text-green-400 font-bold">$</span>
                                                <motion.span
                                                    animate={{ opacity: [1, 0] }}
                                                    transition={{ duration: 0.8, repeat: Infinity }}
                                                    className="inline-block w-2 h-4 bg-green-600 dark:bg-green-400"
                                                />
                                            </motion.div>
                                        )}
                                    </div>
                                ) : null}
                            </AnimatePresence>
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
