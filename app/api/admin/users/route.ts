import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth-helpers"

export async function GET() {
    try {
        await requireAdmin()
        const users = await prisma.user.findMany({
            orderBy: { createdAt: "desc" }
        })
        return NextResponse.json(users)
    } catch (error) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
}

export async function POST(req: Request) {
    try {
        await requireAdmin()
        const body = await req.json()
        const { name, email, role } = body

        if (!email || !role) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                role: role || "viewer",
                // For a real app, you might want to send an invitation email or set a temp password
            }
        })

        return NextResponse.json(newUser)
    } catch (error) {
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }
}

export async function PATCH(req: Request) {
    try {
        await requireAdmin()
        const body = await req.json()
        const { id, role } = body

        if (!id || !role) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: { role }
        })

        return NextResponse.json(updatedUser)
    } catch (error) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
}

export async function DELETE(req: Request) {
    try {
        await requireAdmin()
        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")

        if (!id) {
            return NextResponse.json({ error: "Missing user ID" }, { status: 400 })
        }

        await prisma.user.delete({
            where: { id }
        })

        return NextResponse.json({ message: "User deleted successfully" })
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
    }
}
