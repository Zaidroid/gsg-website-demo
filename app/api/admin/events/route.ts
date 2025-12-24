import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { eventSchema } from "@/lib/validations"
import { requireAdmin } from "@/lib/auth-helpers"

// GET /api/admin/events
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const type = searchParams.get("type")
        const status = searchParams.get("status")

        const where: any = {}
        if (type) where.type = type
        if (status) where.status = status

        const events = await prisma.event.findMany({
            where,
            orderBy: { date: "desc" },
        })

        return NextResponse.json(events)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
    }
}

// POST /api/admin/events
export async function POST(request: NextRequest) {
    try {
        await requireAdmin()
        const body = await request.json()
        const validatedData = eventSchema.parse(body)

        const event = await prisma.event.create({
            data: {
                ...validatedData,
                date: new Date(validatedData.date),
            },
        })

        return NextResponse.json(event, { status: 201 })
    } catch (error: any) {
        if (error.name === "ZodError") {
            return NextResponse.json({ error: "Validation error", details: error.errors }, { status: 400 })
        }
        return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
    }
}
