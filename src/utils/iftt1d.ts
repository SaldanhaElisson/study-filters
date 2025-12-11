import { fft1d } from "./fft1d";

export function ifft1d(re: number[], im: number[]) {
    for (let i = 0; i < im.length; i++) im[i] = -im[i];
    fft1d(re, im);
    for (let i = 0; i < re.length; i++) {
        re[i] /= re.length;
        im[i] = -im[i] / re.length;
    }
}