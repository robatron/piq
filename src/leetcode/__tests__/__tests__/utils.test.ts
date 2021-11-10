import {
    ARROW_CHAR,
    CONTINUE_CHAR,
    createDisplayString,
    createTestName,
} from '../utils';

describe('createDisplayString', () => {
    describe('number', () => {
        const data = 123;

        it('creates a display string', () => {
            const actual: string = createDisplayString(data, 3);
            const expctd = data.toString();

            expect(actual).toBe(expctd);
        });

        it("shortens a display string that's too long", () => {
            const actual: string = createDisplayString(data, 2);
            const expctd = '12' + CONTINUE_CHAR;

            expect(actual).toBe(expctd);
        });
    });

    describe('strings', () => {
        const data = 'abc';

        it('creates a display string', () => {
            const actual: string = createDisplayString(data, 3);
            const expctd = data;

            expect(actual).toBe(expctd);
        });

        it("shortens a display string that's too long", () => {
            const actual: string = createDisplayString(data, 2);
            const expctd = 'ab' + CONTINUE_CHAR;

            expect(actual).toBe(expctd);
        });
    });

    describe('arrays', () => {
        [
            [1, 2, 3],
            ['a', 'b', 'c'],
        ].forEach((arr) =>
            describe(typeof arr[0], () => {
                const data: unknown[] = arr;

                it('creates a display string', () => {
                    const actual: string = createDisplayString(data, 3);
                    const expctd = `[${data.toString()}]`;

                    expect(actual).toBe(expctd);
                });

                it("shortens a display string that's too long", () => {
                    const actual: string = createDisplayString(data, 2);
                    const expctd = `[${data
                        .slice(0, 2)
                        .toString()}, ${CONTINUE_CHAR}]`;

                    expect(actual).toBe(expctd);
                });
            }),
        );
    });
});

describe('createTestName', () => {
    it('creates a test name from a single input', () => {
        const input = '123';
        const output = '123';
        const actual: string = createTestName(input, output);
        const expctd = `123 ${ARROW_CHAR} 123`;

        expect(actual).toBe(expctd);
    });

    it('creates a test name from multiple inputs', () => {
        const inputs = [['123', '456'], 789];
        const output = '123';
        const actual: string = createTestName(inputs, output);
        const expctd = `[123,456],789 ${ARROW_CHAR} 123`;

        expect(actual).toBe(expctd);
    });
});
