import { nextPowerOfTwo } from "./nextPowerOfTwo";

export function zeroPadMatrix(matrix: number[][], h: number, w: number) {
    const paddedH = nextPowerOfTwo(h);
    const paddedW = nextPowerOfTwo(w);

    const paddedMatrix: number[][] = [];
    for (let y = 0; y < paddedH; y++) {
        const row: number[] = new Array(paddedW).fill(0);
        if (y < h) {
            for (let x = 0; x < w; x++) {
                row[x] = matrix[y][x];
            }
        }
        paddedMatrix.push(row);
    }
    return { data: paddedMatrix, height: paddedH, width: paddedW };
}