"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown, Pencil, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/navigation"
import { useRouter } from "next/navigation"

export type CourseColumn = {
    id: string
    courseId: string
    titleEn: string
    category: string
    level: string
    status: string
    published: boolean
    createdAt: string
}

const statusVariants: Record<string, "default" | "secondary" | "success" | "warning"> = {
    "Open": "success",
    "Upcoming": "warning",
    "Closed": "secondary",
}

export const columns: ColumnDef<CourseColumn>[] = [
    {
        accessorKey: "courseId",
        header: "ID",
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
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => <Badge variant="outline">{row.original.category}</Badge>
    },
    {
        accessorKey: "level",
        header: "Level",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status
            return (
                <Badge variant={statusVariants[status] || "default"}>
                    {status}
                </Badge>
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: "Date Created",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const id = row.original.id

            return (
                <div className="flex items-center gap-2">
                    <a
                        href={`/admin/courses/${id}`}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
                    >
                        <Pencil className="h-4 w-4" />
                    </a>
                </div>
            )
        },
    },
]
