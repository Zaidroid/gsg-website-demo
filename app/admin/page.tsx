"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import {
    GraduationCap,
    Calendar,
    BookOpen,
    Image as ImageIcon,
    TrendingUp,
    Users,
    ArrowRight,
    RefreshCw,
    ShieldCheck,
    AlertTriangle,
    CheckCircle2,
    Loader2
} from "lucide-react"

interface Stats {
    courses: number
    events: number
    stories: number
    gallery: number
}

export default function AdminDashboard() {
    const { data: session } = useSession()
    const [stats, setStats] = useState<Stats>({
        courses: 0,
        events: 0,
        stories: 0,
        gallery: 0
    })
    const [loading, setLoading] = useState(true)
    const [migrating, setMigrating] = useState(false)
    const [migrationResult, setMigrationResult] = useState<any>(null)

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            setLoading(true)
            // Fetch real counts from APIs
            const [c, e, s, g] = await Promise.all([
                fetch("/api/admin/courses"),
                fetch("/api/admin/events"),
                fetch("/api/admin/stories"),
                fetch("/api/admin/gallery")
            ])
            const [cd, ed, sd, gd] = await Promise.all([c.json(), e.json(), s.json(), g.json()])

            setStats({
                courses: Array.isArray(cd) ? cd.length : 0,
                events: Array.isArray(ed) ? ed.length : 0,
                stories: Array.isArray(sd) ? sd.length : 0,
                gallery: Array.isArray(gd) ? gd.length : 0
            })
        } catch (error) {
            console.error("Error fetching stats:", error)
        } finally {
            setLoading(false)
        }
    }

    const runMigration = async () => {
        if (!confirm("This will synchronize all static data from the codebase into MongoDB. Existing records with same IDs will be updated. Proceed?")) return

        try {
            setMigrating(true)
            const res = await fetch("/api/admin/migrate", { method: "POST" })
            const data = await res.json()
            setMigrationResult(data)
            fetchStats()
        } catch (error) {
            alert("Migration failed")
        } finally {
            setMigrating(false)
        }
    }

    const quickActions = [
        {
            title: "Add New Course",
            description: "Create a new training course",
            href: "/admin/courses",
            icon: GraduationCap,
            color: "bg-blue-500"
        },
        {
            title: "Create Event",
            description: "Schedule a new event",
            href: "/admin/events",
            icon: Calendar,
            color: "bg-purple-500"
        },
        {
            title: "Share Success Story",
            description: "Add a new success story",
            href: "/admin/stories",
            icon: BookOpen,
            color: "bg-green-500"
        },
        {
            title: "Upload Photos",
            description: "Add images to gallery",
            href: "/admin/gallery",
            icon: ImageIcon,
            color: "bg-orange-500"
        },
    ]

    const statsCards = [
        {
            title: "Total Courses",
            value: stats.courses,
            icon: GraduationCap,
            color: "text-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            title: "Active Events",
            value: stats.events,
            icon: Calendar,
            color: "text-purple-600",
            bgColor: "bg-purple-50"
        },
        {
            title: "Success Stories",
            value: stats.stories,
            icon: TrendingUp,
            color: "text-green-600",
            bgColor: "bg-green-50"
        },
        {
            title: "Gallery Images",
            value: stats.gallery,
            icon: ImageIcon,
            color: "text-orange-600",
            bgColor: "bg-orange-50"
        },
    ]

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-10 h-10 animate-spin text-gsg-teal" />
            </div>
        )
    }

    return (
        <div className="space-y-10 max-w-7xl mx-auto p-4">
            {/* Welcome Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-br from-gsg-navy to-gsg-navy/90 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden border border-white/5">
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold !text-white tracking-tight">
                        Welcome back{session?.user?.name ? `, ${session.user.name.split(' ')[0]}` : ''}! 👋
                    </h1>
                    <p className="mt-3 text-white/70 text-lg max-w-xl font-medium">
                        Monitor platform health, manage your global community, and keep the GSG digital engine running smooth.
                    </p>
                </div>
                <div className="flex items-center gap-3 relative z-10">
                    <div className="flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 shadow-inner">
                        <ShieldCheck className="w-5 h-5 text-gsg-teal" />
                        <span className="text-sm font-bold uppercase tracking-wider text-white">Admin Status: Live</span>
                    </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-gsg-teal/20 blur-[100px] -mr-32 -mt-32 rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gsg-orange/10 blur-[80px] -ml-32 -mb-32 rounded-full"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat) => (
                    <div
                        key={stat.title}
                        className="bg-white/40 backdrop-blur-md rounded-[2rem] border border-gray-200/50 p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <stat.icon className="w-20 h-20 -mr-6 -mt-6 rotate-12" />
                        </div>
                        <div className="flex items-center justify-between mb-6 relative z-10">
                            <div className={`p-4 rounded-2xl ${stat.bgColor} group-hover:scale-110 transition-transform shadow-sm`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.title.split(' ')[1]}</span>
                        </div>
                        <div className="relative z-10">
                            <p className="text-sm font-bold text-gray-500/80">{stat.title}</p>
                            <p className="mt-2 text-4xl font-black text-gsg-navy tracking-tight">
                                {stat.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-2xl font-black text-gsg-navy tracking-tight">Content Management</h2>
                    <Link href="/admin/settings" className="text-sm font-bold text-gsg-teal hover:text-gsg-navy transition-colors flex items-center gap-1">
                        Global Settings <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {quickActions.map((action) => (
                        <Link
                            key={action.title}
                            href={action.href}
                            className="group bg-white/60 backdrop-blur-sm rounded-[2.5rem] border border-gray-100 p-8 hover:shadow-2xl hover:border-gsg-teal/30 transition-all duration-500 flex flex-col items-start text-left relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 group-hover:bg-gsg-teal/5 transition-colors duration-500"></div>

                            <div className={`inline-flex p-5 rounded-2xl ${action.color} text-white mb-6 shadow-xl shadow-current/20 group-hover:scale-110 transition-transform relative z-10`}>
                                <action.icon className="w-7 h-7" />
                            </div>

                            <div className="relative z-10 w-full">
                                <h3 className="text-lg font-black text-gsg-navy mb-2 group-hover:text-gsg-teal transition-colors">
                                    {action.title}
                                </h3>
                                <p className="text-sm text-gray-500 font-medium mb-8 leading-relaxed">
                                    {action.description}
                                </p>
                                <div className="inline-flex py-3 px-6 bg-gsg-navy text-white rounded-xl text-xs font-black group-hover:bg-gsg-teal transition-all shadow-md active:scale-95">
                                    Manage Now
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* System Sync Section */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-10 overflow-hidden relative">
                <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-3 text-gsg-teal">
                            <RefreshCw className="w-6 h-6" />
                            <h3 className="text-2xl font-bold text-gsg-navy">System Synchronization</h3>
                        </div>
                        <p className="text-gray-500 max-w-2xl leading-relaxed">
                            Need to import your existing website data? Run the synchronization tool to pull Courses, Events, and Stories from the original codebase into your new MongoDB engine.
                        </p>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={runMigration}
                                disabled={migrating}
                                className="flex items-center gap-2 px-8 py-3 bg-gsg-navy text-white rounded-2xl hover:bg-gsg-navy/90 transition-all font-bold shadow-xl shadow-gsg-navy/20 disabled:opacity-50"
                            >
                                {migrating ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
                                {migrating ? "Synchronizing Data..." : "Run Global Sync"}
                            </button>
                            {migrationResult && (
                                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-xl text-sm font-bold animate-in fade-in slide-in-from-left-2">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Imported {migrationResult.results.courses + migrationResult.results.events + migrationResult.results.stories} records!
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full md:w-auto p-8 bg-amber-50 rounded-[2rem] border border-amber-100 space-y-3">
                        <div className="flex items-center gap-2 text-amber-700">
                            <AlertTriangle className="w-5 h-5" />
                            <span className="font-black text-xs uppercase tracking-widest">Caution</span>
                        </div>
                        <p className="text-xs text-amber-700/80 font-medium max-w-[240px]">
                            Running sync will overwrite existing records with matching IDs. Use this only during initial setup or after bulk code updates.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
