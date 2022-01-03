import { findLength } from '../718.maximum-length-of-repeated-subarray';
import { createTests } from './utils';

createTests(
    [
        // Arrays of size 1
        [[[3], [3]], 1],
        [[[3], [2]], 0],

        // Examples
        [
            [
                [1, 2, 3, 2, 1],
                [3, 2, 1, 4, 7],
            ],
            3,
        ],
        [
            [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
            ],
            5,
        ],
    ],
    findLength,
    { spreadInput: true },
);
