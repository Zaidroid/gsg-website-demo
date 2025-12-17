import { PageHeader } from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FreelanceAcademyPage() {
    return (
        <main>
            <PageHeader
                title="Freelance Academy"
                description="Learn how to work with international clients and earn income online."
            />
            <section className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Work from Anywhere</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            The Freelance Academy provides training and mentorship to help you build a successful freelancing career. Learn how to find clients, pitch your services, and deliver high-quality work on global platforms.
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
