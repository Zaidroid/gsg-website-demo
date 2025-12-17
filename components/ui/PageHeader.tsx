"use client"

import { motion } from "framer-motion"

interface PageHeaderProps {
    title: string
    description?: string
    className?: string
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
    return (
        <div className="relative py-16 sm:py-20 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
                    className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-gsg-teal via-gsg-orange to-gsg-teal bg-[size:200%] animate-gradient sm:text-5xl lg:text-6xl mb-6 pb-2"
                >
                    {title}
                </motion.h1>
                {description && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-slate-300"
                    >
                        {description}
                    </motion.p>
                )}
            </div>
        </div>
    )
}
