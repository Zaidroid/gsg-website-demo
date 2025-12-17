"use client"

import { useState, useRef, useEffect } from "react"
import { events } from "@/data/events"
import { MapPin, Users, Calendar, X, ExternalLink } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { PageHeader } from "@/components/ui/PageHeader"

// Utility hook for click outside
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

export default function EventsPage() {
    const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null)

    // Quick filter implementation if needed, for now just show all
    // const filteredEvents = events

    const modalRef = useRef<HTMLDivElement>(null)
    useClickOutside(modalRef, () => setSelectedEvent(null))

    return (
        <div className="bg-transparent min-h-screen">
            <PageHeader
                title="Events"
                description="Connect, learn, and grow with our community events."
            />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-32">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 border-t border-gray-100 dark:border-slate-800 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    <AnimatePresence mode="popLayout">
                        {events.map((event, index) => (
                            <motion.article
                                layoutId={`event-${event.id}`}
                                key={event.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                onClick={() => setSelectedEvent(event)}
                                className="flex flex-col items-start justify-between rounded-2xl bg-white/30 dark:bg-slate-900/40 backdrop-blur-lg shadow-sm border border-white/40 dark:border-white/5 p-6 hover:shadow-2xl hover:border-secondary/30 hover:-translate-y-1 transition-all cursor-pointer group ring-1 ring-black/5 dark:ring-white/5"
                            >
                                <div className="flex items-center gap-x-4 text-xs w-full justify-between">
                                    <time dateTime={event.date} className="text-gray-500 dark:text-gray-400 font-bold flex items-center gap-1">
                                        <Calendar size={12} /> {event.date}
                                    </time>
                                    <span className={`rounded-full px-2 py-1 font-bold ring-1 ring-inset ${event.status === 'Open' ? 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/20 dark:text-green-400' :
                                        event.status === 'Finished' ? 'bg-gray-50 text-gray-600 ring-gray-500/10 dark:bg-gray-800/20 dark:text-gray-400' :
                                            'bg-blue-50 text-blue-700 ring-blue-700/10 dark:bg-blue-900/20 dark:text-blue-400'
                                        }`}>
                                        {event.status}
                                    </span>
                                </div>
                                <div className="group relative mt-4">
                                    <h3 className="text-xl font-bold leading-6 text-primary dark:text-white group-hover:text-secondary transition-colors">
                                        {event.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-slate-300 line-clamp-2">{event.description}</p>
                                </div>
                                <div className="mt-4 flex flex-col gap-2 w-full border-t border-gray-100/20 dark:border-white/5 pt-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <MapPin className="h-4 w-4 text-secondary" />
                                        {event.location}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <Users className="h-4 w-4 text-secondary" />
                                        {event.type}
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Expanded Modal Overlay */}
                <AnimatePresence>
                    {selectedEvent && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedEvent(null)}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
                            />
                            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
                                <motion.div
                                    layoutId={`event-${selectedEvent.id}`}
                                    ref={modalRef}
                                    className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden pointer-events-auto ring-1 ring-black/5 dark:ring-white/10"
                                >
                                    {/* Header Gradient */}
                                    <div className="relative h-32 bg-gradient-to-r from-gsg-orange/20 to-secondary/20 dark:from-gsg-orange/10 dark:to-secondary/10 flex items-center justify-center overflow-hidden">
                                        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setSelectedEvent(null); }}
                                            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-gray-900 dark:text-white transition-colors"
                                        >
                                            <X size={20} />
                                        </button>
                                        <h2 className="text-3xl font-black text-primary dark:text-white drop-shadow-sm px-8 text-center">
                                            {selectedEvent.title}
                                        </h2>
                                    </div>

                                    <div className="p-8">
                                        <div className="flex flex-wrap gap-4 mb-6">
                                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-bold">
                                                <Calendar size={16} /> {selectedEvent.date}
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-sm font-bold">
                                                <MapPin size={16} /> {selectedEvent.location}
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 text-sm font-bold">
                                                <Users size={16} /> {selectedEvent.type}
                                            </div>
                                        </div>

                                        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8">
                                            {selectedEvent.description}
                                        </p>

                                        <div className="flex items-center justify-end gap-4 border-t border-gray-100 dark:border-white/5 pt-6">
                                            <button
                                                onClick={() => setSelectedEvent(null)}
                                                className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                                            >
                                                Close
                                            </button>
                                            <button
                                                className="px-8 py-3 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-bold shadow-lg shadow-secondary/20 hover:shadow-secondary/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none flex items-center gap-2"
                                                onClick={() => alert("Registration starting...")}
                                                disabled={selectedEvent.status === 'Finished'}
                                            >
                                                {selectedEvent.status === 'Finished' ? 'Event Ended' : 'Register Now'}
                                                {selectedEvent.status !== 'Finished' && <ExternalLink size={16} />}
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
