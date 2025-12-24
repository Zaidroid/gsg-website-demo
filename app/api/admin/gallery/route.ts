import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { galleryImageSchema } from "@/lib/validations"
import { requireAdmin } from "@/lib/auth-helpers"

// GET /api/admin/gallery
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const tag = searchParams.get("tag")
        const featured = searchParams.get("featured")

        const where: any = {}
        if (tag) where.tags = { has: tag }
        if (featured) where.featured = featured === "true"

        const images = await prisma.galleryImage.findMany({
            where,
            orderBy: { uploadedAt: 'desc' },
        })

        return NextResponse.json(images)
    } catch (error) {
        console.error("Error fetching gallery images:", error)
        return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 })
    }
}

// POST /api/admin/gallery
export async function POST(request: NextRequest) {
    try {
        await requireAdmin()

        const body = await request.json()

        // Handle bulk creation if body is an array
        if (Array.isArray(body)) {
            const validatedImages = z.array(galleryImageSchema).parse(body)
            const images = await prisma.galleryImage.createMany({
                data: validatedImages,
            })
            return NextResponse.json(images, { status: 201 })
        }

        const validatedData = galleryImageSchema.parse(body)
        const image = await prisma.galleryImage.create({
            data: validatedData,
        })

        return NextResponse.json(image, { status: 201 })
    } catch (error: any) {
        console.error("Error creating gallery image:", error)
        if (error.name === "ZodError") {
            return NextResponse.json({ error: "Validation error", details: error.errors }, { status: 400 })
        }
        return NextResponse.json({ error: "Failed to create gallery image" }, { status: 500 })
    }
}

import { z } from "zod"
