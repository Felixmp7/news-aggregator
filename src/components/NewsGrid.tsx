import { NewsapiArticle } from "@/models/news.interfaces";
import { PreviewHeader } from "./PreviewHeader";
import { PreviewNew } from "./PreviewNew";

const SKELETON_LIST = Array.from({ length: 9 }, (_, index) => index);

interface Props {
    isLoading: boolean;
    articles: NewsapiArticle[] | undefined;
    onSelectArticle: (article: NewsapiArticle) => void
}

export const NewsGrid = ({ isLoading, articles, onSelectArticle}: Props) => (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 container mx-auto pb-10">
        {isLoading ? (
            SKELETON_LIST.map((index) => (
                <div key={index} className="animate-pulse flex flex-col justify-between p-4 rounded-lg bg-neutral-100 h-60 text-neutral-600">
                    <PreviewHeader />
                    <div className="grow flex items-center justify-center bg-neutral-200 rounded-2xl mb-4" />
                    <div className="flex justify-between items-center">
                        <div className="w-16 h-4 bg-neutral-200 rounded-full" />
                        <div className="w-16 h-4 bg-neutral-200 rounded-full" />
                    </div>
                </div>
            ))
        ) : (
            articles?.map(({ title, source, urlToImage, publishedAt, ...rest }) => (
                <PreviewNew
                    key={title}
                    imageAlt={`Image for article: ${title}`}
                    title={title}
                    imageSrc={urlToImage}
                    source={source.name}
                    date={publishedAt}
                    onClick={() => onSelectArticle({ title, source, urlToImage, publishedAt, ...rest })}
                />
            ))
        )}
    </section>
)
