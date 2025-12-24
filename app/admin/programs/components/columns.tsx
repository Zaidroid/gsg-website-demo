"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal, ArrowUpDown, ExternalLink, Edit } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export type ProgramColumn = {
    id: string
    programId: string
    titleEn: string
    titleAr: string
    published: boolean
    updatedAt: string
}

export const columns: ColumnDef<ProgramColumn>[] = [
    {
        accessorKey: "programId",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center gap-2 hover:text-gsg-teal transition-colors"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Program ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
    },
    {
        accessorKey: "titleEn",
        header: "Title (EN)",
    },
    {
        accessorKey: "titleAr",
        header: ({ column }) => {
            return (
                <div className="text-right flex items-center justify-end gap-2">
                    Title (AR)
                </div>
            )
        },
        cell: ({ row }) => {
            return <div className="text-right font-arabic">{row.getValue("titleAr")}</div>
        },
    },
    {
        accessorKey: "published",
        header: "Status",
        cell: ({ row }) => {
            const published = row.getValue("published") as boolean
            return (
                <Badge className={published ? "bg-gsg-teal/10 text-gsg-teal hover:bg-gsg-teal/20" : "bg-gray-100 text-gray-500"}>
                    {published ? "Published" : "Draft"}
                </Badge>
            )
        },
    },
    {
        accessorKey: "updatedAt",
        header: "Last Updated",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const program = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(program.id)}>
                            Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <Link href={`/admin/programs/${program.id}`}>
                            <DropdownMenuItem className="flex items-center gap-2">
                                <Edit className="w-4 h-4" /> Edit Program
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem className="text-red-600 flex items-center gap-2">
                            <Trash className="w-4 h-4" /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

import { Trash } from "lucide-react"
