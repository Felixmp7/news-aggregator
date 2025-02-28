import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Source } from "@/models/news-aggregator.types"

interface Props {
    value: Source,
    className?: string
    onChange: (source: Source) => void
}

export const SelectSource = ({ value, className, onChange }: Props) => (
    <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={className}>
            <SelectValue placeholder="Select source" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel>Sources</SelectLabel>
                <SelectItem value="news-api">News API</SelectItem>
                <SelectItem value="guardian">The Guardian</SelectItem>
                <SelectItem value="new-york-times">New York Times</SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
)
