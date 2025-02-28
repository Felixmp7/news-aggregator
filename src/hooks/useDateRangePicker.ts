import { useState } from "react"
import { DateRange } from "react-day-picker"

export const useDateRangePicker = () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>()

    const handleChangeRange = (dateRange: DateRange | undefined) => setDateRange(dateRange || undefined)

    return {
        dateRange,
        handleChangeRange
    }
}
