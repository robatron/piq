import productOfOtherNumbers from '../productOfOtherNumbers';

describe('productOfOtherNumbers', () => {
    it('returns an array where each element is the product of all other numbers', () => {
        const list = [1, 7, 3, 4];
        const expd = [7 * 3 * 4, 1 * 3 * 4, 1 * 7 * 4, 1 * 7 * 3];

        expect(productOfOtherNumbers(list)).toStrictEqual(expd);
    });

    it('handles zeros', () => {
        const list = [1, 7, 0, 4];
        const expd = [0, 0, 1 * 7 * 4, 0];

        expect(productOfOtherNumbers(list)).toStrictEqual(expd);
    });

    it('handles lists of 2', () => {
        const list = [3, 7];
        const expd = [7, 3];

        expect(productOfOtherNumbers(list)).toStrictEqual(expd);
    });

    it('throws if the list is smaller than 2', () => {
        const list = [3];
        expect(() =>
            productOfOtherNumbers(list),
        ).toThrowErrorMatchingInlineSnapshot(`"List must be >= 2"`);
    });
});
