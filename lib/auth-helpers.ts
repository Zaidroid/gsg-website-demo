import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function getSession() {
    return await getServerSession(authOptions)
}

export async function getCurrentUser() {
    const session = await getSession()
    return session?.user
}

export async function requireAuth() {
    const session = await getSession()

    if (!session || !session.user) {
        redirect("/admin/login")
    }

    return session
}

export async function requireAdmin() {
    const session = await requireAuth()

    // @ts-ignore
    if (session.user.role !== "admin") {
        redirect("/admin/unauthorized")
    }

    return session
}

export function checkRole(userRole: string, requiredRole: "admin" | "editor" | "viewer") {
    const roles = ["viewer", "editor", "admin"]
    const userRoleIndex = roles.indexOf(userRole)
    const requiredRoleIndex = roles.indexOf(requiredRole)

    return userRoleIndex >= requiredRoleIndex
}
