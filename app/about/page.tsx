import { Timeline } from "@/components/about/Timeline"
import { PageHeader } from "@/components/ui/PageHeader"

export default function AboutPage() {
    return (
        <div className="bg-transparent">
            <PageHeader
                title="About Gaza Sky Geeks"
                description="We are building a resilient, inclusive, and world-class tech ecosystem."
            />

            {/* Mission Values Section */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="rounded-2xl bg-white dark:bg-slate-900 p-8 shadow-sm border border-gray-100 dark:border-slate-800 hover:border-secondary/20 transition-colors">
                        <h3 className="text-xl font-bold text-primary dark:text-white mb-4">Our Mission</h3>
                        <p className="text-gray-600 dark:text-slate-400 leading-7">To provide the resources, mentorship, and network needed for Palestinians to participate in the global digital economy.</p>
                    </div>
                    <div className="rounded-2xl bg-white dark:bg-slate-900 p-8 shadow-sm border border-gray-100 dark:border-slate-800 hover:border-secondary/20 transition-colors">
                        <h3 className="text-xl font-bold text-primary dark:text-white mb-4">Our Vision</h3>
                        <p className="text-gray-600 dark:text-slate-400 leading-7">A Palestine where any talented individual can build a career or startup that competes globally, regardless of location.</p>
                    </div>
                    <div className="rounded-2xl bg-white dark:bg-slate-900 p-8 shadow-sm border border-gray-100 dark:border-slate-800 hover:border-secondary/20 transition-colors">
                        <h3 className="text-xl font-bold text-primary dark:text-white mb-4">Our Values</h3>
                        <ul className="list-disc list-inside text-gray-600 dark:text-slate-400 space-y-2 leading-7">
                            <li>Community First</li>
                            <li>Pay it Forward</li>
                            <li>Resilience</li>
                            <li>Global Excellence</li>
                        </ul>
                    </div>
                </div>
            </div>

            <Timeline />
        </div>
    )
}
