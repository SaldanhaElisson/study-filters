import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import '../index.css'
const SelectFilter = () => {
    return (
        <>
            <Select>
                <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Selecione um filtro" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel> Filtros </SelectLabel>
                        <SelectItem value="ideal">ideal</SelectItem>
                        <SelectItem value="butterworth">butterworth</SelectItem>
                        <SelectItem value="gaussiano">gaussiano</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}

export default SelectFilter