import type { FileData } from "@/hooks/useUploadImg/type";

export function fft1d(re: number[], im: number[]) {
    const n = re.length;
    if (n <= 1) return;

    const half = n / 2;
    const er: number[] = [];
    const ei: number[] = [];
    const or: number[] = [];
    const oi: number[] = [];

    for (let i = 0; i < half; i++) {
        er.push(re[2 * i]);
        ei.push(im[2 * i]);
        or.push(re[2 * i + 1]);
        oi.push(im[2 * i + 1]);
    }

    fft1d(er, ei);
    fft1d(or, oi);

    for (let k = 0; k < half; k++) {
        const t = -2 * Math.PI * k / n;
        const c = Math.cos(t);
        const s = Math.sin(t);

        const tr = c * or[k] - s * oi[k];
        const ti = s * or[k] + c * oi[k];

        re[k] = er[k] + tr;
        im[k] = ei[k] + ti;

        re[k + half] = er[k] - tr;
        im[k + half] = ei[k] - ti;
    }
}

export function ifft1d(re: number[], im: number[]) {
    for (let i = 0; i < im.length; i++) im[i] = -im[i];
    fft1d(re, im);
    for (let i = 0; i < re.length; i++) {
        re[i] /= re.length;
        im[i] = -im[i] / re.length;
    }
}

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

export function ifft2d(re: number[][], im: number[][]) {
    const h = re.length;
    const w = re[0].length;

    for (let y = 0; y < h; y++) ifft1d(re[y], im[y]);

    for (let x = 0; x < w; x++) {
        const colRe: number[] = new Array(h).fill(0);
        const colIm: number[] = new Array(h).fill(0);

        for (let y = 0; y < h; y++) {
            colRe[y] = re[y][x];
            colIm[y] = im[y][x];
        }

        ifft1d(colRe, colIm);

        for (let y = 0; y < h; y++) {
            re[y][x] = colRe[y];
            im[y][x] = colIm[y];
        }
    }
}

export async function fileReaderToMatrix(url: string) {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            const imgData = ctx.getImageData(0, 0, img.width, img.height);
            const data = imgData.data;

            const matrix: number[][] = [];
            for (let y = 0; y < img.height; y++) {
                const row: number[] = [];
                for (let x = 0; x < img.width; x++) {
                    const idx = (y * img.width + x) * 4;
                    row.push((data[idx] + data[idx + 1] + data[idx + 2]) / 3);
                }
                matrix.push(row);
            }

            resolve({ width: img.width, height: img.height, data: matrix });
        };
        img.src = url;
    });
}


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


export function matrixToImageMatrix(mat) {
    return {
        width: mat[0].length,
        height: mat.length,
        data: mat
    };
}


export function shiftFFT(re: number[][], im: number[][]): void {
    const h = re.length;
    if (h === 0) return;
    const w = re[0].length;

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            if ((x + y) % 2 !== 0) {
                re[y][x] *= -1;
                im[y][x] *= -1;
            }
        }
    }
}

export function nextPowerOfTwo(n: number): number {
    return Math.pow(2, Math.ceil(Math.log2(n)));
}

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

export function filterButterworth(file: FileData) {
    return (async () => {

        const loadedImg = await fileReaderToMatrix(file.url);

        const padded = zeroPadMatrix(loadedImg.data, loadedImg.height, loadedImg.width);

        const re: number[][] = padded.data.map(row => Array.from(row));

        const im: number[][] = re.map(r => new Array(r.length).fill(0));

        fft2d(re, im);
        shiftFFT(re, im);
        applyButterworthLowPass(re, im, 150, 1);
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