"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
    title: string
    description?: string
    className?: string
    gradient?: string
}

export function PageHeader({ title, description, className, gradient }: PageHeaderProps) {
    return (
        <div className={cn("relative w-full overflow-hidden pt-36 pb-20 md:pt-48 md:pb-32", className)}>

            {/* 
               Ambient Background removed for true transparency 
               as requested ("seamless experience like the homepage").
            */}

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-7xl mb-6 drop-shadow-sm">
                        {/* 
                            Animated Gradient Text 
                            Using standard CSS animation approach for reliable infinite flow
                        */}
                        <span
                            className={cn(
                                "bg-clip-text text-transparent bg-[size:200%]",
                                "animate-gradient",
                                gradient || "bg-gradient-to-r from-primary via-secondary to-gsg-orange"
                            )}
                        >
                            {title}
                        </span>
                    </h1>
                </motion.div>

                {description && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="mx-auto max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300 font-medium"
                    >
                        {description}
                    </motion.p>
                )}
            </div>
        </div>
    )
}
