import { PreviewHeader } from "./PreviewHeader";

type Props = {
    imageSrc: string | null;
    imageAlt: string;
    title: string;
    source: string;
    date: string;
}

export const PreviewNew = ({ imageSrc, imageAlt, title, source, date }: Props) => {
    return (
        <article className="flex flex-col justify-between p-4 rounded-lg bg-neutral-100 h-60 text-neutral-600">
            <PreviewHeader />
            <main className="group relative grow flex items-center justify-center">
                <h2 className="text-2xl text-center font-medium text-balance px-4 line-clamp-2">{title}</h2>
                {imageSrc && (
                    <img
                        src={imageSrc}
                        alt={imageAlt}
                        className="opacity-0 absolute inset-0 w-full h-full object-cover group-hover:opacity-100 transition-opacity rounded-2xl"
                    />
                )}
            </main>
            <footer className="flex justify-between items-center">
                <span>{source}</span>
                <span>{date}</span>
            </footer>
        </article>
    )
}
