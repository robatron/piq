import CoinComboer from '../coins';

describe('CoinComboer', () => {
    describe('getCoinCombos', () => {
        /*
        let desc = 'sample input';
        let actual = changePossibilities(4, [1, 2, 3]);
        let expected = 4;
        assertEqual(actual, expected, desc);
        */
        it('handles sample input', () => {
            const amount = 4;
            const coins = [3, 2, 1];
            const actual = new CoinComboer().getCoinCombos(amount, coins);
            const expctd = [
                [2, 2],
                [3, 1],
                [2, 1, 1],
                [1, 1, 1, 1],
            ];

            expect(actual.length).toBe(expctd.length);
            expect(actual).toStrictEqual(expctd);
        });

        /*
        desc = 'one way to make zero cents';
        actual = changePossibilities(0, [1, 2]);
        expected = 1;
        assertEqual(actual, expected, desc);
        */
        it('returns no combos for no amount', () => {
            const amount = 0;
            const coins = [1, 2, 3];
            const actual = new CoinComboer().getCoinCombos(amount, coins);
            const expctd = [];

            expect(actual.length).toBe(expctd.length);
            expect(actual).toStrictEqual(expctd);
        });

        /*
        desc = 'no ways if no coins';
        actual = changePossibilities(1, []);
        expected = 0;
        assertEqual(actual, expected, desc);
        */
        it('returns no combos for no coins', () => {
            const amount = 1;
            const coins = [];
            const actual = new CoinComboer().getCoinCombos(amount, coins);
            const expctd = [];

            expect(actual.length).toBe(expctd.length);
            expect(actual).toStrictEqual(expctd);
        });

        /*
        desc = 'big coin value';
        actual = changePossibilities(5, [25, 50]);
        expected = 0;
        assertEqual(actual, expected, desc);
        */
        it('returns no combos for coins larger than amount', () => {
            const amount = 5;
            const coins = [25, 50];
            const actual = new CoinComboer().getCoinCombos(amount, coins);
            const expctd = [];

            expect(actual.length).toBe(expctd.length);
            expect(actual).toStrictEqual(expctd);
        });

        /*
        desc = 'big target amount';
        actual = changePossibilities(50, [5, 10]);
        expected = 6;
        assertEqual(actual, expected, desc);
        */
        it('returns combos for amounts >> coin values', () => {
            const amount = 50;
            const coins = [10, 5];
            const actual = new CoinComboer().getCoinCombos(amount, coins);
            const expctd = [
                [10, 10, 10, 10, 10],
                [10, 10, 10, 10, 5, 5],
                [10, 10, 10, 5, 5, 5, 5],
                [10, 10, 5, 5, 5, 5, 5, 5],
                [10, 5, 5, 5, 5, 5, 5, 5, 5],
                [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
            ];

            expect(actual.length).toBe(expctd.length);
            expect(actual).toStrictEqual(expctd);
        });

        /*
        desc = 'change for one dollar';
        actual = changePossibilities(100, [1, 5, 10, 25, 50]);
        expected = 292;
        assertEqual(actual, expected, desc);
        */
        it('returns all combos for a dollar of common coins', () => {
            const amount = 100;
            const coins = [1, 5, 10, 25, 50];
            const actual = new CoinComboer().getCoinCombos(amount, coins);

            expect(actual).toMatchSnapshot();
        });
    });

    describe('getCoinCombosRecursive', () => {
        it('returns all possible combinations of coins that make a certain amount', () => {
            const comboer = new CoinComboer();
            const actual = comboer.getCoinCombosRecursive(4, [1, 2, 3]).sort();
            const expected = [
                [1, 1, 1, 1],
                [1, 1, 2],
                [1, 3],
                [2, 2],
            ];

            expect(actual.length).toBe(expected.length);
            expect(actual).toStrictEqual(expected);
        });

        it('returns 1 combo for zero cents and arbitrary coins', () => {
            const combos = new CoinComboer().getCoinCombosRecursive(
                0,
                [1, 2, 3],
            );
            const expected = [];

            expect(combos).toStrictEqual(expected);
        });

        it('returns no combos for no coins', () => {
            const combos = new CoinComboer().getCoinCombosRecursive(1, []);
            const expected = [];

            expect(combos).toStrictEqual(expected);
        });

        it('returns no combos for no coins larger than amount', () => {
            const combos = new CoinComboer().getCoinCombosRecursive(
                5,
                [25, 50],
            );
            const expected = [];

            expect(combos).toStrictEqual(expected);
        });

        it('returns combos for large amount', () => {
            const actual = new CoinComboer()
                .getCoinCombosRecursive(50, [5, 10])
                .sort();
            const expected = [
                [10, 10, 10, 10, 10],
                [10, 10, 10, 10, 5, 5],
                [10, 10, 10, 5, 5, 5, 5],
                [10, 10, 5, 5, 5, 5, 5, 5],
                [10, 5, 5, 5, 5, 5, 5, 5, 5],
                [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
            ].sort();

            actual.forEach((combo) => combo.sort());
            expected.forEach((combo) => combo.sort());

            expect(actual).toStrictEqual(expected);
        });

        it('returns all combos for a dollar using common coins', () => {
            const amount = 100;
            const coins = [1, 5, 10, 25, 50];

            const comboer = new CoinComboer();
            const actual = comboer.getCoinCombosRecursive(amount, coins);

            expect(actual).toMatchSnapshot();

            const memoComboer = new CoinComboer();
            const memoActual = memoComboer.getCoinCombosRecursive(
                amount,
                coins,
            );

            expect(memoActual).toStrictEqual(actual);
        });
    });
});
