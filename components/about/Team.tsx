"use client"

import { useLocale } from "next-intl"
import Image from "next/image"
import { motion } from "framer-motion"
import { Linkedin } from "lucide-react"

interface TeamProps {
    team?: any[]
}

export function Team({ team = [] }: TeamProps) {
    const locale = useLocale()
    const isAr = locale === 'ar'

    if (!team || team.length === 0) return null

    // Group by department if needed, but for now simple grid
    // Or filter by department. Let's just list them sorted by order.

    return (
        <div className="py-24 sm:py-32 bg-transparent">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gsg-navy to-gsg-purple dark:from-white dark:to-slate-300 sm:text-4xl pb-2">
                        {isAr ? "فريقنا" : "Our Team"}
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
                        {isAr ? "نخبة من الشغوفين المكرسين لتمكين التكنولوجيا في فلسطين." : "A dedicated group of passionate individuals building the future of tech in Palestine."}
                    </p>
                </div>
                <ul role="list" className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4">
                    {team.map((person, index) => (
                        <motion.li
                            key={person.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                        >
                            <div className="group relative">
                                <div className="aspect-[3/3.5] w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-slate-800 shadow-lg relative">
                                    {person.imageUrl ? (
                                        <Image
                                            src={person.imageUrl}
                                            alt={isAr ? person.nameAr : person.nameEn}
                                            fill
                                            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            No Image
                                        </div>
                                    )}
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                    {/* Content on Image */}
                                    <div className="absolute bottom-4 left-4 right-4 text-white">
                                        <h3 className="text-lg font-bold leading-6">{isAr ? person.nameAr : person.nameEn}</h3>
                                        <p className="text-sm font-medium text-gray-300 mb-2">{isAr ? person.roleAr : person.roleEn}</p>
                                        {person.linkedinUrl && (
                                            <a href={person.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition-colors inline-block">
                                                <Linkedin className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
