import React from "react";

interface SectionGradientProps {
    className?: string;
    position?: "top" | "bottom";
}

export function SectionGradient({
    className = "",
    position = "bottom",
}: SectionGradientProps) {
    return (
        <div
            className={`absolute left-0 w-full h-32 z-10 pointer-events-none ${position === "bottom" ? "bottom-0 bg-gradient-to-t" : "top-0 bg-gradient-to-b"
                } from-white/0 via-white/50 to-white/0 dark:from-slate-950/0 dark:via-slate-950/50 dark:to-slate-950/0 ${className}`}
        />
    );
}
