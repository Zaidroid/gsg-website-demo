"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Pencil, Star, Image as ImageIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export type StoryColumn = {
    id: string
    storyId: string
    clientEn: string
    titleEn: string
    imageUrl: string
    featured: boolean
    published: boolean
    createdAt: string
}

export const columns: ColumnDef<StoryColumn>[] = [
    {
        accessorKey: "imageUrl",
        header: "Image",
        cell: ({ row }) => (
            <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
                {row.original.imageUrl ? (
                    <Image
                        fill
                        className="object-cover"
                        alt="Story"
                        src={row.original.imageUrl}
                    />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <ImageIcon className="w-4 h-4 text-gray-400" />
                    </div>
                )}
            </div>
        )
    },
    {
        accessorKey: "clientEn",
        header: "Client",
    },
    {
        accessorKey: "titleEn",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center gap-2 hover:text-gsg-navy transition-colors font-semibold"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            )
        },
        cell: ({ row }) => (
            <div className="max-w-[300px] truncate" title={row.original.titleEn}>
                {row.original.titleEn}
            </div>
        )
    },
    {
        accessorKey: "featured",
        header: "Featured",
        cell: ({ row }) => (
            <div className="flex justify-center">
                {row.original.featured ? (
                    <Star className="h-5 w-5 fill-gsg-teal text-gsg-teal" />
                ) : (
                    <Star className="h-5 w-5 text-gray-200" />
                )}
            </div>
        )
    },
    {
        accessorKey: "published",
        header: "Status",
        cell: ({ row }) => (
            <Badge variant={row.original.published ? "success" : "secondary"}>
                {row.original.published ? "Published" : "Draft"}
            </Badge>
        )
    },
    {
        accessorKey: "createdAt",
        header: "Created",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const id = row.original.id

            return (
                <div className="flex items-center gap-2">
                    <a
                        href={`/admin/stories/${id}`}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
                    >
                        <Pencil className="h-4 w-4" />
                    </a>
                </div>
            )
        },
    },
]
