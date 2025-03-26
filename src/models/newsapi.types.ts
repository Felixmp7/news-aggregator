
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

export type NewsapiError = {
    message: string
}

export type NewsapiSuccess = {
    status: string,
    totalResults: number,
    articles: NewsapiArticle[]
}

export type NewsapiResponse = NewsapiSuccess | NewsapiError