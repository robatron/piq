import { coinCombosForAmount } from '../coins';

describe('coinCombosForAmount', () => {
    it('returns all possible combinations of coins that make a certain amount', () => {
        const combos = coinCombosForAmount(4, [1, 2, 3]);
        const expectedCombos = [
            [1, 1, 1, 1],
            [1, 1, 2],
            [1, 3],
            [2, 2],
        ];

        expectedCombos.forEach((combo) => {
            expect(combos).toContainEqual(combo);
        });
    });
});
