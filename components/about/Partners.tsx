"use client"

import { useLocale } from "next-intl"
import { motion } from "framer-motion"
import Image from "next/image"

interface Partner {
    id: string
    nameEn: string
    nameAr: string
    logoUrl: string
    websiteUrl?: string | null
}

interface PartnersProps {
    items?: Partner[]
}

export function Partners({ items = [] }: PartnersProps) {
    const locale = useLocale()
    const isAr = locale === 'ar'

    const displayPartners = items.length > 0 ? items : []

    return (
        <div className="py-24 sm:py-32 bg-transparent">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Header */}
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gsg-navy to-gsg-purple dark:from-white dark:to-slate-300 sm:text-4xl pb-2">
                        {isAr ? "شركاؤنا" : "Our Partners"}
                    </h2>
                    <div className="mt-2 h-1 w-20 mx-auto bg-gradient-to-r from-gsg-teal to-gsg-purple rounded-full" />
                    <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                        {isAr
                            ? "نفخر بالشراكة مع منظمات رائدة عالمياً ومحلياً لبناء نظام تقني مزدهر في فلسطين."
                            : "We're proud to partner with leading global and local organizations to build a thriving tech ecosystem in Palestine."}
                    </p>
                </div>

                {/* Partners Grid */}
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {displayPartners.map((partner, index) => (
                        <motion.div
                            key={partner.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="group relative flex items-center justify-center p-4 transition-all duration-300"
                        >
                            <div className="relative w-full h-16 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                <Image
                                    src={partner.logoUrl}
                                    alt={isAr ? partner.nameAr : partner.nameEn}
                                    fill
                                    className="object-contain grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-300"
                                    unoptimized
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Optional: Add a CTA or additional info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {isAr
                            ? "هل تريد أن تصبح شريكاً؟ تواصل معنا لمعرفة المزيد."
                            : "Interested in becoming a partner? Get in touch to learn more."}
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
