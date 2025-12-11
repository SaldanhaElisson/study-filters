/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FileData } from "@/hooks/useUploadImg/type";
import { fileReaderToMatrix } from "../fileReaderToMatrix";
import { zeroPadMatrix } from "../zeroPadMatrix";
import { fft2d } from "../ftt2d";
import { shiftFFT } from "../shiftFTT";
import { ifft2d } from "../ifft2d";
import { matrixToImageMatrix } from "../matrixToImageMatrix";

function applyIdealLowPass(re: string | any[], im: number[][], cutoff: number) {
    const h = re.length;
    const w = re[0].length;
    const cy = h / 2;
    const cx = w / 2;

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const d = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
            if (d > cutoff) {
                re[y][x] = 0;
                im[y][x] = 0;
            }
        }
    }
}

export function filterIdeal(file: FileData, cutoff: number) {
    return (async () => {
        const loadedImg = await fileReaderToMatrix(file.url);

        const padded = zeroPadMatrix(loadedImg.data, loadedImg.height, loadedImg.width);

        const re: number[][] = padded.data.map(row => Array.from(row));

        const im: number[][] = re.map(r => new Array(r.length).fill(0));

        fft2d(re, im);
        shiftFFT(re, im);
        applyIdealLowPass(re, im, cutoff);
        shiftFFT(re, im);
        ifft2d(re, im);

        const unpaddedResult = re.slice(0, loadedImg.height).map(row =>
            row.slice(0, loadedImg.width)
        );

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