import { longestCommonSubsequence } from '../1143.longest-common-subsequence';
import { createTests } from './utils';

createTests(
    [
        [[], 0],
        [['abcde', 'ace'], 3],
        [['abc', 'abc'], 3],
        [['abc', 'def'], 0],
    ],
    longestCommonSubsequence,
    {
        spreadInput: true,
    },
);
