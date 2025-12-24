import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { courseSchema } from "@/lib/validations"
import { requireAdmin } from "@/lib/auth-helpers"

// GET /api/admin/courses - List all courses
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const category = searchParams.get("category")
        const status = searchParams.get("status")
        const published = searchParams.get("published")

        const where: any = {}

        if (category) where.category = category
        if (status) where.status = status
        if (published) where.published = published === "true"

        const courses = await prisma.course.findMany({
            where,
            orderBy: { createdAt: "desc" },
        })

        return NextResponse.json(courses)
    } catch (error) {
        console.error("Error fetching courses:", error)
        return NextResponse.json(
            { error: "Failed to fetch courses" },
            { status: 500 }
        )
    }
}

// POST /api/admin/courses - Create a new course
export async function POST(request: NextRequest) {
    try {
        // Check authentication
        await requireAdmin()

        const body = await request.json()
        const validatedData = courseSchema.parse(body)

        // Convert startDate to Date object if it's a string
        const courseData = {
            ...validatedData,
            startDate: new Date(validatedData.startDate),
        }

        const course = await prisma.course.create({
            data: courseData,
        })

        return NextResponse.json(course, { status: 201 })
    } catch (error: any) {
        console.error("Error creating course:", error)

        if (error.name === "ZodError") {
            return NextResponse.json(
                { error: "Validation error", details: error.issues },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: "Failed to create course" },
            { status: 500 }
        )
    }
}
