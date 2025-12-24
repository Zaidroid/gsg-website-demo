import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth-helpers"
import { menuItemSchema } from "@/lib/validations"
import { ZodError } from "zod"

// GET /api/admin/menu
export async function GET() {
    try {
        const menuItems = await prisma.menuItem.findMany({
            orderBy: { order: "asc" }
        })
        return NextResponse.json(menuItems)
    } catch (error) {
        console.error("Error fetching menu items:", error)
        return NextResponse.json({ error: "Failed to fetch menu items" }, { status: 500 })
    }
}

// POST /api/admin/menu
export async function POST(request: NextRequest) {
    try {
        await requireAdmin()
        const body = await request.json()
        const validatedData = menuItemSchema.parse(body)

        const menuItem = await prisma.menuItem.create({
            data: validatedData
        })

        return NextResponse.json(menuItem)
    } catch (error: any) {
        console.error("Error creating menu item:", error)
        if (error instanceof ZodError) {
            return NextResponse.json({ error: "Validation error", details: error.issues }, { status: 400 })
        }
        return NextResponse.json({ error: "Failed to create menu item" }, { status: 500 })
    }
}
