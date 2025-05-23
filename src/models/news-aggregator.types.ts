
export type Source = "news-api" | "guardian" | "new-york-times";

export type Article = {
    title: string
    urlToImage?: string
    content?: string
    description?: string
    url: string
    author?: string
    source: string
    publishedAt: string
    category: string
}

export type NewsAggregatorResponse = {
    status: string,
    articles: Article[],
    error?: Error
}

export type DateRangeString = {
    from: string | null,
    to: string | null
}

export type NewsAggregatorQueryParams = {
    source: Source | null
    keywords: string | null
    category: string | null
    from: string | null
    to: string | null
}