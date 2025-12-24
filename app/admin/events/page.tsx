import { format } from "date-fns"
import prisma from "@/lib/prisma"
import { Plus } from "lucide-react"

import { DataTable } from "@/components/admin/DataTable"
import { columns, EventColumn } from "./components/columns"

export default async function EventsPage() {
    const events = await prisma.event.findMany({
        orderBy: {
            date: 'desc'
        }
    })

    const formattedEvents: EventColumn[] = events.map((item: any) => ({
        id: item.id,
        eventId: item.eventId,
        titleEn: item.titleEn,
        date: format(item.date, "MMMM do, yyyy HH:mm"),
        location: item.location,
        type: item.type,
        status: item.status,
        published: item.published,
    }))

    return (
        <div className="space-y-8 p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gsg-navy">Events</h1>
                    <p className="text-gray-500 text-sm">Organize and manage upcoming GSG events and workshops.</p>
                </div>
                <a
                    href="/admin/events/new"
                    className="flex items-center gap-2 px-6 py-2.5 bg-gsg-navy text-white rounded-xl hover:bg-gsg-navy/90 transition-all font-semibold shadow-lg shadow-gsg-navy/20"
                >
                    <Plus className="h-4 w-4" />
                    New Event
                </a>
            </div>

            <hr className="border-gray-100" />

            <DataTable
                columns={columns}
                data={formattedEvents}
                searchKey="titleEn"
                placeholder="Search events by title..."
            />
        </div>
    )
}
