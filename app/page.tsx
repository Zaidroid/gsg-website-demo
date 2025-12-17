import { Hero } from "@/components/home/Hero"
import { ProgramsGrid } from "@/components/home/ProgramsGrid"
import { ImpactStats } from "@/components/home/ImpactStats"

// const CatalogueViewer = dynamic(() => import("@/components/CatalogueViewer"), {
//   ssr: false,
//   loading: () => <div className="text-white text-center py-20">Loading Catalogue...</div>,
// });

export default function Home() {
  return (
    <>
      <Hero />
      <ProgramsGrid />
      <ImpactStats />
      {/* Additional sections for Case Studies, Get Involved can go here */}
    </>
  )
}
