import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ProgramForm } from "@/components/admin/ProgramForm"

interface EditProgramPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function EditProgramPage({ params }: EditProgramPageProps) {
    const { id } = await params

    const program = await prisma.program.findUnique({
        where: { id }
    })

    if (!program) {
        notFound()
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <ProgramForm initialData={program} />
        </div>
    )
}
