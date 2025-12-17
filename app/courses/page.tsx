"use client"

import { useState, useRef, useEffect } from "react"
import { courses } from "@/data/courses"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Calendar, Clock, BarChart } from "lucide-react"
import { PageHeader } from "@/components/ui/PageHeader"
import { useOnClickOutside } from "@/hooks/use-on-click-outside" // Need to create this or use simple ref check

// Utility hook for click outside (Inline for now if not available)
function useClickOutside(ref: any, handler: any) {
    useEffect(() => {
        const listener = (event: any) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return
            }
            handler(event)
        }
        document.addEventListener("mousedown", listener)
        document.addEventListener("touchstart", listener)
        return () => {
            document.removeEventListener("mousedown", listener)
            document.removeEventListener("touchstart", listener)
        }
    }, [ref, handler])
}

export default function CoursesPage() {
    const [filter, setFilter] = useState("All")
    const [search, setSearch] = useState("")
    const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null)

    const categories = ["All", ...new Set(courses.map((c) => c.category))]

    const filteredCourses = courses.filter((course) => {
        const matchesCategory = filter === "All" || course.category === filter
        const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const modalRef = useRef<HTMLDivElement>(null)
    useClickOutside(modalRef, () => setSelectedCourse(null))

    return (
        <div className="bg-transparent min-h-screen">
            <PageHeader
                title="Course Catalog"
                description="Browse our technical and freelance courses designed to get you hired."
            />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-32">
                {/* Filters & Search */}
                <div className="mt-8 flex flex-col items-center justify-between gap-4 md:flex-row relative z-10">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${filter === cat
                                    ? "bg-secondary text-white shadow-md transform scale-105"
                                    : "bg-white/50 dark:bg-slate-900/50 backdrop-blur-md text-gray-600 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-slate-800/80 border border-gray-200/50 dark:border-white/10"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-64 group">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 group-focus-within:text-primary dark:group-focus-within:text-white transition-colors" />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            className="w-full rounded-full border border-gray-200/50 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md py-2.5 pl-10 pr-4 text-sm focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary text-gray-900 dark:text-white placeholder:text-gray-400 transition-all shadow-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    <AnimatePresence mode="popLayout">
                        {filteredCourses.length > 0 ? (
                            filteredCourses.map((course, index) => (
                                <motion.div
                                    layoutId={`course-${course.id}`}
                                    key={course.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    onClick={() => setSelectedCourse(course)}
                                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white/30 dark:bg-slate-900/40 backdrop-blur-lg shadow-lg border border-white/40 dark:border-white/5 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer ring-1 ring-black/5 dark:ring-white/5"
                                >
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${course.status === 'Open' ? 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/20 dark:text-green-400' :
                                                    course.status === 'Closed' ? 'bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-900/20 dark:text-red-400' :
                                                        'bg-gray-50 text-gray-600 ring-gray-500/10 dark:bg-gray-800/20 dark:text-gray-400'
                                                }`}>
                                                {course.status}
                                            </span>
                                            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{course.category}</span>
                                        </div>
                                        <h3 className="text-xl font-bold leading-6 text-gray-900 dark:text-white group-hover:text-secondary transition-colors">
                                            {course.title}
                                        </h3>
                                        <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                                            {course.description}
                                        </p>
                                    </div>
                                    <div className="mt-6 flex items-center justify-between border-t border-gray-100/20 dark:border-white/5 pt-4">
                                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                            <Calendar className="h-3 w-3" /> {course.startDate}
                                        </div>
                                        <span className="text-sm font-bold text-secondary group-hover:translate-x-1 transition-transform">
                                            Details &rarr;
                                        </span>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">
                                No courses found matching your criteria.
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Expanded Modal Overlay */}
                <AnimatePresence>
                    {selectedCourse && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedCourse(null)}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
                            />
                            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
                                <motion.div
                                    layoutId={`course-${selectedCourse.id}`}
                                    ref={modalRef}
                                    className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden pointer-events-auto ring-1 ring-black/5 dark:ring-white/10"
                                >
                                    {/* Modal Header Image/Gradient equivalent */}
                                    <div className="relative h-32 bg-gradient-to-r from-secondary/20 to-gsg-orange/20 dark:from-secondary/10 dark:to-gsg-orange/10 flex items-center justify-center overflow-hidden">
                                        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setSelectedCourse(null); }}
                                            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-gray-900 dark:text-white transition-colors"
                                        >
                                            <X size={20} />
                                        </button>
                                        <h2 className="text-3xl font-black text-primary dark:text-white drop-shadow-sm px-8 text-center bg-clip-text">
                                            {selectedCourse.title}
                                        </h2>
                                    </div>

                                    <div className="p-8">
                                        <div className="flex flex-wrap gap-4 mb-6">
                                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-bold">
                                                <Calendar size={16} /> {selectedCourse.startDate}
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-sm font-bold">
                                                <Clock size={16} /> {selectedCourse.duration}
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 text-sm font-bold">
                                                <BarChart size={16} /> {selectedCourse.level}
                                            </div>
                                        </div>

                                        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8">
                                            {selectedCourse.description}
                                        </p>

                                        <div className="flex items-center justify-end gap-4 border-t border-gray-100 dark:border-white/5 pt-6">
                                            <button
                                                onClick={() => setSelectedCourse(null)}
                                                className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                                            >
                                                Close
                                            </button>
                                            <button
                                                className="px-8 py-3 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-bold shadow-lg shadow-secondary/20 hover:shadow-secondary/40 hover:-translate-y-0.5 transition-all"
                                                onClick={() => alert("Application process starting...")} // Placeholder
                                            >
                                                Apply for this Course
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
