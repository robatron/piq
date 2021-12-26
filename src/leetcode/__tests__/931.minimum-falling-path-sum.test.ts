import { minFallingPathSum } from '../931.minimum-falling-path-sum';
import { createTests } from './utils';

createTests(
    [
        // Base case
        [[[3]], 3],

        // Description examples
        [
            [
                [2, 1, 3],
                [6, 5, 4],
                [7, 8, 9],
            ],
            13,
        ],
        [
            [
                [-19, 57],
                [-40, -5],
            ],
            -59,
        ],

        // Submission tests
        [
            [
                [100, -42, -46, -41],
                [31, 97, 10, -10],
                [-58, -51, 82, 89],
                [51, 81, 69, -51],
            ],
            -36,
        ],
    ],
    minFallingPathSum,
);
