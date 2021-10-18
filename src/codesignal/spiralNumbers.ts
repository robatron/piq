type Cell = { row: number; col: number };

// Direction of the pointer, ie, the direction the pointer will move next
enum Direction {
    RIGHT,
    DOWN,
    LEFT,
    UP,
}

// Which direction is clockwise from each direction
const CLOCKWISE_DIRECTION = {
    [Direction.RIGHT]: Direction.DOWN,
    [Direction.DOWN]: Direction.LEFT,
    [Direction.LEFT]: Direction.UP,
    [Direction.UP]: Direction.RIGHT,
};

const spiralNumbers = (n: number): number[][] => {
    // Start with a fixed-size matrix filled with zeros
    const matrix: number[][] = [...Array(n).keys()].map(() => Array(n).fill(0));

    // Current location and direction of the pointer
    const cell: Cell = { row: 0, col: 0 };
    let dir: Direction = Direction.RIGHT;

    // Advance the pointer one cell in the current (or opposite) direction
    const move = ({ reverse } = { reverse: false }): void => {
        const moveAmount = reverse ? -1 : 1;
        switch (dir) {
            case Direction.RIGHT:
                cell.col += moveAmount;
                break;
            case Direction.DOWN:
                cell.row += moveAmount;
                break;
            case Direction.LEFT:
                cell.col -= moveAmount;
                break;
            case Direction.UP:
                cell.row -= moveAmount;
                break;
        }
    };

    // Lay out the spiral numbers one-by-one
    for (let i = 1; i <= n * n; i++) {
        // Advance the pointer once
        if (i !== 1) move();

        const isInBounds: boolean =
            0 <= cell.row &&
            cell.row <= n - 1 &&
            0 <= cell.col &&
            cell.col <= n - 1;
        const isAvailable = matrix[cell.row] && !matrix[cell.row][cell.col];

        // If the pointer is in-bounds and on a cell that hasen't already been
        // visited, lay down the current number
        if (isInBounds && isAvailable) {
            matrix[cell.row][cell.col] = i;
        }

        // Otherwise, the pointer is in an invalid position. Back it up, rotate
        // it clockwise 90 degrees, and try again
        else {
            move({ reverse: true });
            dir = CLOCKWISE_DIRECTION[dir];
            i--;
        }
    }

    return matrix;
};
