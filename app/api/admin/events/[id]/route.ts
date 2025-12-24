import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { eventSchema } from "@/lib/validations"
import { requireAdmin } from "@/lib/auth-helpers"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const event = await prisma.event.findUnique({ where: { id } })

        if (!event) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 })
        }

        return NextResponse.json(event)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 })
    }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await requireAdmin()
        const { id } = await params
        const body = await request.json()
        const validatedData = eventSchema.partial().parse(body)

        const updateData: any = { ...validatedData }
        if (updateData.date) updateData.date = new Date(updateData.date)

        const event = await prisma.event.update({ where: { id }, data: updateData })
        return NextResponse.json(event)
    } catch (error: any) {
        if (error.code === "P2025") {
            return NextResponse.json({ error: "Event not found" }, { status: 404 })
        }
        return NextResponse.json({ error: "Failed to update event" }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await requireAdmin()
        const { id } = await params
        await prisma.event.delete({ where: { id } })
        return NextResponse.json({ message: "Event deleted successfully" })
    } catch (error: any) {
        if (error.code === "P2025") {
            return NextResponse.json({ error: "Event not found" }, { status: 404 })
        }
        return NextResponse.json({ error: "Failed to delete event" }, { status: 500 })
    }
}
