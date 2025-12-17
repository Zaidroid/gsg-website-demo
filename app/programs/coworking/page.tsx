import { PageHeader } from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Building2, Wifi, Coffee, Users } from "lucide-react"

export default function CoworkingPage() {
    return (
        <main className="bg-transparent min-h-screen">
            <PageHeader
                title="Co-working Spaces"
                description="Vibrant, high-tech hubs for innovation and collaboration."
            />
            <section className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl">
                            A Home for Techies
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-700 dark:text-slate-300">
                            Our hubs in Gaza and the West Bank provide reliable electricity, high-speed internet, and a supportive community for freelancers, startups, and remote workers.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Wifi,
                                title: "High-Speed Internet",
                                desc: "Fiber-optic connection designed for heavy technical work and video calls."
                            },
                            {
                                icon: Coffee,
                                title: "Modern Amenities",
                                desc: "Comfortable workstations, meeting rooms, and free coffee to keep you fueled."
                            },
                            {
                                icon: Users,
                                title: "Community",
                                desc: "Connect with like-minded developers, designers, and entrepreneurs."
                            }
                        ].map((feature) => (
                            <div key={feature.title} className="flex flex-col items-center text-center p-6 rounded-3xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/50 dark:border-white/10 shadow-lg">
                                <div className="mb-4 p-3 rounded-full bg-secondary/10 text-secondary">
                                    <feature.icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-slate-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 bg-white/30 dark:bg-slate-900/30 rounded-3xl p-8 lg:p-12 border border-white/40 dark:border-white/5 flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Visit Our Hubs</h3>
                            <p className="mt-2 text-gray-700 dark:text-slate-300 max-w-xl">
                                Whether you need a hot desk for a day or a private office for your team, we have flexible membership plans to suit your needs.
                            </p>
                        </div>
                        <Link href="/contact">
                            <Button size="lg" className="dark:bg-white dark:text-slate-900 dark:hover:bg-gray-100 font-bold whitespace-nowrap">
                                Book a Tour
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
