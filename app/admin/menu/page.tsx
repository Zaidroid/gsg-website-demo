"use client"

import { useState, useEffect } from "react"
import {
    Loader2, Plus, Trash, Edit2, Save, X,
    ArrowUp, ArrowDown, ExternalLink, Menu as MenuIcon,
    Navigation, Layout, PanelsTopLeft
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

interface MenuItem {
    id: string
    nameEn: string
    nameAr: string
    href: string
    order: number
    location: "Navbar" | "Footer"
    published: boolean
}

export default function MenuManagerPage() {
    const [items, setItems] = useState<MenuItem[]>([])
    const [loading, setLoading] = useState(true)
    const [editingItem, setEditingItem] = useState<Partial<MenuItem> | null>(null)
    const [newItem, setNewItem] = useState<Partial<MenuItem>>({
        location: "Navbar",
        published: true,
        order: 0
    })
    const [showNewForm, setShowNewForm] = useState(false)

    useEffect(() => {
        fetchMenu()
    }, [])

    const fetchMenu = async () => {
        try {
            setLoading(true)
            const res = await fetch("/api/admin/menu")
            const data = await res.json()
            setItems(Array.isArray(data) ? data : [])
        } catch (error) {
            toast({ title: "Error", description: "Failed to load menu items.", variant: "destructive" })
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async (item: Partial<MenuItem>) => {
        try {
            const isNew = !item.id
            const res = await fetch(isNew ? "/api/admin/menu" : `/api/admin/menu/${item.id}`, {
                method: isNew ? "POST" : "PUT",
                body: JSON.stringify(item),
                headers: { "Content-Type": "application/json" }
            })

            if (!res.ok) throw new Error()

            toast({ title: "Success", description: `Menu item ${isNew ? "created" : "updated"} successfully.` })
            setEditingItem(null)
            setShowNewForm(false)
            fetchMenu()
        } catch (error) {
            toast({ title: "Error", description: "Failed to save menu item.", variant: "destructive" })
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return
        try {
            const res = await fetch(`/api/admin/menu/${id}`, { method: "DELETE" })
            if (!res.ok) throw new Error()
            setItems(items.filter(i => i.id !== id))
            toast({ title: "Deleted", description: "Menu item removed." })
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete item.", variant: "destructive" })
        }
    }

    const moveItem = async (index: number, direction: "up" | "down") => {
        const currentItems = direction === "up"
            ? items.filter(i => i.location === items[index].location).sort((a, b) => a.order - b.order)
            : items.filter(i => i.location === items[index].location).sort((a, b) => a.order - b.order)

        // This is a simplified move. In a real app we'd handle the full list.
        const newItems = [...items]
        const targetIndex = direction === "up" ? index - 1 : index + 1

        if (targetIndex < 0 || targetIndex >= items.length) return

        const temp = newItems[index]
        newItems[index] = newItems[targetIndex]
        newItems[targetIndex] = temp

        const updated = newItems.map((item, i) => ({ ...item, order: i }))
        setItems(updated)

        try {
            await Promise.all(updated.map(item =>
                fetch(`/api/admin/menu/${item.id}`, {
                    method: "PUT",
                    body: JSON.stringify(item),
                    headers: { "Content-Type": "application/json" }
                })
            ))
        } catch (error) {
            toast({ title: "Sync Error", description: "Failed to persist new order.", variant: "destructive" })
        }
    }

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-gsg-teal" />
        </div>
    )

    const navbarItems = items.filter(i => i.location === "Navbar").sort((a, b) => a.order - b.order)
    const footerItems = items.filter(i => i.location === "Footer").sort((a, b) => a.order - b.order)

    return (
        <div className="space-y-8 p-4 lg:p-8 max-w-5xl mx-auto pb-24">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gsg-navy flex items-center gap-3">
                        <MenuIcon className="w-8 h-8 text-gsg-teal" />
                        Menu Manager
                    </h1>
                    <p className="text-gray-500 text-sm">Customize site navigation for Navbar and Footer.</p>
                </div>
                {!showNewForm && (
                    <div className="flex items-center gap-3">
                        {items.length === 0 && (
                            <button
                                onClick={async () => {
                                    const defaults: Partial<MenuItem>[] = [
                                        { nameEn: "About Us", nameAr: "من نحن", href: "/about", order: 0, location: "Navbar" as const, published: true },
                                        { nameEn: "Programs", nameAr: "البرامج", href: "/programs", order: 1, location: "Navbar" as const, published: true },
                                        { nameEn: "Courses", nameAr: "الدورات", href: "/courses", order: 2, location: "Navbar" as const, published: true },
                                        { nameEn: "Events", nameAr: "الفعاليات", href: "/events", order: 3, location: "Navbar" as const, published: true },
                                        { nameEn: "Privacy Policy", nameAr: "سياسة الخصوصية", href: "/privacy", order: 0, location: "Footer" as const, published: true },
                                        { nameEn: "Terms of Service", nameAr: "شروط الخدمة", href: "/terms", order: 1, location: "Footer" as const, published: true },
                                    ]
                                    for (const d of defaults) {
                                        await handleSave(d)
                                    }
                                }}
                                className="px-4 py-2.5 bg-gsg-orange/10 text-gsg-orange rounded-xl text-sm font-bold border border-gsg-orange/20 hover:bg-gsg-orange/20 transition-all"
                            >
                                Seed Default Menu
                            </button>
                        )}
                        <button
                            onClick={() => setShowNewForm(true)}
                            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            <Plus className="w-4 h-4" />
                            Add New Link
                        </button>
                    </div>
                )}
            </div>

            {showNewForm && (
                <div className="bg-white p-6 rounded-3xl border-2 border-gsg-teal/20 shadow-xl animate-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gsg-navy flex items-center gap-2">
                            <Plus className="w-5 h-5 text-gsg-teal" />
                            New Navigation Link
                        </h3>
                        <button onClick={() => setShowNewForm(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <MenuFormInputs item={newItem} onChange={setNewItem} />
                    </div>
                    <div className="flex justify-end gap-3 mt-8">
                        <button onClick={() => setShowNewForm(false)} className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-700">Cancel</button>
                        <button
                            onClick={() => handleSave(newItem)}
                            className="px-8 py-2.5 bg-gsg-teal text-white rounded-xl text-sm font-bold shadow-lg shadow-gsg-teal/20"
                        >
                            Create Link
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-12">
                <MenuSection
                    title="Navbar Navigation"
                    icon={PanelsTopLeft}
                    items={navbarItems}
                    onDelete={handleDelete}
                    onMove={moveItem}
                    editingItem={editingItem}
                    setEditingItem={setEditingItem}
                    onSaveEdit={handleSave}
                />

                <MenuSection
                    title="Footer Links"
                    icon={Layout}
                    items={footerItems}
                    onDelete={handleDelete}
                    onMove={moveItem}
                    editingItem={editingItem}
                    setEditingItem={setEditingItem}
                    onSaveEdit={handleSave}
                />
            </div>
        </div>
    )
}

interface MenuSectionProps {
    title: string
    icon: any
    items: MenuItem[]
    onDelete: (id: string) => void
    onMove: (index: number, direction: "up" | "down") => void
    editingItem: Partial<MenuItem> | null
    setEditingItem: (item: Partial<MenuItem> | null) => void
    onSaveEdit: (item: Partial<MenuItem>) => void
}

function MenuSection({ title, icon: Icon, items, onDelete, onMove, editingItem, setEditingItem, onSaveEdit }: MenuSectionProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-bold text-gsg-navy flex items-center gap-2">
                    <Icon className="w-5 h-5 text-gsg-orange" />
                    {title}
                </h2>
                <Badge className="bg-gray-100 text-gray-500 border-0">{items.length} links</Badge>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
                {items.length === 0 ? (
                    <div className="p-16 text-center text-gray-400 text-sm font-medium">
                        <Navigation className="w-8 h-8 mx-auto mb-3 opacity-20" />
                        No links configured for this section.
                    </div>
                ) : (
                    items.map((item: any, index: number) => (
                        <div key={item.id} className="p-4 flex items-center gap-4 hover:bg-gray-50/50 transition-colors group">
                            <div className="flex flex-col gap-1">
                                <button
                                    onClick={() => onMove(index, "up")}
                                    disabled={index === 0}
                                    className="p-1 text-gray-300 hover:text-gsg-teal disabled:opacity-0 transition-all"
                                >
                                    <ArrowUp className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => onMove(index, "down")}
                                    disabled={index === items.length - 1}
                                    className="p-1 text-gray-300 hover:text-gsg-teal disabled:opacity-0 transition-all"
                                >
                                    <ArrowDown className="w-4 h-4" />
                                </button>
                            </div>

                            {editingItem && editingItem.id === item.id ? (
                                <div className="flex-1 bg-gsg-teal/5 p-6 rounded-2xl animate-in fade-in duration-300">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <MenuFormInputs item={editingItem} onChange={setEditingItem} />
                                    </div>
                                    <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gsg-teal/10">
                                        <button onClick={() => setEditingItem(null)} className="px-3 py-1.5 text-xs font-bold text-gray-500">Cancel</button>
                                        <button onClick={() => onSaveEdit(editingItem)} className="px-5 py-1.5 bg-gsg-teal text-white rounded-lg text-xs font-bold shadow-md flex items-center gap-2">
                                            <Save className="w-3 h-3" />
                                            Save Link
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-gsg-navy">{item.nameEn}</span>
                                            <span className="text-gray-300 text-xs">|</span>
                                            <span className="font-bold text-gsg-teal font-arabic" dir="rtl">{item.nameAr}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <code className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-mono tracking-tight">{item.href}</code>
                                            {!item.published && <Badge className="bg-red-50 text-red-500 text-[10px] scale-75 border-0">Hidden</Badge>}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => setEditingItem(item)}
                                            className="p-2 text-gray-400 hover:text-gsg-navy hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-gray-100 transition-all"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(item.id)}
                                            className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                        >
                                            <Trash className="w-4 h-4" />
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

interface MenuFormInputsProps {
    item: Partial<MenuItem>
    onChange: (item: Partial<MenuItem>) => void
}

function MenuFormInputs({ item, onChange }: MenuFormInputsProps) {
    return (
        <>
            <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Label (EN)</label>
                <input
                    value={item.nameEn || ""}
                    onChange={e => onChange({ ...item, nameEn: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50/50 border border-transparent rounded-xl focus:ring-2 focus:ring-gsg-teal/10 focus:bg-white focus:border-gsg-teal/20 transition-all text-sm font-medium"
                    placeholder="About Us"
                />
            </div>
            <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block text-right pr-1">Label (AR)</label>
                <input
                    value={item.nameAr || ""}
                    onChange={e => onChange({ ...item, nameAr: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50/50 border border-transparent rounded-xl focus:ring-2 focus:ring-gsg-teal/10 focus:bg-white focus:border-gsg-teal/20 transition-all text-sm font-medium text-right font-arabic"
                    placeholder="من نحن"
                    dir="rtl"
                />
            </div>
            <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Path / URL</label>
                <div className="relative">
                    <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input
                        value={item.href || ""}
                        onChange={e => onChange({ ...item, href: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-transparent rounded-xl focus:ring-2 focus:ring-gsg-teal/10 focus:bg-white focus:border-gsg-teal/20 transition-all text-sm font-medium"
                        placeholder="/about or https://..."
                    />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Display Location</label>
                <select
                    value={item.location}
                    onChange={e => onChange({ ...item, location: e.target.value as "Navbar" | "Footer" })}
                    className="w-full px-4 py-3 bg-gray-50/50 border border-transparent rounded-xl focus:ring-2 focus:ring-gsg-teal/10 focus:bg-white focus:border-gsg-teal/20 transition-all text-sm font-medium"
                >
                    <option value="Navbar">Navbar</option>
                    <option value="Footer">Footer</option>
                </select>
            </div>
        </>
    )
}
