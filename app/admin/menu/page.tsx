"use client"

import { useState, useEffect, useRef } from "react"
import {
    Loader2, Plus, Trash, Edit2, Save, X,
    GripVertical, ExternalLink, Menu as MenuIcon,
    LogOut, PanelsTopLeft, Layout, CheckCircle2,
    ArrowRight
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

const AVAILABLE_PAGES = [
    { nameEn: "Home", nameAr: "الرئيسية", href: "/" },
    { nameEn: "About Us", nameAr: "من نحن", href: "/about" },
    { nameEn: "Programs", nameAr: "البرامج", href: "/programs" },
    { nameEn: "Courses", nameAr: "الدورات", href: "/courses" },
    { nameEn: "Events", nameAr: "الفعاليات", href: "/events" },
    { nameEn: "Contact Us", nameAr: "اتصل بنا", href: "/contact" },
    { nameEn: "Privacy Policy", nameAr: "سياسة الخصوصية", href: "/privacy" },
    { nameEn: "Terms of Service", nameAr: "شروط الخدمة", href: "/terms" },
]

export default function MenuManagerPage() {
    const [items, setItems] = useState<MenuItem[]>([])
    const [loading, setLoading] = useState(true)
    const [editingItem, setEditingItem] = useState<Partial<MenuItem> | null>(null)
    const [draggedItem, setDraggedItem] = useState<MenuItem | null>(null)

    // New item form state
    const [customLink, setCustomLink] = useState<Partial<MenuItem>>({
        location: "Navbar",
        published: true,
        order: 0,
        nameEn: "",
        nameAr: "",
        href: ""
    })
    const [showCustomForm, setShowCustomForm] = useState(false)

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

            // Calculate order if new
            if (isNew) {
                const existingInLocation = items.filter(i => i.location === item.location)
                item.order = existingInLocation.length
            }

            const res = await fetch(isNew ? "/api/admin/menu" : `/api/admin/menu/${item.id}`, {
                method: isNew ? "POST" : "PUT",
                body: JSON.stringify(item),
                headers: { "Content-Type": "application/json" }
            })

            if (!res.ok) throw new Error()

            const savedItem = await res.json()

            if (isNew) {
                setItems([...items, savedItem])
                toast({ title: "Added", description: "Menu item added successfully." })
            } else {
                setItems(items.map(i => i.id === savedItem.id ? savedItem : i))
                toast({ title: "Saved", description: "Menu item updated successfully." })
            }

            setEditingItem(null)
            setShowCustomForm(false)
            setCustomLink({ location: "Navbar", published: true, order: 0, nameEn: "", nameAr: "", href: "" })

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

    const onDragStart = (e: React.DragEvent, item: MenuItem) => {
        setDraggedItem(item)
        e.dataTransfer.effectAllowed = "move"
        // Make the drag image transparent or styled if needed
        e.dataTransfer.setData("text/plain", item.id)
    }

    const onDragOver = (e: React.DragEvent, targetItem: MenuItem) => {
        e.preventDefault()
        if (!draggedItem || draggedItem.id === targetItem.id || draggedItem.location !== targetItem.location) return

        // Visual feedback could go here
    }

    const onDrop = async (e: React.DragEvent, targetItem: MenuItem) => {
        e.preventDefault()
        if (!draggedItem || draggedItem.id === targetItem.id || draggedItem.location !== targetItem.location) return

        const sectionItems = items
            .filter(i => i.location === draggedItem.location)
            .sort((a, b) => a.order - b.order)

        const oldIndex = sectionItems.findIndex(i => i.id === draggedItem.id)
        const newIndex = sectionItems.findIndex(i => i.id === targetItem.id)

        const newSectionItems = [...sectionItems]
        const [movedItem] = newSectionItems.splice(oldIndex, 1)
        newSectionItems.splice(newIndex, 0, movedItem)

        // Update all items with new order
        const updatedLocalItems = items.map(item => {
            if (item.location !== draggedItem.location) return item
            const index = newSectionItems.findIndex(i => i.id === item.id)
            return { ...item, order: index }
        })

        setItems(updatedLocalItems)
        setDraggedItem(null)

        // Persist new order
        try {
            await Promise.all(newSectionItems.map((item, index) =>
                fetch(`/api/admin/menu/${item.id}`, {
                    method: "PUT",
                    body: JSON.stringify({ ...item, order: index }),
                    headers: { "Content-Type": "application/json" }
                })
            ))
        } catch (error) {
            toast({ title: "Sync Error", description: "Failed to save new order.", variant: "destructive" })
        }
    }

    const addPageToMenu = (page: typeof AVAILABLE_PAGES[0], location: "Navbar" | "Footer") => {
        handleSave({
            nameEn: page.nameEn,
            nameAr: page.nameAr,
            href: page.href,
            location,
            published: true,
            order: 999 // Will be fixed by handleSave
        })
    }

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-gsg-teal" />
        </div>
    )

    const navbarItems = items.filter(i => i.location === "Navbar").sort((a, b) => a.order - b.order)
    const footerItems = items.filter(i => i.location === "Footer").sort((a, b) => a.order - b.order)

    return (
        <div className="space-y-8 p-4 lg:p-8 max-w-7xl mx-auto pb-24">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gsg-navy flex items-center gap-3">
                        <MenuIcon className="w-8 h-8 text-gsg-teal" />
                        Menu Manager
                    </h1>
                    <p className="text-gray-500 text-sm">Drag and drop to reorder. Select pages to add.</p>
                </div>
                <button
                    onClick={() => setShowCustomForm(true)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gsg-navy text-white rounded-xl text-sm font-bold shadow-lg shadow-gsg-navy/20 hover:bg-gsg-navy/90 transition-all"
                >
                    <Plus className="w-4 h-4" />
                    Custom Link
                </button>
            </div>

            {showCustomForm && (
                <div className="bg-white p-6 rounded-3xl border-2 border-gsg-teal/20 shadow-xl animate-in zoom-in-95 duration-200 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gsg-navy flex items-center gap-2">
                            <Plus className="w-5 h-5 text-gsg-teal" />
                            Add Custom Link
                        </h3>
                        <button onClick={() => setShowCustomForm(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <MenuFormInputs item={customLink} onChange={setCustomLink} />
                    </div>
                    <div className="flex justify-end gap-3 mt-8">
                        <button onClick={() => setShowCustomForm(false)} className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-700">Cancel</button>
                        <button
                            onClick={() => handleSave(customLink)}
                            className="px-8 py-2.5 bg-gsg-teal text-white rounded-xl text-sm font-bold shadow-lg shadow-gsg-teal/20"
                        >
                            Add Link
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left Column: Available Pages */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-8">
                        <h2 className="text-lg font-bold text-gsg-navy mb-4 flex items-center gap-2">
                            <Layout className="w-5 h-5 text-gray-400" />
                            Available Pages
                        </h2>
                        <div className="space-y-3">
                            {AVAILABLE_PAGES.map((page, idx) => {
                                const isUsedInNav = navbarItems.some(i => i.href === page.href)
                                const isUsedInFooter = footerItems.some(i => i.href === page.href)

                                return (
                                    <div key={idx} className="group p-3 rounded-xl border border-gray-100 hover:border-gsg-teal/30 hover:bg-gsg-teal/5 transition-all bg-gray-50/50">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-bold text-gray-700 text-sm">{page.nameEn}</span>
                                            <span className="text-xs text-gray-400 font-mono bg-white px-1.5 py-0.5 rounded border border-gray-100">{page.href}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => addPageToMenu(page, "Navbar")}
                                                disabled={isUsedInNav}
                                                className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-bold rounded-lg border border-gray-200 bg-white hover:bg-gsg-navy hover:text-white hover:border-gsg-navy transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isUsedInNav ? <CheckCircle2 className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                                                Navbar
                                            </button>
                                            <button
                                                onClick={() => addPageToMenu(page, "Footer")}
                                                disabled={isUsedInFooter}
                                                className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-bold rounded-lg border border-gray-200 bg-white hover:bg-gsg-teal hover:text-white hover:border-gsg-teal transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isUsedInFooter ? <CheckCircle2 className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                                                Footer
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Column: Active Menu */}
                <div className="lg:col-span-8 space-y-8">
                    <ActiveMenuSection
                        title="Navbar Navigation"
                        description="Top main navigation menu"
                        icon={PanelsTopLeft}
                        items={navbarItems}
                        onDragStart={onDragStart}
                        onDragOver={onDragOver}
                        onDrop={onDrop}
                        onDelete={handleDelete}
                        editingItem={editingItem}
                        setEditingItem={setEditingItem}
                        onSaveEdit={handleSave}
                        color="navy"
                    />

                    <ActiveMenuSection
                        title="Footer Links"
                        description="Bottom secondary links"
                        icon={LogOut} // Rotated icon for footer
                        items={footerItems}
                        onDragStart={onDragStart}
                        onDragOver={onDragOver}
                        onDrop={onDrop}
                        onDelete={handleDelete}
                        editingItem={editingItem}
                        setEditingItem={setEditingItem}
                        onSaveEdit={handleSave}
                        color="teal"
                    />
                </div>
            </div>
        </div>
    )
}

interface ActiveMenuSectionProps {
    title: string
    description: string
    icon: any
    items: MenuItem[]
    onDragStart: (e: React.DragEvent, item: MenuItem) => void
    onDragOver: (e: React.DragEvent, item: MenuItem) => void
    onDrop: (e: React.DragEvent, item: MenuItem) => void
    onDelete: (id: string) => void
    editingItem: Partial<MenuItem> | null
    setEditingItem: (item: Partial<MenuItem> | null) => void
    onSaveEdit: (item: Partial<MenuItem>) => void
    color: "navy" | "teal"
}

function ActiveMenuSection({
    title, description, icon: Icon, items,
    onDragStart, onDragOver, onDrop, onDelete,
    editingItem, setEditingItem, onSaveEdit, color
}: ActiveMenuSectionProps) {

    const borderColor = color === "navy" ? "border-gsg-navy/10" : "border-gsg-teal/10"
    const iconColor = color === "navy" ? "text-gsg-navy" : "text-gsg-teal"
    const bgColor = color === "navy" ? "bg-gsg-navy/5" : "bg-gsg-teal/5"

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
                <div>
                    <h2 className={`text-xl font-bold flex items-center gap-2 ${iconColor}`}>
                        <Icon className="w-5 h-5" />
                        {title}
                    </h2>
                    <p className="text-xs text-gray-500 pl-7">{description}</p>
                </div>
                <Badge className="bg-gray-100 text-gray-500 border-0">{items.length} items</Badge>
            </div>

            <div className={`bg-white rounded-3xl border ${borderColor} shadow-sm overflow-hidden min-h-[100px]`}>
                {items.length === 0 ? (
                    <div className="p-12 text-center text-gray-400 text-sm font-medium border-2 border-dashed border-gray-100 m-4 rounded-xl">
                        No items in this menu yet. Add some from the left!
                    </div>
                ) : (
                    <div className="divide-y divide-gray-50">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                draggable={!editingItem}
                                onDragStart={(e) => onDragStart(e, item)}
                                onDragOver={(e) => onDragOver(e, item)}
                                onDrop={(e) => onDrop(e, item)}
                                className={cn(
                                    "p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors group relative cursor-move",
                                    editingItem?.id === item.id ? "bg-gray-50" : ""
                                )}
                            >
                                <div className="text-gray-300 cursor-grab active:cursor-grabbing hover:text-gray-400">
                                    <GripVertical className="w-5 h-5" />
                                </div>

                                {editingItem && editingItem.id === item.id ? (
                                    <div className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-gray-200 animate-in fade-in duration-200">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <MenuFormInputs item={editingItem} onChange={setEditingItem} />
                                        </div>
                                        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                                            <button onClick={() => setEditingItem(null)} className="px-3 py-1.5 text-xs font-bold text-gray-500">Cancel</button>
                                            <button onClick={() => onSaveEdit(editingItem)} className="px-5 py-1.5 bg-gsg-teal text-white rounded-lg text-xs font-bold shadow-md flex items-center gap-2">
                                                <Save className="w-3 h-3" />
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3">
                                                <span className="font-bold text-gsg-navy">{item.nameEn}</span>
                                                <ArrowRight className="w-3 h-3 text-gray-300" />
                                                <span className="font-bold text-gsg-teal font-arabic" dir="rtl">{item.nameAr}</span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <code className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-mono">{item.href}</code>
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
                        ))}
                    </div>
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
