import { PageHeader } from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CodeAcademyPage() {
    return (
        <main>
            <PageHeader
                title="Code Academy"
                description="Immersive coding bootcamps to launch your career as a full-stack developer."
            />
            <section className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Become a Full Stack Developer</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Our immersive 6-month coding bootcamp is designed to take you from a beginner to a job-ready software engineer. You will learn the latest technologies, work on real-world projects, and get connected with top employers.
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
