import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth-helpers"
import { timelineItemSchema } from "@/lib/validations"
import { ZodError } from "zod"

// PUT /api/admin/about/timeline/[id]
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await requireAdmin()
        const { id } = params
        const body = await request.json()
        const validatedData = timelineItemSchema.parse(body)

        const item = await prisma.timelineItem.update({
            where: { id },
            data: validatedData
        })

        return NextResponse.json(item)
    } catch (error: any) {
        console.error("Error updating timeline item:", error)
        if (error instanceof ZodError) {
            return NextResponse.json({ error: "Validation error", details: error.issues }, { status: 400 })
        }
        return NextResponse.json({ error: "Failed to update timeline item" }, { status: 500 })
    }
}

// DELETE /api/admin/about/timeline/[id]
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await requireAdmin()
        const { id } = params

        await prisma.timelineItem.delete({
            where: { id }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting timeline item:", error)
        return NextResponse.json({ error: "Failed to delete timeline item" }, { status: 500 })
    }
}
