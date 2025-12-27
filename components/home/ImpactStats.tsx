"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { BookOpen, X } from "lucide-react"

const CatalogueViewer = dynamic(() => import("@/components/CatalogueViewer"), {
    ssr: false,
});

const backgroundImages = [
    "/images/gallery/GRA_7098.jpg",
    "/images/gallery/GRA_6393.jpg",
    "/images/gallery/EVE_0628 (2).jpg",
];

import { useTranslations, useLocale } from "next-intl"

interface ImpactStatsProps {
    initialStats?: any[]
}

export function ImpactStats({ initialStats = [] }: ImpactStatsProps) {
    const t = useTranslations("HomePage.impact");
    const locale = useLocale();
    const [isOpen, setIsOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Use initialStats if available, otherwise fallback to empty (managed by admin now)
    const stats = initialStats.length > 0 ? initialStats.map(stat => ({
        id: stat.id,
        name: locale === 'ar' ? stat.labelAr : stat.labelEn,
        value: stat.value
    })) : [
        // Fallback or empty state if no stats defined in admin yet
        { id: 1, name: t("stats.graduates"), value: "85%" },
        { id: 2, name: t("stats.startups"), value: "200+" },
        { id: 3, name: t("stats.freelance"), value: "$5M+" },
        { id: 4, name: t("stats.women"), value: "50%" },
    ];

    // Cycle background images
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div className="relative pt-12 pb-24 sm:pb-32 overflow-hidden bg-transparent transition-colors duration-300">
            {/* Background Slideshow removed from here */}

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                {/* Unified Glass Container for the Section Content */}
                <div className="relative overflow-hidden rounded-3xl bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl shadow-2xl border border-white/30 dark:border-slate-700/30 p-8 lg:p-12 ring-1 ring-black/5 dark:ring-white/5">
                    {/* Background Slideshow moved inside the card */}
                    <div className="absolute inset-0 z-0 select-none pointer-events-none rounded-3xl overflow-hidden">
                        <AnimatePresence mode="popLayout">
                            <motion.div
                                key={currentImageIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.15 }} // Slightly reduced opacity for inside card
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5 }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <Image
                                    src={backgroundImages[currentImageIndex]}
                                    fill
                                    className="object-cover grayscale contrast-125"
                                    alt=""
                                    priority
                                />
                                {/* Gradient overlays */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/60 dark:from-slate-950/60 dark:via-slate-950/40 dark:to-slate-950/60" />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                        {/* Left Column: Stats & Impact Text */}
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gsg-orange to-gsg-orange-light sm:text-4xl mb-6 drop-shadow-md pb-2"
                            >
                                {t("title")}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-lg leading-relaxed text-gray-700 dark:text-blue-100 mb-12 max-w-lg drop-shadow-sm font-medium"
                            >
                                {t("description")}
                            </motion.p>

                            <dl className="grid grid-cols-2 gap-x-8 gap-y-10">
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={stat.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                                        className="flex flex-col border-l-4 rtl:border-l-0 rtl:border-r-4 border-secondary/50 pl-4 rtl:pl-0 rtl:pr-4 group hover:border-secondary transition-colors duration-300"
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
                            className="flex justify-center lg:justify-end perspective-1000"
                        >
                            <div
                                onClick={() => setIsOpen(true)}
                                className="group relative cursor-pointer w-full max-w-[300px] aspect-[300/420] preserve-3d transition-transform duration-500 ease-out hover:-translate-y-4 hover:rotate-y-[-10deg]"
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {/* --- Pages Effect (Depth) --- */}
                                {/* These layers create the illusion of pages stacked behind the cover */}
                                <div className="absolute inset-0 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-r-xl shadow-sm translate-z-[-4px] translate-x-[4px] w-[98%] h-[98%] top-[1%] left-[2%]" />
                                <div className="absolute inset-0 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-r-xl shadow-sm translate-z-[-8px] translate-x-[8px] w-[98%] h-[98%] top-[1%] left-[3%]" />
                                <div className="absolute inset-0 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-r-xl shadow-sm translate-z-[-12px] translate-x-[12px] w-[98%] h-[98%] top-[1%] left-[4%]" />

                                {/* --- Main Cover --- */}
                                <div className="absolute inset-0 bg-white dark:bg-slate-900 rounded-r-xl shadow-2xl overflow-hidden border-l-[12px] border-l-gray-300 dark:border-l-slate-700 flex flex-col justify-between p-6 sm:p-8 ring-1 ring-black/5 dark:ring-white/10 group-hover:shadow-[20px_20px_60px_rgba(0,0,0,0.15)] transition-shadow duration-500">

                                    {/* Subtle Texture/Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 opacity-80" />
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                                    {/* Header / Logo */}
                                    <div className="relative z-10 flex flex-col items-center mt-4 sm:mt-8">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-secondary/10 to-primary/5 flex items-center justify-center mb-4 sm:mb-6 shadow-inner ring-1 ring-black/5">
                                            <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-secondary" />
                                        </div>
                                        <h3 className="text-2xl sm:text-3xl font-black text-primary dark:text-white tracking-tight text-center">
                                            {t("catalogue.title")}
                                            <span className="block text-secondary">{t("catalogue.year")}</span>
                                        </h3>
                                    </div>

                                    {/* Footer / Action */}
                                    <div className="relative z-10 text-center mb-8">
                                        <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-6">{t("catalogue.label")}</p>
                                        <button className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-bold text-sm shadow-lg group-hover:bg-secondary transition-colors duration-300 flex items-center justify-center gap-2 group-hover:shadow-secondary/25">
                                            {t("catalogue.cta")} <BookOpen size={14} />
                                        </button>
                                    </div>
                                </div>
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
