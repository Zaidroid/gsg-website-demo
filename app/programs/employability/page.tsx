import { PageHeader } from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Briefcase, CheckCircle2 } from "lucide-react"

export default function EmployabilityPage() {
    return (
        <main className="bg-transparent min-h-screen">
            <PageHeader
                title="Employability"
                description="Bridging the gap between talent and opportunity."
            />
            <section className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl">
                                Launch Your Career
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-gray-700 dark:text-slate-300">
                                Our employability programs are designed to ensure every graduate finds meaningful work. We partner with top companies to provide internships, mentorship, and direct hiring paths.
                            </p>
                            <ul className="mt-8 space-y-4">
                                {[
                                    "Direct introductions to hiring partners",
                                    "Resume and portfolio reviews",
                                    "Mock technical interviews",
                                    "Paid internship opportunities",
                                    "Career coaching and mentorship"
                                ].map((item) => (
                                    <li key={item} className="flex gap-3 items-center text-gray-700 dark:text-slate-300">
                                        <CheckCircle2 className="h-5 w-5 flex-none text-secondary" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-10 flex gap-x-6">
                                <Link href="/contact">
                                    <Button size="lg" className="dark:bg-white dark:text-slate-900 dark:hover:bg-gray-100 font-bold">
                                        Hire Talent
                                    </Button>
                                </Link>
                                <Link href="/contact">
                                    <Button variant="outline" size="lg" className="dark:text-white font-bold">
                                        Find a Job
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="relative rounded-3xl bg-gray-900/5 dark:bg-white/5 p-8 border border-white/20 ring-1 ring-black/5 dark:ring-white/10">
                            <div className="flex items-center justify-center h-64 rounded-2xl bg-white/50 dark:bg-black/20 backdrop-blur-md">
                                <Briefcase className="h-24 w-24 text-gray-300 dark:text-slate-600" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
