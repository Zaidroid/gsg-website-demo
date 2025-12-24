import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth-helpers"
import { siteSettingsSchema } from "@/lib/validations"
import { ZodError } from "zod"

// GET /api/admin/settings
export async function GET() {
    try {
        const settings = await prisma.siteSettings.findMany()

        // Convert array to object for easier consumption
        const settingsObj = settings.reduce((acc: any, curr: { settingKey: string, settingValue: string }) => {
            acc[curr.settingKey] = curr.settingValue
            return acc
        }, {})

        return NextResponse.json(settingsObj)
    } catch (error) {
        console.error("Error fetching settings:", error)
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
    }
}

// POST /api/admin/settings - Update or create setting
export async function POST(request: NextRequest) {
    try {
        await requireAdmin()

        const body = await request.json()
        const validatedData = siteSettingsSchema.parse(body)

        const setting = await prisma.siteSettings.upsert({
            where: { settingKey: validatedData.settingKey },
            update: { settingValue: validatedData.settingValue },
            create: validatedData,
        })

        return NextResponse.json(setting)
    } catch (error: any) {
        console.error("Error updating setting:", error)
        if (error instanceof ZodError) {
            return NextResponse.json({ error: "Validation error", details: error.issues }, { status: 400 })
        }
        return NextResponse.json({ error: "Failed to update setting" }, { status: 500 })
    }
}
