import type { DateRange } from "react-day-picker"

import { Source } from "@/models/newsaggregator.types"

const queryParams = new URLSearchParams(window.location.search)

interface Props {
    source: Source
    keywords: string | undefined
    category: string | undefined
    dateRange: DateRange | undefined
}

export const useUrlSearchParams = ({ keywords, category, dateRange, source }: Props) => {
    const setQueryParams = () => {
        queryParams.set('source', source)
        queryParams.set('keywords', keywords ?? '')
        queryParams.set('category', category ?? '')
        queryParams.set('from', dateRange?.from?.toISOString() || '')
        queryParams.set('to', dateRange?.to?.toISOString() || '')
    }

    return {
        search: () => {
            setQueryParams();
            const newUrl = `${window.location.pathname}?${queryParams.toString()}`
            window.history.pushState({}, '', newUrl)
        }
    }
}
