"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Loader2, Edit2, Trash2 } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/admin/DataTable"

interface Partner {
    id: string
    nameEn: string
    nameAr: string
    category: string
    published: boolean
    order: number
}

export default function PartnersPage() {
    const [data, setData] = useState<Partner[]>([])
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            const res = await fetch("/api/admin/partners")
            if (res.ok) {
                const json = await res.json()
                setData(json)
            }
        } catch (error) {
            console.error("Failed to fetch partners", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this partner?")) return
        try {
            await fetch(`/api/admin/partners/${id}`, { method: "DELETE" })
            setData(data.filter(i => i.id !== id))
        } catch (error) {
            console.error("Error deleting partner", error)
        }
    }

    const columns: ColumnDef<Partner>[] = [
        {
            accessorKey: "nameEn",
            header: "Name (EN)",
        },
        {
            accessorKey: "category",
            header: "Category",
        },
        {
            accessorKey: "order",
            header: "Order",
        },
        {
            accessorKey: "published",
            header: "Status",
            cell: ({ row }) => (
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${row.original.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                    {row.original.published ? "Published" : "Draft"}
                </span>
            )
        },
        {
            id: "actions",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-2">
                        <Link
                            href={`/admin/partners/${row.original.id}`}
                            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gsg-teal hover:text-white transition-colors"
                        >
                            <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                            onClick={() => handleDelete(row.original.id)}
                            className="p-2 bg-gray-100 text-red-500 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                )
            }
        },
    ]

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gsg-navy" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gsg-navy">Partners</h1>
                    <p className="text-gray-500">Manage partners and supporters.</p>
                </div>
                <Link
                    href="/admin/partners/new"
                    className="flex items-center gap-2 px-4 py-2 bg-gsg-navy text-white rounded-lg hover:bg-gsg-navy/90 transition-colors font-medium shadow-lg shadow-gsg-navy/20"
                >
                    <Plus className="w-5 h-5" />
                    Add Partner
                </Link>
            </div>

            <DataTable columns={columns} data={data} searchKey="nameEn" placeholder="Search partners..." />
        </div>
    )
}
