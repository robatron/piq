import { totalFruit } from '../904.fruit-into-baskets';
import { createTests } from './utils';

createTests(
    [
        // Base cases
        [[1], 1],
        [[1, 1], 2],
        [[1, 2], 2],

        // // All one type
        [[1, 1, 1, 1, 1], 5],

        // All different types
        [[1, 2, 3, 4], 2],

        // // Given examples
        [[1, 2, 1], 3],
        [[0, 1, 2, 2], 3],
        [[1, 2, 3, 2, 2], 4],

        // LeetCode submission tests
        [[6, 2, 1, 1, 3, 6, 6], 3],
        [[1, 0, 1, 4, 1, 4, 1, 2, 3], 5],
    ],
    totalFruit,
    { name: 'totalFruit' },
);
