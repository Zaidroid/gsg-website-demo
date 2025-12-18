"use client"

import { useState } from "react"
import { events } from "@/data/events"
import { MapPin, Users, Calendar, ExternalLink } from "lucide-react"
import { AnimatePresence } from "framer-motion"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, ExpandedCard, ExpandedCardOverlay } from "@/components/ui/UnifiedCard"
import { useTranslations } from "next-intl"

export default function EventsPage() {
    const t = useTranslations("EventsPage");
    const [selectedEvent, setSelectedEvent] = useState<any>(null)

    const translatedEvents = events.map(event => ({
        ...event,
        title: t(`data.${event.id}.title`),
        description: t(`data.${event.id}.description`),
        translatedStatus: t(`status.${event.status}`),
        translatedType: t(`types.${event.type}`),
        translatedLocation: t(`locations.${event.location}`)
    }));

    return (
        <div className="bg-transparent min-h-screen">
            <PageHeader
                title={t("header.title")}
                description={t("header.subtitle")}
            />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 sm:py-16">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 border-t border-gray-100 dark:border-slate-800 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    <AnimatePresence mode="popLayout">
                        {translatedEvents.map((event, index) => (
                            <Card
                                key={event.id}
                                id={event.id}
                                onClick={() => setSelectedEvent(event)}
                                delay={index * 0.1}
                                className="p-6"
                            >
                                <div className="flex items-center gap-x-4 text-xs w-full justify-between">
                                    <time dateTime={event.date} className="text-gray-500 dark:text-gray-400 font-bold flex items-center gap-1">
                                        <Calendar size={12} /> {event.date}
                                    </time>
                                    <span className={`rounded-full px-2 py-1 font-bold ring-1 ring-inset ${event.status === 'Open' ? 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/20 dark:text-green-400' :
                                        event.status === 'Finished' ? 'bg-gray-50 text-gray-600 ring-gray-500/10 dark:bg-gray-800/20 dark:text-gray-400' :
                                            'bg-blue-50 text-blue-700 ring-blue-700/10 dark:bg-blue-900/20 dark:text-blue-400'
                                        }`}>
                                        {event.translatedStatus}
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
                                        {event.translatedLocation}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <Users className="h-4 w-4 text-secondary" />
                                        {event.translatedType}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Expanded Modal Overlay */}
                <AnimatePresence>
                    {selectedEvent && (
                        <>
                            <ExpandedCardOverlay onClose={() => setSelectedEvent(null)} />
                            <ExpandedCard
                                id={selectedEvent.id}
                                title={selectedEvent.title}
                                onClose={() => setSelectedEvent(null)}
                                headerGradient="bg-gradient-to-r from-gsg-orange/20 to-secondary/20 dark:from-gsg-orange/10 dark:to-secondary/10"
                            >
                                <div className="flex flex-wrap gap-4 mb-6">
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-bold">
                                        <Calendar size={16} /> {selectedEvent.date}
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-sm font-bold">
                                        <MapPin size={16} /> {selectedEvent.translatedLocation}
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 text-sm font-bold">
                                        <Users size={16} /> {selectedEvent.translatedType}
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
                                        {t("labels.close")}
                                    </button>
                                    <button
                                        className="px-8 py-3 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-bold shadow-lg shadow-secondary/20 hover:shadow-secondary/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none flex items-center gap-2"
                                        onClick={() => alert("Registration starting...")}
                                        disabled={selectedEvent.status === 'Finished'}
                                    >
                                        {selectedEvent.status === 'Finished' ? t("labels.ended") : t("labels.register")}
                                        {selectedEvent.status !== 'Finished' && <ExternalLink size={16} />}
                                    </button>
                                </div>
                            </ExpandedCard>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
