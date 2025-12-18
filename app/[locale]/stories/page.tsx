"use client"

import { stories } from "@/data/stories"

export default function StoriesPage() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-6xl">Success Stories</h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        See how GSG talent is transforming businesses locally and globally.
                    </p>
                </div>

                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    {stories.map((story) => (
                        <article key={story.id} className="flex flex-col items-start justify-between bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="max-w-xl">
                                <div className="mt-0 text-sm font-bold leading-6 text-secondary">{story.client}</div>
                                <h3 className="mt-3 text-2xl font-bold leading-6 text-primary">
                                    {story.title}
                                </h3>

                                <div className="mt-6 space-y-4 text-base leading-7 text-gray-600">
                                    <div>
                                        <strong className="font-semibold text-primary">Challenge:</strong> {story.challenge}
                                    </div>
                                    <div>
                                        <strong className="font-semibold text-primary">Solution:</strong> {story.solution}
                                    </div>
                                    <div className="border-l-4 border-green-500 pl-4 italic text-gray-700 bg-white p-4 rounded-r-lg shadow-sm">
                                        "{story.result}"
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    )
}
