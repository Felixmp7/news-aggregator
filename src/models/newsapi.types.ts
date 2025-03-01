
export type NewsapiArticle = {
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

export type NewsapiResponse = {
    status: string,
    totalResults: number,
    articles: NewsapiArticle[]
}