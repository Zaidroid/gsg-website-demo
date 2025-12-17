import { PageHeader } from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2, TrendingUp, Globe, Users } from "lucide-react"

export default function ElevatePage() {
    return (
        <main>
            <PageHeader
                title="Elevate"
                description="The ultimate launchpad for Palestinian tech and digital service companies to scale globally."
            />
            <section className="py-24 sm:py-32 bg-transparent">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Left Column: Content */}
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl">
                                Scale Your Tech Business
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-gray-700 dark:text-slate-300">
                                Elevate is a flagship initiative designed to empower Palestinian tech companies to overcome obstacles and access global markets. We provide expert advisory, talent pipelines, and direct connections to international clients.
                            </p>

                            <div className="mt-10 space-y-6">
                                <div className="flex gap-4">
                                    <div className="flex-none rounded-lg bg-blue-100/50 dark:bg-blue-900/30 p-2 text-blue-600 dark:text-blue-300 h-fit">
                                        <Users className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white">Capacity Building</h3>
                                        <p className="mt-1 text-gray-600 dark:text-slate-400">
                                            Access "Train-to-Hire" stipends to onboard fresh talent and "Upskilling" grants to train your existing team in cutting-edge technologies.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-none rounded-lg bg-purple-100/50 dark:bg-purple-900/30 p-2 text-purple-600 dark:text-purple-300 h-fit">
                                        <Globe className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white">Market Access</h3>
                                        <p className="mt-1 text-gray-600 dark:text-slate-400">
                                            Get legal support for international contracts, C-Suite coaching, and sponsorship to attend major global tech conferences like GITEX and Web Summit.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-none rounded-lg bg-orange-100/50 dark:bg-orange-900/30 p-2 text-orange-600 dark:text-orange-300 h-fit">
                                        <TrendingUp className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white">Marketing & Branding</h3>
                                        <p className="mt-1 text-gray-600 dark:text-slate-400">
                                            Revamp your digital presence with professional agency support, from SEO and content creation to complete brand strategy overhauls.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 flex gap-x-6">
                                <Link href="/contact">
                                    <Button size="lg" className="dark:bg-white dark:text-slate-900 dark:hover:bg-gray-100 font-bold">
                                        Apply for Elevate
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Right Column: Key Features / Box */}
                        <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/60 dark:border-white/10 shadow-xl ring-1 ring-black/5">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Program Highlights</h3>
                            <ul className="space-y-4">
                                {[
                                    "20-Week Intensive Growth Journey",
                                    "Direct Access to Mentors & Investors",
                                    "Subsidized Tools & Software Costs",
                                    "Legal & Compliance Assistance",
                                    "ElevateBridge: Upwork Agency Support",
                                    "Talent Recovery for Crisis-Impacted Firms"
                                ].map((item) => (
                                    <li key={item} className="flex gap-3 items-center text-gray-700 dark:text-slate-300">
                                        <CheckCircle2 className="h-5 w-5 flex-none text-secondary" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-white/10">
                                <div className="rounded-2xl bg-slate-900 dark:bg-black/40 p-6 text-center">
                                    <p className="text-slate-200 text-sm font-medium uppercase tracking-wider mb-1">Total Support Value</p>
                                    <p className="text-4xl font-black text-white">$15,000+</p>
                                    <p className="text-slate-400 text-sm mt-2">Per participating company</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
