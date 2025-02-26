export interface NewsapiArticle {
    author: string,
    content: string,
    description: string,
    publishedAt: string,
    source: {
        id: string | null,
        name: string
    },
    title: string,
    url: string,
    urlToImage: string | null
}

export interface NewsapiResponse {
    status: string,
    totalResults: number,
    articles: NewsapiArticle[]
}