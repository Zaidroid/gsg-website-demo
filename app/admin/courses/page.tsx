import { format } from "date-fns"
import prisma from "@/lib/prisma"
import { Plus } from "lucide-react"

import { DataTable } from "@/components/admin/DataTable"
import { columns, CourseColumn } from "./components/columns"

export default async function CoursesPage() {
    const courses = await prisma.course.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedCourses: CourseColumn[] = courses.map((item) => ({
        id: item.id,
        courseId: item.courseId,
        titleEn: item.titleEn,
        category: item.category,
        level: item.level,
        status: item.status,
        published: item.published,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="space-y-8 p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gsg-navy">Courses</h1>
                    <p className="text-gray-500 text-sm">Manage your course catalog and enrollment status.</p>
                </div>
                <a
                    href="/admin/courses/new"
                    className="flex items-center gap-2 px-6 py-2.5 bg-gsg-navy text-white rounded-xl hover:bg-gsg-navy/90 transition-all font-semibold shadow-lg shadow-gsg-navy/20"
                >
                    <Plus className="h-4 w-4" />
                    New Course
                </a>
            </div>

            <hr className="border-gray-100" />

            <DataTable
                columns={columns}
                data={formattedCourses}
                searchKey="titleEn"
                placeholder="Search courses by title..."
            />
        </div>
    )
}
