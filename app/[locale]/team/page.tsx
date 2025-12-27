import { getLocale } from "next-intl/server"
import { LiveTeamGrid } from "@/components/team/LiveTeamGrid"
import { PageHeader } from "@/components/ui/PageHeader"
import prisma from "@/lib/prisma"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Our Team | Gaza Sky Geeks',
    description: 'Meet the dedicated team behind Gaza Sky Geeks.',
}

export default async function TeamPage() {
    const locale = await getLocale()
    const isAr = locale === 'ar'

    const teamMembers = await prisma.teamMember.findMany({
        orderBy: { order: 'asc' },
        where: { published: true }
    })

    return (
        <div className="bg-transparent">
            <PageHeader
                title={isAr ? "فريقنا" : "Our Team"}
                description={isAr
                    ? "تعرف على الأشخاص الذين يجعلون كل هذا ممكناً."
                    : "Meet the individuals making it all possible."}
            />

            <div className="min-h-screen bg-gradient-to-b from-transparent to-gray-50 dark:to-slate-900/50">
                <LiveTeamGrid initialMembers={teamMembers} />
            </div>
        </div>
    )
}
