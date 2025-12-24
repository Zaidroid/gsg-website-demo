import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth-helpers"

// Static Data Imports
import { courses } from "@/data/courses"
import { events } from "@/data/events"
import { stories } from "@/data/stories"

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

export async function POST() {
    try {
        await requireAdmin()

        const enPath = path.join(process.cwd(), "messages", "en.json")
        const arPath = path.join(process.cwd(), "messages", "ar.json")

        const en = JSON.parse(await fs.readFile(enPath, "utf-8"))
        const ar = JSON.parse(await fs.readFile(arPath, "utf-8"))

        const results: any = {
            courses: 0,
            events: 0,
            stories: 0,
            programs: 0,
            impact: 0,
            gallery: 0
        }

        // 1. Migrate Courses
        for (const course of courses) {
            await prisma.course.upsert({
                where: { courseId: course.id },
                update: {
                    courseId: course.id,
                    titleEn: en.CoursesPage.data[course.id]?.title || course.title,
                    titleAr: ar.CoursesPage.data[course.id]?.title || course.title,
                    descriptionEn: en.CoursesPage.data[course.id]?.description || course.description,
                    descriptionAr: ar.CoursesPage.data[course.id]?.description || course.description,
                    category: course.category,
                    level: course.level,
                    duration: course.duration,
                    startDate: new Date(course.startDate),
                    status: course.status,
                    published: true
                },
                create: {
                    courseId: course.id,
                    titleEn: en.CoursesPage.data[course.id]?.title || course.title,
                    titleAr: ar.CoursesPage.data[course.id]?.title || course.title,
                    descriptionEn: en.CoursesPage.data[course.id]?.description || course.description,
                    descriptionAr: ar.CoursesPage.data[course.id]?.description || course.description,
                    category: course.category,
                    level: course.level,
                    duration: course.duration,
                    startDate: new Date(course.startDate),
                    status: course.status,
                    published: true
                }
            })
            results.courses++
        }

        // 2. Migrate Events
        for (const event of events) {
            await prisma.event.upsert({
                where: { eventId: event.id },
                update: {
                    eventId: event.id,
                    titleEn: en.EventsPage.data[event.id]?.title || event.title,
                    titleAr: ar.EventsPage.data[event.id]?.title || event.title,
                    descriptionEn: en.EventsPage.data[event.id]?.description || event.description,
                    descriptionAr: ar.EventsPage.data[event.id]?.description || event.description,
                    date: new Date(event.date),
                    location: event.location,
                    type: event.type,
                    status: event.status,
                    published: true
                },
                create: {
                    eventId: event.id,
                    titleEn: en.EventsPage.data[event.id]?.title || event.title,
                    titleAr: ar.EventsPage.data[event.id]?.title || event.title,
                    descriptionEn: en.EventsPage.data[event.id]?.description || event.description,
                    descriptionAr: ar.EventsPage.data[event.id]?.description || event.description,
                    date: new Date(event.date),
                    location: event.location,
                    type: event.type,
                    status: event.status,
                    published: true
                }
            })
            results.events++
        }

        // 3. Migrate Stories
        for (const story of stories) {
            await prisma.story.upsert({
                where: { storyId: story.id },
                update: {
                    titleEn: story.title,
                    titleAr: story.title,
                    challengeEn: story.challenge,
                    challengeAr: story.challenge,
                    solutionEn: story.solution,
                    solutionAr: story.solution,
                    clientEn: story.client,
                    clientAr: story.client,
                    resultEn: story.result,
                    resultAr: story.result,
                    imageUrl: story.image,
                    published: true
                },
                create: {
                    storyId: story.id,
                    titleEn: story.title,
                    titleAr: story.title,
                    challengeEn: story.challenge,
                    challengeAr: story.challenge,
                    solutionEn: story.solution,
                    solutionAr: story.solution,
                    clientEn: story.client,
                    clientAr: story.client,
                    resultEn: story.result,
                    resultAr: story.result,
                    imageUrl: story.image,
                    published: true
                }
            })
            results.stories++
        }

        // 4. Migrate Programs
        const programIds = ["elevate", "code_academy", "freelance_academy", "coworking", "employability", "geexelerator"]
        for (const pId of programIds) {
            const pDataEn = en.ProgramsPage[pId]
            const pDataAr = ar.ProgramsPage[pId]

            if (pDataEn && pDataAr) {
                await prisma.program.upsert({
                    where: { programId: pId.replace("_", "-") },
                    update: {
                        titleEn: pDataEn.header.title,
                        titleAr: pDataAr.header.title,
                        headerDescEn: pDataEn.header.description,
                        headerDescAr: pDataAr.header.description,
                        contentTitleEn: pDataEn.content?.title || pDataEn.header.title,
                        contentTitleAr: pDataAr.content?.title || pDataAr.header.title,
                        contentDescEn: pDataEn.content?.description || "",
                        contentDescAr: pDataAr.content?.description || "",
                        highlightsEn: pDataEn.highlights?.items || [],
                        highlightsAr: pDataAr.highlights?.items || [],
                        ctaTextEn: pDataEn.cta || "Apply Now",
                        ctaTextAr: pDataAr.cta || "قدم الآن",
                        ctaLink: "#",
                        published: true
                    },
                    create: {
                        programId: pId.replace("_", "-"),
                        titleEn: pDataEn.header.title,
                        titleAr: pDataAr.header.title,
                        headerDescEn: pDataEn.header.description,
                        headerDescAr: pDataAr.header.description,
                        contentTitleEn: pDataEn.content?.title || pDataEn.header.title,
                        contentTitleAr: pDataAr.content?.title || pDataAr.header.title,
                        contentDescEn: pDataEn.content?.description || "",
                        contentDescAr: pDataAr.content?.description || "",
                        highlightsEn: pDataEn.highlights?.items || [],
                        highlightsAr: pDataAr.highlights?.items || [],
                        ctaTextEn: pDataEn.cta || "Apply Now",
                        ctaTextAr: pDataAr.cta || "قدم الآن",
                        ctaLink: "#",
                        published: true
                    }
                })
                results.programs++
            }
        }

        // 5. Migrate Impact Stats
        const stats = en.HomePage.impact.stats
        const statsAr = ar.HomePage.impact.stats
        const statKeys = Object.keys(stats)
        let order = 1
        for (const key of statKeys) {
            await prisma.impactStat.upsert({
                where: { statKey: key },
                update: {
                    labelEn: stats[key],
                    labelAr: statsAr[key],
                    value: "0+",
                    order: order++,
                    published: true
                },
                create: {
                    statKey: key,
                    labelEn: stats[key],
                    labelAr: statsAr[key],
                    value: "0+",
                    order: order++,
                    published: true
                }
            })
            results.impact++
        }

        // 6. Migrate Gallery
        for (const photo of photos) {
            const imageUrl = `/images/gallery/${photo.src}`
            const existing = await prisma.galleryImage.findFirst({
                where: { imageUrl }
            })

            if (existing) {
                await prisma.galleryImage.update({
                    where: { id: existing.id },
                    data: {
                        captionEn: photo.title,
                        captionAr: photo.title,
                        altText: photo.title,
                        published: true
                    }
                })
            } else {
                await prisma.galleryImage.create({
                    data: {
                        imageUrl,
                        captionEn: photo.title,
                        captionAr: photo.title,
                        altText: photo.title,
                        published: true
                    }
                })
            }
            results.gallery++
        }

        return NextResponse.json({ message: "Migration complete", results })
    } catch (error: any) {
        console.error("Migration error:", error)
        return NextResponse.json({ error: "Migration failed", details: error.message }, { status: 500 })
    }
}
