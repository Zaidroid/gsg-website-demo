
"use client"

import { useSession, signOut, SessionProvider } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import "@/app/globals.css"
import Link from "next/link"
import {
    LayoutDashboard,
    GraduationCap,
    Calendar,
    BookOpen,
    Image,
    Languages,
    Settings,
    LogOut,
    BarChart3,
    Menu,
    X,
    Phone,
    Code,
    Users
} from "lucide-react"
import { Toaster } from "@/components/ui/toaster"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const GSG_LOGO_BASE64 = "data:image/png;base64,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";

function AdminLayoutContent({
    children,
}: {
    children: React.ReactNode
}) {
    const { data: session, status } = useSession()
    const router = useRouter()
    const pathname = usePathname()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const isLoginPage = pathname?.includes("/admin/login")

    useEffect(() => {
        console.log("Admin Auth Status:", status, "Path:", pathname)
        if (status === "unauthenticated" && !isLoginPage) {
            console.log("Redirecting to login...")
            router.push("/admin/login")
        }
    }, [status, router, isLoginPage, pathname])

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
                    <p className="text-gray-500 text-sm animate-pulse font-medium">Loading GSG Admin...</p>
                </div>
            </div>
        )
    }

    if (isLoginPage) {
        return <main className="min-h-screen">{children}</main>
    }

    if (!session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <p className="text-gray-400">Authenticating...</p>
            </div>
        )
    }

    const navigationGroups = [
        {
            title: "Main",
            items: [
                { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
                { name: "Impact Stats", href: "/admin/impact", icon: BarChart3 },
            ]
        },
        {
            title: "Content Management",
            items: [
                { name: "Hero Section", href: "/admin/hero", icon: Image },
                { name: "About Page", href: "/admin/about", icon: Phone },
                { name: "Programs", href: "/admin/programs", icon: Code },
                { name: "Courses", href: "/admin/courses", icon: GraduationCap },
                { name: "Events", href: "/admin/events", icon: Calendar },
                { name: "Success Stories", href: "/admin/stories", icon: BookOpen },
                { name: "Gallery", href: "/admin/gallery", icon: Image },
            ]
        },
        {
            title: "System & Navigation",
            items: [
                { name: "Admin Users", href: "/admin/users", icon: Users },
                { name: "Menu Manager", href: "/admin/menu", icon: Menu },
                { name: "Translations", href: "/admin/translations", icon: Languages },
                { name: "Site Settings", href: "/admin/settings", icon: Settings },
            ]
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50 text-gsg-navy">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-gsg-navy/40 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 z-50 h-full w-72 bg-gsg-navy text-white shadow-2xl transition-all duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0
            `}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-8 border-b border-white/5">
                        <Link href="/admin" className="block w-full hover:opacity-80 transition-opacity">
                            <img
                                src={GSG_LOGO_BASE64}
                                alt="Gaza Sky Geeks"
                                className="w-full h-auto brightness-0 invert"
                            />
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors ml-4"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-8 space-y-8 overflow-y-auto scrollbar-hide">
                        {navigationGroups.map((group) => (
                            <div key={group.title} className="space-y-3">
                                <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                                    {group.title}
                                </h3>
                                <div className="space-y-1">
                                    {group.items.map((item) => {
                                        const isActive = pathname === item.href
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={cn(
                                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative duration-200",
                                                    isActive
                                                        ? "bg-gsg-teal text-white shadow-lg shadow-gsg-teal/20 font-bold"
                                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                                )}
                                                onClick={() => setSidebarOpen(false)}
                                            >
                                                <item.icon className={cn(
                                                    "w-5 h-5 transition-transform group-hover:scale-110",
                                                    isActive ? "text-white" : "text-gray-500 group-hover:text-gsg-teal"
                                                )} />
                                                <span className="text-sm">{item.name}</span>
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="sidebar-active"
                                                        className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
                                                    />
                                                )}
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </nav>

                    {/* User section */}
                    <div className="p-6 bg-white/5 border-t border-white/5">
                        <div className="flex items-center gap-4 mb-6 px-2">
                            {session.user?.image ? (
                                <img
                                    src={session.user.image}
                                    alt={session.user.name || "User"}
                                    className="w-10 h-10 rounded-xl border-2 border-gsg-teal/30"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-xl bg-gsg-teal/10 flex items-center justify-center font-bold text-gsg-teal">
                                    {session.user?.name?.charAt(0)}
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-white truncate leading-tight">
                                    {session.user?.name}
                                </p>
                                <p className="text-[10px] text-gray-500 truncate font-medium">
                                    {session.user?.email}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl text-xs font-bold transition-all duration-300 border border-red-500/20"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="lg:pl-72 transition-all duration-300">
                {/* Top bar */}
                <header className="sticky top-0 z-30 flex items-center gap-4 px-8 py-5 bg-white/80 backdrop-blur-md border-b border-gray-200/60">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 text-gray-400 hover:text-gsg-navy hover:bg-gray-100 rounded-xl transition-all"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="hidden lg:block w-px h-6 bg-gray-200 mr-2" />
                        <h2 className="text-xl font-black text-gsg-navy tracking-tight">
                            Admin Central
                        </h2>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning>
                <SessionProvider>
                    <AdminLayoutContent>{children}</AdminLayoutContent>
                    <Toaster />
                </SessionProvider>
            </body>
        </html>
    )
}
