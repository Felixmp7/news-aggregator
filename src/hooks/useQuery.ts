import { useState } from 'react'

export const useQuery = <T>(queryFn: () => Promise<T>) => {
    const [data, setData] = useState<T | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetch = async () => {
        setIsLoading(true);
        setError(null)
        try {
            const responseData = await queryFn()
            setData(responseData)
        } catch (error) {
            console.log(error)
            setError('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return {
        data,
        isLoading,
        error,
        fetch
    }
}
