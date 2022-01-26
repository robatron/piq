import { getMaximumGold } from '../1219.path-with-maximum-gold';
import { createTests } from './utils';

createTests(
    [
        // Examples
        [
            [
                [0, 6, 0],
                [5, 8, 7],
                [0, 9, 0],
            ],
            24,
        ],
        [
            [
                [1, 0, 7],
                [2, 0, 6],
                [3, 4, 5],
                [0, 3, 0],
                [9, 0, 20],
            ],
            28,
        ],

        // Submission tests TODO: I think the "visited" object is polluting
        // other paths. Need a way to isolate them.
        [
            [
                [1, 0, 7, 0, 0, 0],
                [2, 0, 6, 0, 1, 0],
                [3, 5, 6, 7, 4, 2],
                [4, 3, 1, 0, 2, 0],
                [3, 0, 5, 0, 20, 0],
            ],
            60,
        ],
    ],
    getMaximumGold,
);
