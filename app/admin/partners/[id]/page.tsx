import prisma from "@/lib/prisma"
import { PartnerForm } from "@/components/admin/PartnerForm"
import { notFound } from "next/navigation"

interface PageProps {
    params: { id: string }
}

export default async function EditPartnerPage({ params }: PageProps) {
    const partner = await prisma.partner.findUnique({
        where: { id: params.id }
    })

    if (!partner) notFound()

    return <PartnerForm initialData={partner} />
}
