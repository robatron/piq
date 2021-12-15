import { change } from '../518.coin-change-2';
import { createTests } from './utils';

createTests(
    [
        [[1, [1, 2, 3]], 1],
        [[3, [2]], 0],
        [[10, [10]], 1],
        [[10, [5]], 1],
        [[5, [1, 2, 5]], 4],
    ],
    change,
    { spreadInput: true },
);
