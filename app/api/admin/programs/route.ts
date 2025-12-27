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

        // Ensure optional fields that are required in DB as strings are not null/undefined
        const dataToCreate = {
            ...validatedData,
            ctaLink: validatedData.ctaLink || "",
            imageUrl: validatedData.imageUrl || null, // imageUrl is optional in DB, so null is fine? Wait, schema says String?
        }

        // Wait, let's double check prisma schema again. 
        // imageUrl String? (Optional) -> null is fine.
        // ctaLink String (Required) -> null/undefined is NOT fine.

        const program = await prisma.program.create({
            data: {
                ...dataToCreate,
                // Explicitly handle fields if needed, but the spread above with override should work
            },
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
