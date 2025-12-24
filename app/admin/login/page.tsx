"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Mail, Github, Loader2 } from "lucide-react"

export default function LoginPage() {
    const searchParams = useSearchParams()
    const [isLoading, setIsLoading] = useState<string | null>(null)
    const error = searchParams?.get("error")

    const handleSignIn = async (provider: string) => {
        setIsLoading(provider)
        try {
            await signIn(provider, { callbackUrl: "/admin" })
        } catch (error) {
            console.error("Sign in error:", error)
            setIsLoading(null)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gsg-navy via-gsg-navy-light to-gsg-teal p-4">
            <div className="w-full max-w-md">
                {/* Logo and Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Gaza Sky Geeks
                    </h1>
                    <p className="text-teal-light text-lg">Admin Dashboard</p>
                </div>

                {/* Login Card */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">
                        Sign in to continue
                    </h2>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                            <p className="text-red-200 text-sm">
                                {error === "OAuthAccountNotLinked"
                                    ? "Email already in use with different provider"
                                    : "Authentication error. Please try again."}
                            </p>
                        </div>
                    )}

                    <div className="space-y-4">
                        {/* Google Sign In */}
                        <button
                            onClick={() => handleSignIn("google")}
                            disabled={isLoading !== null}
                            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading === "google" ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Mail className="w-5 h-5" />
                            )}
                            Continue with Google
                        </button>

                        {/* GitHub Sign In */}
                        <button
                            onClick={() => handleSignIn("github")}
                            disabled={isLoading !== null}
                            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-white/20"
                        >
                            {isLoading === "github" ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Github className="w-5 h-5" />
                            )}
                            Continue with GitHub
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-300">
                            Only authorized administrators can access this area
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-gray-400 text-sm">
                    <p>© {new Date().getFullYear()} Gaza Sky Geeks. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}
