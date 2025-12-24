import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { storySchema } from "@/lib/validations"
import { requireAdmin } from "@/lib/auth-helpers"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const story = await prisma.story.findUnique({ where: { id } })

        if (!story) {
            return NextResponse.json({ error: "Story not found" }, { status: 404 })
        }

        return NextResponse.json(story)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch story" }, { status: 500 })
    }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await requireAdmin()
        const { id } = await params
        const body = await request.json()
        const validatedData = storySchema.partial().parse(body)

        const story = await prisma.story.update({ where: { id }, data: validatedData })
        return NextResponse.json(story)
    } catch (error: any) {
        if (error.code === "P2025") {
            return NextResponse.json({ error: "Story not found" }, { status: 404 })
        }
        return NextResponse.json({ error: "Failed to update story" }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await requireAdmin()
        const { id } = await params
        await prisma.story.delete({ where: { id } })
        return NextResponse.json({ message: "Story deleted successfully" })
    } catch (error: any) {
        if (error.code === "P2025") {
            return NextResponse.json({ error: "Story not found" }, { status: 404 })
        }
        return NextResponse.json({ error: "Failed to delete story" }, { status: 500 })
    }
}
