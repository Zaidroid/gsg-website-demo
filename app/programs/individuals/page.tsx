import { PageHeader } from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Code, Globe, Rocket, ArrowRight } from "lucide-react"

export default function IndividualsPage() {
    return (
        <main className="bg-transparent min-h-screen">
            <PageHeader
                title="For Individuals"
                description="Unlock your potential with our world-class training programs and career accelerators."
            />
            <section className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Code Academy Card */}
                        <div className="flex flex-col rounded-3xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/50 dark:border-white/10 p-8 shadow-xl hover:scale-[1.02] transition-transform duration-300">
                            <div className="mb-6 inline-flex rounded-2xl p-4 bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 w-fit">
                                <Code className="h-8 w-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Code Academy</h3>
                            <p className="text-gray-700 dark:text-slate-300 mb-8 flex-grow">
                                Immersive 6-month coding bootcamps to launch your career as a full-stack developer.
                            </p>
                            <Link href="/programs/code-academy">
                                <Button className="w-full gap-2 dark:bg-white dark:text-slate-900 font-bold">
                                    View Program <ArrowRight size={16} />
                                </Button>
                            </Link>
                        </div>

                        {/* Freelance Academy Card */}
                        <div className="flex flex-col rounded-3xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/50 dark:border-white/10 p-8 shadow-xl hover:scale-[1.02] transition-transform duration-300">
                            <div className="mb-6 inline-flex rounded-2xl p-4 bg-green-100/50 dark:bg-green-900/30 text-green-600 dark:text-green-300 w-fit">
                                <Globe className="h-8 w-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Freelance Academy</h3>
                            <p className="text-gray-700 dark:text-slate-300 mb-8 flex-grow">
                                Learn how to work with international clients, manage projects, and earn income online.
                            </p>
                            <Link href="/programs/freelance-academy">
                                <Button className="w-full gap-2 dark:bg-white dark:text-slate-900 font-bold">
                                    View Program <ArrowRight size={16} />
                                </Button>
                            </Link>
                        </div>

                        {/* GeeXelerator Card */}
                        <div className="flex flex-col rounded-3xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/50 dark:border-white/10 p-8 shadow-xl hover:scale-[1.02] transition-transform duration-300">
                            <div className="mb-6 inline-flex rounded-2xl p-4 bg-orange-100/50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 w-fit">
                                <Rocket className="h-8 w-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">GeeXelerator</h3>
                            <p className="text-gray-700 dark:text-slate-300 mb-8 flex-grow">
                                Pre-seed acceleration for tech startups. Turn your innovative idea into a business.
                            </p>
                            <Link href="/programs/geexelerator">
                                <Button className="w-full gap-2 dark:bg-white dark:text-slate-900 font-bold">
                                    View Program <ArrowRight size={16} />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
