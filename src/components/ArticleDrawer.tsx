
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
import { NewsapiArticle } from "@/models/news.interfaces"
import { LabelValuePair } from "./LabelValuePair"

interface Props {
    articleSelected: NewsapiArticle | undefined
}

export function ArticleDrawer({ articleSelected }: Props) {
    return (
        <DrawerContent className="px-8 pb-8">
            <main className="grid grid-cols-2 gap-10 pt-8">

                <img
                    src={articleSelected?.urlToImage ?? defaultImageSvg}
                    alt={articleSelected?.title}
                    className="w-full h-full max-h-96 object-cover rounded-lg"
                />
                <section className="flex flex-col gap-2">
                    <DrawerTitle className="text-4xl">{articleSelected?.title}</DrawerTitle>
                    <DrawerDescription>{articleSelected?.content}</DrawerDescription>
                    <p className="text-lg">{articleSelected?.description}</p>
                    <a
                        href={articleSelected?.url}
                        className="ml-auto flex text-sm items-center gap-2 font-medium text-neutral-500 hover:text-indigo-800 hover:underline" target="_blank" rel="noreferrer"
                    >
                            continue reading
                        <ExternalLink className="size-4" />
                    </a>
                    <div className="text-neutral-700 text-sm mt-auto">
                        <LabelValuePair label="by" value={articleSelected?.author ?? 'Anonymous'} />
                        <LabelValuePair label="source" value={articleSelected?.source.name ?? 'Unknown'} />
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
