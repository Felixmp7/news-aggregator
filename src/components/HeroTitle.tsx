import ProfilePhoto from '@/assets/profile.jpeg';
import { cn } from "@/lib/utils";

export const HeroTitle = ({ className }: { className?: string }) => (
    <section className={cn("w-full h-screen flex flex-col pb-5", className)}>
        <div className='mt-auto mx-auto flex flex-col justify-center items-center gap-2'>
            <img src={ProfilePhoto} alt="Felix Pacheco" className='rounded-full overflow-hidden w-40 h-40 md:w-60 md:h-60' />
            <span>Felix Pacheco | <strong>React Developer</strong></span>
        </div>
        <footer className='mt-auto'>
            <p className="text-base sm:text-xl md:text-3xl xl:text-5xl text-balance opacity-40">The challenge is to create the user interface for a news aggregator website that pulls articles from various sources and displays them in a clean, easy-to-read format.</p>
            <h1 className="text-5xl sm:text-6xl md:text-9xl xl:text-[10rem] font-semibold">News Aggregator</h1>
        </footer>
    </section>
)
