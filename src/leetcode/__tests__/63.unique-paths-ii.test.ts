import { uniquePathsWithObstacles } from '../63.unique-paths-ii';
import { createTests } from './utils';

createTests(
    [
        // No paths if starting cell is an obstacle
        [[[1]], 0],

        // Exactly 1 way if the starting cell is also the ending cell
        [[[0]], 1],

        // Examples from problem statement
        [
            [
                [0, 0, 0],
                [0, 1, 0],
                [0, 0, 0],
            ],
            2,
        ],
        [
            [
                [0, 1],
                [0, 0],
            ],
            1,
        ],

        // LeetCode submission tests
        [
            [
                [0, 0],
                [0, 1],
            ],
            0,
        ],
        [
            [
                [0, 1, 0, 0, 0],
                [1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
            ],
            0,
        ],
    ],
    uniquePathsWithObstacles,
);
