import { ProgramsGrid } from "@/components/home/ProgramsGrid"
import { PageHeader } from "@/components/ui/PageHeader"

export default function ProgramsPage() {
    return (
        <div className="bg-transparent py-0">
            <PageHeader
                title="Our Programs"
                description="Whether you are a beginner coder, a freelancer, or a startup founder, we have a path for you."
            />
            <div className="mt-8">
                <ProgramsGrid minimal={true} />
            </div>
        </div>
    )
}
