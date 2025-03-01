import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns"
import { twMerge } from "tailwind-merge"

import { NewsAggregatorQueryParams } from "@/models/news-aggregator.types"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

/**
 *
 * @param date string
 * @returns string | null
 * @example formatDate('2022-01-01T00:00:00Z') // 'January 1, 2022 12:00 AM'
 */
export const formatDate = (date?: string) => {
    if (date) return format(new Date(date), 'PPpp')
    return null
}

export const getFavoritesFromLocalStorage = () => {
    const source = localStorage.getItem('source')
    const keywords =  localStorage.getItem('keywords')
    const category =  localStorage.getItem('category')
    const from = localStorage.getItem('from')
    const to = localStorage.getItem('to')

    return { keywords, from, to, category, source }
}

export const getQueryParams = () => {
    const queryParams = new URLSearchParams(window.location.search)

    const source = queryParams.get('source')
    const keywords = queryParams.get('keywords')
    const from = queryParams.get('from')
    const to = queryParams.get('to')
    const category = queryParams.get('category')

    return {
        keywords,
        from,
        to,
        category,
        source,
        hasValues: (!!source || !!keywords || !!from || !!to || !!category)
    }
}

export const getInitialValues = () : NewsAggregatorQueryParams => {
    const { hasValues, ...values } = getQueryParams();
    const valuesFromLocalStorage = getFavoritesFromLocalStorage();

    if (hasValues) return values as unknown as NewsAggregatorQueryParams

    return valuesFromLocalStorage as unknown as NewsAggregatorQueryParams
}

export const setQueryParams = ({ source, keywords, category, from, to }: NewsAggregatorQueryParams) => {
    const queryParams = new URLSearchParams(window.location.search)
    queryParams.set('source', source ?? '')
    queryParams.set('keywords', keywords ?? '')
    queryParams.set('category', category ?? '')
    queryParams.set('from', from || '')
    queryParams.set('to', to || '')
}

export const fetchDataSource = async <T>(url: string, init?: RequestInit) => {
    const response = await fetch(url, init)
    const data = await response.json()
    return data as T
}

export const pushQueryParams = (searchParams: string) => {
    const newUrl = `${window.location.pathname}?${searchParams}`
    window.history.pushState({}, '', newUrl)
}