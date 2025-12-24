"use client"

import { useState, useEffect } from "react"
import { Loader2, Plus, TrendingUp, Users, Target, Briefcase, Trash, Save, X, Edit2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

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
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editForm, setEditForm] = useState<Partial<ImpactStat>>({})
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            const res = await fetch("/api/admin/impact-stats")
            const data = await res.json()
            setStats(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const startEdit = (stat: ImpactStat) => {
        setEditingId(stat.id)
        setEditForm(stat)
    }

    const cancelEdit = () => {
        setEditingId(null)
        setEditForm({})
    }

    const saveEdit = async () => {
        if (!editingId) return
        try {
            setSaving(true)
            const res = await fetch(`/api/admin/impact-stats/${editingId}`, {
                method: "PATCH",
                body: JSON.stringify(editForm),
                headers: { "Content-Type": "application/json" }
            })
            if (res.ok) {
                await fetchStats()
                cancelEdit()
            }
        } catch (error) {
            alert("Error saving stat")
        } finally {
            setSaving(false)
        }
    }

    const togglePublished = async (stat: ImpactStat) => {
        try {
            await fetch(`/api/admin/impact-stats/${stat.id}`, {
                method: "PATCH",
                body: JSON.stringify({ published: !stat.published }),
                headers: { "Content-Type": "application/json" }
            })
            await fetchStats()
        } catch (error) {
            alert("Error toggling status")
        }
    }

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-gsg-teal" />
        </div>
    )

    return (
        <div className="space-y-8 p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gsg-navy">Impact Statistics</h1>
                    <p className="text-gray-500 text-sm">Manage the key metrics shown on the home page impact section.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-gsg-navy text-white rounded-xl hover:bg-gsg-navy/90 transition-all font-semibold shadow-lg shadow-gsg-navy/20">
                    <Plus className="h-4 w-4" />
                    Add New Metric
                </button>
            </div>

            <hr className="border-gray-100" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <div
                        key={stat.id}
                        className={`bg-white rounded-2xl border transition-all duration-300 shadow-sm overflow-hidden ${editingId === stat.id ? "ring-2 ring-gsg-teal border-gsg-teal" : "border-gray-100 hover:border-gsg-teal/30 hover:shadow-md"
                            }`}
                    >
                        {editingId === stat.id ? (
                            <div className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Labels (EN / AR)</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            value={editForm.labelEn}
                                            onChange={(e) => setEditForm({ ...editForm, labelEn: e.target.value })}
                                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-gsg-teal/20"
                                            placeholder="EN Label"
                                        />
                                        <input
                                            value={editForm.labelAr}
                                            onChange={(e) => setEditForm({ ...editForm, labelAr: e.target.value })}
                                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-gsg-teal/20 text-right"
                                            placeholder="العنوان بالعربية"
                                            dir="rtl"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Value</label>
                                    <input
                                        value={editForm.value}
                                        onChange={(e) => setEditForm({ ...editForm, value: e.target.value })}
                                        className="w-full px-3 py-2 text-lg font-bold text-gsg-teal border rounded-lg focus:ring-2 focus:ring-gsg-teal/20"
                                        placeholder="e.g., 500+"
                                    />
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <button
                                        onClick={cancelEdit}
                                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 font-medium"
                                    >
                                        <X className="w-4 h-4" /> Cancel
                                    </button>
                                    <button
                                        onClick={saveEdit}
                                        disabled={saving}
                                        className="flex items-center gap-1 px-4 py-2 bg-gsg-teal text-white rounded-lg hover:bg-gsg-teal/90 font-bold shadow-md shadow-gsg-teal/20 disabled:opacity-50"
                                    >
                                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-gsg-teal/10 rounded-xl">
                                        <TrendingUp className="w-6 h-6 text-gsg-teal" />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => togglePublished(stat)}
                                            className={`text-xs px-2 py-1 rounded-full font-bold transition-all ${stat.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                                                }`}
                                        >
                                            {stat.published ? "Active" : "Hidden"}
                                        </button>
                                        <button
                                            onClick={() => startEdit(stat)}
                                            className="p-1.5 text-gray-400 hover:text-gsg-navy hover:bg-gray-50 rounded-lg transition-all"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-4xl font-extrabold text-gsg-navy tracking-tight">{stat.value}</h3>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-gray-500">{stat.labelEn}</span>
                                        <span className="text-xs font-bold text-gsg-teal/70 text-right font-arabic" dir="rtl">{stat.labelAr}</span>
                                    </div>
                                </div>
                                <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                                    <span className="text-xs text-gray-400 font-medium italic">Key: {stat.statKey}</span>
                                    <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest bg-gray-50 border-gray-200">Order: {stat.order}</Badge>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {stats.length === 0 && !loading && (
                    <div className="col-span-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center">
                        <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-600">No metrics found</h3>
                        <p className="text-gray-400 text-sm mb-6">Start by adding your first impact statistic.</p>
                        <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-gsg-navy text-white rounded-xl hover:bg-gsg-navy/90 transition-all font-semibold">
                            <Plus className="h-4 w-4" />
                            Create Benchmark
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
