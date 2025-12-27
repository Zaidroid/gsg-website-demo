import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth-helpers"
import { aboutContentSchema } from "@/lib/validations"
import { ZodError } from "zod"

// GET /api/admin/about/content
export async function GET() {
    try {
        let content = await prisma.aboutContent.findFirst()

        // Return default if none exists
        if (!content) {
            return NextResponse.json({
                headerTitleEn: "", headerTitleAr: "",
                headerDescEn: "", headerDescAr: "",
                missionTitleEn: "", missionTitleAr: "",
                missionDescEn: "", missionDescAr: "",
                visionTitleEn: "", visionTitleAr: "",
                visionDescEn: "", visionDescAr: "",
                valuesTitleEn: "", valuesTitleAr: "",
                valuesEn: [], valuesAr: []
            })
        }

        return NextResponse.json(content)
    } catch (error) {
        console.error("Error fetching about content:", error)
        return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
    }
}

// PUT /api/admin/about/content
export async function PUT(request: NextRequest) {
    try {
        await requireAdmin()
        const body = await request.json()
        const validatedData = aboutContentSchema.parse(body)

        const existing = await prisma.aboutContent.findFirst()

        let content;
        if (existing) {
            content = await prisma.aboutContent.update({
                where: { id: existing.id },
                data: validatedData
            })
        } else {
            content = await prisma.aboutContent.create({
                data: validatedData
            })
        }

        return NextResponse.json(content)
    } catch (error: any) {
        console.error("Error updating about content:", error)
        if (error instanceof ZodError) {
            return NextResponse.json({ error: "Validation error", details: error.issues }, { status: 400 })
        }
        return NextResponse.json({ error: "Failed to update content" }, { status: 500 })
    }
}
