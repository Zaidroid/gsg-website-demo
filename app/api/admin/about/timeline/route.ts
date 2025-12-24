import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth-helpers"
import { timelineItemSchema } from "@/lib/validations"
import { ZodError } from "zod"

// GET /api/admin/about/timeline
export async function GET() {
    try {
        const items = await prisma.timelineItem.findMany({
            orderBy: { order: "asc" }
        })
        return NextResponse.json(items)
    } catch (error) {
        console.error("Error fetching timeline items:", error)
        return NextResponse.json({ error: "Failed to fetch timeline" }, { status: 500 })
    }
}

// POST /api/admin/about/timeline
export async function POST(request: NextRequest) {
    try {
        await requireAdmin()
        const body = await request.json()
        const validatedData = timelineItemSchema.parse(body)

        const item = await prisma.timelineItem.create({
            data: validatedData
        })

        return NextResponse.json(item)
    } catch (error: any) {
        console.error("Error creating timeline item:", error)
        if (error instanceof ZodError) {
            return NextResponse.json({ error: "Validation error", details: error.issues }, { status: 400 })
        }
        return NextResponse.json({ error: "Failed to create timeline item" }, { status: 500 })
    }
}
