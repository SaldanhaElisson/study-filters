
function matrixToDataURL(matrixData: ImageMatrix, type: string = 'image/png'): string {

    const width = Math.floor(matrixData.width);
    const height = Math.floor(matrixData.height);
    const data = matrixData.data;

    // 1. Criar Canvas
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    // 2. Criar objeto ImageData
    const imgData = ctx.createImageData(width, height);
    const pixelData = imgData.data;

    // 3. Preencher os pixels
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;
            // O valor é o mesmo para R, G e B, pois é uma imagem em escala de cinza
            const value = data[y][x];

            // Garantir que o valor é um inteiro entre 0 e 255
            const pixelVal = Math.round(value);

            pixelData[idx] = pixelVal; 		// R
            pixelData[idx + 1] = pixelVal; 	// G
            pixelData[idx + 2] = pixelVal; 	// B
            pixelData[idx + 3] = 255; 		// Alpha (opacidade total)
        }
    }

    // 4. Desenhar os dados no Canvas
    ctx.putImageData(imgData, 0, 0);

    // 5. Retornar a Data URL
    return canvas.toDataURL(type);
}

export function downloadImageMatrix(
    matrixData,
    filename: string = 'imagem_filtrada.png'
): void {
    // 1. Converter a matriz para uma URL de dados (Base64)
    const dataUrl = matrixToDataURL(matrixData, 'image/png');

    // 2. Criar um elemento <a> temporário
    const link = document.createElement('a');

    // 3. Definir atributos para o download
    link.href = dataUrl;
    link.download = filename;

    // 4. Simular o clique para iniciar o download
    document.body.appendChild(link);
    link.click();

    // 5. Remover o elemento após o uso
    document.body.removeChild(link);
}