import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { StoryForm } from "@/components/admin/StoryForm"

interface EditStoryPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function EditStoryPage({ params }: EditStoryPageProps) {
    const { id } = await params

    const story = await prisma.story.findUnique({
        where: {
            id
        }
    })

    if (!story) {
        notFound()
    }

    return (
        <div className="p-8">
            <StoryForm initialData={story} />
        </div>
    )
}
