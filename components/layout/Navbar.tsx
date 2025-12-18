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

// Wrapped LogoWithTheme to accept className for motion integration if needed, 
// though we handle motion in the parent for now.
function LogoWithTheme({ isScrolled }: { isScrolled: boolean }) {
    const { theme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="h-10 w-[140px]" /> // Placeholder
    }

    return (
        <Link href="/" className="flex items-center space-x-2">
            <motion.div
                animate={{
                    scale: isScrolled ? 0.9 : 1,
                    opacity: 1
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                <Image
                    src="/logo.png"
                    alt="Gaza Sky Geeks"
                    width={140}
                    height={40}
                    className={cn(
                        "h-10 w-auto",
                        theme === "dark" && "invert brightness-0"
                    )}
                    priority
                />
            </motion.div>
        </Link>
    )
}

const navigation = [
    { name: "About Us", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Courses", href: "/courses" },
    { name: "Events", href: "/events" },
    { name: "Gallery", href: "/gallery" },
    { name: "Get Involved", href: "/get-involved" },
    { name: "Contact", href: "/contact" },
]

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)
    const pathname = usePathname()
    const { theme } = useTheme()

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
            initial={{ width: "100%", top: 0, borderRadius: 0 }}
            animate={{
                width: isScrolled ? "fit-content" : "100%", // Changed to fit-content for more accurate sizing
                minWidth: isScrolled ? "fit-content" : "100%", // Enforce minWidth to prevent shrinking below content
                maxWidth: isScrolled ? "1080px" : "100%",
                top: isScrolled ? 12 : 0,
                borderRadius: isScrolled ? "9999px" : "0px",
                // Interpolate colors smoothly using motion
                backgroundColor: isScrolled
                    ? (theme === 'dark' ? "rgba(22, 32, 44, 0.8)" : "rgba(255, 255, 255, 0.8)")
                    : "rgba(0, 0, 0, 0)",
                borderColor: isScrolled
                    ? (theme === 'dark' ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)")
                    : "rgba(0, 0, 0, 0)",
                borderWidth: "1px",
                borderStyle: "solid",
            }}
            style={{
                backdropFilter: isScrolled ? "blur(12px)" : "none",
            }}
            /* Updated physics for premium feel */
            transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                mass: 1
            }}
            className="sticky z-50 mx-auto overflow-hidden whitespace-nowrap" // Added whitespace-nowrap to prevent text overlap during resize
        >
            <motion.div layout className={cn(
                "mx-auto flex h-[80px] items-center justify-between px-4 sm:px-6 lg:px-8 gap-8 transition-all duration-500",
                isScrolled ? "h-[64px]" : "h-[80px]"
            )}>
                <div className="flex items-center">
                    <LogoWithTheme isScrolled={isScrolled} />
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:block">
                    <div className="flex items-center gap-1">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "relative px-4 py-2 rounded-full text-sm font-bold transition-colors",
                                        isActive
                                            ? "text-secondary"
                                            : "text-gray-600 dark:text-gray-300 hover:text-secondary"
                                    )}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-nav-pill"
                                            className="absolute inset-0 bg-secondary/10 dark:bg-secondary/20 rounded-full"
                                            style={{ zIndex: -1 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    {item.name}
                                </Link>
                            );
                        })}
                        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2" />
                        <ThemeToggle />
                        <Link
                            href="/donate"
                            className="rounded-full bg-secondary px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-secondary/90 hover:shadow-lg ml-2"
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
