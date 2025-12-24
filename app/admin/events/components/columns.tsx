"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Pencil, Calendar, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export type EventColumn = {
    id: string
    eventId: string
    titleEn: string
    date: string
    location: string
    type: string
    status: string
    published: boolean
}

const statusVariants: Record<string, "default" | "secondary" | "success" | "warning" | "destructive"> = {
    "Open": "success",
    "Registration Required": "warning",
    "Finished": "secondary",
    "Cancelled": "destructive",
}

export const columns: ColumnDef<EventColumn>[] = [
    {
        accessorKey: "eventId",
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
        accessorKey: "date",
        header: "Date & Time",
        cell: ({ row }) => (
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4 text-gsg-teal" />
                {row.original.date}
            </div>
        )
    },
    {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => (
            <div className="flex items-center gap-2 text-sm text-gray-600 truncate max-w-[200px]">
                <MapPin className="h-4 w-4 text-gsg-teal" />
                {row.original.location}
            </div>
        )
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
        id: "actions",
        cell: ({ row }) => {
            const id = row.original.id

            return (
                <div className="flex items-center gap-2">
                    <a
                        href={`/admin/events/${id}`}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
                    >
                        <Pencil className="h-4 w-4" />
                    </a>
                </div>
            )
        },
    },
]
