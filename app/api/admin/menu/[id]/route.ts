import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth-helpers"
import { menuItemSchema } from "@/lib/validations"
import { ZodError } from "zod"

// PUT /api/admin/menu/[id]
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await requireAdmin()
        const { id } = params
        const body = await request.json()
        const validatedData = menuItemSchema.parse(body)

        const menuItem = await prisma.menuItem.update({
            where: { id },
            data: validatedData
        })

        return NextResponse.json(menuItem)
    } catch (error: any) {
        console.error("Error updating menu item:", error)
        if (error instanceof ZodError) {
            return NextResponse.json({ error: "Validation error", details: error.issues }, { status: 400 })
        }
        return NextResponse.json({ error: "Failed to update menu item" }, { status: 500 })
    }
}

// DELETE /api/admin/menu/[id]
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await requireAdmin()
        const { id } = params

        await prisma.menuItem.delete({
            where: { id }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting menu item:", error)
        return NextResponse.json({ error: "Failed to delete menu item" }, { status: 500 })
    }
}
