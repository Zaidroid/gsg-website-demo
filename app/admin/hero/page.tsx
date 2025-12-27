
"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Save, Loader2, Play } from "lucide-react" // Added Play icon import
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TerminalSnippetEditor } from "@/components/admin/TerminalSnippetEditor"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const formSchema = z.object({
    titleEn: z.string().min(1, "Title (EN) is required"),
    titleAr: z.string().min(1, "Title (AR) is required"),
    subtitleEn: z.string().min(1, "Subtitle (EN) is required"),
    subtitleAr: z.string().min(1, "Subtitle (AR) is required"),
    typewriterEn: z.string().min(1, "Typewriter text (EN) is required"), // Managed as comma-separated string in form
    typewriterAr: z.string().min(1, "Typewriter text (AR) is required"),
    ctaTextEn: z.string().min(1, "CTA Text (EN) is required"),
    ctaTextAr: z.string().min(1, "CTA Text (AR) is required"),
    ctaLink: z.string().min(1, "CTA Link is required"),
    secondaryCtaTextEn: z.string().optional(),
    secondaryCtaTextAr: z.string().optional(),
    secondaryCtaLink: z.string().optional(),
    videoUrl: z.string().optional(),
    terminalSnippetsEn: z.string().optional(),
    terminalSnippetsAr: z.string().optional(),
})

export default function HeroManagerPage() {
    const { toast } = useToast()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            titleEn: "",
            titleAr: "",
            subtitleEn: "",
            subtitleAr: "",
            typewriterEn: "",
            typewriterAr: "",
            ctaTextEn: "",
            ctaTextAr: "",
            ctaLink: "",
            secondaryCtaTextEn: "",
            secondaryCtaTextAr: "",
            secondaryCtaLink: "",
            videoUrl: "",
            terminalSnippetsEn: "",
            terminalSnippetsAr: "",
        },
    })

    useEffect(() => {
        async function fetchHero() {
            try {
                const response = await fetch("/api/admin/hero")
                if (!response.ok) throw new Error("Failed to fetch hero data")

                const data = await response.json()

                // Convert arrays to comma-separated strings for the form
                const formattedData = {
                    ...data,
                    typewriterEn: Array.isArray(data.typewriterEn) ? data.typewriterEn.join(", ") : data.typewriterEn,
                    typewriterAr: Array.isArray(data.typewriterAr) ? data.typewriterAr.join(", ") : data.typewriterAr,
                    terminalSnippetsEn: data.terminalSnippetsEn || "",
                    terminalSnippetsAr: data.terminalSnippetsAr || "",
                }

                form.reset(formattedData)
            } catch (error) {
                console.error(error)
                toast({
                    title: "Error",
                    description: "Failed to load hero content",
                    variant: "destructive",
                })
            } finally {
                setIsLoading(false)
            }
        }

        fetchHero()
    }, [form, toast])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSaving(true)
        try {
            // Validate JSON
            try {
                if (values.terminalSnippetsEn) JSON.parse(values.terminalSnippetsEn)
                if (values.terminalSnippetsAr) JSON.parse(values.terminalSnippetsAr)
            } catch (e) {
                toast({
                    title: "Validation Error",
                    description: "Invalid JSON in Terminal Snippets. Please check syntax.",
                    variant: "destructive",
                })
                setIsSaving(false)
                return
            }

            // Convert comma-separated strings back to arrays
            const payload = {
                ...values,
                typewriterEn: values.typewriterEn.split(",").map(s => s.trim()).filter(Boolean),
                typewriterAr: values.typewriterAr.split(",").map(s => s.trim()).filter(Boolean),
            }

            const response = await fetch("/api/admin/hero", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            if (!response.ok) throw new Error("Failed to update hero")

            toast({
                title: "Success",
                description: "Hero section updated successfully",
            })
            router.refresh()
        } catch (error) {
            console.error(error)
            toast({
                title: "Error",
                description: "Failed to save changes",
                variant: "destructive",
            })
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) {
        return <div className="flex items-center justify-center p-10"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Hero Section Manager</h1>
                    <p className="text-muted-foreground">
                        Manage the homepage main banner, titles, and text.
                    </p>
                </div>
                <Button onClick={form.handleSubmit(onSubmit)} disabled={isSaving}>
                    {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Changes
                </Button>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Tabs defaultValue="english" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="english">English Content</TabsTrigger>
                            <TabsTrigger value="arabic">Arabic Content</TabsTrigger>
                        </TabsList>

                        <TabsContent value="english" className="space-y-4 pt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Main Content (English)</CardTitle>
                                    <CardDescription>
                                        The main headline and introduction text.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="titleEn"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Main Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Empowering Gaza's Tech Future" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="subtitleEn"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Subtitle / Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Join a global community..."
                                                        className="h-24 resize-none"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="typewriterEn"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Typewriter Effect Text</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Launch Startups, Learn Code, Build Future" {...field} />
                                                </FormControl>
                                                <FormDescription>Comma-separated list of phrases to cycle through.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="terminalSnippetsEn"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Terminal Scripts (English)</FormLabel>
                                                <FormControl>
                                                    <TerminalSnippetEditor
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Manage the code execution animation scripts shown in the terminal.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Call to Actions (English)</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-4 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="ctaTextEn"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Primary Button Text</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Explore Programs" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="secondaryCtaTextEn"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Secondary Button Text</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Watch Our Story" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="arabic" className="space-y-4 pt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Main Content (Arabic)</CardTitle>
                                    <CardDescription>
                                        The main headline and introduction text in Arabic.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4" dir="rtl">
                                    <FormField
                                        control={form.control}
                                        name="titleAr"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>العنوان الرئيسي</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="تمكين مستقبل غزة التكنولوجي" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="subtitleAr"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>التفاصيل / الوصف</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="انضم إلى مجتمع عالمي..."
                                                        className="h-24 resize-none"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="typewriterAr"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>نص الآلة الكاتبة</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="أطلق مشروعك, تعلم البرمجة" {...field} />
                                                </FormControl>
                                                <FormDescription>قائمة عبارات مفصولة بفواصل.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="terminalSnippetsAr"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Terminal Scripts (Arabic)</FormLabel>
                                                <FormControl>
                                                    <TerminalSnippetEditor
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        dir="rtl"
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Manage the code execution animation scripts (ensure fields are compatible with code display).
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Call to Actions (Arabic)</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-4 md:grid-cols-2" dir="rtl">
                                    <FormField
                                        control={form.control}
                                        name="ctaTextAr"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>نص الزر الرئيسي</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="تصفح البرامج" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="secondaryCtaTextAr"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>نص الزر الثانوي</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="شاهد قصتنا" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    <Card>
                        <CardHeader>
                            <CardTitle>Links & Media</CardTitle>
                            <CardDescription>
                                Configure where the buttons lead and background media.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="ctaLink"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Primary Button Link</FormLabel>
                                            <FormControl>
                                                <Input placeholder="/programs" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="secondaryCtaLink"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Secondary Button Link</FormLabel>
                                            <FormControl>
                                                <Input placeholder="/about" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Future: Add Video/Image upload here */}
                            <FormField
                                control={form.control}
                                name="videoUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Background Video/Image URL (Optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://..." {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Leave empty to use the default interactive background.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </div>
    )
}
