"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { useLocale } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Grid, List as ListIcon, Users, X, Linkedin } from "lucide-react"
import { TeamMemberCard } from "@/components/team/TeamMemberCard"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface TeamMember {
    id: string
    nameEn: string
    nameAr: string
    roleEn: string
    roleAr: string
    imageUrl: string | null
    linkedinUrl: string | null
    department?: string | null
    bioEn?: string | null
    bioAr?: string | null
}

interface LiveTeamGridProps {
    initialMembers: TeamMember[]
    showControls?: boolean
}

export function LiveTeamGrid({ initialMembers, showControls = true }: LiveTeamGridProps) {
    const locale = useLocale()
    const isAr = locale === 'ar'
    const [searchQuery, setSearchQuery] = useState("")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Lock body scroll when selected
    useEffect(() => {
        if (selectedId) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [selectedId])

    const filteredMembers = initialMembers.filter(member => {
        const searchLower = searchQuery.toLowerCase()
        return (
            member.nameEn.toLowerCase().includes(searchLower) ||
            member.roleEn.toLowerCase().includes(searchLower) ||
            member.nameAr?.includes(searchLower) ||
            member.roleAr?.includes(searchLower)
        )
    })

    const selectedMember = initialMembers.find(m => m.id === selectedId)

    return (
        <div className="w-full space-y-12">
            {/* Controls Bar */}
            {showControls && (
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-6 z-30">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-gray-100 dark:border-slate-800 p-4 flex flex-col md:flex-row gap-6 justify-between items-center"
                    >
                        {/* Search */}
                        <div className="relative w-full md:max-w-xl group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-gsg-teal transition-colors" />
                            <input
                                type="text"
                                placeholder={isAr ? "ابحث عن عضو فريق..." : "Search by name or role..."}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={cn(
                                    "w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 transition-all outline-none ring-2 ring-transparent focus:ring-gsg-teal/20 font-medium",
                                    isAr && "text-right pr-12 pl-4"
                                )}
                                dir={isAr ? "rtl" : "ltr"}
                            />
                        </div>

                        {/* View Toggles & Stats */}
                        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end text-sm text-gray-500">
                            <div className="flex items-center gap-2 pl-4 border-l border-gray-100 dark:border-slate-800">
                                <Users className="w-4 h-4 text-gsg-teal" />
                                <span className="font-bold text-gsg-navy dark:text-white">{filteredMembers.length}</span>
                                <span className="hidden sm:inline">{isAr ? "عضو" : "Members"}</span>
                            </div>

                            <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-xl">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={cn(
                                        "p-2.5 rounded-lg transition-all",
                                        viewMode === "grid" ? "bg-white dark:bg-slate-700 shadow-sm text-gsg-teal" : "hover:text-gray-700"
                                    )}
                                >
                                    <Grid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={cn(
                                        "p-2.5 rounded-lg transition-all",
                                        viewMode === "list" ? "bg-white dark:bg-slate-700 shadow-sm text-gsg-teal" : "hover:text-gray-700"
                                    )}
                                >
                                    <ListIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Grid/List View */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 min-h-[60vh]">
                <AnimatePresence mode="popLayout">
                    {filteredMembers.length > 0 ? (
                        <div
                            className={cn(
                                "grid gap-6",
                                viewMode === "grid"
                                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                    : "grid-cols-1 md:grid-cols-2"
                            )}
                        >
                            {filteredMembers.map((member, index) => (
                                <TeamMemberCard
                                    key={member.id}
                                    member={member}
                                    isAr={isAr}
                                    index={index}
                                    viewMode={viewMode}
                                    onClick={() => setSelectedId(member.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-20 text-center"
                        >
                            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                <Search className="w-10 h-10 text-gray-300" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                {isAr ? "لم يتم العثور على نتائج" : "No team members found"}
                            </h3>
                            <p className="text-gray-500 mt-2 max-w-xs mx-auto">
                                {isAr
                                    ? "حاول البحث باستخدام كلمات مفتاحية مختلفة."
                                    : "Try searching with different keywords."}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Expandable Modal Details - PORTALED to Body */}
            {mounted && createPortal(
                <AnimatePresence>
                    {selectedId && selectedMember && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedId(null)}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] cursor-pointer"
                                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, height: '100vh', width: '100vw' }}
                            />
                            <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 pointer-events-none" style={{ position: 'fixed' }}>
                                <motion.div
                                    layoutId={`card-${selectedId}`}
                                    className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl pointer-events-auto relative flex flex-col md:flex-row h-[80vh] md:h-[500px]"
                                >
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                        className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>

                                    {/* Image Side */}
                                    <div className="relative w-full md:w-2/5 h-64 md:h-full shrink-0 bg-gray-100">
                                        {selectedMember.imageUrl ? (
                                            <motion.div layoutId={`image-${selectedId}`} className="w-full h-full relative">
                                                <Image
                                                    src={selectedMember.imageUrl}
                                                    alt={isAr ? selectedMember.nameAr : selectedMember.nameEn}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </motion.div>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                                        )}
                                    </div>

                                    {/* Content Side */}
                                    <div className="flex-1 p-8 md:p-10 flex flex-col overflow-y-auto">
                                        <div>
                                            <motion.h2
                                                layoutId={`name-${selectedId}`}
                                                className={cn("text-3xl font-bold text-gsg-navy dark:text-white mb-2", isAr && "font-arabic")}
                                            >
                                                {isAr ? selectedMember.nameAr : selectedMember.nameEn}
                                            </motion.h2>
                                            <motion.p
                                                layoutId={`role-${selectedId}`}
                                                className={cn("text-xl text-gsg-teal font-medium mb-6", isAr && "font-arabic")}
                                            >
                                                {isAr ? selectedMember.roleAr : selectedMember.roleEn}
                                            </motion.p>
                                        </div>

                                        <div className="prose dark:prose-invert max-w-none mb-8 text-gray-600 dark:text-gray-300">
                                            {(isAr ? selectedMember.bioAr : selectedMember.bioEn) || (
                                                <p className="italic text-gray-400">
                                                    {isAr ? "لا توجد نبذة تعريفية متاحة حالياً." : "No biography available."}
                                                </p>
                                            )}
                                        </div>

                                        <div className="mt-auto pt-8 border-t border-gray-100 dark:border-slate-800 flex gap-4">
                                            {selectedMember.linkedinUrl && (
                                                <a
                                                    href={selectedMember.linkedinUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-6 py-3 bg-[#0077b5] text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
                                                >
                                                    <Linkedin className="w-5 h-5" />
                                                    LinkedIn
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    )
}
