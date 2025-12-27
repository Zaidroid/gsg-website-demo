import prisma from "@/lib/prisma"
import { TeamMemberForm } from "@/components/admin/TeamMemberForm"
import { notFound } from "next/navigation"

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function EditTeamMemberPage({ params }: PageProps) {
    const { id } = await params
    const member = await prisma.teamMember.findUnique({
        where: { id }
    })

    if (!member) notFound()

    return <TeamMemberForm initialData={member} />
}
