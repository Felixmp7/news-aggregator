import queryString from 'query-string';

import { THE_GUARDIAN_API_BASE_URL } from '@/constants/index.constants';
import { fetchDataSource } from '@/lib/utils';
import { NewsAggregatorQueryParams, NewsAggregatorResponse } from '@/models/news-aggregator.types';
import { GuardianResponse } from '@/models/the-guardian.types';

export const getDataFromTheGuardiansApiSource = async ({ category, from, keywords, to }: Partial<NewsAggregatorQueryParams>): Promise<NewsAggregatorResponse> => {
    const paramsForResource = queryString.stringify({
        q: keywords || undefined,
        section: category || undefined,
        "from-date": from || undefined,
        "to-date": to || undefined,
    })
    const { response } = await fetchDataSource<GuardianResponse>(`${THE_GUARDIAN_API_BASE_URL}&${paramsForResource}`)

    return {
        status: response.status,
        articles: response.results.map(article => ({
            title: article.webTitle,
            description: 'The description of this article is not available',
            source: 'The Guardian',
            url: article.webUrl,
            publishedAt: article.webPublicationDate,
            category: article.sectionName || category || 'general'
        }))
    }
}