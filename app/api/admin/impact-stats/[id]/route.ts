import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { impactStatSchema } from "@/lib/validations"
import { requireAdmin } from "@/lib/auth-helpers"

// PATCH /api/admin/impact-stats/[id]
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin()

        const { id } = await params
        const body = await request.json()
        const validatedData = impactStatSchema.partial().parse(body)

        const stat = await prisma.impactStat.update({
            where: { id },
            data: validatedData,
        })

        return NextResponse.json(stat)
    } catch (error: any) {
        console.error("Error updating impact stat:", error)
        if (error.name === "ZodError") {
            return NextResponse.json({ error: "Validation error", details: error.issues }, { status: 400 })
        }
        return NextResponse.json({ error: "Failed to update impact stat" }, { status: 500 })
    }
}

// DELETE /api/admin/impact-stats/[id]
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin()

        const { id } = await params

        await prisma.impactStat.delete({
            where: { id },
        })

        return NextResponse.json({ message: "Impact stat deleted successfully" })
    } catch (error: any) {
        console.error("Error deleting impact stat:", error)
        return NextResponse.json({ error: "Failed to delete impact stat" }, { status: 500 })
    }
}
