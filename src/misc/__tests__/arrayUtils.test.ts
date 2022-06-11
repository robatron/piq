import { concat, flat, map, reduce, reverse } from '../arrayUtils';

describe('concat', () => {
    it('returns an empty array if no arrays are provided', () => {
        expect(concat()).toStrictEqual([]);
    });

    it('returns the original array if only one is provided', () => {
        expect(concat([1, 2, 3])).toStrictEqual([1, 2, 3]);
    });

    it('concatenates two arrays', () => {
        expect(concat([1, 2, 3], [4, 5, 6])).toStrictEqual([1, 2, 3, 4, 5, 6]);
    });

    it('concatentes > 2 arrays', () => {
        expect(concat([1, 2, 3], [4, 5, 6], [7, 8, 9])).toStrictEqual([
            1, 2, 3, 4, 5, 6, 7, 8, 9,
        ]);
    });

    it('does not modify the original arrays', () => {
        const arr1 = [1, 2, 3];
        const arr2 = [4, 5, 6];
        expect(concat(arr1, arr2)).toStrictEqual([1, 2, 3, 4, 5, 6]);
        expect(arr1).toStrictEqual([1, 2, 3]);
        expect(arr2).toStrictEqual([4, 5, 6]);
    });
});

describe('flat', () => {
    it('flattens a multi-depth array to a single depth by default', () => {
        const actual = flat([1, [2, [3, [4, [5]]]]]);
        const expctd = [1, 2, [3, [4, [5]]]];
        expect(actual).toStrictEqual(expctd);
    });

    it('flattens an array to the specified depth', () => {
        const actual = flat([1, [2, [3, [4, [5]]]]], 2);
        const expctd = [1, 2, 3, [4, [5]]];
        expect(actual).toStrictEqual(expctd);
    });

    it('flattens an array to an infinite depth', () => {
        const actual = flat([1, [2, [3, [4, [5]]]]], Infinity);
        const expctd = [1, 2, 3, 4, 5];
        expect(actual).toStrictEqual(expctd);
    });
});

describe('map', () => {
    it('maps array values to new values', () => {
        expect(map([1, 2, 3], (val, idx) => val * idx)).toStrictEqual([
            0, 2, 6,
        ]);
    });
});

describe('reduce', () => {
    it('reduces an array via the supplied function', () => {
        const arr = [1, 2, 3];
        const fn = (accum, val, idx) => accum + val + idx;
        const actual = reduce(arr, fn, 0);
        const expctd = 9;

        // 0 + 1 + 0 = 1
        // 1 + 2 + 1 = 4
        // 4 + 3 + 2 = 9
        expect(actual).toBe(expctd);
        expect(arr.reduce(fn)).toBe(expctd);
    });

    it('uses the first value in the array for the initial value of the accumulator not supplied', () => {
        const arr = [1, 2, 3];
        const fn = (accum, val, idx) => accum + val + idx;
        const actual = reduce(arr, fn);
        const expctd = 9;

        // 1 + 2 + 1 = 4
        // 4 + 3 + 2 = 9
        expect(actual).toBe(expctd);
        expect(expctd).toBe(arr.reduce(fn));
    });
});

describe('reverse', () => {
    it('reverses an array in-place', () => {
        const arr = [1, 2, 3];
        expect(reverse(arr)).toStrictEqual([3, 2, 1]);
        expect(arr).toStrictEqual([3, 2, 1]);
    });
});
