import { format } from "date-fns"
import prisma from "@/lib/prisma"
import { DataTable } from "@/components/admin/DataTable"
import { columns, ProgramColumn } from "./components/columns"
import { Plus, Layout } from "lucide-react"
import Link from "next/link"

export default async function ProgramsPage() {
    const programs = await prisma.program.findMany({
        orderBy: {
            updatedAt: "desc"
        }
    })

    const formattedPrograms: ProgramColumn[] = programs.map((item: any) => ({
        id: item.id,
        programId: item.programId,
        titleEn: item.titleEn,
        titleAr: item.titleAr,
        published: item.published,
        updatedAt: format(item.updatedAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex-1 space-y-8 p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gsg-navy flex items-center gap-3">
                        <Layout className="w-8 h-8 text-gsg-teal" />
                        Programs Editor
                    </h2>
                    <p className="text-gray-500 text-sm">Manage dynamic content for program subpages like Code Academy, Elevate, etc.</p>
                </div>
                <Link href="/admin/programs/new">
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-gsg-navy text-white rounded-xl hover:bg-gsg-navy/90 transition-all font-semibold shadow-lg shadow-gsg-navy/20">
                        <Plus className="h-4 w-4" />
                        New Program
                    </button>
                </Link>
            </div>

            <hr className="border-gray-100" />

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <DataTable
                    columns={columns}
                    data={formattedPrograms}
                    searchKey="titleEn"
                />
            </div>
        </div>
    )
}
