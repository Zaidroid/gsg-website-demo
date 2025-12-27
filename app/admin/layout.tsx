
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
    Users,
    Handshake
} from "lucide-react"
import { Toaster } from "@/components/ui/toaster"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"



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
                { name: "Impact Stats", href: "/admin/impact-stats", icon: BarChart3 },
            ]
        },
        {
            title: "Content Management",
            items: [
                { name: "Hero Section", href: "/admin/hero", icon: Image },
                { name: "About Page", href: "/admin/about", icon: Phone },
                { name: "Team Members", href: "/admin/team", icon: Users },
                { name: "Programs", href: "/admin/programs", icon: Code },
                { name: "Courses", href: "/admin/courses", icon: GraduationCap },
                { name: "Events", href: "/admin/events", icon: Calendar },
                { name: "Success Stories", href: "/admin/stories", icon: BookOpen },
                { name: "Gallery", href: "/admin/gallery", icon: Image },
                { name: "Partners", href: "/admin/partners", icon: Handshake },
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
                                src="/logo.png"
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
