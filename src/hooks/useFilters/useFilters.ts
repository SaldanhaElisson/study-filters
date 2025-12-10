import { filterButterworth } from "@/utils/filterByButterworth"
import type { typeoffilter } from "./type"
import { filterGaussiano } from "@/utils/filterByGaussaiano"
import { filterIdeal } from "@/utils/filterByIdeal"
import type { ImageMatrix } from "@/utils/type"

const useFilter () => {
    function filter(filterType: typeoffilter, file: File): ImageMatrix {

        if (filterType == "BUTTERWORTH") {
            return filterButterworth()
        }

        if (filterType == "GAUSSIANO") {
            return filterGaussiano()
        }

        if (filterType == "IDEAL") {
            return filterIdeal()
        }
    }
}