import { formatDate } from "@/lib/utils";
import { PreviewHeader } from "./PreviewHeader";
import { Badge } from "./ui/badge";
import { DrawerTrigger } from "./ui/drawer";

type Props = {
    imageSrc?: string;
    imageAlt: string;
    title: string;
    source: string;
    date: string;
    onClick: VoidFunction
}

export const PreviewNew = ({ imageSrc, imageAlt, title, source, date, onClick }: Props) => (
    <article className="flex flex-col justify-between p-4 rounded-lg bg-neutral-100 h-60 text-neutral-600">
        <PreviewHeader />
        <DrawerTrigger asChild>
            <main role="button" onClick={onClick} className="group relative grow flex items-center justify-center cursor-pointer">
                <h2 className="text-2xl text-center font-medium text-balance px-4 line-clamp-2">{title}</h2>
                {imageSrc && (
                    <img
                        src={imageSrc}
                        alt={imageAlt}
                        className="opacity-0 absolute inset-0 w-full h-full object-cover group-hover:opacity-100 transition-opacity rounded-2xl"
                    />
                )}
            </main>
        </DrawerTrigger>
        <footer className="flex mt-2 justify-between items-center">
            <Badge variant="outline">{source}</Badge>
            <Badge variant="outline">{formatDate(date)}</Badge>
        </footer>
    </article>
)
