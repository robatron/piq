import appleStocks, { appleStocksNaive } from '../appleStocks';

describe('appleStocksNaive', () => {
    it('returns the best profit one could have made from one purchase and one sale of one share of Apple stock yesterday', () => {
        const stockPrices = [10, 7, 5, 8, 11, 9];
        const expected = 6;

        expect(appleStocksNaive(stockPrices)).toBe(expected);
        expect(appleStocks(stockPrices)).toBe(expected);
    });

    it('enforces buying before selling', () => {
        const stockPrices = [10, 7, 11, 8, 5, 9];
        const expected = 4;

        expect(appleStocksNaive(stockPrices)).toBe(expected);
        expect(appleStocks(stockPrices)).toBe(expected);
    });

    it('handles negative max profit', () => {
        // -1 smallest amount you can lose
        const stockPrices = [11, 10, 9, 8, 7, 5];
        const expected = -1;

        expect(appleStocksNaive(stockPrices)).toBe(expected);
        expect(appleStocks(stockPrices)).toBe(expected);
    });

    it('handles 0 profit', () => {
        const stockPrices = [3, 3, 3];
        const expected = 0;

        expect(appleStocksNaive(stockPrices)).toBe(expected);
        expect(appleStocks(stockPrices)).toBe(expected);
    });

    it('handles constant price drop', () => {
        const stockPrices = [10, 5, 3, 1, -1];
        const expected = -2;

        expect(appleStocksNaive(stockPrices)).toBe(expected);
        expect(appleStocks(stockPrices)).toBe(expected);
    });

    it('throws when time window too small', () => {
        const stockPrices = [3];

        expect(() => {
            appleStocksNaive(stockPrices);
        }).toThrow();

        expect(() => {
            appleStocks(stockPrices);
        }).toThrow();
    });
});
