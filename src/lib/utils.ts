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
