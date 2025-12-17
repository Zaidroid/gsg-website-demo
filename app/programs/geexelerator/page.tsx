import { PageHeader } from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function GeeXeleratorPage() {
    return (
        <main>
            <PageHeader
                title="GeeXelerator"
                description="Startup acceleration for pre-seed tech startups in Palestine."
            />
            <section className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Build Your Startup</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            GeeXelerator is the first program of its kind in Gaza. We help early-stage startups validate their ideas, build their products, and get ready for investment through mentorship, funding, and access to a global network.
                        </p>
                        <div className="mt-10 flex gap-x-6">
                            <Link href="/contact">
                                <Button size="lg" className="dark:bg-white dark:text-slate-900 dark:hover:bg-gray-100 font-bold">Apply Now</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
