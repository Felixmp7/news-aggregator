import NoResultsImage from "@/assets/no-results.svg";
import { Article } from "@/models/news-aggregator.types";
import { PreviewHeader } from "./PreviewHeader";
import { PreviewNew } from "./PreviewNew";

const SKELETON_LIST = Array.from({ length: 9 }, (_, index) => index);

interface Props {
    isLoading: boolean;
    articles: Article[] | undefined;
    onSelectArticle: (article: Article) => void
}

export const NewsGrid = ({ isLoading, articles, onSelectArticle}: Props) => (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 pb-10">
        {(() => {
            if (isLoading) {
                return SKELETON_LIST.map((index) => (
                    <div key={index} className="animate-pulse flex flex-col justify-between p-4 rounded-lg bg-neutral-100 h-60 text-neutral-600">
                        <PreviewHeader />
                        <div className="grow flex items-center justify-center bg-neutral-200 rounded-2xl mb-4" />
                        <div className="flex justify-between items-center">
                            <div className="w-16 h-4 bg-neutral-200 rounded-full" />
                            <div className="w-16 h-4 bg-neutral-200 rounded-full" />
                        </div>
                    </div>
                ))
            }
            if (articles?.length) {
                return articles
                    .map(({ title, source, urlToImage, publishedAt, ...rest }) => (
                        <PreviewNew
                            key={title}
                            imageAlt={`Image for article: ${title}`}
                            title={title}
                            imageSrc={urlToImage}
                            source={source}
                            date={publishedAt}
                            onClick={() => onSelectArticle({ title, source, urlToImage, publishedAt, ...rest })}
                        />
                    ))
            }
            return (
                <div className="col-span-full mt-10 flex flex-col items-center justify-center gap-20">
                    <img src={NoResultsImage} alt="no results image" />
                    <div className="flex flex-col gap-2 text-center text-neutral-500">
                        <strong className="text-4xl">Oops,</strong>
                        <span>There is no results for your search.</span>
                        <span>Come on, try again!</span>
                    </div>
                </div>
            )
        })()}
    </section>
)
