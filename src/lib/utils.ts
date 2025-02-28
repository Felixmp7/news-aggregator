import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns"
import { twMerge } from "tailwind-merge"

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

export const getCurrentParams = () => {
    const queryParams = new URLSearchParams(window.location.search)
    const keywords = queryParams.get('keywords')
    const from = queryParams.get('from')
    const to = queryParams.get('to')
    const category = queryParams.get('category')
    return { keywords, from, to, category }
}

export const fetchDataSource = async <T>(url: string, init?: RequestInit) => {
    const response = await fetch(url, init)
    const data = await response.json()
    return data as T
}
