"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

const photos = [
    { src: "374461007_854578499565513_5654737901956018539_n.jpg", title: "Community Event" },
    { src: "376402742_854578049565558_6814262380504550582_n.jpg", title: "Workshop Session" },
    { src: "376877056_854578032898893_5235307632516517199_n.jpg", title: "Team Collaboration" },
    { src: "3V4A9195 copy.jpg", title: "Tech Education" },
    { src: "CLO_8657.jpg", title: "Coding Bootcamp" },
    { src: "CLO_8753.jpg", title: "Mentorship Support" },
    { src: "Copy of EVE_0175 (1).jpg", title: "Women in Tech" },
    { src: "EVE_0628 (2).jpg", title: "Networking Night" },
    { src: "EVE_1713.jpg", title: "Tech Talk" },
    { src: "GRA_1924.jpg", title: "Graduation Ceremony" },
    { src: "GRA_2810.jpg", title: "Celebrating Success" },
    { src: "GRA_6393.jpg", title: "Alumni Gathering" },
    { src: "GRA_67A6977.jpg", title: "Panel Discussion" },
    { src: "GRA_7098.jpg", title: "Future Leaders" },
    { src: "freelancing graduation 2.jfif", title: "Freelancing Graduates" },
    { src: "girl smiling.jpg", title: "Empowered Youth" },
    { src: "packaging.jpg", title: "Product Launch" },
];

export function PhotoGallery() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                {photos.map((photo, index) => (
                    <motion.div
                        key={photo.src}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="relative break-inside-avoid overflow-hidden rounded-xl shadow-lg cursor-zoom-in group"
                        onClick={() => setSelectedImage(photo.src)}
                    >
                        <div className="relative w-full">
                            <Image
                                src={`/images/gallery/${photo.src}`}
                                alt={photo.title}
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Caption/Title */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                                <h3 className="text-white font-bold text-lg">{photo.title}</h3>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox / Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
                    >
                        <X size={40} />
                    </button>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={`/images/gallery/${selectedImage}`}
                            alt="Impact Photo"
                            fill
                            className="object-contain"
                            sizes="100vw"
                        />
                    </motion.div>
                </div>
            )}
        </>
    );
}
