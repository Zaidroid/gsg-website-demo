import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { requireAdmin } from "@/lib/auth-helpers"

// GET /api/admin/translations?lang=en
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const lang = searchParams.get("lang") || "en"

        if (!["en", "ar"].includes(lang)) {
            return NextResponse.json({ error: "Invalid language" }, { status: 400 })
        }

        const filePath = path.join(process.cwd(), "messages", `${lang}.json`)
        const content = await fs.readFile(filePath, "utf-8")

        return NextResponse.json(JSON.parse(content))
    } catch (error) {
        console.error("Error reading translations:", error)
        return NextResponse.json({ error: "Failed to read translations" }, { status: 500 })
    }
}

// POST /api/admin/translations
export async function POST(request: NextRequest) {
    try {
        await requireAdmin()

        const body = await request.json()
        const { lang, content } = body

        if (!["en", "ar"].includes(lang)) {
            return NextResponse.json({ error: "Invalid language" }, { status: 400 })
        }

        const filePath = path.join(process.cwd(), "messages", `${lang}.json`)

        // Validate JSON structure (must be an object)
        if (typeof content !== "object" || content === null) {
            return NextResponse.json({ error: "Invalid translation content" }, { status: 400 })
        }

        await fs.writeFile(filePath, JSON.stringify(content, null, 4), "utf-8")

        return NextResponse.json({ message: "Translations updated successfully" })
    } catch (error) {
        console.error("Error writing translations:", error)
        return NextResponse.json({ error: "Failed to write translations" }, { status: 500 })
    }
}
