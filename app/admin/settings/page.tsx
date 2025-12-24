"use client"

import { useState, useEffect } from "react"
import {
    Loader2, Settings, Mail, Phone, MapPin, Share2,
    Globe, Save, Plus, Trash, Info, Bell, Search,
    Facebook, Instagram, Linkedin, Twitter, Youtube,
    Camera, CheckCircle2, AlertCircle
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<"seo" | "social" | "contact" | "announcement">("seo")
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [settings, setSettings] = useState<Record<string, string>>({})

    useEffect(() => {
        fetchSettings()
    }, [])

    const fetchSettings = async () => {
        try {
            setLoading(true)
            const res = await fetch("/api/admin/settings")
            const data = await res.json()
            setSettings(data && typeof data === 'object' ? data : {})
        } catch (error) {
            console.error(error)
            toast({
                title: "Error",
                description: "Failed to load settings.",
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }

    const updateSetting = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }))
    }

    const saveSettingsBatch = async (keys: string[]) => {
        try {
            setSaving(true)
            await Promise.all(keys.map(key =>
                fetch("/api/admin/settings", {
                    method: "POST",
                    body: JSON.stringify({ settingKey: key, settingValue: settings[key] || "" }),
                    headers: { "Content-Type": "application/json" }
                })
            ))
            toast({
                title: "Settings Saved",
                description: "Your changes have been synced successfully.",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Some settings failed to save.",
                variant: "destructive"
            })
        } finally {
            setSaving(false)
        }
    }

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-gsg-teal" />
        </div>
    )

    const tabs = [
        { id: "seo", label: "SEO & Branding", icon: Globe },
        { id: "social", label: "Social Media", icon: Share2 },
        { id: "contact", label: "Contact Info", icon: Mail },
        { id: "announcement", label: "Announcement", icon: Bell },
    ]

    return (
        <div className="space-y-8 p-4 lg:p-8 max-w-7xl mx-auto pb-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gsg-navy flex items-center gap-3">
                        <Settings className="w-8 h-8 text-gsg-teal" />
                        Site Configuration
                    </h1>
                    <p className="text-gray-500 text-sm">Manage global parameters, SEO metadata, and social integration.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchSettings}
                        className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gsg-navy transition-colors"
                    >
                        Reset Changes
                    </button>
                    <button
                        onClick={() => saveSettingsBatch(Object.keys(settings))}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save All Changes
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap bg-gray-100 p-1.5 rounded-2xl w-fit gap-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={cn(
                            "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                            activeTab === tab.id
                                ? "bg-white text-gsg-navy shadow-md"
                                : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                        )}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {activeTab === "seo" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <SettingCard
                            title="Metadata (English)"
                            icon={Search}
                            description="Configure how the site appears in English search results."
                        >
                            <InputGroup label="Site Title" value={settings.site_title_en} onChange={(v: string) => updateSetting("site_title_en", v)} placeholder="Gaza Sky Geeks" />
                            <TextareaGroup label="Meta Description" value={settings.meta_description_en} onChange={(v: string) => updateSetting("meta_description_en", v)} placeholder="Palestine's leading tech hub..." />
                            <InputGroup label="Keywords" value={settings.site_keywords_en} onChange={(v: string) => updateSetting("site_keywords_en", v)} placeholder="coding, startups, palestine" />
                        </SettingCard>

                        <SettingCard
                            title="Metadata (Arabic)"
                            icon={Search}
                            description="Configure how the site appears in Arabic search results."
                            dir="rtl"
                        >
                            <InputGroup label="Site Title (AR)" value={settings.site_title_ar} onChange={(v: string) => updateSetting("site_title_ar", v)} placeholder="غزة سكاي جيكس" isRtl />
                            <TextareaGroup label="Meta Description (AR)" value={settings.meta_description_ar} onChange={(v: string) => updateSetting("meta_description_ar", v)} placeholder="المركز التكنولوجي الرائد في فلسطين..." isRtl />
                            <InputGroup label="Keywords (AR)" value={settings.site_keywords_ar} onChange={(v: string) => updateSetting("site_keywords_ar", v)} placeholder="برمجة، شركات ناشئة، فلسطين" isRtl />
                        </SettingCard>
                    </div>
                )}

                {activeTab === "social" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <SettingCard title="Connect Media" icon={Share2} description="Direct links to GSG's official social media profiles.">
                            <InputGroup label="Facebook" icon={Facebook} value={settings.social_facebook} onChange={(v: string) => updateSetting("social_facebook", v)} placeholder="https://facebook.com/GSG" />
                            <InputGroup label="Instagram" icon={Instagram} value={settings.social_instagram} onChange={(v: string) => updateSetting("social_instagram", v)} placeholder="https://instagram.com/GSG" />
                            <InputGroup label="LinkedIn" icon={Linkedin} value={settings.social_linkedin} onChange={(v: string) => updateSetting("social_linkedin", v)} placeholder="https://linkedin.com/company/GSG" />
                        </SettingCard>
                        <SettingCard title="Other Platforms" icon={Share2} description="Secondary social and video platforms.">
                            <InputGroup label="Twitter / X" icon={Twitter} value={settings.social_twitter} onChange={(v: string) => updateSetting("social_twitter", v)} placeholder="https://twitter.com/GSG" />
                            <InputGroup label="YouTube" icon={Youtube} value={settings.social_youtube} onChange={(v: string) => updateSetting("social_youtube", v)} placeholder="https://youtube.com/GSG" />
                        </SettingCard>
                    </div>
                )}

                {activeTab === "contact" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <SettingCard title="Contact Points" icon={Mail} description="Global contact information for user inquiries.">
                            <InputGroup label="Support Email" icon={Mail} value={settings.support_email} onChange={(v: string) => updateSetting("support_email", v)} placeholder="info@gazaskygeeks.com" />
                            <InputGroup label="Official Phone" icon={Phone} value={settings.support_phone} onChange={(v: string) => updateSetting("support_phone", v)} placeholder="+970 123 456 789" />
                        </SettingCard>
                        <SettingCard title="Physical Identity" icon={MapPin} description="Address and legal information shown in footer.">
                            <TextareaGroup label="Headquarters Address" value={settings.hq_address} onChange={(v: string) => updateSetting("hq_address", v)} placeholder="Al-Sina'a Junction, Gaza City" />
                            <InputGroup label="Copyright Text" value={settings.copyright_text} onChange={(v: string) => updateSetting("copyright_text", v)} placeholder="© 2024 Gaza Sky Geeks" />
                        </SettingCard>
                    </div>
                )}

                {activeTab === "announcement" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <SettingCard title="Visibility" icon={Bell} description="Toggle the site-wide announcement banner.">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                <div>
                                    <p className="font-bold text-gsg-navy">Show Announcement</p>
                                    <p className="text-xs text-gray-500">Displayed at the very top of all pages.</p>
                                </div>
                                <button
                                    onClick={() => updateSetting("announcement_enabled", settings.announcement_enabled === "true" ? "false" : "true")}
                                    className={cn(
                                        "w-12 h-6 rounded-full transition-all relative",
                                        settings.announcement_enabled === "true" ? "bg-gsg-teal" : "bg-gray-300"
                                    )}
                                >
                                    <div className={cn(
                                        "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                                        settings.announcement_enabled === "true" ? "left-7" : "left-1"
                                    )} />
                                </button>
                            </div>
                        </SettingCard>
                        <SettingCard title="Content" icon={Info} description="Bilingual text for the announcement banner.">
                            <InputGroup label="Announcement (EN)" value={settings.announcement_text_en} onChange={(v: string) => updateSetting("announcement_text_en", v)} placeholder="Registrations are open!" />
                            <InputGroup label="Announcement (AR)" value={settings.announcement_text_ar} onChange={(v: string) => updateSetting("announcement_text_ar", v)} placeholder="باب التسجيل مفتوح الآن!" isRtl />
                        </SettingCard>
                    </div>
                )}
            </div>

            {saving && (
                <div className="fixed bottom-8 right-8 bg-gsg-navy text-white px-6 py-3 rounded-2xl shadow-2xl animate-in slide-in-from-right duration-300 flex items-center gap-3 font-bold border border-white/10 z-50">
                    <Loader2 className="w-4 h-4 animate-spin text-gsg-teal" />
                    Syncing changes...
                </div>
            )}
        </div>
    )
}

function SettingCard({ title, icon: Icon, description, children, dir = "ltr" }: any) {
    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100">
                        <Icon className="w-5 h-5 text-gsg-teal" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gsg-navy">{title}</h3>
                        <p className="text-xs text-gray-400 font-medium">{description}</p>
                    </div>
                </div>
            </div>
            <div className={cn("p-8 space-y-6 flex-1", dir === "rtl" ? "text-right" : "text-left")}>
                {children}
            </div>
        </div>
    )
}

function InputGroup({ label, value, onChange, placeholder, icon: Icon, isRtl = false }: any) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{label}</label>
            <div className="relative">
                {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />}
                <input
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                    className={cn(
                        "w-full px-4 py-3 bg-gray-50/50 border border-transparent rounded-xl focus:ring-2 focus:ring-gsg-teal/10 focus:bg-white focus:border-gsg-teal/20 transition-all text-sm font-medium",
                        Icon && "pl-11",
                        isRtl && "text-right font-arabic"
                    )}
                    placeholder={placeholder}
                    dir={isRtl ? "rtl" : "ltr"}
                />
            </div>
        </div>
    )
}

function TextareaGroup({ label, value, onChange, placeholder, isRtl = false }: any) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{label}</label>
            <textarea
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                rows={3}
                className={cn(
                    "w-full px-4 py-3 bg-gray-50/50 border border-transparent rounded-xl focus:ring-2 focus:ring-gsg-teal/10 focus:bg-white focus:border-gsg-teal/20 transition-all text-sm font-medium resize-none",
                    isRtl && "text-right font-arabic"
                )}
                placeholder={placeholder}
                dir={isRtl ? "rtl" : "ltr"}
            />
        </div>
    )
}
