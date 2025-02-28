import { cn } from "@/lib/utils";

export const HeroTitle = ({ className }: { className?: string }) => (
    <section className={cn("w-full h-screen flex flex-col justify-end pb-5", className)}>
        <p className="text-base sm:text-xl md:text-3xl xl:text-5xl text-balance opacity-40">The challenge is to create the user interface for a news aggregator website that pulls articles from various sources and displays them in a clean, easy-to-read format.</p>
        <h1 className="text-5xl sm:text-6xl md:text-9xl xl:text-[10rem] font-semibold">News Aggregator</h1>
    </section>
)
