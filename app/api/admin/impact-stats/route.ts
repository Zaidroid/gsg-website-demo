import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { impactStatSchema } from "@/lib/validations"
import { requireAdmin } from "@/lib/auth-helpers"

// GET /api/admin/impact-stats
export async function GET() {
    try {
        const stats = await prisma.impactStat.findMany({
            orderBy: { order: 'asc' },
        })

        return NextResponse.json(stats)
    } catch (error) {
        console.error("Error fetching impact stats:", error)
        return NextResponse.json(
            { error: "Failed to fetch impact stats" },
            { status: 500 }
        )
    }
}

// POST /api/admin/impact-stats
export async function POST(request: NextRequest) {
    try {
        await requireAdmin()

        const body = await request.json()
        const validatedData = impactStatSchema.parse(body)

        const stat = await prisma.impactStat.create({
            data: validatedData,
        })

        return NextResponse.json(stat, { status: 201 })
    } catch (error: any) {
        console.error("Error creating impact stat:", error)
        if (error.name === "ZodError") {
            return NextResponse.json({ error: "Validation error", details: error.issues }, { status: 400 })
        }
        return NextResponse.json({ error: "Failed to create impact stat" }, { status: 500 })
    }
}
