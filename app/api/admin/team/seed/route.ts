import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { readdir } from "fs/promises"
import path from "path"

export async function POST() {
    try {
        const teamDir = path.join(process.cwd(), "public/team")
        const files = await readdir(teamDir)

        const createdMembers = []

        for (const file of files) {
            if (!file.match(/\.(jpg|jpeg|png|webp)$/i)) continue

            // Parse name from filename
            // e.g. "Mohammad-Ayesh.JPG" -> "Mohammad Ayesh"
            const namePart = file.split('.')[0]
            const nameEn = namePart.replace(/-/g, " ")
            const nameAr = nameEn // Placeholder for now
            const roleEn = "Team Member" // Placeholder
            const roleAr = "عضو فريق" // Placeholder
            const imageUrl = `/team/${file}`

            // Check if exists
            const existing = await prisma.teamMember.findFirst({
                where: { nameEn: nameEn }
            })

            if (!existing) {
                const member = await prisma.teamMember.create({
                    data: {
                        nameEn,
                        nameAr,
                        roleEn,
                        roleAr,
                        imageUrl,
                        published: true,
                        order: 0
                    }
                })
                createdMembers.push(member)
            }
        }

        return NextResponse.json({
            message: `Seeded ${createdMembers.length} new members`,
            members: createdMembers
        })
    } catch (error) {
        console.error("Seeding failed:", error)
        return NextResponse.json({ error: "Seeding failed" }, { status: 500 })
    }
}
