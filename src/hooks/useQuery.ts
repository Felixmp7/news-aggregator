import { useState } from 'react'
import { toast } from 'sonner'

import { Article, NewsAggregatorQueryParams, NewsAggregatorResponse } from '@/models/news-aggregator.types'

export const useQuery = <T extends NewsAggregatorResponse>(queryFn: (params: Partial<NewsAggregatorQueryParams>) => Promise<T>) => {
    const [data, setData] = useState<Article[] | undefined>()
    const [isLoading, setIsLoading] = useState(false)

    const fetch = async (values: Partial<NewsAggregatorQueryParams>) => {
        setIsLoading(true);
        const responseData = await queryFn(values)

        if (responseData.error) toast.error(responseData?.error.message || 'An error occurred')
        else setData(responseData.articles)

        setIsLoading(false)
    }

    return {
        data,
        isLoading,
        fetch
    }
}
