import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Source } from "@/models/newsaggregator.types"

interface Props {
    value: Source,
    onChange: (source: Source) => void
}

export const SelectSource = ({ value, onChange }: Props) => (
    <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
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
