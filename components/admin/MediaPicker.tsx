"use client"

import { useState, useEffect } from "react"
import { Search, Image as ImageIcon, Check, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface MediaItem {
    id: string
    imageUrl: string
    altText: string
    captionEn?: string
}

interface MediaPickerProps {
    onSelect: (imageUrl: string) => void
    onClose: () => void
    currentValue?: string
}

export default function MediaPicker({ onSelect, onClose, currentValue }: MediaPickerProps) {
    const [images, setImages] = useState<MediaItem[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetchImages()
    }, [])

    const fetchImages = async () => {
        try {
            const res = await fetch("/api/admin/gallery")
            const data = await res.json()
            setImages(data)
        } catch (error) {
            console.error("Failed to fetch gallery:", error)
        } finally {
            setLoading(false)
        }
    }

    const filteredImages = images.filter(img =>
        (img.altText + (img.captionEn || "")).toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gsg-navy/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-4xl max-h-[85vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-100">
                {/* Header */}
                <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-gsg-navy flex items-center gap-2">
                            <ImageIcon className="w-5 h-5 text-gsg-teal" />
                            Media Picker
                        </h2>
                        <p className="text-xs text-gray-400 font-medium">Select an image from your gallery.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-all text-gray-400">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Toolbar */}
                <div className="p-4 border-b border-gray-50">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search images by alt text or caption..."
                            className="w-full pl-11 pr-4 py-2 bg-gray-50/50 border border-transparent rounded-xl focus:ring-2 focus:ring-gsg-teal/10 focus:bg-white focus:border-gsg-teal/20 transition-all text-sm font-medium"
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto p-6">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
                            <Loader2 className="w-8 h-8 animate-spin text-gsg-teal" />
                            <p className="text-sm font-medium">Loading your gallery...</p>
                        </div>
                    ) : filteredImages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                            <ImageIcon className="w-12 h-12 opacity-10 mb-4" />
                            <p className="text-sm font-medium">No images found matching your search.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {filteredImages.map(img => (
                                <button
                                    key={img.id}
                                    onClick={() => onSelect(img.imageUrl)}
                                    className={cn(
                                        "group relative aspect-square rounded-2xl overflow-hidden border-2 transition-all hover:scale-[1.02]",
                                        currentValue === img.imageUrl ? "border-gsg-teal ring-4 ring-gsg-teal/10" : "border-transparent hover:border-gray-100"
                                    )}
                                >
                                    <img
                                        src={img.imageUrl}
                                        alt={img.altText}
                                        className="w-full h-full object-cover"
                                    />
                                    {currentValue === img.imageUrl && (
                                        <div className="absolute inset-0 bg-gsg-teal/20 flex items-center justify-center">
                                            <div className="bg-gsg-teal p-1.5 rounded-full shadow-lg">
                                                <Check className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                                        <p className="text-[10px] text-white font-medium truncate">{img.altText}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-50 bg-gray-50/30 flex justify-end gap-3">
                    <button onClick={onClose} className="px-6 py-2 text-sm font-bold text-gray-500 hover:text-gsg-navy">Cancel</button>
                    <button
                        disabled={!currentValue}
                        onClick={onClose}
                        className="px-8 py-2 bg-gsg-teal text-white rounded-xl text-sm font-bold shadow-lg shadow-gsg-teal/20 disabled:opacity-50"
                    >
                        Pick Selected
                    </button>
                </div>
            </div>
        </div>
    )
}
