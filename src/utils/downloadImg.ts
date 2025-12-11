import type { ImageMatrix } from "./type";

function matrixToDataURL(matrixData: ImageMatrix, type: string = 'image/png'): string {

    const width = Math.floor(matrixData.width);
    const height = Math.floor(matrixData.height);
    console.log(width, height)
    const data = matrixData.data;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    const imgData = ctx?.createImageData(width, height);
    const pixelData = imgData?.data;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;
            const value = data[y][x];

            const pixelVal = Math.round(value);

            pixelData[idx] = pixelVal;
            pixelData[idx + 1] = pixelVal;
            pixelData[idx + 2] = pixelVal;
            pixelData[idx + 3] = 255;
        }
    }

    ctx?.putImageData(imgData, 0, 0);

    return canvas.toDataURL(type);
}

export function downloadImageMatrix(
    matrixData: ImageMatrix,
    filename: string = 'imagem_filtrada.png'
): void {
    const dataUrl = matrixToDataURL(matrixData, 'image/png');

    const link = document.createElement('a');

    link.href = dataUrl;
    link.download = filename;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
}