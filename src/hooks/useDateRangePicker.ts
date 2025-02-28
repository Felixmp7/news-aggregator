import { useState } from "react"
import { DateRange } from "react-day-picker"


export const useDateRangePicker = () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(),
        to: new Date(),
    })

    const onChangeRange = (dateRange: DateRange | undefined) => setDateRange(dateRange)

    return {
        dateRange,
        onChangeRange
    }
}
