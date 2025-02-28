import queryString from 'query-string';

import { NEWS_API_KEY } from "@/constants/api.constants";
import { NewsapiResponse } from "@/models/newsapi.types";

const baseAPIPath = "https://newsapi.org/v2/top-headlines?sortBy=popularity"

const fetcherNewsAPI = async (url: string) => {
    const response = await fetch(url, { headers: { 'X-Api-Key': NEWS_API_KEY }})
    const data = await response.json()
    return data
}

const getCurrentParams = () => {
    const queryParams = new URLSearchParams(window.location.search)
    const keywords = queryParams.get('keywords')
    const from = queryParams.get('from')
    const to = queryParams.get('to')
    const category = queryParams.get('category')
    return { keywords, from, to, category }
}

export const getDataFromNewsApiSource = async (): Promise<NewsapiResponse> => {
    const { category, from, keywords, to } = getCurrentParams();
    const paramsForResource = queryString.stringify({
        q: keywords ? `+${keywords}`: undefined,
        category: category || undefined,
        from: from || undefined,
        to: to || undefined,
    })
    return await fetcherNewsAPI(`${baseAPIPath}&${paramsForResource}`)
}