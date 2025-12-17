"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { BookOpen, X } from "lucide-react"

const CatalogueViewer = dynamic(() => import("@/components/CatalogueViewer"), {
    ssr: false,
    loading: () => <div className="text-white text-center py-20">Loading Catalogue...</div>,
});

const stats = [
    { id: 1, name: "Graduates Employed", value: "85%" },
    { id: 2, name: "Startups Accelerated", value: "200+" },
    { id: 3, name: "Freelance Earnings", value: "$5M+" },
    { id: 4, name: "Women Participation", value: "50%" },
]

export function ImpactStats() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative pt-12 pb-24 sm:pb-32 overflow-hidden bg-transparent transition-colors duration-300">

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                {/* Unified Glass Container for the Section Content */}
                <div className="rounded-3xl bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl shadow-2xl border border-white/30 dark:border-slate-700/30 p-8 lg:p-12 ring-1 ring-black/5 dark:ring-white/5">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left Column: Stats & Impact Text */}
                        <div className="text-left">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gsg-orange to-gsg-orange-light sm:text-4xl mb-6 drop-shadow-md"
                            >
                                Our Impact
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-lg leading-relaxed text-gray-700 dark:text-blue-100 mb-12 max-w-lg drop-shadow-sm font-medium"
                            >
                                We are driving real economic change through technology and innovation. Explore the stories behind the numbers in our annual report.
                            </motion.p>

                            <dl className="grid grid-cols-2 gap-x-8 gap-y-10">
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={stat.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                                        className="flex flex-col border-l-4 border-secondary/50 pl-4 group hover:border-secondary transition-colors duration-300"
                                    >
                                        <dt className="text-sm font-bold leading-6 text-gray-700 dark:text-blue-200 group-hover:text-primary dark:group-hover:text-white transition-colors">{stat.name}</dt>
                                        <dd className="order-first text-4xl font-extrabold tracking-tight text-primary dark:text-white mb-2 group-hover:scale-105 transition-transform origin-left drop-shadow-sm">{stat.value}</dd>
                                    </motion.div>
                                ))}
                            </dl>
                        </div>

                        {/* Right Column: Catalogue Preview */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: 50 }}
                            whileInView={{ opacity: 1, scale: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                            className="flex justify-center lg:justify-end"
                        >
                            <div
                                onClick={() => setIsOpen(true)}
                                className="group relative cursor-pointer transform hover:scale-105 transition-transform duration-500"
                            >
                                {/* 3D Book Effect Container - Glass Style */}
                                <div className="relative w-[280px] h-[400px] rounded-r-lg bg-white/40 dark:bg-slate-900/60 backdrop-blur-md shadow-2xl flex flex-col items-center justify-center border-l-8 border-l-gray-300 dark:border-l-slate-700 overflow-hidden transition-colors duration-300 ring-1 ring-white/20">
                                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent pointer-events-none rounded-r-lg" />

                                    {/* Animated Glow on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shine" />

                                    {/* Content on Cover */}
                                    <div className="p-8 text-center flex flex-col items-center gap-6 relative z-10">
                                        <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-primary mb-2 shadow-inner ring-1 ring-white/30">
                                            <BookOpen size={32} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors drop-shadow-sm">Harvest 2025</h3>
                                            <div className="h-1 w-12 bg-secondary mx-auto my-3" />
                                            <p className="text-sm text-gray-600 dark:text-gray-300 font-bold tracking-widest uppercase transition-colors">Annual Report</p>
                                        </div>
                                    </div>

                                    {/* Call to Action Overlay */}
                                    <div className="absolute inset-x-0 bottom-8 flex justify-center z-20">
                                        <span className="bg-secondary text-white px-6 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 text-sm group-hover:bg-secondary/90 transition-colors transform group-hover:translate-y-1 hover:shadow-xl">
                                            Read Full Report <BookOpen size={16} />
                                        </span>
                                    </div>
                                </div>

                                {/* Book Pages decoration - Glassy */}
                                <div className="absolute top-2 left-3 w-full h-full bg-white/30 dark:bg-slate-800/40 backdrop-blur-sm rounded-r-lg border border-gray-200/50 dark:border-slate-700/50 z-[-1] shadow-md group-hover:translate-x-1 transition-transform" />
                                <div className="absolute top-4 left-6 w-full h-full bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm rounded-r-lg border border-gray-200/50 dark:border-slate-700/50 z-[-2] shadow-sm group-hover:translate-x-2 transition-transform" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Modal Portal */}
            {isOpen && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-lg animate-in fade-in duration-300">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]"
                    >
                        <X size={40} />
                    </button>
                    <div className="w-full h-full flex items-center justify-center p-4">
                        <CatalogueViewer
                            pdfUrl="/catalogue.pdf"
                            onClose={() => setIsOpen(false)}
                        />
                    </div>
                </div>,
                document.body
            )}
        </div>
    )
}
