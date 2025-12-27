"use client"

import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "@/src/i18n/routing"
import { useTranslations, useLocale } from "next-intl"
import { cn } from "@/lib/utils"

interface ProgramsGridProps {
    minimal?: boolean
    initialPrograms?: any[]
}

const STYLE_MAP: Record<string, { accent: string, borderHover: string }> = {
    "elevate": {
        accent: "bg-purple-500",
        borderHover: "group-hover:border-purple-500/30 dark:group-hover:border-purple-500/30"
    },
    "individuals": {
        accent: "bg-blue-500",
        borderHover: "group-hover:border-blue-500/30 dark:group-hover:border-blue-500/30"
    },
    "employability": {
        accent: "bg-green-500",
        borderHover: "group-hover:border-green-500/30 dark:group-hover:border-green-500/30"
    },
    "coworking": {
        accent: "bg-orange-500",
        borderHover: "group-hover:border-orange-500/30 dark:group-hover:border-orange-500/30"
    },
    "code-academy": {
        accent: "bg-teal-500",
        borderHover: "group-hover:border-teal-500/30 dark:group-hover:border-teal-500/30"
    },
    "default": {
        accent: "bg-gsg-teal",
        borderHover: "group-hover:border-gsg-teal/30 dark:group-hover:border-gsg-teal/30"
    }
}

export function ProgramsGrid({ minimal = false, initialPrograms = [] }: ProgramsGridProps) {
    const t = useTranslations("HomePage.programs");
    const locale = useLocale();
    const isAr = locale === 'ar';

    // Parse DB programs or fallback
    const programs = initialPrograms.length > 0 ? initialPrograms.map(p => {
        const style = STYLE_MAP[p.programId] || STYLE_MAP["default"]
        return {
            name: isAr ? p.titleAr : p.titleEn,
            description: isAr ? p.headerDescAr : p.headerDescEn,
            href: `/programs/${p.programId}`,
            accent: style.accent,
            borderHover: style.borderHover
        }
    }) : [
        // Static fallback if no DB data
        {
            name: t("items.elevate.name"),
            description: t("items.elevate.description"),
            href: "/programs/elevate",
            ...STYLE_MAP["elevate"]
        },
        {
            name: t("items.individuals.name"),
            description: t("items.individuals.description"),
            href: "/programs/individuals",
            ...STYLE_MAP["individuals"]
        },
        {
            name: t("items.employability.name"),
            description: t("items.employability.description"),
            href: "/programs/employability",
            ...STYLE_MAP["employability"]
        },
        {
            name: t("items.coworking.name"),
            description: t("items.coworking.description"),
            href: "/programs/coworking",
            ...STYLE_MAP["coworking"]
        },
    ]

    return (
        <div className={minimal ? "" : "bg-transparent py-20 sm:py-32 relative z-0"}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {!minimal && (
                    <div className="mx-auto max-w-2xl text-center mb-16 relative z-10">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl font-bold tracking-tight text-gsg-navy dark:text-white sm:text-4xl"
                        >
                            {t("title")}
                        </motion.h2>
                        <div className="mt-4 h-1 w-16 mx-auto bg-gsg-teal rounded-full" />
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
                        >
                            {t("subtitle")}
                        </motion.p>
                    </div>
                )}

                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 md:max-w-none">
                    {programs.map((program, index) => (
                        <motion.div
                            key={program.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group h-full"
                        >
                            <Link
                                href={program.href}
                                className={cn(
                                    "relative flex flex-col h-full p-8 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-gsg-teal/5 hover:-translate-y-1",
                                    program.borderHover
                                )}
                            >
                                <div className="flex flex-col h-full relative z-10">
                                    {/* Thematic Accent Bar */}
                                    <div className={cn(
                                        "w-12 h-1.5 rounded-full mb-8 transition-all duration-300 group-hover:w-20",
                                        program.accent
                                    )} />

                                    {/* Text Content */}
                                    <h3 className="mb-4 text-2xl font-bold text-gsg-navy dark:text-white group-hover:text-gsg-teal transition-colors leading-tight">
                                        {program.name}
                                    </h3>

                                    <p className="mb-8 text-sm leading-relaxed text-slate-500 dark:text-slate-400 flex-grow font-medium line-clamp-3">
                                        {program.description}
                                    </p>

                                    {/* Professional Footer */}
                                    <div className="flex items-center text-xs font-bold uppercase tracking-wider text-gsg-navy dark:text-gsg-teal/80 group-hover:text-gsg-teal transition-all">
                                        {t("learn_more")}
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>

                                {/* Minimalist highlight instead of big glow */}
                                <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <div className="w-10 h-10 rounded-bl-3xl border-t border-r border-gsg-teal/30" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
