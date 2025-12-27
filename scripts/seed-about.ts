import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    console.log('--- Seeding About Page Content ---')

    // 1. About Content
    const existingAbout = await prisma.aboutContent.findFirst()
    const aboutData = {
        headerTitleEn: "About Gaza Sky Geeks",
        headerTitleAr: "عن غزة سكاي جيكس",
        headerDescEn: "Whether you are a beginner coder, a freelancer, or a startup founder, we have a path for you.",
        headerDescAr: "سواء كنت مبرمجاً مبتدئاً، أو مستقلاً، أو مؤسساً لشركة ناشئة، فلدينا مسار مناسب لك.",
        missionTitleEn: "Our Mission",
        missionTitleAr: "مهمتنا",
        missionDescEn: "To provide the resources, mentorship, and network needed for Palestinians to participate in the global digital economy.",
        missionDescAr: "توفير الموارد والإرشاد والشبكة اللازمة للفلسطينيين للمشاركة في الاقتصاد الرقمي العالمي.",
        visionTitleEn: "Our Vision",
        visionTitleAr: "رؤيتنا",
        visionDescEn: "A Palestine where any talented individual can build a career or startup that competes globally, regardless of location.",
        visionDescAr: "فلسطين حيث يمكن لأي فرد موهوب بناء مسيرة مهنية أو شركة ناشئة تنافس عالمياً، بغض النظر عن الموقع.",
        valuesTitleEn: "Our Values",
        valuesTitleAr: "قيمنا",
        valuesEn: ["Community First", "Pay it Forward", "Resilience", "Global Excellence"],
        valuesAr: ["المجتمع أولاً", "العطاء للمجتمع", "المرونة والاستمرارية", "التميز العالمي"]
    }

    if (existingAbout) {
        await prisma.aboutContent.update({
            where: { id: existingAbout.id },
            data: aboutData
        })
    } else {
        await prisma.aboutContent.create({
            data: aboutData
        })
    }
    console.log('About Content seeded.')

    // 2. Timeline Items
    const timelineItems = [
        {
            yearEn: "2011", yearAr: "2011",
            titleEn: "Founded", titleAr: "التأسيس",
            descriptionEn: "Gaza Sky Geeks was established by Mercy Corps and Google.org to support Gaza's digital economy.",
            descriptionAr: "تأسست غزة سكاي جيكس من قبل ميرسي كور و Google.org لدعم الاقتصاد الرقمي في غزة.",
            order: 1
        },
        {
            yearEn: "2015", yearAr: "2015",
            titleEn: "First Accelerator", titleAr: "أول مسرعة أعمال",
            descriptionEn: "Launched the first startup accelerator in Gaza, GeeXelerator.",
            descriptionAr: "إطلاق أول مسرعة أعمال للشركات الناشئة في غزة، GeeXelerator.",
            order: 2
        },
        {
            yearEn: "2017", yearAr: "2017",
            titleEn: "Expansion to West Bank", titleAr: "التوسع في الضفة الغربية",
            descriptionEn: "Expanded our programs to serve tech talent in the West Bank.",
            descriptionAr: "توسيع برامجنا لخدمة المواهب التكنولوجية في الضفة الغربية.",
            order: 3
        },
        {
            yearEn: "2020", yearAr: "2020",
            titleEn: "Online Pivot", titleAr: "التحول الرقمي",
            descriptionEn: "Successfully transitioned all programs online during the global pandemic.",
            descriptionAr: "النجاح في نقل جميع البرامج عبر الإنترنت خلال الجائحة العالمية.",
            order: 4
        },
        {
            yearEn: "Present", yearAr: "الحاضر",
            titleEn: "Resilience & Growth", titleAr: "المرونة والنمو",
            descriptionEn: "Continuing to empower thousands of Palestinians despite challenges.",
            descriptionAr: "الاستمرار في تمكين آلاف الفلسطينيين رغم التحديات.",
            order: 5
        }
    ]

    await prisma.timelineItem.deleteMany({}) // Clean start
    for (const item of timelineItems) {
        await prisma.timelineItem.create({ data: item })
    }
    console.log('Timeline Items seeded.')

    // 3. Partners
    const partners = [
        { nameEn: "Google for Startups", nameAr: "جوجل للشركات الناشئة", logoUrl: "https://gazaskygeeks.com/wp-content/uploads/2020/05/Google-e1598350715152.png", order: 1 },
        { nameEn: "Global Affairs Canada", nameAr: "الشؤون العالمية كندا", logoUrl: "https://gazaskygeeks.com/wp-content/uploads/2022/06/canada-wordmark.webp", order: 2 },
        { nameEn: "Sweden (Sida)", nameAr: "السويد (سيدا)", logoUrl: "https://gazaskygeeks.com/wp-content/uploads/2021/02/Sweden-EN-blue-e1613470916920.png", order: 3 },
        { nameEn: "Kingdom of the Netherlands", nameAr: "مملكة هولندا", logoUrl: "https://gazaskygeeks.com/wp-content/uploads/2020/05/KoN-300.png", order: 4 },
        { nameEn: "Enabel", nameAr: "إينابل", logoUrl: "https://gazaskygeeks.com/wp-content/uploads/2021/02/Enabel.png", order: 5 },
        { nameEn: "SPARK", nameAr: "سبارك", logoUrl: "https://gazaskygeeks.com/wp-content/uploads/2022/06/SPARK_logo_cobalt-blue-on-white_large.png", order: 6 },
        { nameEn: "Techstars", nameAr: "تيك ستارز", logoUrl: "https://gazaskygeeks.com/wp-content/uploads/2021/03/Techstars_Logo_Primary_Black.jpg", order: 7 },
        { nameEn: "Upwork", nameAr: "أب وورك", logoUrl: "https://gazaskygeeks.com/wp-content/uploads/2020/08/Picture-1-2.png", order: 8 },
        { nameEn: "Stripe", nameAr: "سترايب", logoUrl: "https://gazaskygeeks.com/wp-content/uploads/2020/08/Picture-4-1.png", order: 9 },
        { nameEn: "AWS", nameAr: "أمازون لخدمات الويب", logoUrl: "https://gazaskygeeks.com/wp-content/uploads/2020/08/aws.png", order: 10 },
        { nameEn: "GitHub", nameAr: "جيت هاب", logoUrl: "https://gazaskygeeks.com/wp-content/uploads/2020/06/gsg-media-500x300-github.gif", order: 11 },
        { nameEn: "Bank of Palestine", nameAr: "بنك فلسطين", logoUrl: "https://gazaskygeeks.com/wp-content/uploads/2020/06/gsg-media-500x300-bankofpalestine.gif", order: 12 }
    ]

    await prisma.partner.deleteMany({}) // Clean start
    for (const partner of partners) {
        await prisma.partner.create({ data: { ...partner, published: true } })
    }
    console.log('Partners seeded.')

    console.log('--- Seeding Complete ---')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
