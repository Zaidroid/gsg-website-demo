"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { Link } from "@/src/i18n/routing"
import { HeroVisual } from "./HeroVisual"
import { TypewriterText } from "@/components/ui/TypewriterText"

import { HeroSection } from "@prisma/client"

interface HeroProps {
    heroData?: HeroSection | null
}

export function Hero({ heroData }: HeroProps) {
    const t = useTranslations("HomePage.hero");
    const locale = useLocale();
    const isRtl = locale === "ar";

    // Helper to get content based on locale and data availability
    const getContent = (key: string, dbEn?: string | null, dbAr?: string | null) => {
        if (dbEn && dbAr) {
            return isRtl ? dbAr : dbEn;
        }
        return t(key);
    }

    const title = getContent("title_main", heroData?.titleEn, heroData?.titleAr);
    const subtitle = getContent("description", heroData?.subtitleEn, heroData?.subtitleAr);
    const ctaText = getContent("cta_explore", heroData?.ctaTextEn, heroData?.ctaTextAr);
    const ctaLink = heroData?.ctaLink || "/programs";

    const secCtaText = getContent("cta_story", heroData?.secondaryCtaTextEn, heroData?.secondaryCtaTextAr);
    const secCtaLink = heroData?.secondaryCtaLink || "/about";

    const typewriterTexts = (isRtl ? heroData?.typewriterAr : heroData?.typewriterEn) || t.raw("typewriter");

    return (
        <div className="relative overflow-hidden pt-12 pb-16 lg:pt-32 lg:pb-40 bg-transparent transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Column: Text & CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-center lg:items-start text-center lg:text-start z-10"
                    >
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/50 dark:bg-slate-800/50 px-4 py-1.5 text-sm font-bold text-primary dark:text-white shadow-sm ring-1 ring-gray-200/50 dark:ring-slate-700/50 backdrop-blur-md transition-colors">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                            </span>
                            {t("badge")}
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-primary dark:text-white lg:text-7xl mb-6 leading-[1.1] drop-shadow-lg">
                            <span className="block">{title}</span>
                            <span className="text-secondary block mt-2">
                                <TypewriterText
                                    texts={typewriterTexts}
                                    className="bg-clip-text text-transparent bg-gradient-to-r from-gsg-orange to-gsg-orange-light pb-2"
                                />
                            </span>
                        </h1>

                        <p className="mb-8 text-lg leading-8 text-gray-700 dark:text-slate-200 max-w-xl font-medium transition-colors drop-shadow-md text-center lg:text-start">
                            {subtitle}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link
                                href={ctaLink}
                                className="group flex items-center justify-center gap-2 rounded-full bg-primary dark:bg-white px-8 py-4 text-base font-bold text-white dark:text-[#1F3036] shadow-lg transition-all hover:bg-primary/90 dark:hover:bg-gray-100 hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto"
                            >
                                {ctaText}
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                            </Link>
                            <Link
                                href={secCtaLink}
                                className="group flex items-center justify-center gap-2 rounded-full bg-white/50 dark:bg-slate-800/50 px-8 py-4 text-base font-bold text-primary dark:text-white shadow-md ring-1 ring-gray-200/50 dark:ring-slate-700/50 backdrop-blur-md transition-all hover:bg-white/70 dark:hover:bg-slate-800/70 hover:ring-gray-300 dark:hover:ring-slate-600 hover:-translate-y-1 w-full sm:w-auto"
                            >
                                <Play className="h-4 w-4 fill-primary dark:fill-white group-hover:scale-110 transition-transform" />
                                {secCtaText}
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right Column: Interactive Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: isRtl ? -50 : 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex items-center justify-center lg:justify-end relative z-0"
                    >
                        <HeroVisual
                            snippets={
                                isRtl
                                    ? heroData?.terminalSnippetsAr
                                    : heroData?.terminalSnippetsEn
                            }
                        />
                    </motion.div>

                </div>
            </div>
        </div>
    )
}
