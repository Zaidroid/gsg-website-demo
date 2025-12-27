import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { programSchema } from "@/lib/validations"
import { requireAdmin } from "@/lib/auth-helpers"

// PATCH /api/admin/programs/[id]
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin()

        const { id } = await params
        const body = await request.json()
        const validatedData = programSchema.partial().parse(body)

        // Remove null values to avoid Prisma type errors (Prisma update input doesn't accept null for optional fields in some cases or required fields)
        const dataToUpdate = Object.fromEntries(
            Object.entries(validatedData).filter(([_, v]) => v !== null)
        )

        const program = await prisma.program.update({
            where: { id },
            data: dataToUpdate,
        })

        return NextResponse.json(program)
    } catch (error: any) {
        console.error("Error updating program:", error)
        if (error.name === "ZodError") {
            return NextResponse.json({ error: "Validation error", details: error.issues }, { status: 400 })
        }
        return NextResponse.json({ error: "Failed to update program" }, { status: 500 })
    }
}

// DELETE /api/admin/programs/[id]
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin()

        const { id } = await params

        await prisma.program.delete({
            where: { id },
        })

        return NextResponse.json({ message: "Program deleted successfully" })
    } catch (error: any) {
        console.error("Error deleting program:", error)
        return NextResponse.json({ error: "Failed to delete program" }, { status: 500 })
    }
}
