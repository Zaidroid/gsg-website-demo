import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { courseSchema } from "@/lib/validations"
import { requireAdmin } from "@/lib/auth-helpers"

// GET /api/admin/courses/[id] - Get a single course
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        const course = await prisma.course.findUnique({
            where: { id },
        })

        if (!course) {
            return NextResponse.json(
                { error: "Course not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(course)
    } catch (error) {
        console.error("Error fetching course:", error)
        return NextResponse.json(
            { error: "Failed to fetch course" },
            { status: 500 }
        )
    }
}

// PATCH /api/admin/courses/[id] - Update a course
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Check authentication
        await requireAdmin()

        const { id } = await params
        const body = await request.json()
        const validatedData = courseSchema.partial().parse(body)

        // Convert startDate to Date object if provided
        const updateData: any = { ...validatedData }
        if (updateData.startDate) {
            updateData.startDate = new Date(updateData.startDate)
        }

        const course = await prisma.course.update({
            where: { id },
            data: updateData,
        })

        return NextResponse.json(course)
    } catch (error: any) {
        console.error("Error updating course:", error)

        if (error.name === "ZodError") {
            return NextResponse.json(
                { error: "Validation error", details: error.issues },
                { status: 400 }
            )
        }

        if (error.code === "P2025") {
            return NextResponse.json(
                { error: "Course not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { error: "Failed to update course" },
            { status: 500 }
        )
    }
}

// DELETE /api/admin/courses/[id] - Delete a course
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Check authentication
        await requireAdmin()

        const { id } = await params

        await prisma.course.delete({
            where: { id },
        })

        return NextResponse.json({ message: "Course deleted successfully" })
    } catch (error: any) {
        console.error("Error deleting course:", error)

        if (error.code === "P2025") {
            return NextResponse.json(
                { error: "Course not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { error: "Failed to delete course" },
            { status: 500 }
        )
    }
}
