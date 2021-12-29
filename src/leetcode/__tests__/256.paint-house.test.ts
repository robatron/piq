import { minCost } from '../256.paint-house';
import { createTests } from './utils';

createTests(
    [
        // Just one house
        [[[7, 6, 2]], 2],

        [
            [
                [17, 2, 17],
                [16, 16, 5],
                [14, 3, 19],
            ],
            10,
        ],
    ],
    minCost,
);
