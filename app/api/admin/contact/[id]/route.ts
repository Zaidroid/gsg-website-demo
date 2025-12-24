import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth-helpers"
import { z } from "zod"

const contactInfoSchema = z.object({
    locationKey: z.string().min(1),
    nameEn: z.string().min(1),
    nameAr: z.string().min(1),
    addressEn: z.string().min(1),
    addressAr: z.string().min(1),
    city: z.string().min(1),
    phone: z.string().min(1),
    email: z.string().email(),
    order: z.number().int().default(0),
    published: z.boolean().default(true),
})

// PATCH /api/admin/contact/[id]
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin()

        const { id } = await params
        const body = await request.json()
        const validatedData = contactInfoSchema.partial().parse(body)

        const info = await prisma.contactInfo.update({
            where: { id },
            data: validatedData,
        })

        return NextResponse.json(info)
    } catch (error: any) {
        console.error("Error updating contact info:", error)
        if (error.name === "ZodError") {
            return NextResponse.json({ error: "Validation error", details: error.errors }, { status: 400 })
        }
        return NextResponse.json({ error: "Failed to update contact info" }, { status: 500 })
    }
}

// DELETE /api/admin/contact/[id]
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin()

        const { id } = await params

        await prisma.contactInfo.delete({
            where: { id },
        })

        return NextResponse.json({ message: "Contact info deleted successfully" })
    } catch (error: any) {
        console.error("Error deleting contact info:", error)
        return NextResponse.json({ error: "Failed to delete contact info" }, { status: 500 })
    }
}
