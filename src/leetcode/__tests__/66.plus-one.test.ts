import { plusOne } from '../66.plus-one';
import { createTests } from './utils';

createTests(
    [
        [[0], [1]],
        [[9], [1, 0]],
        [
            [1, 2, 3],
            [1, 2, 4],
        ],
        [
            [4, 3, 2, 1],
            [4, 3, 2, 2],
        ],
        [
            [4, 3, 9, 9, 9],
            [4, 4, 0, 0, 0],
        ],
        [
            [9, 9, 9],
            [1, 0, 0, 0],
        ],
    ],
    plusOne,
    { testExpectType: 'toStrictEqual' },
);
