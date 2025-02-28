import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { HTMLAttributes } from "react"
import { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface Props extends HTMLAttributes<HTMLDivElement> {
    date: DateRange | undefined
    onChangeRange: (date: DateRange | undefined) => void
}

export const DateRangePicker = ({ className, date, onChangeRange }: Props) => (
    <div className={cn("grid gap-2", className)}>
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                        "justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon />
                    {date?.from ? (
                        date.to ? (
                            <>
                                {format(date.from, "LLL dd, y")} -{" "}
                                {format(date.to, "LLL dd, y")}
                            </>
                        ) : (
                            format(date.from, "LLL dd, y")
                        )
                    ) : (
                        <span>Pick a date</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={onChangeRange}
                    numberOfMonths={2}
                />
            </PopoverContent>
        </Popover>
    </div>
)
