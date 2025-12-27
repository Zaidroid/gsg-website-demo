"use client"

import { UploadDropzone } from "@uploadthing/react"
import { OurFileRouter } from "@/app/api/uploadthing/core"
import { X, ImageIcon, Loader2, Check } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
    value: string[]
    onChange: (url: string) => void
    onRemove: (url: string) => void
    endpoint: keyof OurFileRouter
}

interface GalleryImage {
    id: string
    imageUrl: string
    altText?: string
}

export function ImageUpload({
    value,
    onChange,
    onRemove,
    endpoint
}: ImageUploadProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
    const [isLoadingGallery, setIsLoadingGallery] = useState(false)

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                setIsLoadingGallery(true)
                const res = await fetch('/api/admin/gallery')
                if (res.ok) {
                    const data = await res.json()
                    setGalleryImages(data)
                }
            } catch (error) {
                console.error("Failed to fetch gallery:", error)
            } finally {
                setIsLoadingGallery(false)
            }
        }

        fetchGallery()
    }, [])

    return (
        <div className="space-y-4 w-full">
            <div className="flex flex-wrap gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-xl overflow-hidden shadow-sm border border-gray-100 group">
                        <div className="z-10 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                type="button"
                                onClick={() => onRemove(url)}
                                className="bg-red-500 text-white p-1.5 rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={url}
                        />
                    </div>
                ))}
            </div>

            <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="upload">Upload New</TabsTrigger>
                    <TabsTrigger value="gallery">Select from Gallery</TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="mt-0">
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-1 bg-gray-50/30 hover:bg-gray-50/50 transition-colors">
                        <UploadDropzone<OurFileRouter, typeof endpoint>
                            endpoint={endpoint}
                            onClientUploadComplete={(res) => {
                                onChange(res?.[0].url)
                            }}
                            onUploadError={(error: Error) => {
                                console.error("Upload error:", error)
                                alert("Error uploading image")
                            }}
                            content={{
                                label: "Drag & drop an image or click to browse",
                                allowedContent: "Image up to 4MB",
                            }}
                            appearance={{
                                container: "py-8",
                                label: "text-gsg-navy font-semibold text-sm",
                                allowedContent: "text-gray-400 text-xs",
                                button: "bg-gsg-navy hover:bg-gsg-navy/90 text-sm px-4 py-2 rounded-lg transition-colors",
                            }}
                        />
                    </div>
                </TabsContent>

                <TabsContent value="gallery" className="mt-0">
                    <div className="border border-gray-200 rounded-xl p-4 bg-white min-h-[300px]">
                        {isLoadingGallery ? (
                            <div className="flex items-center justify-center h-full min-h-[200px]">
                                <Loader2 className="w-8 h-8 animate-spin text-gsg-teal" />
                            </div>
                        ) : galleryImages.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto p-1">
                                {galleryImages.map((image) => (
                                    <button
                                        key={image.id}
                                        type="button"
                                        onClick={() => onChange(image.imageUrl)}
                                        className={cn(
                                            "relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-[1.02]",
                                            value.includes(image.imageUrl)
                                                ? "border-gsg-teal ring-2 ring-gsg-teal/20"
                                                : "border-transparent hover:border-gray-200"
                                        )}
                                    >
                                        <Image
                                            src={image.imageUrl}
                                            alt={image.altText || "Gallery image"}
                                            fill
                                            className="object-cover"
                                        />
                                        {value.includes(image.imageUrl) && (
                                            <div className="absolute inset-0 bg-gsg-teal/20 flex items-center justify-center">
                                                <div className="bg-white rounded-full p-1 shadow-sm">
                                                    <Check className="w-4 h-4 text-gsg-teal" />
                                                </div>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-gray-400 gap-2">
                                <ImageIcon className="w-8 h-8" />
                                <p className="text-sm">No images found in gallery</p>
                            </div>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
