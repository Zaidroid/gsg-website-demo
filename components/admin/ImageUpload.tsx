"use client"

import { UploadDropzone } from "@uploadthing/react"
import { OurFileRouter } from "@/app/api/uploadthing/core"
import { X, ImageIcon, Loader2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface ImageUploadProps {
    value: string[]
    onChange: (url: string) => void
    onRemove: (url: string) => void
    endpoint: keyof OurFileRouter
}

export function ImageUpload({
    value,
    onChange,
    onRemove,
    endpoint
}: ImageUploadProps) {
    const [isDeleting, setIsDeleting] = useState(false)

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
        </div>
    )
}
