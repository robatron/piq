import { lengthOfLIS } from '../300.longest-increasing-subsequence';
import { createTests } from './utils';

createTests(
    [
        [[10, 9, 2, 5, 3, 7, 101, 18], 4],
        [[0, 1, 0, 3, 2, 3], 4],
        [[7, 7, 7, 7, 7, 7, 7], 1],
    ],
    lengthOfLIS,
);
