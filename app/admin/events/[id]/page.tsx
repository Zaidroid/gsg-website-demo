import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { EventForm } from "@/components/admin/EventForm"

interface EditEventPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function EditEventPage({ params }: EditEventPageProps) {
    const { id } = await params

    const event = await prisma.event.findUnique({
        where: {
            id
        }
    })

    if (!event) {
        notFound()
    }

    return (
        <div className="p-8">
            <EventForm initialData={event} />
        </div>
    )
}
