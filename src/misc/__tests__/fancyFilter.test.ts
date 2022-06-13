import { fancyFilter, fancyFilterTiny } from '../fancyFilter';

type Color =
    | 'black'
    | 'blue'
    | 'green'
    | 'pink'
    | 'purple'
    | 'red'
    | 'white'
    | 'yellow';

type Car = {
    color: Color;
    make: string;
    model: string;
    year: number;
};

const TEST_DATA: Car[] = [
    { color: 'black', make: 'Ford', model: 'F-350', year: 2001 },
    { color: 'blue', make: 'Toyota', model: 'Corolla', year: 2001 },
    { color: 'green', make: 'Hyundai', model: 'Grand', year: 2007 },
    { color: 'pink', make: 'Suzuki', model: 'Swift', year: 2004 },
    { color: 'purple', make: 'Chevy', model: 'Silverado', year: 2001 },
    { color: 'red', make: 'Tesla', model: 'Model S', year: 2012 },
    { color: 'black', make: 'Tesla', model: 'Model 3', year: 2017 },
    { color: 'red', make: 'Toyota', model: 'RAV4', year: 1997 },
    { color: 'white', make: 'Honda', model: 'CR-V', year: 1997 },
    { color: 'white', make: 'Subaru', model: 'Impreza', year: 2001 },
    { color: 'yellow', make: 'Ford', model: 'Explorer', year: 1991 },
    { color: 'yellow', make: 'Ford', model: 'Model T', year: 1910 },
];

[
    { fancyFn: fancyFilter, fnName: 'fancyFilter' },
    { fancyFn: fancyFilterTiny, fnName: 'fancyFilterTiny' },
].forEach(({ fancyFn, fnName }) => {
    describe(fnName, () => {
        it('filters an array of objects matching one criteria', () => {
            // There are three Fords
            expect(fancyFn(TEST_DATA, { make: 'Ford' })).toStrictEqual([
                { color: 'black', make: 'Ford', model: 'F-350', year: 2001 },
                {
                    color: 'yellow',
                    make: 'Ford',
                    model: 'Explorer',
                    year: 1991,
                },
                { color: 'yellow', make: 'Ford', model: 'Model T', year: 1910 },
            ]);

            // ... and two red cars ...
            expect(fancyFn(TEST_DATA, { color: 'red' })).toStrictEqual([
                { color: 'red', make: 'Tesla', model: 'Model S', year: 2012 },
                { color: 'red', make: 'Toyota', model: 'RAV4', year: 1997 },
            ]);
        });

        it('filters an array of objects matching ALL criterias (default)', () => {
            // There is only one red Tesla
            expect(
                fancyFn(TEST_DATA, { color: 'red', make: 'Tesla' }),
            ).toStrictEqual([
                { color: 'red', make: 'Tesla', model: 'Model S', year: 2012 },
            ]);

            // ... and two yellow Fords
            expect(
                fancyFn(TEST_DATA, { color: 'yellow', make: 'Ford' }),
            ).toStrictEqual([
                {
                    color: 'yellow',
                    make: 'Ford',
                    model: 'Explorer',
                    year: 1991,
                },
                { color: 'yellow', make: 'Ford', model: 'Model T', year: 1910 },
            ]);
        });

        it('filters an array of objects matching SOME criterias', () => {
            // There are two red cars, and two Teslas
            expect(
                fancyFn(TEST_DATA, { color: 'red', make: 'Tesla' }, 'some'),
            ).toStrictEqual([
                { color: 'red', make: 'Tesla', model: 'Model S', year: 2012 },
                { color: 'black', make: 'Tesla', model: 'Model 3', year: 2017 },
                { color: 'red', make: 'Toyota', model: 'RAV4', year: 1997 },
            ]);
        });

        describe('edge cases', () => {
            it('returns an empty array if no data to filter', () => {
                expect(
                    fancyFn([], {
                        color: 'red',
                        make: 'Tesla',
                        foo: 'bar',
                    }),
                ).toStrictEqual([]);
            });

            it('returns the original array if no criteria by which to filter', () => {
                expect(fancyFn(TEST_DATA, {})).toStrictEqual(TEST_DATA);
            });
        });
    });
});
