
export async function fileReaderToMatrix(url: string) {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(img, 0, 0);

            const imgData = ctx?.getImageData(0, 0, img.width, img.height);
            const data = imgData?.data;

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