import { PhotoGallery } from "@/components/PhotoGallery";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata = {
    title: "Gallery | Gaza Sky Geeks",
    description: "A visual journey through our impact, events, and community.",
};

export default function GalleryPage() {
    return (
        <main className="min-h-screen bg-transparent">
            <PageHeader
                title="Our Impact in Photos"
                description="Explore the moments that define our community and our mission."
            />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-24">
                <PhotoGallery />
            </div>
        </main>
    );
}
