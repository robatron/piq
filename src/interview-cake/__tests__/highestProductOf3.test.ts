import highestProductOf3 from '../highestProductOf3';

describe('highestProductOf3', () => {
    it('returns the highest product of 3 numbers from a list of numbers', () => {
        const nums = [7, 3, 5, 8, 4, 2, 6];
        const expd = 7 * 8 * 6;

        expect(highestProductOf3(nums)).toBe(expd);
    });

    it('handles a numbers list of exactly 3 numbers', () => {
        const nums = [7, 3, 5];
        const expd = 7 * 3 * 5;

        expect(highestProductOf3(nums)).toBe(expd);
    });

    it('handles negative numbers', () => {
        const nums = [-10, -10, 1, 3, 2];
        const expd = -10 * -10 * 3;

        expect(highestProductOf3(nums)).toBe(expd);
    });

    it('throws if there are < 3 numbers in the list', () => {
        const nums = [1, 2];

        expect(() =>
            highestProductOf3(nums),
        ).toThrowErrorMatchingInlineSnapshot(
            `"At least 3 numbers are required"`,
        );
    });
});
