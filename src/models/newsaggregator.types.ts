export type Source = "news-api" | "guardian" | "new-york-times";

export type CommonQueryParams = {
    q: string
}

export type Article = {
    title: string
    urlToImage: string
    content: string
    description?: string
    url: string
    author?: string
    source: string
    publishedAt: string
}