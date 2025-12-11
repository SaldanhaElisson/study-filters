import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import '../index.css'
import type { typeoffilter } from "@/hooks/useFilters/type";

interface SelectFilterProps {
    setTypeOfFilter: (filter: typeoffilter) => void;
}
const SelectFilter = ({ setTypeOfFilter }: SelectFilterProps) => {
    return (
        <>
            <Select onValueChange={setTypeOfFilter}>
                <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Selecione um filtro" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel> Filtros </SelectLabel>
                        <SelectItem value="IDEAL">ideal</SelectItem>
                        <SelectItem value="BUTTERWORTH">butterworth</SelectItem>
                        <SelectItem value="GAUSSIANO">gaussiano</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}

export default SelectFilter