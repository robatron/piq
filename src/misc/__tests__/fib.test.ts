import { fibIterative, fibRecursive } from '../fib';

const sampleFibVals = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377];

describe('fibIterative', () => {
    it('correctly returns the first 15 numbers in the Fibonacci sequence', () => {
        sampleFibVals.forEach((val, i) => {
            expect(fibIterative(i)).toBe(sampleFibVals[i]);
        });
    });

    it('correctly returns the 50th number in the Fibonacci sequence', () => {
        expect(fibIterative(30)).toBe(832040);
    });
});

describe('fibRecursive', () => {
    it('correctly returns the first 15 numbers in the Fibonacci sequence', () => {
        sampleFibVals.forEach((val, i) => {
            expect(fibRecursive(i)).toBe(sampleFibVals[i]);
        });
    });

    it('correctly returns the 50th number in the Fibonacci sequence', () => {
        expect(fibRecursive(30)).toBe(832040);
    });
});
