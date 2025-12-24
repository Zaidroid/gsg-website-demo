import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { storySchema } from "@/lib/validations"
import { requireAdmin } from "@/lib/auth-helpers"

// GET /api/admin/stories
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const featured = searchParams.get("featured")

        const where: any = {}
        if (featured) where.featured = featured === "true"

        const stories = await prisma.story.findMany({
            where,
            orderBy: { createdAt: "desc" },
        })

        return NextResponse.json(stories)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 })
    }
}

// POST /api/admin/stories
export async function POST(request: NextRequest) {
    try {
        await requireAdmin()
        const body = await request.json()
        const validatedData = storySchema.parse(body)

        const story = await prisma.story.create({
            data: validatedData,
        })

        return NextResponse.json(story, { status: 201 })
    } catch (error: any) {
        if (error.name === "ZodError") {
            return NextResponse.json({ error: "Validation error", details: error.issues }, { status: 400 })
        }
        return NextResponse.json({ error: "Failed to create story" }, { status: 500 })
    }
}
