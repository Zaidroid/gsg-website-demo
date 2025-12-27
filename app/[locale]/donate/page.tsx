"use client"

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { useTranslations, useLocale } from "next-intl"
import { Building2, Mail, Briefcase, ShieldCheck, ArrowRight, Users, CheckCircle2 } from "lucide-react"
import { PageHeader } from "@/components/ui/PageHeader"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

// --- Animated Counter Component ---
function Counter({ value }: { value: string }) {
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true })
    const [count, setCount] = useState(0)

    // Extract number and suffix (e.g., "60" and "K+")
    const match = value.match(/(\d*[.,]?\d+)(.*)/)
    const targetNumber = match ? parseFloat(match[1].replace(',', '')) : 0
    const suffix = match ? match[2] : ""

    useEffect(() => {
        if (isInView) {
            let start = 0
            const duration = 2000
            const stepTime = 50
            const totalSteps = duration / stepTime
            const increment = targetNumber / totalSteps

            const timer = setInterval(() => {
                start += increment
                if (start >= targetNumber) {
                    setCount(targetNumber)
                    clearInterval(timer)
                } else {
                    setCount(start)
                }
            }, stepTime)
            return () => clearInterval(timer)
        }
    }, [isInView, targetNumber])

    return (
        <span ref={ref} className="tabular-nums">
            {count.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            {suffix}
        </span>
    )
}

const IMPACT_TIERS = [
    { key: "100", color: "bg-orange-500", border: "hover:border-orange-500/30" },
    { key: "350", color: "bg-blue-500", border: "hover:border-blue-500/30" },
    { key: "500", color: "bg-teal-500", border: "hover:border-teal-500/30" },
    { key: "1000", color: "bg-purple-500", border: "hover:border-purple-500/30" },
    { key: "5000", color: "bg-green-500", border: "hover:border-green-500/30" },
]

const STATS_KEYS = ["participants", "graduates", "income", "employment"]

const PRESS_LOGOS = [
    { name: "BBC", url: "https://upload.wikimedia.org/wikipedia/commons/e/eb/BBC.svg" },
    { name: "Financial Times", url: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Financial_Times_logo_2014.svg" },
    { name: "TechCrunch", url: "https://upload.wikimedia.org/wikipedia/commons/b/b9/TechCrunch_logo.svg" },
    { name: "The New York Times", url: "https://upload.wikimedia.org/wikipedia/commons/7/77/The_New_York_Times_logo.svg" },
    { name: "The Guardian", url: "https://upload.wikimedia.org/wikipedia/commons/7/75/The_Guardian_2018.svg" },
]

export default function DonatePage() {
    const t = useTranslations("DonatePage")
    const locale = useLocale()

    return (
        <div className="bg-transparent overflow-hidden">
            <PageHeader
                title={t("header.title")}
                description={t("header.subtitle")}
            />

            {/* Impact Stats Section - Animated Counters */}
            <section className="py-12 relative">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {STATS_KEYS.map((key, idx) => (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                                viewport={{ once: true }}
                                className="relative group p-10 rounded-[2.5rem] bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/40 dark:border-white/10 text-center shadow-xl hover:shadow-2xl transition-all"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />
                                <div className="relative text-4xl md:text-5xl font-black text-gsg-navy dark:text-white mb-3">
                                    <Counter value={t(`impact_stats.${key}`).split(' ')[0]} />
                                </div>
                                <div className="relative text-xs md:text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] leading-tight">
                                    {t(`impact_stats.${key}`).split(' ').slice(1).join(' ')}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mercy Corps Official Section - Fixed Logo and Styling */}
            <section className="relative py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative rounded-[3rem] overflow-hidden bg-transparent border border-gsg-navy/10 dark:border-white/5 p-10 md:p-16"
                    >
                        {/* Soft background glow */}
                        <div className="absolute inset-0 bg-white/20 dark:bg-slate-900/20 backdrop-blur-3xl -z-10" />

                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <div className="flex-1 text-center lg:text-left rtl:lg:text-right">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 dark:bg-secondary/20 text-secondary text-sm font-black uppercase tracking-widest mb-8">
                                    <CheckCircle2 className="w-5 h-5" />
                                    {t("mercy_corps.title")}
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-gsg-navy dark:text-white mb-8 leading-[1.15]">
                                    {t("mercy_corps.title")}
                                </h2>
                                <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                                    {t("mercy_corps.description")}
                                </p>
                            </div>
                            <div className="flex-shrink-0 w-full max-w-[280px] lg:max-w-xs transition-transform hover:scale-105 duration-500">
                                <Image
                                    src="/mc-logo.png"
                                    alt="Mercy Corps"
                                    width={400}
                                    height={200}
                                    className="w-full h-auto object-contain transition-all"
                                    priority
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Impact Donations */}
            <section className="py-24 relative z-0">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gsg-navy dark:text-white sm:text-5xl mb-6">
                            {t("impact.title")}
                        </h2>
                        <div className="w-24 h-2 bg-gsg-teal rounded-full mx-auto mb-8" />
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                            {t("impact.subtitle")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {IMPACT_TIERS.map((tier, index) => (
                            <motion.div
                                key={tier.key}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="group relative"
                            >
                                <div className={cn(
                                    "relative h-full p-10 rounded-[2.5rem] bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-3",
                                    tier.border
                                )}>
                                    <div className={cn(
                                        "w-16 h-2 rounded-full mb-10 transition-all duration-500 group-hover:w-full",
                                        tier.color
                                    )} />

                                    <div className="flex items-baseline gap-2 mb-6">
                                        <span className="text-5xl font-black text-gsg-navy dark:text-white">
                                            {t(`impact.tiers.${tier.key}.amount`)}
                                        </span>
                                    </div>

                                    <p className="text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed mb-8">
                                        {t(`impact.tiers.${tier.key}.description`)}
                                    </p>

                                    <div className="mt-auto pt-10 border-t border-slate-200/50 dark:border-slate-800/50">
                                        <a
                                            href="https://www.mercycorps.org/donate/gaza-sky-geeks"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-3 text-base font-black text-secondary uppercase tracking-[0.15em] hover:gap-5 transition-all"
                                        >
                                            {t("impact.cta")}
                                            <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Volunteer & Hire Sections - Premium Redesign with depth and gradients */}
            <section className="py-24 relative overflow-hidden">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {["mentor", "hire"].map((type, idx) => (
                            <motion.div
                                key={type}
                                initial={{ opacity: 0, x: idx === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                viewport={{ once: true }}
                                className="relative group p-12 rounded-[3.5rem] overflow-hidden"
                            >
                                {/* Background Layers */}
                                <div className={cn(
                                    "absolute inset-0 bg-gradient-to-br transition-all duration-700 group-hover:scale-110",
                                    type === 'mentor'
                                        ? "from-gsg-navy via-gsg-navy to-gsg-teal/30"
                                        : "from-slate-900 via-slate-900 to-secondary/30"
                                )} />
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />

                                {/* Content */}
                                <div className="relative z-10 flex flex-col h-full">
                                    <h3 className="text-4xl font-black text-white mb-6 leading-tight">
                                        {t(`ways.${type}.title`)}
                                    </h3>
                                    <p className="text-slate-300 text-xl mb-10 max-w-sm font-medium leading-relaxed">
                                        {t(`ways.${type}.description`)}
                                    </p>

                                    <div className="mt-auto">
                                        <button className="inline-flex items-center gap-3 px-10 py-5 bg-white text-gsg-navy rounded-full font-black text-lg shadow-2xl hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all group/btn">
                                            {t(`ways.${type}.cta`)}
                                            <ArrowRight className="w-6 h-6 transition-transform group-hover/btn:translate-x-2 rtl:rotate-180 rtl:group-hover/btn:-translate-x-2" />
                                        </button>
                                    </div>
                                </div>

                                {/* Floating Icons */}
                                <div className="absolute -bottom-12 -right-12 opacity-10 blur-[2px] transition-all duration-700 group-hover:scale-125 group-hover:-rotate-12 group-hover:opacity-20 pointer-events-none">
                                    {type === 'mentor' ? <Users className="w-80 h-80 text-white" /> : <Briefcase className="w-80 h-80 text-white" />}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Press Marquee */}
            <section className="py-24 border-y border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-transparent">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em]">
                            {t("press.title")}
                        </span>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale transition-all hover:grayscale-0 hover:opacity-100">
                        {PRESS_LOGOS.map((logo) => (
                            <img
                                key={logo.name}
                                src={logo.url}
                                alt={logo.name}
                                className="h-8 md:h-11 w-auto dark:invert dark:brightness-0 transition-opacity"
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Institutional Support */}
            <section className="py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-black text-gsg-navy dark:text-white sm:text-5xl mb-6">
                        {t("other_ways.title")}
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-20 font-medium">
                        {t("other_ways.subtitle")}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {[
                            { key: "wire", icon: Building2 },
                            { key: "check", icon: Mail },
                            { key: "sponsorship", icon: Briefcase }
                        ].map((item, idx) => (
                            <motion.div
                                key={item.key}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="group flex flex-col items-center"
                            >
                                <div className="mb-10 h-24 w-24 flex items-center justify-center rounded-[2rem] bg-white dark:bg-slate-900 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ring-1 ring-gray-100 dark:ring-slate-800">
                                    <item.icon className="w-10 h-10 text-secondary" />
                                </div>
                                <h3 className="text-2xl font-black text-gsg-navy dark:text-white mb-4">
                                    {t(`other_ways.${item.key}.title`)}
                                </h3>
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                    {t(`other_ways.${item.key}.description`)}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
