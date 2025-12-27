"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Loader2, Edit2, Trash2 } from "lucide-react"

interface ImpactStat {
    id: string
    statKey: string
    labelEn: string
    labelAr: string
    value: string
    order: number
    published: boolean
}

export default function ImpactStatsPage() {
    const [stats, setStats] = useState<ImpactStat[]>([])
    const [loading, setLoading] = useState(true)

    const fetchStats = async () => {
        try {
            const res = await fetch("/api/admin/impact-stats")
            if (res.ok) {
                const data = await res.json()
                setStats(data)
            }
        } catch (error) {
            console.error("Failed to fetch stats", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchStats()
    }, [])

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this stat?")) return

        try {
            const res = await fetch(`/api/admin/impact-stats/${id}`, { method: "DELETE" })
            if (res.ok) {
                setStats(stats.filter(s => s.id !== id))
            } else {
                alert("Failed to delete stat")
            }
        } catch (error) {
            console.error("Error deleting stat", error)
        }
    }

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
                    <h1 className="text-3xl font-bold tracking-tight text-gsg-navy">Impact Statistics</h1>
                    <p className="text-gray-500">Manage the statistics displayed on the homepage.</p>
                </div>
                <Link
                    href="/admin/impact-stats/new"
                    className="flex items-center gap-2 px-4 py-2 bg-gsg-navy text-white rounded-lg hover:bg-gsg-navy/90 transition-colors font-medium shadow-lg shadow-gsg-navy/20"
                >
                    <Plus className="w-5 h-5" />
                    Add Stat
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {stats.length === 0 ? (
                    <div className="col-span-full text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-500">No stats found. Click "Add Stat" to create one.</p>
                    </div>
                ) : (
                    stats.map((stat) => (
                        <div key={stat.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative group">
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Link
                                    href={`/admin/impact-stats/${stat.id}`}
                                    className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gsg-teal hover:text-white transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </Link>
                                <button
                                    onClick={() => handleDelete(stat.id)}
                                    className="p-2 bg-gray-100 text-red-500 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="mb-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stat.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                    }`}>
                                    {stat.published ? "Published" : "Draft"}
                                </span>
                                <span className="ml-2 text-xs text-gray-400">Order: {stat.order}</span>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-3xl font-bold text-gsg-navy">{stat.value}</h3>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-900">{stat.labelEn}</p>
                                    <p className="text-sm text-gray-500 text-right dir-rtl">{stat.labelAr}</p>
                                </div>
                                <p className="text-xs font-mono text-gray-400 mt-2">{stat.statKey}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
