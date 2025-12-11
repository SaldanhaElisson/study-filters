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