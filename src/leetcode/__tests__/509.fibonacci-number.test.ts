import { fib } from '../509.fibonacci-number';
import { createTests } from './utils';

createTests(
    [
        [0, 0],
        [1, 1],
        [2, 1],
        [3, 2],
        [4, 3],
        [5, 5],
    ],
    fib,
);
