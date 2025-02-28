import queryString from 'query-string';

import { NEW_YORK_TIMES_API_KEY, NY_TIMES_API_BASE_URL } from '@/constants/index.constants';
import { fetchDataSource, getCurrentParams } from '@/lib/utils';
import { NewYorkTimesResponse } from '@/models/new-york-times.types';
import { NewsAggregatorResponse } from '@/models/newsaggregator.types';

export const getDataFromNYTimesSource = async (): Promise<NewsAggregatorResponse> => {
    const { category, from, keywords } = getCurrentParams();
    const paramsForResource = queryString.stringify({
        q: keywords || undefined,
        section_name: category || undefined,
        pub_date: from || undefined,
        "api-key": NEW_YORK_TIMES_API_KEY
    })
    const nyTimesResponse = await fetchDataSource<NewYorkTimesResponse>(`${NY_TIMES_API_BASE_URL}?${paramsForResource}`)

    return {
        status: nyTimesResponse.status,
        articles: nyTimesResponse.response.docs.map(article => ({
            title: article.abstract,
            description: article.snippet,
            content: article.lead_paragraph,
            source: article.source,
            url: article.web_url,
            publishedAt: article.pub_date,
            category: article.section_name,
            author: article.byline.original,
        }))
    }
}