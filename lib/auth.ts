import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import prisma from "@/lib/prisma"

// Only include providers that have credentials
const providers = []

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.push(
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    )
}

if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
    providers.push(
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        })
    )
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as any,
    providers,
    callbacks: {
        async jwt({ token, user, trigger, session }) {

            if (trigger === "update" && session?.user) {
                return { ...token, ...session.user };
            }

            // On sign in, add user info to token
            if (user) {
                token.id = user.id
                token.email = user.email
                // Logic to assign admin role if matches env var
                if (user.email === process.env.ADMIN_EMAIL) {
                    token.role = "admin"
                    // Force update the db role if it's not admin yet (e.g. first login)
                    // The adapter creates the user before this callback with default role (likely 'admin' per schema default)
                    // But to be safe:
                    try {
                        await prisma.user.update({
                            where: { id: user.id },
                            data: { role: "admin" }
                        })
                    } catch (e) {
                        console.error("Failed to auto-assign admin role", e)
                    }
                } else {
                    // If user exists but role is missing in token (should differ based on DB)
                    // For now, if it's in DB, the token will eventually pick it up if we load from DB.
                    // But 'user' object in jwt callback comes from the adapter (DB user)
                    // So we can trust user.role if it exists
                    token.role = (user as any).role || "viewer"
                }
            }
            return token
        },
        async session({ session, token }) {
            if (session.user && token) {
                session.user.id = token.id as string
                session.user.role = token.role as string
            }
            return session
        },
    },
    pages: {
        signIn: "/admin/login",
        error: "/admin/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
}
