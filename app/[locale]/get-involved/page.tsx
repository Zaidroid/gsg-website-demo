"use client"

import { Briefcase, GraduationCap, Users } from "lucide-react"
import { Link } from "@/src/i18n/routing"
import { PageHeader } from "@/components/ui/PageHeader"
import { useTranslations } from "next-intl"

export default function GetInvolvedPage() {
    const t = useTranslations("GetInvolvedPage");

    const cards = [
        {
            title: t("cards.hire.title"),
            description: t("cards.hire.description"),
            icon: Briefcase,
            href: "/contact?subject=Hire",
            action: t("cards.hire.action"),
            color: "bg-blue-50 dark:bg-blue-900/20 text-primary dark:text-blue-400",
        },
        {
            title: t("cards.mentor.title"),
            description: t("cards.mentor.description"),
            icon: GraduationCap,
            href: "/contact?subject=Mentor",
            action: t("cards.mentor.action"),
            color: "bg-green-50 dark:bg-green-900/20 text-secondary dark:text-green-400",
        },
        {
            title: t("cards.volunteer.title"),
            description: t("cards.volunteer.description"),
            icon: Users,
            href: "/contact?subject=Volunteer",
            action: t("cards.volunteer.action"),
            color: "bg-orange-50 dark:bg-orange-900/20 text-accent dark:text-orange-400",
        },
    ]

    return (
        <div className="bg-transparent">
            <PageHeader
                title={t("header.title")}
                description={t("header.subtitle")}
            />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 sm:py-16">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-3 lg:gap-8">
                    {cards.map((card) => (
                        <div key={card.title} className="flex flex-col rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                            <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${card.color}`}>
                                <card.icon className="h-8 w-8" aria-hidden="true" />
                            </div>
                            <h3 className="text-xl font-bold text-primary dark:text-white">{card.title}</h3>
                            <p className="mt-4 flex-auto text-base leading-7 text-gray-600 dark:text-slate-400">{card.description}</p>
                            <div className="mt-8">
                                <Link href={card.href as any} className="text-sm font-bold leading-6 text-secondary hover:text-secondary/80 flex items-center gap-1">
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
