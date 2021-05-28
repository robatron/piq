import { getMaxProfit } from '../appleStocks';

describe('getMaxProfit', () => {
    it('returns the best profit one could have made from one purchase and one sale of one share of Apple stock yesterday', () => {
        expect(getMaxProfit([10, 7, 5, 8, 11, 9])).toBe(6);
    });

    it('enforces buying before selling', () => {
        expect(getMaxProfit([10, 7, 11, 8, 5, 9])).toBe(4);
    });

    it('handles negative max profit', () => {
        // -1 smallest amount you can lose
        expect(getMaxProfit([11, 10, 9, 8, 7, 5])).toBe(-1);
    });
});
