import { fft1d } from "./fft1d";

export function fft2d(re: number[][], im: number[][]) {
    const h = re.length;
    const w = re[0].length;

    for (let y = 0; y < h; y++) fft1d(re[y], im[y]);

    for (let x = 0; x < w; x++) {
        const colRe: number[] = new Array(h).fill(0);
        const colIm: number[] = new Array(h).fill(0);

        for (let y = 0; y < h; y++) {
            colRe[y] = re[y][x];
            colIm[y] = im[y][x];
        }

        fft1d(colRe, colIm);

        for (let y = 0; y < h; y++) {
            re[y][x] = colRe[y];
            im[y][x] = colIm[y];
        }
    }
}
