"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Linkedin, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

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

interface TeamMemberCardProps {
    member: TeamMember
    isAr: boolean
    index: number
    viewMode?: "grid" | "list"
    onClick?: () => void
}

export function TeamMemberCard({ member, isAr, index, viewMode = "grid", onClick }: TeamMemberCardProps) {
    if (viewMode === "list") {
        return (
            <motion.div
                layoutId={`card-${member.id}`}
                onClick={onClick}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative flex h-[140px] w-full cursor-pointer overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-lg transition-all"
            >
                {/* Image Section */}
                <div className="relative w-32 shrink-0 overflow-hidden bg-gray-100">
                    {member.imageUrl ? (
                        <Image
                            src={member.imageUrl}
                            alt={isAr ? member.nameAr : member.nameEn}
                            fill
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                            style={{ imageOrientation: 'from-image' }}
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-xs text-gray-400">
                            No Image
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="flex flex-1 flex-col justify-center p-6">
                    <motion.h3
                        layoutId={`name-${member.id}`}
                        className={cn("text-xl font-bold text-gsg-navy dark:text-white mb-1", isAr && "font-arabic")}
                    >
                        {isAr ? member.nameAr : member.nameEn}
                    </motion.h3>
                    <motion.p
                        layoutId={`role-${member.id}`}
                        className={cn("text-gsg-teal font-medium", isAr && "font-arabic")}
                    >
                        {isAr ? member.roleAr : member.roleEn}
                    </motion.p>
                </div>

                {/* Arrow / Action Indicator */}
                <div className="flex items-center px-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gsg-teal">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isAr ? "rotate-180" : ""}>
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div
            layoutId={`card-${member.id}`}
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative h-[450px] w-full cursor-pointer perspective-1000"
        >
            <div className="relative h-full w-full overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-sm transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:translate-y-[-5px]">
                {/* Image Layer */}
                <div className="absolute inset-0 bg-gray-200">
                    {member.imageUrl ? (
                        <motion.div layoutId={`image-${member.id}`} className="relative h-full w-full">
                            <Image
                                src={member.imageUrl}
                                alt={isAr ? member.nameAr : member.nameEn}
                                fill
                                className="object-cover object-top transition-transform duration-700 ease-in-out group-hover:scale-105"
                                style={{ imageOrientation: 'from-image' }}
                            />
                        </motion.div>
                    ) : (
                        <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400">
                            No Image
                        </div>
                    )}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

                {/* Content Container */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    {/* Animated Line */}
                    <div className="mb-4 h-1 w-8 bg-gsg-teal transition-all duration-300 group-hover:w-16" />

                    {/* Name & Role */}
                    <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                        <motion.h3
                            layoutId={`name-${member.id}`}
                            className={cn(
                                "text-2xl font-bold text-white mb-1 drop-shadow-md",
                                isAr && "font-arabic"
                            )}
                        >
                            {isAr ? member.nameAr : member.nameEn}
                        </motion.h3>
                        <motion.p
                            layoutId={`role-${member.id}`}
                            className={cn(
                                "text-gray-200 font-medium drop-shadow-sm",
                                isAr && "font-arabic"
                            )}
                        >
                            {isAr ? member.roleAr : member.roleEn}
                        </motion.p>
                    </div>

                    {/* Social/Extra Info */}
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr]">
                        <div className="overflow-hidden">
                            <div className="pt-4 flex items-center justify-between opacity-0 transition-opacity duration-300 delay-100 group-hover:opacity-100">
                                <span className="text-white/80 text-sm font-medium">Click to view details</span>
                                <div className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
