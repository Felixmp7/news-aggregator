import { CommonQueryParams } from "./newsaggregator.types"

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

export type NewsapiQueryParams =  CommonQueryParams & {
    category: string,
    from: string, // Timestamp
    to: string, // Timestamp
}

export type NewsApiCategory = 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology'