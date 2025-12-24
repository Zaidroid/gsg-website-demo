import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const f = createUploadthing();

const auth = async () => {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") throw new Error("Unauthorized");
    return { userId: session.user.id };
};

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(async () => await auth())
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete for userId:", metadata.userId);
            console.log("File URL", file.url);
            return { uploadedBy: metadata.userId, url: file.url };
        }),
    galleryUploader: f({ image: { maxFileSize: "8MB", maxFileCount: 10 } })
        .middleware(async () => await auth())
        .onUploadComplete(async ({ metadata, file }) => {
            return { uploadedBy: metadata.userId, url: file.url };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
