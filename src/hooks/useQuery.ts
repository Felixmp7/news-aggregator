import { useState } from 'react'

import { NewsAggregatorQueryParams } from '@/models/news-aggregator.types'

export const useQuery = <T>(queryFn: (params: Partial<NewsAggregatorQueryParams>) => Promise<T>) => {
    const [data, setData] = useState<T | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const fetch = async (values: Partial<NewsAggregatorQueryParams>) => {
        setIsLoading(true);
        setIsError(false)
        try {
            const responseData = await queryFn(values)
            setData(responseData)
        } catch (error) {
            console.error(error)
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        data,
        isLoading,
        isError,
        fetch
    }
}
