import { NEWS_API_KEY } from "@/constants/api.constants"
import { NewsapiResponse } from "@/models/news.interfaces"

const baseAPIPath = `https://newsapi.org/v2/everything?q=Apple&sortBy=popularity`

const fetcherNewsAPI = async (url: string) => {
    const response = await fetch(url, {
        headers: {
            'X-Api-Key': NEWS_API_KEY,
        }
    })
    const data = await response.json()
    return data
}

export const getNews = async (): Promise<NewsapiResponse> =>
    await fetcherNewsAPI(baseAPIPath)