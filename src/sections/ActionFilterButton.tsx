import { Button } from '@/components/ui/button'
import type { typeoffilter } from '@/hooks/useFilters/type'
import type { FileData } from '@/hooks/useUploadImg/type'
import type { ImageMatrix } from '@/utils/type'
import { ArrowDownToLine } from 'lucide-react'

interface ActionFilterButtonProps {
    filter: (filterType: typeoffilter, file: FileData | undefined, cutOff: number) => Promise<ImageMatrix | undefined>,
    file: FileData | undefined,
    filterType: typeoffilter,
    cutOff: number
}

export const ActionFilterButton = ({ filter, file, filterType, cutOff }: ActionFilterButtonProps) => {
    return (
        <Button onClick={() => filter(filterType, file, cutOff)}> Download  <ArrowDownToLine /></Button>
    )
}
