"use client"

import { useState, useEffect } from "react"
import { Loader2, Languages, Search, Save, Globe, AlertCircle, RefreshCw, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function TranslationsPage() {
    const [enData, setEnData] = useState<any>({})
    const [arData, setArData] = useState<any>({})
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [activeSection, setActiveSection] = useState<string | null>(null)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            setLoading(true)
            const [enRes, arRes] = await Promise.all([
                fetch("/api/admin/translations?lang=en"),
                fetch("/api/admin/translations?lang=ar")
            ])
            setEnData(await enRes.json())
            setArData(await arRes.json())
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const flatten = (obj: any, prefix = "") => {
        let items: any = {}
        for (const key in obj) {
            const newKey = prefix ? `${prefix}.${key}` : key
            if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
                Object.assign(items, flatten(obj[key], newKey))
            } else {
                items[newKey] = obj[key]
            }
        }
        return items
    }

    const unflatten = (data: any) => {
        const result: any = {}
        for (const key in data) {
            const keys = key.split(".")
            let current = result
            for (let i = 0; i < keys.length; i++) {
                const k = keys[i]
                if (i === keys.length - 1) {
                    current[k] = data[key]
                } else {
                    current[k] = current[k] || {}
                    current = current[k]
                }
            }
        }
        return result
    }

    const flatEn = flatten(enData)
    const flatAr = flatten(arData)
    const allKeys = Object.keys(flatEn)

    const sections = Array.from(new Set(allKeys.map(k => k.split(".")[0])))

    const filteredKeys = allKeys.filter(key => {
        const matchesSearch = key.toLowerCase().includes(searchQuery.toLowerCase()) ||
            flatEn[key]?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
            flatAr[key]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        const matchesSection = !activeSection || key.startsWith(activeSection)
        return matchesSearch && matchesSection
    })

    const updateTranslation = (lang: "en" | "ar", key: string, value: any) => {
        if (lang === "en") {
            const newData = { ...flatEn, [key]: value }
            setEnData(unflatten(newData))
        } else {
            const newData = { ...flatAr, [key]: value }
            setArData(unflatten(newData))
        }
    }

    const saveAll = async () => {
        try {
            setSaving(true)
            await Promise.all([
                fetch("/api/admin/translations", {
                    method: "POST",
                    body: JSON.stringify({ lang: "en", content: enData }),
                    headers: { "Content-Type": "application/json" }
                }),
                fetch("/api/admin/translations", {
                    method: "POST",
                    body: JSON.stringify({ lang: "ar", content: arData }),
                    headers: { "Content-Type": "application/json" }
                })
            ])
            alert("Translations saved successfully!")
        } catch (error) {
            alert("Error saving translations")
        } finally {
            setSaving(false)
        }
    }

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-gsg-teal" />
        </div>
    )

    return (
        <div className="space-y-8 p-8 max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gsg-navy flex items-center gap-3">
                        <Languages className="w-8 h-8 text-gsg-teal" />
                        Translation Manager
                    </h1>
                    <p className="text-gray-500 text-sm">Update static text across the website. Changes affect UI components directly.</p>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={fetchData}
                        className="p-2.5 text-gray-400 hover:text-gsg-navy hover:bg-white rounded-xl transition-all shadow-sm"
                    >
                        <RefreshCw className="w-5 h-5" />
                    </button>
                    <button
                        onClick={saveAll}
                        disabled={saving}
                        className="flex items-center gap-2 px-8 py-3 bg-gsg-navy text-white rounded-xl hover:bg-gsg-navy/90 transition-all font-bold shadow-lg shadow-gsg-navy/20 disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Save All Changes
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Sidebar - Sections */}
                <div className="col-span-12 lg:col-span-3 space-y-4">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search keys or text..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-gsg-teal/20 transition-all font-medium"
                            />
                        </div>
                        <div className="space-y-1">
                            <button
                                onClick={() => setActiveSection(null)}
                                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${!activeSection ? "bg-gsg-teal text-white shadow-md shadow-gsg-teal/20" : "text-gray-500 hover:bg-gray-50"
                                    }`}
                            >
                                All Sections
                            </button>
                            {sections.map(section => (
                                <button
                                    key={section}
                                    onClick={() => setActiveSection(section)}
                                    className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between group ${activeSection === section ? "bg-gsg-navy text-white shadow-md shadow-gsg-navy/20" : "text-gray-500 hover:bg-gray-50"
                                        }`}
                                >
                                    {section}
                                    <ChevronRight className={`w-3 h-3 transition-transform ${activeSection === section ? "rotate-90" : "group-hover:translate-x-1"}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gsg-teal/5 p-6 rounded-3xl border border-gsg-teal/10 space-y-3">
                        <div className="flex items-center gap-2 text-gsg-teal">
                            <AlertCircle className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-widest">Admin Tip</span>
                        </div>
                        <p className="text-[11px] text-gsg-teal/80 leading-relaxed font-medium">
                            Some values support dynamic variables like <code className="bg-white/50 px-1 rounded">{"{year}"}</code>. Be careful not to delete these placeholders.
                        </p>
                    </div>
                </div>

                {/* Editor Area */}
                <div className="col-span-12 lg:col-span-9">
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[600px]">
                        <div className="bg-gray-50/50 p-6 border-b border-gray-100 grid grid-cols-2 gap-8 items-center">
                            <div className="flex items-center gap-3">
                                <Globe className="w-5 h-5 text-gray-400" />
                                <span className="text-sm font-bold text-gsg-navy">English (Source)</span>
                            </div>
                            <div className="flex items-center gap-3 justify-end text-right">
                                <span className="text-sm font-bold text-gsg-navy">العربية (Target)</span>
                                <Globe className="w-5 h-5 text-gsg-teal" />
                            </div>
                        </div>
                        <div className="divide-y divide-gray-50 max-h-[800px] overflow-y-auto custom-scrollbar">
                            {filteredKeys.map(key => (
                                <div key={key} className="p-8 hover:bg-gray-50/30 transition-colors space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Badge variant="outline" className="font-mono text-[10px] bg-gray-50 border-gray-200 text-gray-400 group-hover:text-gsg-navy transition-colors">
                                            {key}
                                        </Badge>
                                    </div>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            {Array.isArray(flatEn[key]) ? (
                                                <div className="space-y-2">
                                                    {(flatEn[key] as any[]).map((item, i) => (
                                                        <input
                                                            key={i}
                                                            value={item}
                                                            onChange={(e) => {
                                                                const newList = [...flatEn[key]]
                                                                newList[i] = e.target.value
                                                                updateTranslation("en", key, newList)
                                                            }}
                                                            className="w-full px-4 py-2 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-gsg-teal/20"
                                                        />
                                                    ))}
                                                </div>
                                            ) : (
                                                <textarea
                                                    value={flatEn[key]}
                                                    onChange={(e) => updateTranslation("en", key, e.target.value)}
                                                    rows={flatEn[key]?.length > 100 ? 4 : 2}
                                                    className="w-full px-4 py-3 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-gsg-teal/20 focus:bg-white transition-all font-medium"
                                                />
                                            )}
                                        </div>
                                        <div className="space-y-2 text-right">
                                            {Array.isArray(flatAr[key]) ? (
                                                <div className="space-y-2" dir="rtl">
                                                    {(flatAr[key] as any[]).map((item, i) => (
                                                        <input
                                                            key={i}
                                                            value={item}
                                                            onChange={(e) => {
                                                                const newList = [...flatAr[key] || []]
                                                                newList[i] = e.target.value
                                                                updateTranslation("ar", key, newList)
                                                            }}
                                                            className="w-full px-4 py-2 border border-gsg-teal/10 rounded-xl text-sm focus:ring-2 focus:ring-gsg-teal/20 text-right font-arabic"
                                                        />
                                                    ))}
                                                </div>
                                            ) : (
                                                <textarea
                                                    value={flatAr[key] || ""}
                                                    onChange={(e) => updateTranslation("ar", key, e.target.value)}
                                                    rows={flatAr[key]?.length > 100 ? 4 : 2}
                                                    className="w-full px-4 py-3 border border-gsg-teal/10 rounded-xl text-sm focus:ring-2 focus:ring-gsg-teal/20 focus:bg-white transition-all text-right font-arabic"
                                                    dir="rtl"
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {filteredKeys.length === 0 && (
                                <div className="p-20 text-center space-y-4">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                                        <Search className="w-8 h-8 text-gray-300" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-bold text-gsg-navy">No translations found</p>
                                        <p className="text-sm text-gray-500">Try adjusting your search or selecting a different section.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {saving && (
                <div className="fixed bottom-8 right-8 bg-gsg-navy text-white px-8 py-4 rounded-3xl shadow-2xl animate-in slide-in-from-right duration-300 flex items-center gap-4 font-bold border border-white/10 z-50">
                    <Loader2 className="w-5 h-5 animate-spin text-gsg-teal" />
                    Synchronizing Localization Files...
                </div>
            )}

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e5e7eb;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #d1d5db;
                }
            `}</style>
        </div>
    )
}
