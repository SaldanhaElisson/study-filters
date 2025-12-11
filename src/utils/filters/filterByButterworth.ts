import type { FileData } from "@/hooks/useUploadImg/type";
import { fileReaderToMatrix } from "../fileReaderToMatrix";
import { fft2d } from "../ftt2d";
import { shiftFFT } from "../shiftFTT";
import { ifft2d } from "../ifft2d";
import { zeroPadMatrix } from "../zeroPadMatrix";
import { matrixToImageMatrix } from "../matrixToImageMatrix";


function applyButterworthLowPass(re: number[][], im: number[][], cutoff: number, order = 2) {
    const h = re.length;
    const w = re[0].length;
    const cy = h / 2;
    const cx = w / 2;

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const d = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
            const hval = 1 / (1 + (d / cutoff) ** (2 * order));
            re[y][x] *= hval;
            im[y][x] *= hval;
        }
    }
}

export function filterButterworth(file: FileData, cutoff: number) {
    return (async () => {

        const loadedImg = await fileReaderToMatrix(file.url);

        const padded = zeroPadMatrix(loadedImg.data, loadedImg.height, loadedImg.width);

        const re: number[][] = padded.data.map(row => Array.from(row));

        const im: number[][] = re.map(r => new Array(r.length).fill(0));

        fft2d(re, im);
        shiftFFT(re, im);
        applyButterworthLowPass(re, im, cutoff, 1);
        shiftFFT(re, im);
        ifft2d(re, im);

        let maxValue = -Infinity;
        let minValue = Infinity;


        for (const row of re) {
            for (const value of row) {
                if (value > maxValue) {
                    maxValue = value;
                }
                if (value < minValue) {
                    minValue = value;
                }
            }
        }

        const unpaddedResult = re.slice(0, loadedImg.height).map(row =>
            row.slice(0, loadedImg.width)
        );

        const range = maxValue - minValue;

        const result = unpaddedResult.map(row =>
            Array.from(row.map(v => {
                if (range === 0) return 0;
                const normalized = (v - minValue) / range;
                const rescaled = normalized * 255;
                return Math.max(0, Math.min(255, rescaled));
            }))
        );

        return matrixToImageMatrix(result);
    })();
}