"use client"

import { Briefcase, GraduationCap, Users } from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/ui/PageHeader"

const cards = [
    {
        title: "Hire Talent",
        description: "Find top-tier developers, designers, and freelancers from our alumni network.",
        icon: Briefcase,
        href: "/contact?subject=Hire",
        action: "Hire Now",
        color: "bg-blue-50 text-primary",
    },
    {
        title: "Become a Mentor",
        description: "Share your expertise with the next generation of Palestinian tech leaders.",
        icon: GraduationCap,
        href: "/contact?subject=Mentor",
        action: "Apply to Mentor",
        color: "bg-green-50 text-secondary",
    },
    {
        title: "Volunteer",
        description: "Support our events and workshops. Be part of the community.",
        icon: Users,
        href: "/contact?subject=Volunteer",
        action: "Join Us",
        color: "bg-orange-50 text-accent",
    },
]

export default function GetInvolvedPage() {
    return (
        <div className="bg-transparent">
            <PageHeader
                title="Get Involved"
                description="There are many ways to contribute to the Gaza Sky Geeks mission."
            />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-32">
                <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-3 lg:gap-8">
                    {cards.map((card) => (
                        <div key={card.title} className="flex flex-col rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                            <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${card.color}`}>
                                <card.icon className="h-8 w-8" aria-hidden="true" />
                            </div>
                            <h3 className="text-xl font-bold text-primary dark:text-white">{card.title}</h3>
                            <p className="mt-4 flex-auto text-base leading-7 text-gray-600 dark:text-slate-400">{card.description}</p>
                            <div className="mt-8">
                                <Link href={card.href} className="text-sm font-bold leading-6 text-secondary hover:text-secondary/80 flex items-center gap-1">
                                    {card.action} <span aria-hidden="true">&rarr;</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
