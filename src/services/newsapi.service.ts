import queryString from 'query-string';

import { NEWS_API_KEY } from "@/constants/api.constants";
import { fetchDataSource, getCurrentParams } from '@/lib/utils';
import { NewsAggregatorResponse } from '@/models/newsaggregator.types';
import { NewsapiResponse } from "@/models/newsapi.types";

const baseAPIPath = "https://newsapi.org/v2/top-headlines?sortBy=popularity"

export const getDataFromNewsApiSource = async (): Promise<NewsAggregatorResponse> => {
    const { category, from, keywords, to } = getCurrentParams();
    const paramsForResource = queryString.stringify({
        q: keywords ? `+${keywords}`: undefined,
        category: category || undefined,
        from: from || undefined,
        to: to || undefined,
    })

    const newsApiResponse = await fetchDataSource<NewsapiResponse>(`${baseAPIPath}&${paramsForResource}`, {
        headers: { 'X-Api-Key': NEWS_API_KEY }
    }
    )

    return {
        status: newsApiResponse.status,
        articles: newsApiResponse.articles.map(article => ({
            title: article.title,
            urlToImage: article.urlToImage ?? undefined,
            author: article.author,
            content: article.content,
            description: article.description,
            source: article.source.name,
            url: article.url,
            publishedAt: article.publishedAt,
            category: category || 'general'
        }))
    }
}