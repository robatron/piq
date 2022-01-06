import { numTilings } from '../790.domino-and-tromino-tiling';
import { createTests } from './utils';

createTests(
    [
        [1, 1],
        [2, 2],
        [3, 5],
    ],
    numTilings,
);
