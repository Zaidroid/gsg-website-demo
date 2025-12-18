"use client"

import { Heart, ShieldCheck, Globe } from "lucide-react"

const impacts = [
    {
        icon: Globe,
        title: "Global Reach",
        description: "Your donation helps us connect Gazan talent with international markets.",
    },
    {
        icon: ShieldCheck,
        title: "Transparent",
        description: "We ensure every dollar is spent on programs that directly benefit our community.",
    },
    {
        icon: Heart,
        title: "Community Focused",
        description: "Support the only tech hub in Gaza that serves thousands annually.",
    },
]

export default function DonatePage() {
    return (
        <div className="bg-transparent">
            <div className="relative isolate overflow-hidden pt-24 pb-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gsg-orange to-gsg-orange-light sm:text-6xl">
                            Support Our Mission
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-slate-300">
                            Help us build a resilient digital economy in Palestine. Your contribution makes a difference.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a href="#" className="rounded-full bg-secondary px-8 py-4 text-lg font-bold text-white shadow-lg shadow-secondary/25 hover:bg-secondary/90 transition-all hover:-translate-y-1 hover:shadow-xl">
                                Donate via PayPal
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                    {impacts.map((item) => (
                        <div key={item.title} className="flex flex-col items-center text-center p-8 rounded-2xl bg-white dark:bg-slate-900/50 backdrop-blur-sm border border-gray-100 dark:border-slate-800 hover:shadow-lg hover:border-secondary/30 transition-all">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 dark:bg-slate-800 shadow-sm">
                                <item.icon className="h-8 w-8 text-secondary" />
                            </div>
                            <h3 className="text-xl font-bold text-primary dark:text-white">{item.title}</h3>
                            <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
