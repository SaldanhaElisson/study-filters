import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import SelectFilter from "@/sections/SelectFilter"
import UploadImg from "@/sections/UploadImg"
import '../index.css'
import { ActionFilterButton } from "@/sections/ActionFilterButton"
import { About } from "@/sections/About"
import { useFileUploader } from "@/hooks/useUploadImg/useUploadImg"
import { useState } from "react"
import type { FileData } from "@/hooks/useUploadImg/type"
import { useFilter } from "@/hooks/useFilters/useFilters"
export const Home = () => {
    const [file, setFile] = useState<FileData>();

    const { handleFileChange } = useFileUploader({ setFile })

    const { filter } = useFilter()

    return (
        <div>
            <div className='min-w-screen min-h-screen bg-accent-foreground flex items-center justify-center'>
                <Card className="min-w-md">
                    <CardHeader>
                        <CardTitle className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0"> FilterX</CardTitle>
                        <CardDescription> Faça o testes dos seus filtros aqui!</CardDescription>
                    </CardHeader>

                    <CardContent className="flex flex-col items-center justify-center gap-5">
                        <UploadImg handleFileChange={handleFileChange} />

                        <SelectFilter />

                    </CardContent>
                    <CardFooter className="flex items-center justify-center">
                        <ActionFilterButton file={file} filter={filter} filterType="GAUSSIANO" />
                    </CardFooter>
                </Card>
            </div>
            <div className='min-w-screen min-h-screen bg-background m-20 flex justify-center'>
                <About />
            </div>
        </div>
    )
}
