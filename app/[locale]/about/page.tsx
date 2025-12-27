import { useTranslations } from "next-intl"
import { getLocale } from "next-intl/server"
import { Timeline } from "@/components/about/Timeline"
import { LiveTeamGrid } from "@/components/team/LiveTeamGrid"
import { Partners } from "@/components/about/Partners"
import { PageHeader } from "@/components/ui/PageHeader"
import prisma from "@/lib/prisma"

export default async function AboutPage() {
    const locale = await getLocale()
    // const t = useTranslations("AboutPage"); // keeping for fallback if needed, but mostly replacing

    const aboutContent = await prisma.aboutContent.findFirst()
    const timelineItems = await prisma.timelineItem.findMany({
        orderBy: { order: 'asc' },
        where: { published: true }
    })
    const teamMembers = await prisma.teamMember.findMany({
        orderBy: { order: 'asc' },
        where: { published: true }
    })
    const partners = await prisma.partner.findMany({
        orderBy: { order: 'asc' },
        where: { published: true }
    })

    const isAr = locale === 'ar'

    // Fallback if no DB content (prevents white screen)
    const content = {
        headerTitle: isAr ? aboutContent?.headerTitleAr : aboutContent?.headerTitleEn,
        headerDesc: isAr ? aboutContent?.headerDescAr : aboutContent?.headerDescEn,
        missionTitle: isAr ? aboutContent?.missionTitleAr : aboutContent?.missionTitleEn,
        missionDesc: isAr ? aboutContent?.missionDescAr : aboutContent?.missionDescEn,
        visionTitle: isAr ? aboutContent?.visionTitleAr : aboutContent?.visionTitleEn,
        visionDesc: isAr ? aboutContent?.visionDescAr : aboutContent?.visionDescEn,
        valuesTitle: isAr ? aboutContent?.valuesTitleAr : aboutContent?.valuesTitleEn,
        values: isAr ? aboutContent?.valuesAr : aboutContent?.valuesEn
    }

    return (
        <div className="bg-transparent">
            <PageHeader
                title={content.headerTitle || (isAr ? "عن غزة سكاي جيكس" : "About Us")}
                description={content.headerDesc || (isAr ? "سواء كنت مبرمجاً مبتدئاً أو مستقلاً أو مؤسساً لشركة ناشئة، فلدينا مسار مناسب لك." : "Building the future of tech in Palestine.")}
            />

            {/* Mission Values Section */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 sm:py-16">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 border-t border-gray-100 dark:border-slate-800 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    <div className="rounded-2xl bg-white dark:bg-slate-900 p-8 shadow-sm border border-gray-100 dark:border-slate-800 hover:border-secondary/20 transition-colors">
                        <h3 className="text-xl font-bold text-primary dark:text-white mb-4">{content.missionTitle || (isAr ? "مهمتنا" : "Our Mission")}</h3>
                        <p className="text-gray-600 dark:text-slate-400 leading-7">{content.missionDesc}</p>
                    </div>
                    <div className="rounded-2xl bg-white dark:bg-slate-900 p-8 shadow-sm border border-gray-100 dark:border-slate-800 hover:border-secondary/20 transition-colors">
                        <h3 className="text-xl font-bold text-primary dark:text-white mb-4">{content.visionTitle || (isAr ? "رؤيتنا" : "Our Vision")}</h3>
                        <p className="text-gray-600 dark:text-slate-400 leading-7">{content.visionDesc}</p>
                    </div>
                    <div className="rounded-2xl bg-white dark:bg-slate-900 p-8 shadow-sm border border-gray-100 dark:border-slate-800 hover:border-secondary/20 transition-colors">
                        <h3 className="text-xl font-bold text-primary dark:text-white mb-4">{content.valuesTitle || (isAr ? "قيمنا" : "Values")}</h3>
                        <ul className="list-disc list-inside text-gray-600 dark:text-slate-400 space-y-2 leading-7">
                            {content.values?.map((item: string) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <Timeline items={timelineItems} />

            {/* Team Section Header */}
            <div className="mx-auto max-w-2xl text-center mb-16 pt-24 sm:pt-32">
                <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gsg-navy to-gsg-purple dark:from-white dark:to-slate-300 sm:text-4xl pb-2">
                    {isAr ? "فريقنا" : "Our Team"}
                </h2>
                <div className="mt-2 h-1 w-20 mx-auto bg-gradient-to-r from-gsg-teal to-gsg-purple rounded-full" />
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                    {isAr
                        ? "نخبة من الشغوفين المكرسين لتمكين التكنولوجيا في فلسطين."
                        : "A dedicated group of passionate individuals building the future of tech in Palestine."}
                </p>
            </div>

            <LiveTeamGrid
                initialMembers={teamMembers}
                showControls={false}
            />
            <Partners items={partners} />
        </div>
    )
}
