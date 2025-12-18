"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const CatalogueViewer = dynamic(() => import("@/components/CatalogueViewer"), {
    ssr: false,
    loading: () => <div className="text-white">Loading Viewer...</div>,
});

export default function CataloguePage() {
    return (
        <CatalogueViewer pdfUrl="/catalogue.pdf" />
    );
}
