"use server"

import prisma from "@/lib/prisma"

export async function fetchProgram(programId: string) {
    try {
        const program = await prisma.program.findUnique({
            where: { programId },
        })
        return program
    } catch (error) {
        console.error("Error fetching program:", error)
        return null
    }
}
