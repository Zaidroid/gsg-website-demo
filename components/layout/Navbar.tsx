"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { useTheme } from "next-themes"

function LogoWithTheme() {
    const { theme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="h-10 w-[140px]" /> // Placeholder to prevent hydration mismatch
    }

    return (
        <Link href="/" className="flex items-center space-x-2">
            <Image
                src="/logo.png"
                alt="Gaza Sky Geeks"
                width={140}
                height={40}
                className={cn(
                    "h-10 w-auto transition-all",
                    theme === "dark" && "invert brightness-0"
                )}
                priority
            />
        </Link>
    )
}

const navigation = [
    { name: "About Us", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Courses", href: "/courses" },
    { name: "Events", href: "/events" },
    { name: "Get Involved", href: "/get-involved" },
    { name: "Contact", href: "/contact" },
]

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)
    const pathname = usePathname()

    const [isScrolled, setIsScrolled] = React.useState(false)

    // Close mobile menu when route changes
    React.useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    // Handle scroll effect
    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <motion.nav
            layout
            initial={{ width: "100%", top: 0, height: 80, borderRadius: 0 }}
            animate={{
                width: isScrolled ? "auto" : "100%",
                maxWidth: isScrolled ? "1080px" : "100%",
                top: isScrolled ? 12 : 0,
                height: isScrolled ? 64 : 80,
                borderRadius: isScrolled ? "9999px" : "0px",
                border: isScrolled ? "1px solid rgba(229, 231, 235, 0.5)" : "0px solid transparent" // Note: border color might need manual dark mode handling if using inline styles, but Tailwind classes on parent are easier.
            }}
            /* Smooth ease-out to avoid bounciness */
            transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
            className={cn(
                "sticky z-50 mx-auto border-b border-transparent bg-transparent transition-all duration-300",
                isScrolled ? "shadow-sm px-8 min-w-fit border-gray-200/20 dark:border-white/5 bg-white/10 dark:bg-black/20 backdrop-blur-xl" : "w-full"
            )}
        >
            <motion.div layout className="mx-auto flex h-full items-center justify-between px-4 sm:px-6 lg:px-8 gap-8">
                <div className="flex items-center">
                    <LogoWithTheme />
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:block">
                    <div className="flex items-center space-x-6">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "text-sm font-bold transition-colors hover:text-secondary",
                                    pathname === item.href
                                        ? "text-secondary"
                                        : "text-gray-600 dark:text-gray-300"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2" />
                        <ThemeToggle />
                        <Link
                            href="/donate"
                            className="rounded-full bg-secondary px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-secondary/90 hover:shadow-lg"
                        >
                            Donate
                        </Link>
                    </div>
                </div>

                {/* Mobile menu button */}
                <div className="flex md:hidden items-center gap-4">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 focus:outline-none"
                    >
                        <span className="sr-only">Open main menu</span>
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </motion.div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-slate-950"
                        style={{ borderRadius: isScrolled ? "0 0 24px 24px" : "0" }}
                    >
                        <div className="space-y-1 px-4 pb-4 pt-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "block rounded-md px-3 py-2 text-base font-medium transition-colors",
                                        pathname === item.href
                                            ? "bg-gray-50 dark:bg-gray-900 text-secondary"
                                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="pt-4">
                                <Link
                                    href="/donate"
                                    className="block w-full rounded-md bg-secondary px-3 py-3 text-center text-base font-bold text-white shadow-sm hover:bg-secondary/90"
                                >
                                    Donate
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav >
    )
}
