import { differenceInMonths } from 'date-fns';
import queryString from 'query-string';

import { NEWS_API_BASE_URL, NEWS_API_KEY } from "@/constants/index.constants";
import { fetchDataSource, getCurrentParams } from '@/lib/utils';
import { DateRangeString, NewsAggregatorResponse } from '@/models/newsaggregator.types';
import { NewsapiResponse } from "@/models/newsapi.types";

const MAX_MONTH_RANGE_DIFFERENCE = 1;

const getAValidDateRange = (from: string | null, to: string | null): DateRangeString | undefined => {
    if (from === null || to === null) return;

    const isValid = differenceInMonths(to, from) < MAX_MONTH_RANGE_DIFFERENCE;
    if (isValid) return { from, to }

    const now = new Date();
    const oneMonthAgo = new Date(now.setMonth(now.getMonth() - MAX_MONTH_RANGE_DIFFERENCE));

    return {
        from: oneMonthAgo.toISOString(),
        to: now.toISOString()
    }
}

export const getDataFromNewsApiSource = async (): Promise<NewsAggregatorResponse> => {
    const { category, from, keywords, to } = getCurrentParams();
    const paramsForResource = queryString.stringify({
        q: keywords ? `+${keywords}`: undefined,
        category: category || undefined,
        ...getAValidDateRange(from, to),
    })

    const newsApiResponse =
        await fetchDataSource<NewsapiResponse>(`${NEWS_API_BASE_URL}&${paramsForResource}`, {
            headers: { 'X-Api-Key': NEWS_API_KEY }
        })

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