import { z } from "zod"

// Course Schema
export const courseSchema = z.object({
    courseId: z.string().min(1, "Course ID is required"),
    titleEn: z.string().min(1, "English title is required"),
    titleAr: z.string().min(1, "Arabic title is required"),
    descriptionEn: z.string().min(1, "English description is required"),
    descriptionAr: z.string().min(1, "Arabic description is required"),
    category: z.enum(["Frontend", "Backend", "Fullstack", "Design", "Soft Skills"]),
    level: z.enum(["Beginner", "Intermediate", "Advanced"]),
    duration: z.string().min(1, "Duration is required"),
    startDate: z.string().or(z.date()),
    status: z.enum(["Open", "Closed", "Upcoming"]),
    published: z.boolean().default(true),
})

// Event Schema
export const eventSchema = z.object({
    eventId: z.string().min(1, "Event ID is required"),
    titleEn: z.string().min(1, "English title is required"),
    titleAr: z.string().min(1, "Arabic title is required"),
    descriptionEn: z.string().min(1, "English description is required"),
    descriptionAr: z.string().min(1, "Arabic description is required"),
    date: z.string().or(z.date()),
    location: z.string().min(1, "Location is required"),
    type: z.enum(["Workshop", "Meetup", "Hackathon"]),
    status: z.enum(["Open", "Registration Required", "Finished"]),
    published: z.boolean().default(true),
})

// Story Schema
export const storySchema = z.object({
    storyId: z.string().min(1, "Story ID is required"),
    titleEn: z.string().min(1, "English title is required"),
    titleAr: z.string().min(1, "Arabic title is required"),
    clientEn: z.string().min(1, "English client name is required"),
    clientAr: z.string().min(1, "Arabic client name is required"),
    challengeEn: z.string().min(1, "English challenge is required"),
    challengeAr: z.string().min(1, "Arabic challenge is required"),
    solutionEn: z.string().min(1, "English solution is required"),
    solutionAr: z.string().min(1, "Arabic solution is required"),
    resultEn: z.string().min(1, "English result is required"),
    resultAr: z.string().min(1, "Arabic result is required"),
    imageUrl: z.string().url("Valid image URL is required"),
    featured: z.boolean().default(false),
    published: z.boolean().default(true),
})

// Gallery Image Schema
export const galleryImageSchema = z.object({
    imageUrl: z.string().url("Valid image URL is required"),
    captionEn: z.string().optional(),
    captionAr: z.string().optional(),
    altText: z.string().min(1, "Alt text is required for accessibility"),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    published: z.boolean().default(true),
})

// Impact Stat Schema
export const impactStatSchema = z.object({
    statKey: z.string().min(1),
    labelEn: z.string().min(1),
    labelAr: z.string().min(1),
    value: z.string().min(1),
    order: z.number().int(),
    published: z.boolean().default(true),
})

// Program Schema
export const programSchema = z.object({
    programId: z.string().min(1),
    titleEn: z.string().min(1),
    titleAr: z.string().min(1),
    headerDescEn: z.string().min(1),
    headerDescAr: z.string().min(1),
    contentTitleEn: z.string().min(1),
    contentTitleAr: z.string().min(1),
    contentDescEn: z.string().min(1),
    contentDescAr: z.string().min(1),
    highlightsEn: z.array(z.string()),
    highlightsAr: z.array(z.string()),
    ctaTextEn: z.string().min(1),
    ctaTextAr: z.string().min(1),
    ctaLink: z.string().optional().nullable().or(z.literal('')),
    imageUrl: z.string().optional().nullable().or(z.literal('')),
    featured: z.boolean().default(false),
    published: z.boolean().default(true),
})

// Site Settings Schema
export const siteSettingsSchema = z.object({
    settingKey: z.string().min(1),
    settingValue: z.string(), // Removed .min(1) to allow empty values for some settings
})

// Menu Item Schema
export const menuItemSchema = z.object({
    nameEn: z.string().min(1),
    nameAr: z.string().min(1),
    href: z.string().min(1),
    order: z.number().int(),
    location: z.enum(["Navbar", "Footer"]),
    published: z.boolean().default(true),
})

// About Page Content Schema
export const aboutContentSchema = z.object({
    headerTitleEn: z.string().min(1),
    headerTitleAr: z.string().min(1),
    headerDescEn: z.string().min(1),
    headerDescAr: z.string().min(1),
    missionTitleEn: z.string().min(1),
    missionTitleAr: z.string().min(1),
    missionDescEn: z.string().min(1),
    missionDescAr: z.string().min(1),
    visionTitleEn: z.string().min(1),
    visionTitleAr: z.string().min(1),
    visionDescEn: z.string().min(1),
    visionDescAr: z.string().min(1),
    valuesTitleEn: z.string().min(1),
    valuesTitleAr: z.string().min(1),
    valuesEn: z.array(z.string()),
    valuesAr: z.array(z.string()),
})

// Timeline Item Schema
export const timelineItemSchema = z.object({
    yearEn: z.string().min(1),
    yearAr: z.string().min(1),
    titleEn: z.string().min(1),
    titleAr: z.string().min(1),
    descriptionEn: z.string().min(1),
    descriptionAr: z.string().min(1),
    order: z.number().int(),
    published: z.boolean().default(true),
})

export type CourseInput = z.infer<typeof courseSchema>
export type EventInput = z.infer<typeof eventSchema>
export type StoryInput = z.infer<typeof storySchema>
export type GalleryImageInput = z.infer<typeof galleryImageSchema>
export type ImpactStatInput = z.infer<typeof impactStatSchema>
export type ProgramInput = z.infer<typeof programSchema>
export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>
export type MenuItemInput = z.infer<typeof menuItemSchema>
export type AboutContentInput = z.infer<typeof aboutContentSchema>
export type TimelineItemInput = z.infer<typeof timelineItemSchema>
export type PartnerInput = z.infer<typeof partnerSchema>
export type TeamMemberInput = z.infer<typeof teamMemberSchema>
export const partnerSchema = z.object({
    nameEn: z.string().min(1, "English name is required"),
    nameAr: z.string().min(1, "Arabic name is required"),
    logoUrl: z.string().min(1, "Logo image is required"),
    websiteUrl: z.string().url().optional().or(z.literal("")),
    category: z.string().default("General"),
    order: z.number().int().default(0),
    published: z.boolean().default(true),
})

export const teamMemberSchema = z.object({
    nameEn: z.string().min(1, "English name is required"),
    nameAr: z.string().min(1, "Arabic name is required"),
    roleEn: z.string().min(1, "English role is required"),
    roleAr: z.string().min(1, "Arabic role is required"),
    bioEn: z.string().optional(),
    bioAr: z.string().optional(),
    imageUrl: z.string().optional(),
    linkedinUrl: z.string().url().optional().or(z.literal("")),
    order: z.number().int().default(0),
    department: z.string().optional(),
    published: z.boolean().default(true),
})
