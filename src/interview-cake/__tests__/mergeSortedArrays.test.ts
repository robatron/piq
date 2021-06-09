import mergeSortedArrays from '../mergeSortedArrays';

describe('mergeSortedArrays', () => {
    it('merges two sorted arrays', () => {
        const arr1 = [3, 4, 6, 10, 11, 15];
        const arr2 = [1, 5, 8, 12, 14, 19];
        expect(mergeSortedArrays(arr1, arr2)).toStrictEqual([
            1,
            3,
            4,
            5,
            6,
            8,
            10,
            11,
            12,
            14,
            15,
            19,
        ]);
    });

    it('merges two sorted arrays of unequal length', () => {
        const arr1 = '5498332082'
            .split('')
            .sort()
            .map((d) => parseInt(d));
        const arr2 = '567300136080673'
            .split('')
            .sort()
            .map((d) => parseInt(d));
        expect(mergeSortedArrays(arr1, arr2)).toStrictEqual([
            0,
            0,
            0,
            0,
            0,
            1,
            2,
            2,
            3,
            3,
            3,
            3,
            3,
            4,
            5,
            5,
            6,
            6,
            6,
            7,
            7,
            8,
            8,
            8,
            9,
        ]);
    });
});
