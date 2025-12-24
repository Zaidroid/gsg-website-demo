import { NextAuthOptions } from "next-auth"
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
    providers,
    callbacks: {
        async jwt({ token, user, account, profile }) {
            // On sign in, add user info to token
            if (user) {
                token.id = user.id
                token.email = user.email

                // Check if user email is the admin email
                if (user.email === process.env.ADMIN_EMAIL) {
                    token.role = "admin"

                    // Store in database
                    try {
                        await prisma.user.upsert({
                            where: { email: user.email },
                            update: {
                                name: user.name,
                                image: user.image,
                                role: "admin"
                            },
                            create: {
                                email: user.email!,
                                name: user.name!,
                                image: user.image,
                                role: "admin",
                            },
                        })
                    } catch (error) {
                        console.error("Error saving user to database:", error)
                    }
                } else {
                    token.role = "viewer"
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
