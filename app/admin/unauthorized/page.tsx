"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AlertTriangle } from "lucide-react"

export default function UnauthorizedPage() {
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/")
        }, 5000)

        return () => clearTimeout(timer)
    }, [router])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-dark via-navy to-teal-dark p-4">
            <div className="max-w-md w-full">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-orange-500/20 rounded-full">
                            <AlertTriangle className="w-16 h-16 text-orange-400" />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-white mb-4">
                        Access Denied
                    </h1>

                    <p className="text-gray-300 mb-6">
                        You don't have permission to access the admin dashboard.
                        Please contact an administrator if you believe this is an error.
                    </p>

                    <div className="space-y-3">
                        <button
                            onClick={() => router.push("/")}
                            className="w-full px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors"
                        >
                            Go to Homepage
                        </button>

                        <button
                            onClick={() => router.back()}
                            className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors border border-white/20"
                        >
                            Go Back
                        </button>
                    </div>

                    <p className="mt-6 text-sm text-gray-400">
                        Redirecting to homepage in 5 seconds...
                    </p>
                </div>
            </div>
        </div>
    )
}
