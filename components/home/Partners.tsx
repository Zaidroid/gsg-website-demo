"use client"

import { useLocale } from "next-intl"
import Image from "next/image"
import { motion } from "framer-motion"

interface PartnersProps {
    partners?: any[]
}

export function Partners({ partners = [] }: PartnersProps) {
    const locale = useLocale()
    const isAr = locale === 'ar'

    if (!partners || partners.length === 0) return null

    return (
        <div className="py-24 sm:py-32 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                        {isAr ? "شركاؤنا وداعمونا" : "Our Partners & Supporters"}
                    </h2>
                </div>
                <div className="mx-auto grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-3 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    {partners.map((partner, index) => (
                        <motion.div
                            key={partner.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="flex justify-center"
                        >
                            {partner.websiteUrl ? (
                                <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" className="group relative block h-16 w-full grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                                    <Image
                                        src={partner.logoUrl}
                                        alt={isAr ? partner.nameAr : partner.nameEn}
                                        fill
                                        className="object-contain"
                                    />
                                </a>
                            ) : (
                                <div className="relative h-16 w-full grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                                    <Image
                                        src={partner.logoUrl}
                                        alt={isAr ? partner.nameAr : partner.nameEn}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
