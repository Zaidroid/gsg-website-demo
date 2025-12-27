"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2, Save, Trash, ArrowLeft } from "lucide-react"

const formSchema = z.object({
    statKey: z.string().min(1, "Key is required (e.g., graduates, startups)"),
    labelEn: z.string().min(1, "English label is required"),
    labelAr: z.string().min(1, "Arabic label is required"),
    value: z.string().min(1, "Value is required"),
    order: z.number(),
    published: z.boolean().default(true),
})

type ImpactStatFormValues = z.infer<typeof formSchema>

interface ImpactStatFormProps {
    initialData?: any
}

export function ImpactStatForm({ initialData }: ImpactStatFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const title = initialData ? "Edit Impact Stat" : "Create Impact Stat"
    const description = initialData ? "Edit an existing statistic." : "Add a new statistic to the homepage."
    const action = initialData ? "Save changes" : "Create"

    const form = useForm<ImpactStatFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            statKey: "",
            labelEn: "",
            labelAr: "",
            value: "",
            order: 0,
            published: true,
        },
    })

    const onSubmit = async (data: ImpactStatFormValues) => {
        try {
            setLoading(true)
            const url = initialData
                ? `/api/admin/impact-stats/${initialData.id}`
                : `/api/admin/impact-stats`
            const method = initialData ? "PATCH" : "POST"

            const response = await fetch(url, {
                method,
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error("Something went wrong")
            }

            router.refresh()
            router.push(`/admin/impact-stats`)
            alert(`Impact Stat ${initialData ? "updated" : "created"} successfully!`)
        } catch (error) {
            console.error(error)
            alert("Error saving impact stat")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gsg-navy">{title}</h2>
                    <p className="text-sm text-gray-500">{description}</p>
                </div>
                {initialData && (
                    <button
                        onClick={async () => {
                            if (confirm("Are you sure you want to delete this stat?")) {
                                try {
                                    setLoading(true)
                                    await fetch(`/api/admin/impact-stats/${initialData.id}`, { method: "DELETE" })
                                    router.refresh()
                                    router.push("/admin/impact-stats")
                                } catch (error) {
                                    alert("Error deleting impact stat")
                                } finally {
                                    setLoading(false)
                                }
                            }
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                    >
                        <Trash className="w-4 h-4" />
                        Delete
                    </button>
                )}
            </div>

            <hr className="border-gray-100" />

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Key (Unique ID)</label>
                            <input
                                disabled={loading}
                                placeholder="e.g., graduates"
                                {...form.register("statKey")}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                            />
                            {form.formState.errors.statKey && (
                                <p className="text-red-500 text-sm">{form.formState.errors.statKey.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Display Order</label>
                            <input
                                type="number"
                                disabled={loading}
                                {...form.register("order", { valueAsNumber: true })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Label (English)</label>
                            <input
                                disabled={loading}
                                placeholder="e.g., Graduates Employed"
                                {...form.register("labelEn")}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                            />
                            {form.formState.errors.labelEn && (
                                <p className="text-red-500 text-sm">{form.formState.errors.labelEn.message}</p>
                            )}
                        </div>
                        <div className="space-y-2 text-right">
                            <label className="text-sm font-semibold text-gray-700">Label (Arabic)</label>
                            <input
                                dir="rtl"
                                disabled={loading}
                                placeholder="مثلاً: خريج تم توظيفه"
                                {...form.register("labelAr")}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                            />
                            {form.formState.errors.labelAr && (
                                <p className="text-red-500 text-sm">{form.formState.errors.labelAr.message}</p>
                            )}
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700">Value</label>
                            <input
                                disabled={loading}
                                placeholder="e.g., 85% or 200+"
                                {...form.register("value")}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gsg-teal/20 focus:border-gsg-teal transition-all"
                            />
                            {form.formState.errors.value && (
                                <p className="text-red-500 text-sm">{form.formState.errors.value.message}</p>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="published"
                                {...form.register("published")}
                                className="w-4 h-4 text-gsg-teal rounded focus:ring-gsg-teal"
                            />
                            <label htmlFor="published" className="text-sm font-medium text-gray-700">Published</label>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-8 py-3 bg-gsg-navy text-white rounded-xl hover:bg-gsg-navy/90 transition-all font-semibold shadow-lg shadow-gsg-navy/20 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {action}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-all font-medium"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}
