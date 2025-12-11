import { Button } from '@/components/ui/button'
import type { typeoffilter } from '@/hooks/useFilters/type'
import type { FileData } from '@/hooks/useUploadImg/type'
import type { ImageMatrix } from '@/utils/type'
import { ArrowDownToLine } from 'lucide-react'

interface ActionFilterButtonProps {
    filter: (filterType: typeoffilter, file: FileData | undefined) => ImageMatrix | undefined,
    file: FileData | undefined,
    filterType: typeoffilter
}

export const ActionFilterButton = ({ filter, file, filterType }: ActionFilterButtonProps) => {
    return (
        <Button onClick={() => filter(filterType, file)}> Download  <ArrowDownToLine /></Button>
    )
}
