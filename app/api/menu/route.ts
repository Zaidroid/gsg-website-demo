import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
    try {
        const menuItems = await prisma.menuItem.findMany({
            where: { published: true },
            orderBy: { order: "asc" }
        })

        // Group by location for easier consumption
        const grouped = {
            Navbar: menuItems.filter((i: any) => i.location === "Navbar"),
            Footer: menuItems.filter((i: any) => i.location === "Footer")
        }

        return NextResponse.json(grouped)
    } catch (error) {
        console.error("Error fetching public menu:", error)
        return NextResponse.json({ error: "Failed to fetch menu" }, { status: 500 })
    }
}
