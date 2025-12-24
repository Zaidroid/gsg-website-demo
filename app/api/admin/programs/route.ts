import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { programSchema } from "@/lib/validations"
import { requireAdmin } from "@/lib/auth-helpers"

// GET /api/admin/programs - List all programs
export async function GET() {
    try {
        const programs = await prisma.program.findMany({
            orderBy: { updatedAt: 'desc' },
        })

        return NextResponse.json(programs)
    } catch (error) {
        console.error("Error fetching programs:", error)
        return NextResponse.json(
            { error: "Failed to fetch programs" },
            { status: 500 }
        )
    }
}

// POST /api/admin/programs - Create a new program
export async function POST(request: NextRequest) {
    try {
        await requireAdmin()

        const body = await request.json()
        const validatedData = programSchema.parse(body)

        const program = await prisma.program.create({
            data: validatedData,
        })

        return NextResponse.json(program, { status: 201 })
    } catch (error: any) {
        console.error("Error creating program:", error)
        if (error.name === "ZodError") {
            return NextResponse.json({ error: "Validation error", details: error.issues }, { status: 400 })
        }
        return NextResponse.json({ error: "Failed to create program" }, { status: 500 })
    }
}
