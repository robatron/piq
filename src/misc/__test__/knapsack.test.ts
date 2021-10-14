import { knapsackRecursive } from '../knapsack';

describe('knapsackRecursive', () => {
    // Samples from
    // https://www.educative.io/blog/0-1-knapsack-problem-dynamic-solution
    test('samples', () => {
        const weights = [1, 2, 3, 5];
        const values = [1, 6, 10, 16];
        expect(knapsackRecursive(weights, values, 7)).toBe(22);
        expect(knapsackRecursive(weights, values, 6)).toBe(17);
    });
});
