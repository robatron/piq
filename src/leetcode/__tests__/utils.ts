function createTests(
    ios: [string, number][],
    fn: (...args: unknown[]) => unknown,
    opts?: { maxInputDisplayLen?: number; testNamePrefix?: string },
): void;

function createTests(
    ios: [string, number][],
    fn: (...args: unknown[]) => unknown,
    {
        maxInputDisplayLen = 10,
        testNamePrefix = '',
    }: { maxInputDisplayLen?: number; testNamePrefix?: string } = {},
): void {
    ios.forEach(([input, output]: [string, number]) => {
        const inputDisplay: string =
            input.length > maxInputDisplayLen
                ? input.slice(0, maxInputDisplayLen + 1) + '...'
                : input;
        const prefix: string = testNamePrefix ? testNamePrefix + ' ' : '';

        test(`${prefix}'${inputDisplay}' => ${output}`, () => {
            expect(fn(input)).toBe(output);
        });
    });
}

// eslint-disable-next-line jest/no-export
export { createTests };
