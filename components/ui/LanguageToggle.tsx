"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/src/i18n/routing"

export function LanguageToggle() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const toggleLanguage = () => {
        const nextLocale = locale === 'en' ? 'ar' : 'en';
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLanguage}
            className="relative h-10 w-10 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-950 flex items-center justify-center text-primary dark:text-gray-100 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring overflow-hidden"
            aria-label={locale === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            title={locale === 'en' ? 'العربية' : 'English'}
        >
            <AnimatePresence mode="wait">
                <motion.span
                    key={locale}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center text-base font-bold leading-none pb-[6px]"
                >
                    {locale === 'en' ? 'ع' : 'EN'}
                </motion.span>
            </AnimatePresence>
        </motion.button>
    )
}
