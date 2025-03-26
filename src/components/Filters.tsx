import { DateRange } from "react-day-picker"

import { Source } from "@/models/news-aggregator.types"
import { SelectSource } from "./SelectSource"
import { Button } from "./ui/button"
import { DateRangePicker } from "./ui/date-range-picker"
import { Input } from "./ui/input"

interface Props {
    sourceSelected: Source
    keywordValues: string
    dateRange: DateRange | undefined
    category: string
    clearFilters: VoidFunction
    handleChangeKeywords: (value: string) => void
    handleChangeCategory: (value: string) => void
    handleChangeSource: (source: Source) => void
    handleChangeRange: (dateRange: DateRange | undefined) => void
    handleClickSearch: VoidFunction
    handleSaveFiltersInLocalStorage: VoidFunction
}

export const Filters = ({
    sourceSelected,
    keywordValues,
    dateRange,
    category,
    handleChangeSource,
    handleChangeKeywords,
    handleChangeCategory,
    handleChangeRange,
    handleClickSearch,
    clearFilters,
    handleSaveFiltersInLocalStorage
}: Props) => {
    return (
        <>
            <SelectSource
                className="w-full xl:w-[180px]"
                value={sourceSelected ?? 'news-api'}
                onChange={handleChangeSource}
            />
            <Input
                placeholder='Search by keyword...'
                className='w-full xl:w-[300px]'
                value={keywordValues ?? ''}
                onChange={(event) => handleChangeKeywords(event.target.value)}
            />
            <Input
                placeholder='Type a category or section'
                className='w-full xl:w-[300px]'
                value={category ?? ''}
                onChange={(event) => handleChangeCategory(event.target.value)}
            />
            <DateRangePicker
                className='col-span-1 sm:col-span-2 w-full xl:col-span-1 xl:w-[300px]'
                date={dateRange}
                onChangeRange={handleChangeRange}
            />
            <Button
                className='xl:ml-auto'
                onClick={handleClickSearch}
            >
                    Search
            </Button>
            <Button variant="ghost" onClick={handleSaveFiltersInLocalStorage}>
                Save filters
            </Button>
            <Button variant="ghost" onClick={clearFilters}>
                Reset
            </Button>
        </>
    )
}
