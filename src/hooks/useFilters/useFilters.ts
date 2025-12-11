import { filterButterworth } from "@/utils/filterByButterworth"
import type { typeoffilter } from "./type"
import { filterGaussiano } from "@/utils/filterByGaussaiano"
import { filterIdeal } from "@/utils/filterByIdeal"
import type { ImageMatrix } from "@/utils/type"
import type { FileData } from "../useUploadImg/type"
import { downloadImageMatrix } from "@/utils/downloadImg"

export const useFilter = () => {
    async function filter(filterType: typeoffilter, file: FileData | undefined): ImageMatrix | undefined {

        if (!file) {
            return
        }

        if (filterType == "BUTTERWORTH") {
            const resulta = await filterButterworth(file)
            downloadImageMatrix(resulta)
        }

        if (filterType == "GAUSSIANO") {
            return filterGaussiano(file)
        }

        if (filterType == "IDEAL") {
            return filterIdeal(file)
        }
    }

    return {
        filter
    }
}