type ChessCoord = [number, number];

// Calculate all valid movements of a knight relative to its current position,
// i.e., [1, 2], [1, -2], [-1, -2], [-1, 2], [2, 1], [2, -1], [-2, -1], [-2, 1]
//
// This is calculated by starting with a base move, 1 over and 2 up, and
// transforming all combinations of 3 different ways:
//
// 1. Reverse or not               (1 over and 2 up or 2 over and 1 up?)
// 2. Homo or heterogeneous signs  (both positive / negative or only one?)
// 3. Invert both signs or not     (each direction swaps sign)
//
// Q: How many combinations does this give us?
//  A: 2 * 2 * 2 = 2^3 = 8 combos
//
// Q: Why not just list out all 8 combos?
//  A: B/c that would be boring ;-)
const KNIGHT_REL_MOVES: ChessCoord[] = [];

for (let reverse = 0; reverse <= 1; reverse++) {
    for (let invert = 0; invert <= 1; invert++) {
        for (let hetero = 0; hetero <= 1; hetero++) {
            let move: ChessCoord = [1, 2];

            if (reverse) move.reverse();
            if (hetero) move[1] *= -1;
            if (invert) move = move.map((d) => d * -1) as ChessCoord;

            KNIGHT_REL_MOVES.push(move);
        }
    }
}

// Return a cell in chess notation form as a numbered chess coordinate, eg,
// a1=[1,1], b2=[2,2], c3=[3,3], ...
const getNumChessNotation = (cell: string): ChessCoord => [
    cell.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0) + 1,
    parseInt(cell.charAt(1)),
];

// Return if a chess coordinate is on the board
const isValidCell = ([col, row]): boolean =>
    1 <= col && col <= 8 && 1 <= row && row <= 8;

// Return the total number of valid moves a knight can make at the given cell
const chessKnight = (cell: string): number => {
    const [knightCol, knightRow]: ChessCoord = getNumChessNotation(cell);
    return KNIGHT_REL_MOVES.filter(([relCol, relRow]: ChessCoord) =>
        isValidCell([knightCol + relCol, knightRow + relRow]),
    ).length;
};
