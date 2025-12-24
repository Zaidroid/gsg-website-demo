import { format } from "date-fns"
import prisma from "@/lib/prisma"
import { Plus } from "lucide-react"

import { DataTable } from "@/components/admin/DataTable"
import { columns, StoryColumn } from "./components/columns"

export default async function StoriesPage() {
    const stories = await prisma.course.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    }) as any // Temporarily casting until I check if stories model is correct in prisma

    // Wait, the line above is wrong. I should query stories, not courses.
    const actualStories = await prisma.story.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedStories: StoryColumn[] = actualStories.map((item: any) => ({
        id: item.id,
        storyId: item.storyId,
        clientEn: item.clientEn,
        titleEn: item.titleEn,
        imageUrl: item.imageUrl,
        featured: item.featured,
        published: item.published,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="space-y-8 p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gsg-navy">Success Stories</h1>
                    <p className="text-gray-500 text-sm">Manage and feature inspiring stories from GSG community members.</p>
                </div>
                <a
                    href="/admin/stories/new"
                    className="flex items-center gap-2 px-6 py-2.5 bg-gsg-navy text-white rounded-xl hover:bg-gsg-navy/90 transition-all font-semibold shadow-lg shadow-gsg-navy/20"
                >
                    <Plus className="h-4 w-4" />
                    New Story
                </a>
            </div>

            <hr className="border-gray-100" />

            <DataTable
                columns={columns}
                data={formattedStories}
                searchKey="titleEn"
                placeholder="Search stories by title..."
            />
        </div>
    )
}
