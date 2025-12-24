"use client"

import { useState, useEffect } from "react"
import {
    Loader2, Save, Info, Target, Eye, Star,
    History, Plus, Trash, Edit2, X, ArrowUp, ArrowDown,
    LayoutDashboard
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface AboutContent {
    id?: string
    headerTitleEn: string
    headerTitleAr: string
    headerDescEn: string
    headerDescAr: string
    missionTitleEn: string
    missionTitleAr: string
    missionDescEn: string
    missionDescAr: string
    visionTitleEn: string
    visionTitleAr: string
    visionDescEn: string
    visionDescAr: string
    valuesTitleEn: string
    valuesTitleAr: string
    valuesEn: string[]
    valuesAr: string[]
}

interface TimelineItem {
    id: string
    yearEn: string
    yearAr: string
    titleEn: string
    titleAr: string
    descriptionEn: string
    descriptionAr: string
    order: number
    published: boolean
}

export default function AboutManagerPage() {
    const [activeTab, setActiveTab] = useState<"content" | "timeline">("content")
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [content, setContent] = useState<AboutContent>({
        headerTitleEn: "", headerTitleAr: "",
        headerDescEn: "", headerDescAr: "",
        missionTitleEn: "", missionTitleAr: "",
        missionDescEn: "", missionDescAr: "",
        visionTitleEn: "", visionTitleAr: "",
        visionDescEn: "", visionDescAr: "",
        valuesTitleEn: "", valuesTitleAr: "",
        valuesEn: [], valuesAr: []
    })
    const [timeline, setTimeline] = useState<TimelineItem[]>([])
    const [editingTimelineId, setEditingTimelineId] = useState<string | null>(null)
    const [showNewTimeline, setShowNewTimeline] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        try {
            const [contentRes, timelineRes] = await Promise.all([
                fetch("/api/admin/about/content"),
                fetch("/api/admin/about/timeline")
            ])
            const contentData = await contentRes.json()
            const timelineData = await timelineRes.json()

            if (contentData && !contentData.error) setContent(contentData)
            if (Array.isArray(timelineData)) setTimeline(timelineData)
        } catch (error) {
            toast({ title: "Error", description: "Failed to load about data.", variant: "destructive" })
        } finally {
            setLoading(false)
        }
    }

    const saveContent = async () => {
        setSaving(true)
        try {
            const res = await fetch("/api/admin/about/content", {
                method: "PUT",
                body: JSON.stringify(content),
                headers: { "Content-Type": "application/json" }
            })
            if (!res.ok) throw new Error()
            toast({ title: "Success", description: "About content updated." })
        } catch (error) {
            toast({ title: "Error", description: "Failed to save content.", variant: "destructive" })
        } finally {
            setSaving(false)
        }
    }

    const saveTimelineItem = async (item: Partial<TimelineItem>) => {
        try {
            const isNew = !item.id
            const res = await fetch(isNew ? "/api/admin/about/timeline" : `/api/admin/about/timeline/${item.id}`, {
                method: isNew ? "POST" : "PUT",
                body: JSON.stringify(item),
                headers: { "Content-Type": "application/json" }
            })
            if (!res.ok) throw new Error()
            toast({ title: "Success", description: "Timeline item saved." })
            setEditingTimelineId(null)
            setShowNewTimeline(false)
            fetchData()
        } catch (error) {
            toast({ title: "Error", description: "Failed to save timeline item.", variant: "destructive" })
        }
    }

    const deleteTimelineItem = async (id: string) => {
        if (!confirm("Delete this timeline milestone?")) return
        try {
            await fetch(`/api/admin/about/timeline/${id}`, { method: "DELETE" })
            setTimeline(timeline.filter(t => t.id !== id))
            toast({ title: "Deleted", description: "Milestone removed." })
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete item.", variant: "destructive" })
        }
    }

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-gsg-teal" />
        </div>
    )

    return (
        <div className="space-y-8 p-4 lg:p-8 max-w-6xl mx-auto pb-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gsg-navy flex items-center gap-3">
                        <Info className="w-8 h-8 text-gsg-teal" />
                        About Page Manager
                    </h1>
                    <p className="text-gray-500 text-sm">Manage company history, mission, vision, and values.</p>
                </div>

                <div className="flex bg-gray-100/50 p-1.5 rounded-2xl border border-gray-100 w-fit">
                    {!content.headerTitleEn && (
                        <button
                            onClick={async () => {
                                const defaultAbout = {
                                    headerTitleEn: "Empowering Palestine's Tech Ecosystem",
                                    headerTitleAr: "تمكين النظام البيئي التكنولوجي في فلسطين",
                                    headerDescEn: "Gaza Sky Geeks is Palestine’s leading tech hub, providing high-quality digital skills training and support for entrepreneurs.",
                                    headerDescAr: "غزة سكاي جيكس هو المركز التكنولوجي الرائد في فلسطين، حيث يوفر تدريباً عالياً في المهارات الرقمية ودعماً لرواد الأعمال.",
                                    missionTitleEn: "Our Mission",
                                    missionTitleAr: "مهمتنا",
                                    missionDescEn: "To empower resilient youth to build and sustain high-value careers in the tech sector.",
                                    missionDescAr: "تمكين الشباب الصامد من بناء واستدامة وظائف ذات قيمة عالية في قطاع التكنولوجيا.",
                                    visionTitleEn: "Our Vision",
                                    visionTitleAr: "رؤيتنا",
                                    visionDescEn: "A vibrant Palestinian tech ecosystem that is competitive on a global scale.",
                                    visionDescAr: "نظام بيئي تكنولوجي فلسطيني حيوي ومنافس على نطاق عالمي.",
                                    valuesTitleEn: "Our Values",
                                    valuesTitleAr: "قيمنا",
                                    valuesEn: ["Community", "Excellence", "Resilience"],
                                    valuesAr: ["المجتمع", "التميز", "الصمود"]
                                }
                                setContent(defaultAbout)
                                toast({ title: "Draft Loaded", description: "Default content loaded. Click Save to persist." })
                            }}
                            className="px-4 py-2 text-xs font-bold text-gsg-orange hover:bg-white rounded-xl transition-all mr-2"
                        >
                            Seed Draft
                        </button>
                    )}
                    <button
                        onClick={() => setActiveTab("content")}
                        className={cn(
                            "px-6 py-2 rounded-xl text-sm font-bold transition-all",
                            activeTab === "content" ? "bg-white text-gsg-navy shadow-sm" : "text-gray-400 hover:text-gsg-navy"
                        )}
                    >
                        Core Content
                    </button>
                    <button
                        onClick={() => setActiveTab("timeline")}
                        className={cn(
                            "px-6 py-2 rounded-xl text-sm font-bold transition-all",
                            activeTab === "timeline" ? "bg-white text-gsg-navy shadow-sm" : "text-gray-400 hover:text-gsg-navy"
                        )}
                    >
                        Timeline
                    </button>
                </div>
            </div>

            {activeTab === "content" && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Header Section */}
                        <AboutCard title="Header Section" icon={LayoutDashboard} description="The first thing users see on the About page.">
                            <InputField label="Header Title (EN)" value={content.headerTitleEn} onChange={(v: string) => setContent({ ...content, headerTitleEn: v })} />
                            <InputField label="Header Title (AR)" value={content.headerTitleAr} onChange={(v: string) => setContent({ ...content, headerTitleAr: v })} isRtl />
                            <TextareaField label="Header Description (EN)" value={content.headerDescEn} onChange={(v: string) => setContent({ ...content, headerDescEn: v })} />
                            <TextareaField label="Header Description (AR)" value={content.headerDescAr} onChange={(v: string) => setContent({ ...content, headerDescAr: v })} isRtl />
                        </AboutCard>

                        {/* Mission & Vision */}
                        <div className="space-y-8">
                            <AboutCard title="Our Mission" icon={Target} description="GSG's core purpose.">
                                <InputField label="Mission Title (EN)" value={content.missionTitleEn} onChange={(v: string) => setContent({ ...content, missionTitleEn: v })} />
                                <InputField label="Mission Title (AR)" value={content.missionTitleAr} onChange={(v: string) => setContent({ ...content, missionTitleAr: v })} isRtl />
                                <TextareaField label="Mission Text (EN)" value={content.missionDescEn} onChange={(v: string) => setContent({ ...content, missionDescEn: v })} />
                                <TextareaField label="Mission Text (AR)" value={content.missionDescAr} onChange={(v: string) => setContent({ ...content, missionDescAr: v })} isRtl />
                            </AboutCard>

                            <AboutCard title="Our Vision" icon={Eye} description="GSG's long-term goal.">
                                <InputField label="Vision Title (EN)" value={content.visionTitleEn} onChange={(v: string) => setContent({ ...content, visionTitleEn: v })} />
                                <InputField label="Vision Title (AR)" value={content.visionTitleAr} onChange={(v: string) => setContent({ ...content, visionTitleAr: v })} isRtl />
                                <TextareaField label="Vision Text (EN)" value={content.visionDescEn} onChange={(v: string) => setContent({ ...content, visionDescEn: v })} />
                                <TextareaField label="Vision Text (AR)" value={content.visionDescAr} onChange={(v: string) => setContent({ ...content, visionDescAr: v })} isRtl />
                            </AboutCard>
                        </div>
                    </div>

                    <div className="flex justify-end sticky bottom-8">
                        <button
                            onClick={saveContent}
                            disabled={saving}
                            className="flex items-center gap-2 px-10 py-3.5 bg-gsg-navy text-white rounded-2xl text-sm font-bold shadow-xl shadow-gsg-navy/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save All Content
                        </button>
                    </div>
                </div>
            )}

            {activeTab === "timeline" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gsg-navy flex items-center gap-2">
                            <History className="w-6 h-6 text-gsg-orange" />
                            Milestones
                        </h2>
                        <button
                            onClick={() => setShowNewTimeline(true)}
                            className="flex items-center gap-2 px-5 py-2 bg-gsg-teal text-white rounded-xl text-sm font-bold shadow-lg shadow-gsg-teal/10 transition-all hover:scale-105"
                        >
                            <Plus className="w-4 h-4" />
                            Add Milestone
                        </button>
                    </div>

                    {showNewTimeline && (
                        <div className="bg-white p-8 rounded-3xl border-2 border-gsg-teal/20 shadow-xl mb-8">
                            <TimelineForm onSave={saveTimelineItem} onCancel={() => setShowNewTimeline(false)} />
                        </div>
                    )}

                    <div className="space-y-4">
                        {timeline.length === 0 ? (
                            <div className="bg-white p-20 text-center rounded-3xl border border-dashed border-gray-200">
                                <p className="text-gray-400">No milestones added yet.</p>
                            </div>
                        ) : (
                            timeline.map((item, index) => (
                                <div key={item.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                                    {editingTimelineId === item.id ? (
                                        <TimelineForm initialData={item} onSave={saveTimelineItem} onCancel={() => setEditingTimelineId(null)} />
                                    ) : (
                                        <div className="flex items-start justify-between">
                                            <div className="flex gap-6">
                                                <div className="text-3xl font-black text-gsg-teal/20 group-hover:text-gsg-teal/40 transition-colors">
                                                    {item.yearEn}
                                                </div>
                                                <div className="space-y-1">
                                                    <h3 className="font-bold text-lg text-gsg-navy">{item.titleEn} / <span className="font-arabic">{item.titleAr}</span></h3>
                                                    <p className="text-gray-500 text-sm max-w-2xl">{item.descriptionEn}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => setEditingTimelineId(item.id)} className="p-2.5 text-gray-400 hover:text-gsg-navy hover:bg-gray-50 rounded-xl"><Edit2 className="w-4 h-4" /></button>
                                                <button onClick={() => deleteTimelineItem(item.id)} className="p-2.5 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-xl"><Trash className="w-4 h-4" /></button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

interface AboutCardProps {
    title: string
    icon: any
    description: string
    children: React.ReactNode
}

function AboutCard({ title, icon: Icon, description, children }: AboutCardProps) {
    return (
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-100">
                        <Icon className="w-5 h-5 text-gsg-teal" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gsg-navy">{title}</h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{description}</p>
                    </div>
                </div>
            </div>
            <div className="p-8 space-y-6 flex-1">
                {children}
            </div>
        </div>
    )
}

interface InputFieldProps {
    label: string
    value: string
    onChange: (value: string) => void
    isRtl?: boolean
}

function InputField({ label, value, onChange, isRtl = false }: InputFieldProps) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">{label}</label>
            <input
                value={value || ""}
                onChange={e => onChange(e.target.value)}
                className={cn(
                    "w-full px-5 py-3.5 bg-gray-50/50 border border-transparent rounded-2xl focus:ring-4 focus:ring-gsg-teal/5 focus:bg-white focus:border-gsg-teal/20 transition-all text-sm font-medium",
                    isRtl && "text-right font-arabic"
                )}
                dir={isRtl ? "rtl" : "ltr"}
            />
        </div>
    )
}

interface TextareaFieldProps {
    label: string
    value: string
    onChange: (value: string) => void
    isRtl?: boolean
}

function TextareaField({ label, value, onChange, isRtl = false }: TextareaFieldProps) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">{label}</label>
            <textarea
                value={value || ""}
                onChange={e => onChange(e.target.value)}
                rows={4}
                className={cn(
                    "w-full px-5 py-3.5 bg-gray-50/50 border border-transparent rounded-2xl focus:ring-4 focus:ring-gsg-teal/5 focus:bg-white focus:border-gsg-teal/20 transition-all text-sm font-medium resize-none",
                    isRtl && "text-right font-arabic"
                )}
                dir={isRtl ? "rtl" : "ltr"}
            />
        </div>
    )
}

function TimelineForm({ initialData = {}, onSave, onCancel }: any) {
    const [item, setItem] = useState<any>({
        yearEn: "", yearAr: "", titleEn: "", titleAr: "", descriptionEn: "", descriptionAr: "",
        order: 0, published: true, ...initialData
    })

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Year (EN)" value={item.yearEn} onChange={(v: string) => setItem({ ...item, yearEn: v })} />
                <InputField label="Year (AR)" value={item.yearAr} onChange={(v: string) => setItem({ ...item, yearAr: v })} isRtl />
                <InputField label="Milestone Title (EN)" value={item.titleEn} onChange={(v: string) => setItem({ ...item, titleEn: v })} />
                <InputField label="Milestone Title (AR)" value={item.titleAr} onChange={(v: string) => setItem({ ...item, titleAr: v })} isRtl />
                <div className="md:col-span-2">
                    <TextareaField label="Description (EN)" value={item.descriptionEn} onChange={(v: string) => setItem({ ...item, descriptionEn: v })} />
                </div>
                <div className="md:col-span-2">
                    <TextareaField label="Description (AR)" value={item.descriptionAr} onChange={(v: string) => setItem({ ...item, descriptionAr: v })} isRtl />
                </div>
                <InputField label="Order" value={item.order} onChange={(v: string) => setItem({ ...item, order: parseInt(v) || 0 })} />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
                <button onClick={onCancel} className="px-6 py-2 text-sm font-bold text-gray-400">Cancel</button>
                <button
                    onClick={() => onSave(item)}
                    className="px-8 py-2 bg-gsg-teal text-white rounded-xl text-sm font-bold shadow-lg shadow-gsg-teal/10"
                >
                    Save Milestone
                </button>
            </div>
        </div>
    )
}
