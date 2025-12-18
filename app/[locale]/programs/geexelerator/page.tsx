"use client"

import { PageHeader } from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { CheckCircle2 } from "lucide-react"
import { useTranslations } from "next-intl"

const backgroundImages = [
    "/images/gallery/GRA_7098.jpg",
    "/images/gallery/GRA_6393.jpg",
    "/images/gallery/EVE_0628 (2).jpg",
];

export default function GeeXeleratorPage() {
    const t = useTranslations("ProgramsPage.geexelerator");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const highlights = t.raw("highlights.items") as string[];

    return (
        <main>
            <PageHeader
                title={t("header.title")}
                description={t("header.description")}
            />
            <section className="py-10 sm:py-16 bg-transparent">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Left Column: Content */}
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl">{t("content.title")}</h2>
                            <p className="mt-6 text-lg leading-8 text-gray-700 dark:text-slate-300">
                                {t("content.description")}
                            </p>
                            <div className="mt-10 flex gap-x-6">
                                <Link href="/contact">
                                    <Button size="lg" className="dark:bg-white dark:text-slate-900 dark:hover:bg-gray-100 font-bold">{t("cta")}</Button>
                                </Link>
                            </div>
                        </div>

                        {/* Right Column: Highlights / Box */}
                        <div className="relative overflow-hidden bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl p-8 border border-white/30 dark:border-white/10 shadow-xl ring-1 ring-black/5">
                            {/* Background Slideshow */}
                            <div className="absolute inset-0 z-0 select-none pointer-events-none rounded-3xl overflow-hidden">
                                <AnimatePresence mode="popLayout">
                                    <motion.div
                                        key={currentImageIndex}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.15 }} // Reduced opacity for readability
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

                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t("highlights.title")}</h3>
                                <ul className="space-y-4">
                                    {highlights.map((item) => (
                                        <li key={item} className="flex gap-3 items-center text-gray-700 dark:text-slate-300">
                                            <CheckCircle2 className="h-5 w-5 flex-none text-secondary" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
