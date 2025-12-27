import { Hero } from "@/components/home/Hero"
import { ProgramsGrid } from "@/components/home/ProgramsGrid"
import { ImpactStats } from "@/components/home/ImpactStats"
import prisma from "@/lib/prisma"

// const CatalogueViewer = dynamic(() => import("@/components/CatalogueViewer"), {
//   ssr: false,
//   loading: () => <div className="text-white text-center py-20">Loading Catalogue...</div>,
// });

export default async function Home() {
  const heroData = await prisma.heroSection.findFirst({
    orderBy: { updatedAt: 'desc' }
  });

  const impactStats = await prisma.impactStat.findMany({
    orderBy: { order: 'asc' },
    where: { published: true }
  });

  const programs = await prisma.program.findMany({
    where: { published: true, featured: true },
    orderBy: { updatedAt: 'desc' } // or create an order field later
  });



  return (
    <>
      <Hero heroData={heroData} />
      <ProgramsGrid initialPrograms={programs} />
      <ImpactStats initialStats={impactStats} />
      {/* Additional sections for Case Studies, Get Involved can go here */}
    </>
  )
}
