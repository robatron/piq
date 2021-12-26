import { minPathSum } from '../64.minimum-path-sum';
import { createTests } from './utils';

createTests(
    [
        // Start / end cell the same
        [[[3]], 3],

        // Description examples
        [
            [
                [1, 3, 1],
                [1, 5, 1],
                [4, 2, 1],
            ],
            7,
        ],
        [
            [
                [1, 2, 3],
                [4, 5, 6],
            ],
            12,
        ],
    ],
    minPathSum,
);
