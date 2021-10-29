function createTests(
    ios: [number[], number][],
    fn: (...args: unknown[]) => unknown,
    opts?: { maxInputDisplayLen?: number; testNamePrefix?: string },
): void;

function createTests(
    ios: [string, number][],
    fn: (...args: unknown[]) => unknown,
    opts?: { maxInputDisplayLen?: number; testNamePrefix?: string },
): void;

function createTests(
    ios: [string | number[], number][],
    fn: (...args: unknown[]) => unknown,
    {
        maxInputDisplayLen = 10,
        testNamePrefix = '',
    }: { maxInputDisplayLen?: number; testNamePrefix?: string } = {},
): void {
    ios.forEach(([input, output]: [string | number[], number]) => {
        const prefix: string = testNamePrefix ? testNamePrefix + ' ' : '';
        let displayInput: string;

        // Construct display input for strings
        if (typeof input === 'string') {
            displayInput =
                input.length > maxInputDisplayLen
                    ? input.slice(0, maxInputDisplayLen + 1) + '...'
                    : input;
            displayInput = `'${displayInput}'`;
        }

        // Construct display input for number arrays
        else if (Array.isArray(input)) {
            let displayArray: Array<number> = input;
            let itemSuffix = '';

            if (input.length > maxInputDisplayLen) {
                displayArray = input.slice(0, maxInputDisplayLen + 1);
                itemSuffix = ', …';
            }

            displayInput = `[${displayArray.join(',')}${itemSuffix}]`;
        }

        // Create the actual test
        test(`${prefix}${displayInput} => ${output}`, () => {
            expect(fn(input)).toBe(output);
        });
    });
}

// eslint-disable-next-line jest/no-export
export { createTests };
