import { numRollsToTarget } from '../1155.number-of-dice-rolls-with-target-sum';
import { createTests } from './utils';

createTests(
    [
        [[1, 6, 3], 1],
        [[2, 6, 7], 6],
        [[30, 30, 500], 222616187],
    ],
    numRollsToTarget,
    { spreadInput: true },
);
