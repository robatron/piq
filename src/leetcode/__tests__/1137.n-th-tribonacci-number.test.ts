import { tribonacci } from '../1137.n-th-tribonacci-number';
import { createTests } from './utils';

createTests(
    [
        [0, 0],
        [1, 1],
        [2, 1],
        [4, 4],
        [25, 1389537],
    ],
    tribonacci,
);
