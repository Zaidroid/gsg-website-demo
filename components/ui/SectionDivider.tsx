import React from "react";

interface SectionDividerProps {
    className?: string;
    fill?: string;
    position?: "top" | "bottom";
    flip?: boolean;
}

export function SectionDivider({
    className = "",
    fill = "fill-white",
    position = "top",
    flip = false,
}: SectionDividerProps) {
    const transform = [
        position === "bottom" ? "rotate(180)" : "",
        flip ? "scaleX(-1)" : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div
            className={`absolute left-0 w-full overflow-hidden leading-[0] z-10 ${position === "top" ? "-top-[1px]" : "-bottom-[1px]"
                } ${className}`}
            style={{
                transform: position === "bottom" ? "rotate(180deg)" : undefined,
            }}
        >
            <svg
                className={`relative block w-[calc(100%+1.3px)] h-[50px] sm:h-[100px] lg:h-[150px] ${fill}`}
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                style={{ transform }}
            >
                <path
                    d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                />
            </svg>
        </div>
    );
}
