
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth-helpers"
import * as z from "zod"

const heroSchema = z.object({
    titleEn: z.string().min(1, "Title (EN) is required"),
    titleAr: z.string().min(1, "Title (AR) is required"),
    subtitleEn: z.string().min(1, "Subtitle (EN) is required"),
    subtitleAr: z.string().min(1, "Subtitle (AR) is required"),
    typewriterEn: z.array(z.string()).min(1, "At least one typewriter text (EN) is required"),
    typewriterAr: z.array(z.string()).min(1, "At least one typewriter text (AR) is required"),
    ctaTextEn: z.string().min(1, "CTA Text (EN) is required"),
    ctaTextAr: z.string().min(1, "CTA Text (AR) is required"),
    ctaLink: z.string().min(1, "CTA Link is required"),
    secondaryCtaTextEn: z.string().optional(),
    secondaryCtaTextAr: z.string().optional(),
    secondaryCtaLink: z.string().optional(),
    videoUrl: z.string().optional(),
})

export async function GET() {
    try {
        const hero = await prisma.heroSection.findFirst({
            orderBy: { updatedAt: 'desc' }
        });

        // Return default values if no record exists
        if (!hero) {
            return NextResponse.json({
                titleEn: "Building a Vibrant",
                titleAr: "بناء مستقبل",
                subtitleEn: "Gaza Sky Geeks is the leading tech hub in Palestine. We weave a network of freelancers, founders, and coders to build a better future.",
                subtitleAr: "غزة سكاي جيكس هي المركز التكنولوجي الرائد في فلسطين. نحن ننسج شبكة من المستقلين والمؤسسين والمبرمجين لبناء مستقبل أفضل.",
                typewriterEn: ["Digital Economy", "Tech Ecosystem", "Resilient Future"],
                typewriterAr: ["رقمي مزدهر", "تكنولوجي متكامل", "مرن وواعد"],
                ctaTextEn: "Explore Programs",
                ctaTextAr: "استكشف برامجنا",
                ctaLink: "/programs",
                secondaryCtaTextEn: "Our Story",
                secondaryCtaTextAr: "قصتنا",
                secondaryCtaLink: "/about",
                videoUrl: ""
            })
        }

        return NextResponse.json(hero);
    } catch (error) {
        console.error("Error fetching hero:", error);
        return NextResponse.json({ error: "Failed to fetch hero content" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        await requireAdmin();
        const body = await req.json();

        const validatedData = heroSchema.parse(body);

        // Check if a record exists
        const existing = await prisma.heroSection.findFirst();

        let hero;
        if (existing) {
            hero = await prisma.heroSection.update({
                where: { id: existing.id },
                data: validatedData
            });
        } else {
            hero = await prisma.heroSection.create({
                data: validatedData
            });
        }

        return NextResponse.json(hero);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: "Validation error", details: error.errors }, { status: 400 });
        }
        console.error("Error updating hero:", error);
        return NextResponse.json({ error: "Failed to update hero content" }, { status: 500 });
    }
}
