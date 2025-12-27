import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth-helpers"
import { partnerSchema } from "@/lib/validations"

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin()
        const { id } = await params
        const body = await request.json()

        const validation = partnerSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json(
                { error: "Validation error", details: validation.error.format() },
                { status: 400 }
            )
        }

        const partner = await prisma.partner.update({
            where: { id },
            data: validation.data,
        })

        return NextResponse.json(partner)
    } catch (error) {
        console.error("Error updating partner:", error)
        return NextResponse.json(
            { error: "Failed to update partner" },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin()
        const { id } = await params
        await prisma.partner.delete({
            where: { id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting partner:", error)
        return NextResponse.json(
            { error: "Failed to delete partner" },
            { status: 500 }
        )
    }
}
