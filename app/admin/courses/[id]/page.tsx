import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { CourseForm } from "@/components/admin/CourseForm"

interface EditCoursePageProps {
    params: Promise<{
        id: string
    }>
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
    const { id } = await params

    const course = await prisma.course.findUnique({
        where: {
            id
        }
    })

    if (!course) {
        notFound()
    }

    return (
        <div className="p-8">
            <CourseForm initialData={course} />
        </div>
    )
}
