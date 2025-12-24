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

// GET /api/admin/contact
export async function GET() {
    try {
        const info = await prisma.contactInfo.findMany({
            orderBy: { order: 'asc' },
        })

        return NextResponse.json(info)
    } catch (error) {
        console.error("Error fetching contact info:", error)
        return NextResponse.json({ error: "Failed to fetch contact info" }, { status: 500 })
    }
}

// POST /api/admin/contact
export async function POST(request: NextRequest) {
    try {
        await requireAdmin()

        const body = await request.json()
        const validatedData = contactInfoSchema.parse(body)

        const info = await prisma.contactInfo.create({
            data: validatedData,
        })

        return NextResponse.json(info, { status: 201 })
    } catch (error: any) {
        console.error("Error creating contact info:", error)
        if (error.name === "ZodError") {
            return NextResponse.json({ error: "Validation error", details: error.issues }, { status: 400 })
        }
        return NextResponse.json({ error: "Failed to create contact info" }, { status: 500 })
    }
}
