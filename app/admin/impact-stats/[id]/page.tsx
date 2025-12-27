import prisma from "@/lib/prisma"
import { ImpactStatForm } from "@/components/admin/ImpactStatForm"
import { notFound } from "next/navigation"

interface EditImpactStatPageProps {
    params: Promise<{ id: string }>
}

export default async function EditImpactStatPage({ params }: EditImpactStatPageProps) {
    const { id } = await params
    const stat = await prisma.impactStat.findUnique({
        where: { id },
    })

    if (!stat) {
        notFound()
    }

    return <ImpactStatForm initialData={stat} />
}
