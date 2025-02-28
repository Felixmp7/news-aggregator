
import { ExternalLink } from "lucide-react"

import defaultImageSvg from "@/assets/placeholder.svg"
import { Button } from "@/components/ui/button"
import {
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerTitle
} from "@/components/ui/drawer"
import { formatDate } from "@/lib/utils"
import { Article } from "@/models/news-aggregator.types"
import { LabelValuePair } from "./LabelValuePair"

interface Props {
    articleSelected: Article | undefined
}

export function ArticleDrawer({ articleSelected }: Props) {
    return (
        <DrawerContent className="px-8 pb-8">
            <main className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-8">
                <img
                    src={articleSelected?.urlToImage ?? defaultImageSvg}
                    alt={articleSelected?.title}
                    className="w-full h-full max-h-40 sm:max-h-72 lg:max-h-96 object-cover rounded-lg"
                />
                <section className="flex flex-col gap-2">
                    <DrawerTitle className="text-xl lg:text-4xl">{articleSelected?.title}</DrawerTitle>
                    <DrawerDescription className="text-xs sm:text-sm line-clamp-2 md:line-clamp-none">{articleSelected?.content}</DrawerDescription>
                    <p className="text-base lg:text-lg">{articleSelected?.description}</p>
                    <a
                        href={articleSelected?.url}
                        className="ml-auto flex text-xs sm:text-sm items-center gap-2 font-medium text-neutral-500 hover:text-indigo-800 hover:underline" target="_blank" rel="noreferrer"
                    >
                        Read the full article
                        <ExternalLink className="size-4" />
                    </a>
                    <div className="text-neutral-700 text-xs lg:text-sm mt-auto">
                        <LabelValuePair label="by" value={articleSelected?.author ?? 'Anonymous'} />
                        <LabelValuePair label="source" value={articleSelected?.source ?? 'Unknown'} />
                        <span
                            className="block text-neutral-700"
                        >
                            {formatDate(articleSelected?.publishedAt)}
                        </span>
                    </div>
                </section>
            </main>

            <DrawerFooter className="mt-4">
                <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
    )
}
