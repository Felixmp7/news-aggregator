import queryString from 'query-string';

import { NEW_YORK_TIMES_API_KEY } from '@/constants/api.constants';
import { fetchDataSource, getCurrentParams } from '@/lib/utils';
import { NewYorkTimesResponse } from '@/models/new-york-times.types';
import { NewsAggregatorResponse } from '@/models/newsaggregator.types';

const baseAPIPath = "https://api.nytimes.com/svc/search/v2/articlesearch.json"

export const getDataFromNYTimesSource = async (): Promise<NewsAggregatorResponse> => {
    const { category, from, keywords } = getCurrentParams();
    const paramsForResource = queryString.stringify({
        q: keywords || undefined,
        section_name: category || undefined,
        pub_date: from || undefined,
        "api-key": NEW_YORK_TIMES_API_KEY
    })
    const nyTimesResponse = await fetchDataSource<NewYorkTimesResponse>(`${baseAPIPath}?${paramsForResource}`)

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