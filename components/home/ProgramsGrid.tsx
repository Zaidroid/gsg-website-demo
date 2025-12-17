"use client"

import { Code, Globe, Rocket, ArrowRight, TrendingUp, Users, Briefcase, Building2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const programs = [
    {
        name: "Elevate",
        description: "Helping Palestinian tech companies scale and access global markets.",
        icon: TrendingUp,
        href: "/programs/elevate",
        color: "bg-purple-100/30 text-purple-900 dark:bg-purple-900/30 dark:text-purple-100",
        hoverColor: "group-hover:bg-purple-200/40 dark:group-hover:bg-purple-800/40",
    },
    {
        name: "Individuals",
        description: "Training programs and academies for developers and freelancers.",
        icon: Users,
        href: "/programs/individuals",
        color: "bg-blue-100/30 text-blue-900 dark:bg-blue-900/30 dark:text-blue-100",
        hoverColor: "group-hover:bg-blue-200/40 dark:group-hover:bg-blue-800/40",
    },
    {
        name: "Employability",
        description: "Connecting our talented graduates with meaningful job opportunities.",
        icon: Briefcase,
        href: "/programs/employability",
        color: "bg-green-100/30 text-green-900 dark:bg-green-900/30 dark:text-green-100",
        hoverColor: "group-hover:bg-green-200/40 dark:group-hover:bg-green-800/40",
    },
    {
        name: "Co-working spaces",
        description: "Vibrant hubs with high-speed internet and power for the community.",
        icon: Building2,
        href: "/programs/coworking",
        color: "bg-orange-100/30 text-orange-900 dark:bg-orange-900/30 dark:text-orange-100",
        hoverColor: "group-hover:bg-orange-200/40 dark:group-hover:bg-orange-800/40",
    },
]

interface ProgramsGridProps {
    minimal?: boolean
}

export function ProgramsGrid({ minimal = false }: ProgramsGridProps) {
    return (
        <div className={minimal ? "py-8" : "bg-transparent py-24 sm:py-32 relative z-0 transition-colors duration-300"}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {!minimal && (
                    <div className="mx-auto max-w-2xl text-center mb-16 relative z-10">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gsg-orange to-gsg-orange-light sm:text-4xl drop-shadow-md"
                        >
                            Our Core Programs
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="mt-6 text-lg leading-8 text-gray-700 dark:text-slate-200 drop-shadow-sm font-medium"
                        >
                            We provide the skills, mentorship, and network you need to succeed in the digital age.
                        </motion.p>
                    </div>
                )}
                <div className={`mx-auto grid max-w-2xl grid-cols-1 gap-6 md:grid-cols-2 md:max-w-none lg:grid-cols-4 lg:gap-8 ${minimal ? 'mt-8' : ''}`}>
                    {programs.map((program, index) => (
                        <motion.div
                            key={program.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                            className="flex flex-col relative overflow-hidden rounded-3xl bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl shadow-xl border border-white/30 dark:border-slate-700/30 group cursor-default transition-all duration-300 ring-1 ring-black/5 dark:ring-white/5"
                        >
                            <div className="p-8 relative z-10 flex flex-col h-full">
                                <div className={`mb-6 inline-flex rounded-2xl p-4 ${program.color} ${program.hoverColor} backdrop-blur-md shadow-inner transition-all duration-300 w-fit ring-1 ring-black/5 dark:ring-white/5`}>
                                    <program.icon className="h-8 w-8" aria-hidden="true" />
                                </div>
                                <h3 className="mb-3 text-2xl font-bold text-primary dark:text-white group-hover:text-secondary transition-colors duration-300 drop-shadow-sm">{program.name}</h3>
                                <p className="mb-8 text-base leading-7 text-gray-700 dark:text-slate-200 flex-grow font-medium">{program.description}</p>
                                <Link
                                    href={program.href}
                                    className="inline-flex items-center gap-2 font-bold text-secondary hover:text-secondary/80 transition-colors mt-auto"
                                >
                                    Learn more
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>

                            {/* Decorative background circle */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-white/30 to-transparent dark:from-slate-700/30 rounded-full z-0 group-hover:scale-150 transition-transform duration-500 ease-out opacity-40 blur-2xl" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
