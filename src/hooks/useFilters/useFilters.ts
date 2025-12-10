import { filterButterworth } from "@/utils/filterByButterworth"
import type { typeoffilter } from "./type"
import { filterGaussiano } from "@/utils/filterByGaussaiano"
import { filterIdeal } from "@/utils/filterByIdeal"
import type { ImageMatrix } from "@/utils/type"

export const useFilter = () => {
    function filter(filterType: typeoffilter, file: FileReader | undefined): ImageMatrix | undefined {

        if (!file) {
            return
        }

        if (filterType == "BUTTERWORTH") {
            return filterButterworth(file)
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