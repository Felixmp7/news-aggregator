import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export const SelectSource = () => (
    <Select>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select source" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel>Sources</SelectLabel>
                <SelectItem value="news-api">News API</SelectItem>
                <SelectItem value="guardian">The Guardian</SelectItem>
                <SelectItem value="ny-times">New York Times</SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
)
