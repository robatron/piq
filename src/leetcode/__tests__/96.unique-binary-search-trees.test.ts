import { numTrees } from '../96.unique-binary-search-trees';
import { createTests } from './utils';

createTests(
    [
        [0, 1],
        [1, 1],
        [2, 2],
        [3, 5],
    ],
    numTrees,
);
