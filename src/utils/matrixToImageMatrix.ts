
export function matrixToImageMatrix(mat) {
    return {
        width: mat[0].length,
        height: mat.length,
        data: mat
    };
}