"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import { HeroVisual } from "./HeroVisual"
import { TypewriterText } from "@/components/ui/TypewriterText"

export function Hero() {
    return (
        <div className="relative overflow-hidden pt-20 pb-24 lg:pt-32 lg:pb-40 bg-transparent transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

                    {/* Left Column: Text & CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-center lg:items-start text-center lg:text-left z-10"
                    >
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/50 dark:bg-slate-800/50 px-4 py-1.5 text-sm font-bold text-primary dark:text-white shadow-sm ring-1 ring-gray-200/50 dark:ring-slate-700/50 backdrop-blur-md transition-colors">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                            </span>
                            Empowering Palestine&apos;s Tech Future
                        </div>

                        <h1 className="text-5xl font-extrabold tracking-tight text-primary dark:text-white sm:text-6xl lg:text-7xl mb-6 leading-[1.1] drop-shadow-lg">
                            Building a Vibrant <br />
                            <span className="text-secondary">
                                <TypewriterText
                                    texts={["Digital Economy", "Tech Ecosystem", "Resilient Future"]}
                                    className="bg-clip-text text-transparent bg-gradient-to-r from-gsg-orange to-gsg-orange-light"
                                />
                            </span>
                        </h1>

                        <p className="mb-8 text-lg leading-8 text-gray-700 dark:text-slate-200 max-w-xl font-medium transition-colors drop-shadow-md">
                            Gaza Sky Geeks is the leading tech hub in Palestine. We weave a network of freelancers, founders, and coders to build a better future.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link
                                href="/programs"
                                className="group flex items-center justify-center gap-2 rounded-full bg-primary dark:bg-white px-8 py-4 text-base font-bold text-white dark:text-[#1F3036] shadow-lg transition-all hover:bg-primary/90 dark:hover:bg-gray-100 hover:shadow-xl hover:-translate-y-1"
                            >
                                Explore Programs
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="/about"
                                className="group flex items-center justify-center gap-2 rounded-full bg-white/50 dark:bg-slate-800/50 px-8 py-4 text-base font-bold text-primary dark:text-white shadow-md ring-1 ring-gray-200/50 dark:ring-slate-700/50 backdrop-blur-md transition-all hover:bg-white/70 dark:hover:bg-slate-800/70 hover:ring-gray-300 dark:hover:ring-slate-600 hover:-translate-y-1"
                            >
                                <Play className="h-4 w-4 fill-primary dark:fill-white group-hover:scale-110 transition-transform" />
                                Our Story
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right Column: Interactive Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex items-center justify-center lg:justify-end relative z-0"
                    >
                        <HeroVisual />
                    </motion.div>

                </div>
            </div>
        </div>
    )
}
