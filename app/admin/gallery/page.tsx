"use client"

import { useState, useEffect } from "react"
import { Loader2, Plus, Image as ImageIcon, Trash, Star, Filter, Tag, LayoutGrid, X, ExternalLink } from "lucide-react"
import Image from "next/image"
import { UploadDropzone } from "@uploadthing/react"
import type { OurFileRouter } from "@/app/api/uploadthing/core"
import { Badge } from "@/components/ui/badge"

interface GalleryImage {
    id: string
    imageUrl: string
    captionEn?: string
    captionAr?: string
    altText: string
    tags: string[]
    featured: boolean
    published: boolean
}

export default function GalleryPage() {
    const [images, setImages] = useState<GalleryImage[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedTag, setSelectedTag] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)

    useEffect(() => {
        fetchImages()
    }, [selectedTag])

    const fetchImages = async () => {
        try {
            setLoading(true)
            let url = "/api/admin/gallery"
            if (selectedTag) url += `?tag=${selectedTag}`
            const res = await fetch(url)
            const data = await res.json()
            setImages(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const deleteImage = async (id: string) => {
        if (!confirm("Are you sure you want to delete this image?")) return
        try {
            await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" })
            setImages(images.filter(img => img.id !== id))
        } catch (error) {
            alert("Error deleting image")
        }
    }

    const toggleFeatured = async (image: GalleryImage) => {
        try {
            await fetch(`/api/admin/gallery/${image.id}`, {
                method: "PATCH",
                body: JSON.stringify({ featured: !image.featured }),
                headers: { "Content-Type": "application/json" }
            })
            fetchImages()
        } catch (error) {
            alert("Error updating image")
        }
    }

    const allTags = Array.from(new Set(images.flatMap(img => img.tags)))

    return (
        <div className="space-y-8 p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gsg-navy flex items-center gap-3">
                        <ImageIcon className="w-8 h-8 text-gsg-teal" />
                        Media Gallery
                    </h1>
                    <p className="text-gray-500 text-sm">Manage website visuals, event photos, and brand assets.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsUploading(!isUploading)}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all font-semibold shadow-lg ${isUploading
                                ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                : "bg-gsg-navy text-white hover:bg-gsg-navy/90 shadow-gsg-navy/20"
                            }`}
                    >
                        {isUploading ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        {isUploading ? "Close Upload" : "Bulk Upload"}
                    </button>
                </div>
            </div>

            <hr className="border-gray-100" />

            {isUploading && (
                <div className="bg-white border-2 border-dashed border-gsg-teal/30 rounded-3xl p-8 animate-in slide-in-from-top duration-300">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg text-gsg-navy flex items-center gap-2">
                            <ImageIcon className="w-5 h-5 text-gsg-teal" />
                            Upload to Gallery
                        </h3>
                        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Max 10 files • 8MB each</p>
                    </div>
                    <UploadDropzone<OurFileRouter, "galleryUploader">
                        endpoint="galleryUploader"
                        onClientUploadComplete={async (res) => {
                            // Extract URLs and create gallery entries
                            if (res && res.length > 0) {
                                const newImages = res.map(file => ({
                                    imageUrl: file.url,
                                    altText: file.name,
                                    tags: ["Uncategorized"],
                                    featured: false,
                                    published: true
                                }))

                                try {
                                    await fetch("/api/admin/gallery", {
                                        method: "POST",
                                        body: JSON.stringify(newImages),
                                        headers: { "Content-Type": "application/json" }
                                    })
                                    fetchImages()
                                    setIsUploading(false)
                                    alert(`${res.length} images uploaded and saved!`)
                                } catch (error) {
                                    alert("Error saving image data")
                                }
                            }
                        }}
                        onUploadError={(error: Error) => {
                            alert(`Upload failed: ${error.message}`)
                        }}
                        className="ut-label:text-gsg-navy ut-button:bg-gsg-teal ut-button:ut-readying:bg-gsg-teal/50 ut-button:ut-uploading:bg-gsg-teal/50 border-gray-200"
                    />
                </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
                <button
                    onClick={() => setSelectedTag(null)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${selectedTag === null ? "bg-gsg-navy text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                >
                    <LayoutGrid className="w-4 h-4" />
                    All Images
                </button>
                {allTags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${selectedTag === tag ? "bg-gsg-teal text-white" : "bg-gray-100 text-gray-600 hover:bg-gsg-teal/10 hover:text-gsg-teal"
                            }`}
                    >
                        <Tag className="w-3 h-3" />
                        {tag}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className="group relative bg-white rounded-3xl border border-gray-100 overflow-hidden hover:border-gsg-teal/30 hover:shadow-xl transition-all duration-500"
                    >
                        <div className="relative aspect-square">
                            <Image
                                fill
                                src={image.imageUrl}
                                alt={image.altText || "Gallery Image"}
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <p className="text-white font-semibold text-sm line-clamp-2">{image.captionEn || image.altText}</p>
                            </div>

                            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                <button
                                    onClick={() => deleteImage(image.id)}
                                    className="p-2 bg-white/90 backdrop-blur-md text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg"
                                >
                                    <Trash className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => toggleFeatured(image)}
                                    className={`p-2 backdrop-blur-md rounded-xl shadow-lg transition-all ${image.featured
                                            ? "bg-gsg-teal text-white"
                                            : "bg-white/90 text-gray-400 hover:text-gsg-teal"
                                        }`}
                                >
                                    <Star className={`w-4 h-4 ${image.featured ? "fill-white" : ""}`} />
                                </button>
                                <a
                                    href={image.imageUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-2 bg-white/90 backdrop-blur-md text-gsg-navy rounded-xl hover:bg-gsg-navy hover:text-white transition-all shadow-lg"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                        <div className="p-4 flex flex-wrap gap-1">
                            {image.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="text-[10px] bg-gray-50/50">{tag}</Badge>
                            ))}
                        </div>
                    </div>
                ))}

                {images.length === 0 && !loading && (
                    <div className="col-span-full py-20 text-center bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200">
                        <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-600">Your gallery is empty</h3>
                        <p className="text-gray-400 max-w-sm mx-auto mt-2">Upload your first set of images to build your visual library.</p>
                    </div>
                )}
            </div>

            {loading && (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 animate-spin text-gsg-teal" />
                </div>
            )}
        </div>
    )
}
