import { rob2 } from '../213.house-robber-ii';
import { createTests } from './utils';

createTests(
    [
        [[1], 1],
        [[1, 2], 2],
        [[2, 1], 2],
        [[2, 3, 2], 3],
        [[1, 2, 3], 3],
        [[1, 2, 3, 1], 4],
        [[1, 2, 1, 1], 3],
        [[200, 3, 140, 20, 10], 340],
    ],
    rob2,
    { name: 'rob2' },
);
