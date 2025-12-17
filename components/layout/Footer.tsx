import Link from "next/link"

export function Footer() {
    return (
        <footer className="bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl border-t border-white/20 dark:border-white/5 transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
                    {/* Left: Logo & Copyright */}
                    <div className="flex items-center gap-4 text-center md:text-left">
                        <p className="font-heading font-black tracking-tight text-primary dark:text-white drop-shadow-sm text-lg">GSG</p>
                        <div className="h-4 w-px bg-gray-400/50 dark:bg-gray-600/50 hidden md:block" />
                        <p className="text-xs leading-5 text-gray-500 dark:text-gray-400 font-medium">
                            &copy; {new Date().getFullYear()} Gaza Sky Geeks.
                        </p>
                    </div>

                    {/* Right: Compact Links */}
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                        <Link href="/about" className="text-sm font-semibold text-gray-600 hover:text-secondary dark:text-gray-300 dark:hover:text-white transition-colors">About</Link>
                        <Link href="/programs" className="text-sm font-semibold text-gray-600 hover:text-secondary dark:text-gray-300 dark:hover:text-white transition-colors">Programs</Link>
                        <Link href="/courses" className="text-sm font-semibold text-gray-600 hover:text-secondary dark:text-gray-300 dark:hover:text-white transition-colors">Courses</Link>
                        <Link href="/contact" className="text-sm font-semibold text-gray-600 hover:text-secondary dark:text-gray-300 dark:hover:text-white transition-colors">Contact</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
