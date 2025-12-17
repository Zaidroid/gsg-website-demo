"use client"

import { Mail, MapPin, Phone } from "lucide-react"
import { PageHeader } from "@/components/ui/PageHeader"

export default function ContactPage() {
    return (
        <div className="bg-transparent">
            <PageHeader
                title="Contact Us"
                description="Have questions? We would love to hear from you."
            />
            <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-32">

                <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-primary dark:text-white">Get in touch</h2>
                        <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Our team is here to help you with any inquiries about our programs, courses, or partnerships.
                        </p>
                        <dl className="mt-8 space-y-6 text-base leading-7 text-gray-600 dark:text-gray-300">
                            <div className="flex gap-x-4">
                                <dt className="flex-none"><span className="sr-only">Address</span><MapPin className="h-6 w-6 text-secondary" /></dt>
                                <dd>Gaza City, Palestine<br />Al-Sina&apos;a Junction</dd>
                            </div>
                            <div className="flex gap-x-4">
                                <dt className="flex-none"><span className="sr-only">Telephone</span><Phone className="h-6 w-6 text-secondary" /></dt>
                                <dd><a className="hover:text-primary dark:hover:text-white font-semibold" href="tel:+970123456789">+970 12 345 6789</a></dd>
                            </div>
                            <div className="flex gap-x-4">
                                <dt className="flex-none"><span className="sr-only">Email</span><Mail className="h-6 w-6 text-secondary" /></dt>
                                <dd><a className="hover:text-primary dark:hover:text-white font-semibold" href="mailto:info@gazaskygeeks.com">info@gazaskygeeks.com</a></dd>
                            </div>
                        </dl>
                    </div>

                    <form className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-md">
                        <div className="grid grid-cols-1 gap-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-bold leading-6 text-primary dark:text-white">Name</label>
                                <div className="mt-2.5">
                                    <input type="text" name="name" id="name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white dark:bg-slate-950 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-bold leading-6 text-primary dark:text-white">Email</label>
                                <div className="mt-2.5">
                                    <input type="email" name="email" id="email" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white dark:bg-slate-950 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-bold leading-6 text-primary dark:text-white">Message</label>
                                <div className="mt-2.5">
                                    <textarea name="message" id="message" rows={4} className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white dark:bg-slate-950 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <button type="submit" className="block w-full rounded-md bg-secondary px-3.5 py-2.5 text-center text-sm font-bold text-white shadow-sm hover:bg-secondary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary">
                                Send message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
