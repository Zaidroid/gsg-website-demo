import { useTranslations } from "next-intl"
import { PhotoGallery } from "@/components/PhotoGallery";
import { PageHeader } from "@/components/ui/PageHeader";

export default function GalleryPage() {
    const t = useTranslations("GalleryPage");

    return (
        <main className="min-h-screen bg-transparent">
            <PageHeader
                title={t("header.title")}
                description={t("header.subtitle")}
            />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 sm:py-16">
                <PhotoGallery />
            </div>
        </main>
    );
}
