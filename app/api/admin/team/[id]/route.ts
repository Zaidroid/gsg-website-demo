import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth-helpers"
import { teamMemberSchema } from "@/lib/validations"

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin()
        const { id } = await params
        const body = await request.json()

        const validation = teamMemberSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json(
                { error: "Validation error", details: validation.error.format() },
                { status: 400 }
            )
        }

        const member = await prisma.teamMember.update({
            where: { id },
            data: validation.data,
        })

        return NextResponse.json(member)
    } catch (error) {
        console.error("Error updating team member:", error)
        return NextResponse.json(
            { error: "Failed to update team member" },
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
        await prisma.teamMember.delete({
            where: { id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting team member:", error)
        return NextResponse.json(
            { error: "Failed to delete team member" },
            { status: 500 }
        )
    }
}
