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
            const expctd = `12${CONTINUE_CHAR}`;

            expect(actual).toBe(expctd);
        });
    });

    describe('strings', () => {
        const data = 'abc';

        it('creates a display string', () => {
            const actual: string = createDisplayString(data, 3);
            const expctd = `'${data}'`;

            expect(actual).toBe(expctd);
        });

        it("shortens a display string that's too long", () => {
            const actual: string = createDisplayString(data, 2);
            const expctd = `'ab${CONTINUE_CHAR}'`;

            expect(actual).toBe(expctd);
        });
    });

    describe('arrays', () => {
        [
            [123, 456, 789],
            ['abc', 'def', 'ghi'],
        ].forEach((data: (number | string)[]) =>
            describe(typeof data[0], () => {
                it('creates a display string', () => {
                    const actual: string = createDisplayString(data, 3);
                    const expctd = data
                        .map((d: number | string): string =>
                            typeof d === 'string' ? `'${d}'` : d.toString(),
                        )
                        .toString();

                    expect(actual).toBe(`[${expctd}]`);
                });

                it("shortens a display string that's too long", () => {
                    const actual: string = createDisplayString(data, 2);
                    const expctd = data
                        .map((d: number | string, i: number): string => {
                            if (i === data.length - 1) return CONTINUE_CHAR;
                            const dStr: string =
                                (typeof d === 'number'
                                    ? d.toString()
                                    : d
                                ).slice(0, 2) + CONTINUE_CHAR;
                            return typeof d === 'string' ? `'${dStr}'` : dStr;
                        })
                        .toString();

                    expect(actual).toBe(`[${expctd}]`);
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
        const expctd = `'123' ${ARROW_CHAR} '123'`;

        expect(actual).toBe(expctd);
    });

    it('creates a test name from multiple inputs of different types', () => {
        const inputs: [string[], number] = [['123', '456'], 789];
        const output = '123';
        const actual: string = createTestName(inputs, output);
        const expctd = `[['123','456'],789] ${ARROW_CHAR} '123'`;

        expect(actual).toBe(expctd);
    });
});
