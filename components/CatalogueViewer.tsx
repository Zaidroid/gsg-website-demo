"use client";

import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, X } from "lucide-react";

// Configure worker
// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs`;

interface CatalogueViewerProps {
    pdfUrl: string;
    onClose?: () => void;
}

export default function CatalogueViewer({ pdfUrl, onClose }: CatalogueViewerProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const book = useRef<any>(null);
    const [pageNumber, setPageNumber] = useState(0); // 0-indexed for cover

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setLoading(false);
    }

    const nextFlip = () => {
        book.current?.pageFlip()?.flipNext();
    };

    const prevFlip = () => {
        book.current?.pageFlip()?.flipPrev();
    };

    return (
        <div className="flex flex-col items-center justify-center w-full relative z-10">
            {/* Controls */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-primary dark:text-white px-6 py-3 rounded-full flex items-center gap-6 shadow-xl border border-white/50 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/10 transition-colors">
                <button
                    onClick={prevFlip}
                    className="hover:text-blue-400 dark:hover:text-sky-400 transition-colors p-1"
                    title="Previous Page"
                >
                    <ChevronLeft size={24} />
                </button>

                <span className="text-sm font-medium tabular-nums min-w-[60px] text-center">
                    {pageNumber + 1} / {numPages}
                </span>

                <button
                    onClick={nextFlip}
                    className="hover:text-blue-400 dark:hover:text-sky-400 transition-colors p-1"
                    title="Next Page"
                >
                    <ChevronRight size={24} />
                </button>

                <div className="w-px h-6 bg-primary/20 mx-2" />

                <a
                    href={pdfUrl}
                    download
                    className="hover:text-secondary transition-colors flex items-center gap-2 text-sm font-bold"
                >
                    <Download size={20} />
                    <span className="hidden sm:inline">Download</span>
                </a>

                {onClose && (
                    <>
                        <div className="w-px h-6 bg-primary/20 mx-2" />
                        <button
                            onClick={onClose}
                            className="hover:text-red-500 transition-colors p-1"
                            title="Close"
                        >
                            <X size={24} />
                        </button>
                    </>
                )}
            </div>

            <div className="relative w-full max-w-5xl flex justify-center items-center px-4 md:px-0">
                <Document
                    file={pdfUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="flex justify-center w-full"
                    loading={
                        <div className="flex items-center gap-3 text-white">
                            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Loading Catalogue...
                        </div>
                    }
                >
                    {/* @ts-expect-error - React-pageflip has strict type issues with children */}
                    <HTMLFlipBook
                        width={500}
                        height={707} // A4 Aspect Ratio (1 : 1.414)
                        size="stretch"
                        minWidth={300}
                        maxWidth={1100} // Constrain max width
                        minHeight={424}
                        maxHeight={1000}
                        maxShadowOpacity={0.5}
                        showCover={true}
                        mobileScrollSupport={true}
                        className="shadow-2xl mx-auto"
                        ref={book}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onFlip={(e: any) => setPageNumber(e.data)}
                    >
                        {/* Pages */}
                        {Array.from(new Array(numPages), (el, index) => (
                            <div key={`page-${index}`} className="bg-white overflow-hidden shadow-inner flex justify-center items-center">
                                <Page
                                    pageNumber={index + 1}
                                    width={500}
                                    renderAnnotationLayer={false}
                                    renderTextLayer={false}
                                    className="h-full w-full object-contain"
                                />
                            </div>
                        ))}
                    </HTMLFlipBook>
                </Document>
            </div>

            <p className="text-white/50 text-sm mt-8 animate-pulse text-center px-4">
                Click corners or drag to flip pages • Use arrow keys
            </p>
        </div>
    );
}
