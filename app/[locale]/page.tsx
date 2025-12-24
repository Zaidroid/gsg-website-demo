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

  return (
    <>
      <Hero heroData={heroData} />
      <ProgramsGrid />
      <ImpactStats />
      {/* Additional sections for Case Studies, Get Involved can go here */}
    </>
  )
}
