import { maxSubarraySumCircular } from '../918.maximum-sum-circular-subarray';
import { createTests } from './utils';

createTests(
    [
        [[1, -2, 3, -2], 3],
        [[5, -3, 5], 10],
        [[-3, -2, -3], -2],
    ],
    maxSubarraySumCircular,
);
