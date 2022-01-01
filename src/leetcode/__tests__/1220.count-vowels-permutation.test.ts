import { countVowelPermutation } from '../1220.count-vowels-permutation';
import { createTests } from './utils';

createTests(
    [
        [1, 5],
        [2, 10],

        // LeetCode submission tests
        [5, 68],

        // Results in error:
        // - LC error: terminate called after throwing an instance of
        //   'std::bad_alloc' what():  std::bad_alloc
        // - Local error: FATAL ERROR: Ineffective mark-compacts near heap limit
        //   Allocation failed - JavaScript heap out of memory
        [144, 18208803],
    ],
    countVowelPermutation,
);
