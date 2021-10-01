import { EggFate, getMin2EggDropCount, TwoEggDropResult } from '../twoEggs';

describe('getMinDropCount() w/ 100 floors', () => {
    test('Error: Max safe floor out-of-bounds', () => {
        const fc = 100;
        expect(() => getMin2EggDropCount(fc, 0)).toThrow();
        expect(() => getMin2EggDropCount(fc, fc + 1)).toThrow();
    });

    describe('few floors', () => {
        test('1 floor must be the safe floor', () => {
            const result: TwoEggDropResult = getMin2EggDropCount(1, 1);
            expect(result).toStrictEqual({
                dropCount: 0,
                eggFates: [new EggFate([]), new EggFate([])],
            });
        });

        test('2 floors, 1st floor safe', () => {
            const result: TwoEggDropResult = getMin2EggDropCount(2, 1);
            expect(result).toStrictEqual({
                dropCount: 2,
                eggFates: [new EggFate([2], true), new EggFate([1])],
            });
        });

        test('2 floors, 2nd floor safe', () => {
            const result: TwoEggDropResult = getMin2EggDropCount(2, 2);
            expect(result).toStrictEqual({
                dropCount: 1,
                eggFates: [new EggFate([2]), new EggFate()],
            });
        });
    });

    describe('worst cases = 14 drops', () => {
        test('First drop is one past max safe floor', () => {
            const result: TwoEggDropResult = getMin2EggDropCount(100, 13);
            expect(result).toStrictEqual({
                dropCount: 14,
                eggFates: [
                    new EggFate([14], true),
                    new EggFate([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]),
                ],
            });
        });

        test('High max safe floor', () => {
            const result: TwoEggDropResult = getMin2EggDropCount(100, 94);
            expect(result).toStrictEqual({
                dropCount: 14,
                eggFates: [
                    new EggFate([14, 27, 39, 50, 60, 69, 77, 84, 90, 95], true),
                    new EggFate([91, 92, 93, 94]),
                ],
            });
        });
    });

    describe('best (typical) cases = 3 drops', () => {
        test('First drop is on max safe floor', () => {
            const result: TwoEggDropResult = getMin2EggDropCount(100, 14);
            expect(result).toStrictEqual({
                dropCount: 3,
                eggFates: [
                    new EggFate([14, 27], true),
                    new EggFate([15], true),
                ],
            });
        });

        test('Max safe floor at 1', () => {
            const result: TwoEggDropResult = getMin2EggDropCount(100, 1);
            expect(result).toStrictEqual({
                dropCount: 3,
                eggFates: [new EggFate([14], true), new EggFate([1, 2], true)],
            });
        });
    });

    describe('Omlette time!', () => {
        test('Save both eggs: first egg dropped one below highest floor', () => {
            const result: TwoEggDropResult = getMin2EggDropCount(100, 100);
            expect(result).toStrictEqual({
                dropCount: 11,
                eggFates: [
                    new EggFate([14, 27, 39, 50, 60, 69, 77, 84, 90, 95, 99]),
                    new EggFate(),
                ],
            });
        });

        test('Save last egg: last egg dropped one below highest floor', () => {
            const result: TwoEggDropResult = getMin2EggDropCount(101, 100);
            expect(result).toStrictEqual({
                dropCount: 12,
                eggFates: [
                    new EggFate(
                        [14, 27, 39, 50, 60, 69, 77, 84, 90, 95, 99],
                        true,
                    ),
                    new EggFate([100], false),
                ],
            });
        });
    });
});
