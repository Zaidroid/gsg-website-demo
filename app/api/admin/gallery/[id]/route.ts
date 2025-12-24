import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { galleryImageSchema } from "@/lib/validations"
import { requireAdmin } from "@/lib/auth-helpers"

// PATCH /api/admin/gallery/[id]
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin()

        const { id } = await params
        const body = await request.json()
        const validatedData = galleryImageSchema.partial().parse(body)

        const image = await prisma.galleryImage.update({
            where: { id },
            data: validatedData,
        })

        return NextResponse.json(image)
    } catch (error: any) {
        console.error("Error updating gallery image:", error)
        if (error.name === "ZodError") {
            return NextResponse.json({ error: "Validation error", details: error.errors }, { status: 400 })
        }
        return NextResponse.json({ error: "Failed to update gallery image" }, { status: 500 })
    }
}

// DELETE /api/admin/gallery/[id]
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin()

        const { id } = await params

        await prisma.galleryImage.delete({
            where: { id },
        })

        return NextResponse.json({ message: "Image deleted successfully" })
    } catch (error: any) {
        console.error("Error deleting gallery image:", error)
        return NextResponse.json({ error: "Failed to delete gallery image" }, { status: 500 })
    }
}
