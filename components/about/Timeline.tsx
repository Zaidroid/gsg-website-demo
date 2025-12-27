"use client"

import { useTranslations, useLocale } from "next-intl"

interface TimelineProps {
    items?: any[]
}

export function Timeline({ items = [] }: TimelineProps) {
    const t = useTranslations("AboutPage.timeline");
    const locale = useLocale();
    const isAr = locale === 'ar';

    const timeline = items && items.length > 0 ? items.map(item => ({
        year: isAr ? item.yearAr : item.yearEn,
        title: isAr ? item.titleAr : item.titleEn,
        description: isAr ? item.descriptionAr : item.descriptionEn,
    })) : [
        {
            year: "2011",
            title: t("items.2011.title"),
            description: t("items.2011.description"),
        },
        // ... (can fallback to all static items if needed or just empty)
    ];

    if (items && items.length === 0 && timeline.length === 1) {
        // Re-populate full fallback if items passed as [] but intended to fallback
        // For now, let's assume if items are empty array passed from parent (DB empty), we show empty or message?
        // Actually, better to default to the static list if DB is empty to avoid broken UI during migration.
        // Let's copy the full static list back in just in case.
        return (
            <div className="py-16 sm:py-24 bg-transparent">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center text-gray-500">
                    No timeline items found.
                </div>
            </div>
        )
    }

    // Since we want to preserve the static content if DB is empty:
    const displayItems = (items && items.length > 0) ? items.map(item => ({
        year: isAr ? item.yearAr : item.yearEn,
        title: isAr ? item.titleAr : item.titleEn,
        description: isAr ? item.descriptionAr : item.descriptionEn,
    })) : [
        {
            year: "2011",
            title: t("items.2011.title"),
            description: t("items.2011.description"),
        },
        {
            year: "2015",
            title: t("items.2015.title"),
            description: t("items.2015.description"),
        },
        {
            year: "2017",
            title: t("items.2017.title"),
            description: t("items.2017.description"),
        },
        {
            year: "2020",
            title: t("items.2020.title"),
            description: t("items.2020.description"),
        },
        {
            year: t("items.present.year"),
            title: t("items.present.title"),
            description: t("items.present.description"),
        },
    ]

    return (
        <div className="py-16 sm:py-24 bg-transparent">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gsg-orange to-gsg-orange-light sm:text-4xl pb-2">{t("title")}</h2>
                    <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-slate-400">
                        {t("subtitle")}
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl lg:max-w-4xl">
                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gray-200 dark:before:bg-slate-800">
                        {displayItems.map((item, index) => (
                            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-950 bg-secondary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl bg-gray-50 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg transition-all border border-gray-100 dark:border-slate-800">
                                    <div className="flex items-center justify-between space-x-2 mb-2">
                                        <div className="font-bold text-primary dark:text-white text-lg">{item.title}</div>
                                        <time className="font-bold text-secondary">{item.year}</time>
                                    </div>
                                    <div className="text-gray-600 dark:text-slate-400 leading-relaxed">{item.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
