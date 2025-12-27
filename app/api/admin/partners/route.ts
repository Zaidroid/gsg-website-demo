import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth-helpers"
import { partnerSchema } from "@/lib/validations"
import { ZodError } from "zod"

export async function GET() {
    try {
        const partners = await prisma.partner.findMany({
            orderBy: { order: 'asc' },
        })
        return NextResponse.json(partners)
    } catch (error) {
        console.error("Error fetching partners:", error)
        return NextResponse.json(
            { error: "Failed to fetch partners" },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        await requireAdmin()
        const body = await request.json()

        const validation = partnerSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json(
                { error: "Validation error", details: validation.error.format() },
                { status: 400 }
            )
        }

        const partner = await prisma.partner.create({
            data: validation.data
        })

        return NextResponse.json(partner, { status: 201 })
    } catch (error) {
        console.error("Error creating partner:", error)
        return NextResponse.json(
            { error: "Failed to create partner" },
            { status: 500 }
        )
    }
}
