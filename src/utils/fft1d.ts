
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