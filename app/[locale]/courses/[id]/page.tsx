import { courses } from "@/data/courses"
import Link from "next/link"
import { notFound } from "next/navigation"

interface Props {
    params: Promise<{ id: string }>
}

export default async function CoursePage({ params }: Props) {
    const { id } = await params
    const course = courses.find((c) => c.id === id)

    if (!course) {
        notFound()
    }

    return (
        <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <Link href="/courses" className="text-sm font-semibold leading-6 text-primary hover:underline">
                        ← Back to Courses
                    </Link>
                    <div className="mt-6">
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-400">{course.category}</span>
                    </div>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">{course.title}</h1>
                    <p className="mt-6 text-xl leading-8 text-gray-700 dark:text-gray-300">{course.description}</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 border-y border-gray-200 py-8 dark:border-gray-700">
                        <div>
                            <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-white">Duration</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400">{course.duration}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-white">Level</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400">{course.level}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-white">Start Date</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400">{course.startDate}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-white">Status</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400">{course.status}</dd>
                        </div>
                    </div>

                    <div className="mt-10">
                        <button className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary w-full sm:w-auto">
                            Apply Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
