import { useTranslations } from "next-intl"
import { ProgramsGrid } from "@/components/home/ProgramsGrid"
import { PageHeader } from "@/components/ui/PageHeader"

export default function ProgramsPage() {
    const t = useTranslations("ProgramsPage");

    return (
        <div className="bg-transparent py-0">
            <PageHeader
                title={t("header.title")}
                description={t("header.subtitle")}
            />
            <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-4 pb-10 sm:pb-16">
                <ProgramsGrid minimal={true} />
            </div>
        </div>
    )
}
