import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth-helpers"
import { teamMemberSchema } from "@/lib/validations"
import { ZodError } from "zod"

export async function GET() {
    try {
        const team = await prisma.teamMember.findMany({
            orderBy: { order: 'asc' },
        })
        return NextResponse.json(team)
    } catch (error) {
        console.error("Error fetching team members:", error)
        return NextResponse.json(
            { error: "Failed to fetch team members" },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        await requireAdmin()
        const body = await request.json()

        const validation = teamMemberSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json(
                { error: "Validation error", details: validation.error.format() },
                { status: 400 }
            )
        }

        const member = await prisma.teamMember.create({
            data: validation.data
        })

        return NextResponse.json(member, { status: 201 })
    } catch (error) {
        console.error("Error creating team member:", error)
        return NextResponse.json(
            { error: "Failed to create team member" },
            { status: 500 }
        )
    }
}
