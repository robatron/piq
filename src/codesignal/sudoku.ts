const sudoku = (board: number[][]): boolean => {
    const BOARD_SIZE = 9;
    const SQUARE_SIZE = BOARD_SIZE / 3;

    // Return if a group of numbers is valid or not by validating its size and
    // that it has exactly one of every number
    const isGroupValid = (group: number[]) => {
        if (group.length !== BOARD_SIZE) return false;

        const seen: boolean[] = new Array(BOARD_SIZE).fill(false);

        for (let i = 0; i < BOARD_SIZE; i++) {
            const seenIdx = group[i] - 1;
            if (seen[seenIdx]) return false;
            seen[seenIdx] = true;
        }

        return seen.every((item) => item);
    };

    // Validate rows and columns
    for (let c = 0; c < BOARD_SIZE; c++) {
        const col: number[] = [];

        for (let r = 0; r < BOARD_SIZE; r++) {
            const row: number[] = board[r];

            if (!isGroupValid(row)) {
                return false;
            }

            col.push(board[r][c]);
        }

        if (!isGroupValid(col)) {
            return false;
        }
    }

    // Validate 3x3 squares
    for (let sc = 0; sc < SQUARE_SIZE; sc++) {
        for (let sr = 0; sr < SQUARE_SIZE; sr++) {
            const square: number[] = [];
            const colOffset = sc * SQUARE_SIZE;
            const rowOffset = sr * SQUARE_SIZE;

            for (let c = colOffset; c < SQUARE_SIZE + colOffset; c++) {
                for (let r = rowOffset; r < SQUARE_SIZE + rowOffset; r++) {
                    square.push(board[r][c]);
                }
            }

            if (!isGroupValid(square)) {
                return false;
            }
        }
    }

    return true;
};

export default sudoku;
