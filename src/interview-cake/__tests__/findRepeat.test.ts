import fr from '../findRepeat';

['findRepeat', 'findRepeatLoop'].forEach((fnName) => {
    describe(fnName, () => {
        describe('invalid lists', () => {
            test('list of no items or 1 item', () => {
                [[], [1]].forEach((invalidList) => {
                    expect(() => {
                        fr[fnName](invalidList);
                    }).toThrowErrorMatchingInlineSnapshot(
                        `"A list of < 2 items cannot contain repeats"`,
                    );
                });
            });

            test('list with no repeats', () => {
                const list = [1, 2, 3];
                expect(() => {
                    fr[fnName](list);
                }).toThrowErrorMatchingInlineSnapshot(
                    `"List is not a triangular series! Item 3 is out of range 1 .. 2"`,
                );
            });
        });

        describe('sample lists', () => {
            /*
            let desc = 'short array';
            let actual = fr[fnName]([1, 2, 1]);
            let expected = 1;
            assertEqual(actual, expected, desc);
            */
            test('short array', () => {
                const list = [1, 2, 1];
                expect(fr[fnName](list)).toBe(1);
            });

            /*
            desc = 'medium array';
            actual = fr[fnName]([4, 1, 3, 4, 2]);
            expected = 4;
            assertEqual(actual, expected, desc);
            */
            test('medium array', () => {
                const list = [4, 1, 3, 4, 2];
                expect(fr[fnName](list)).toBe(4);
            });

            /*
            desc = 'long array';
            actual = fr[fnName]([1, 5, 9, 7, 2, 6, 3, 8, 2, 4]);
            expected = 2;
            assertEqual(actual, expected, desc);
            */
            test('long array', () => {
                const list = [1, 5, 9, 7, 2, 6, 3, 8, 2, 4];
                expect(fr[fnName](list)).toBe(2);
            });
        });
    });
});
