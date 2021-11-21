import { rob } from '../198.house-robber';
import { createTests } from './utils';

createTests(
    [
        [[], null],
        [[0], 0],
        [[1, 2], 2],
        [[0, 0, 0], 0],
        [[1, 2, 3, 1], 4],
        [[2, 7, 9, 3, 1], 12],
        [[2, 1, 1, 2], 4],
    ],
    rob,
    { name: 'rob' },
);
