import cafeOrderChecker from '../cafeOrderChecker';

describe('cafeOrderChecker', () => {
    it('detects if orders are first-come, first-served', () => {
        const dineInOrders = [12, 19, 2];
        const takeOutOrders = [17, 8, 24];
        const servedOrders = [17, 8, 12, 19, 24, 2];

        expect(
            cafeOrderChecker(dineInOrders, takeOutOrders, servedOrders),
        ).toBe(true);
    });

    it('detects if orders are NOT first-come, first-served', () => {
        const dineInOrders = [1, 3, 5];
        const takeOutOrders = [2, 4, 6];
        const servedOrders = [1, 2, 4, 6, 5, 3];

        expect(
            cafeOrderChecker(dineInOrders, takeOutOrders, servedOrders),
        ).toBe(false);
    });
});
