import { mincostTickets } from '../983.minimum-cost-for-tickets';
import { createTests } from './utils';

createTests(
    [
        // Only travelling one day? Get the cheapest pass!
        [[[1], [1, 3, 5]], 1],
        [[[1], [3, 1, 5]], 1],
        [[[365], [3, 5, 1]], 1],

        // Problem examples
        [
            [
                [1, 4, 6, 7, 8, 20],
                [2, 7, 15],
            ],
            11,
        ],
        [
            [
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31],
                [2, 7, 15],
            ],
            17,
        ],
    ],
    mincostTickets,
    { spreadInput: true },
);
