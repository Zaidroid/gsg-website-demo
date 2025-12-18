import { useTranslations } from "next-intl"
import { Timeline } from "@/components/about/Timeline"
import { PageHeader } from "@/components/ui/PageHeader"

export default function AboutPage() {
    const t = useTranslations("AboutPage");

    return (
        <div className="bg-transparent">
            <PageHeader
                title={t("header.title")}
                description={t("header.subtitle")}
            />

            {/* Mission Values Section */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 sm:py-16">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 border-t border-gray-100 dark:border-slate-800 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    <div className="rounded-2xl bg-white dark:bg-slate-900 p-8 shadow-sm border border-gray-100 dark:border-slate-800 hover:border-secondary/20 transition-colors">
                        <h3 className="text-xl font-bold text-primary dark:text-white mb-4">{t("philosophy.mission.title")}</h3>
                        <p className="text-gray-600 dark:text-slate-400 leading-7">{t("philosophy.mission.description")}</p>
                    </div>
                    <div className="rounded-2xl bg-white dark:bg-slate-900 p-8 shadow-sm border border-gray-100 dark:border-slate-800 hover:border-secondary/20 transition-colors">
                        <h3 className="text-xl font-bold text-primary dark:text-white mb-4">{t("philosophy.vision.title")}</h3>
                        <p className="text-gray-600 dark:text-slate-400 leading-7">{t("philosophy.vision.description")}</p>
                    </div>
                    <div className="rounded-2xl bg-white dark:bg-slate-900 p-8 shadow-sm border border-gray-100 dark:border-slate-800 hover:border-secondary/20 transition-colors">
                        <h3 className="text-xl font-bold text-primary dark:text-white mb-4">{t("philosophy.values.title")}</h3>
                        <ul className="list-disc list-inside text-gray-600 dark:text-slate-400 space-y-2 leading-7">
                            {t.raw("philosophy.values.items").map((item: string) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <Timeline />
        </div>
    )
}
