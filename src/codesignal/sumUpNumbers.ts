const differentSquares = (matrix: number[][]): number => {
    // Store hashes of all 2x2 squares in a set
    const squares: Set<number> = new Set<number>();

    // For the top-left corner of every 2x2 square, calculate and store the hash
    // of all 4 of its values
    for (let row = 0; row < matrix.length - 1; row++) {
        for (let col = 0; col < matrix[row].length - 1; col++) {
            squares.add(
                [
                    // Coordinates of the square's 4 values
                    [row, col],
                    [row, col + 1],
                    [row + 1, col],
                    [row + 1, col + 1],
                ]
                    // Flat list of the square's values
                    .map(([r, c]) => matrix[r][c])

                    // Hash of the square's values
                    .reduce((s, v, i) => s + v * Math.pow(10, i), 0),
            );
        }
    }

    // Since sets will not allow duplicates, the number of unique squares is
    // just the size of the squares set
    return squares.size;
};
