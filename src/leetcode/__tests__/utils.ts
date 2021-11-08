type TestFn = (...args: unknown[]) => unknown;
type Opts = {
    maxInputDisplayLen?: number;
    spreadInput?: boolean;
    testNamePrefix?: string;
};
type InOut = [number | number[] | string | string[], number | string];

/**
 * Create tests for the specified function with the specified array of inputs
 * and expected outputs
 */
function createTests(
    ios: InOut[],
    fn: TestFn,
    {
        maxInputDisplayLen = 10,
        spreadInput = false,
        testNamePrefix = '',
    }: Opts = {},
): void {
    ios.forEach(([input, output]: InOut) => {
        const prefix: string = testNamePrefix ? testNamePrefix + ' ' : '';
        let displayInput: string;

        // Contruct display input for arrays
        if (Array.isArray(input)) {
            let displayArray: number[] | string[] = input;
            let itemSuffix = '';

            if (input.length > maxInputDisplayLen) {
                displayArray = input.slice(0, maxInputDisplayLen + 1);
                itemSuffix = ', …';
            }

            displayInput = `[${displayArray.join(',')}${itemSuffix}]`;
        }

        // Construct display input for strings. Treat number inputs as strings
        // also for simplicity
        else if (typeof input === 'string' || typeof input === 'number') {
            let inputStr =
                typeof input === 'number'
                    ? (input as number).toString()
                    : input;
            inputStr =
                inputStr.length > maxInputDisplayLen
                    ? inputStr.slice(0, maxInputDisplayLen + 1) + '…'
                    : inputStr;
            displayInput =
                typeof input === 'string' ? `'${inputStr}'` : inputStr;
        }

        // Create the actual test
        test(`${prefix}${displayInput} => ${output}`, () => {
            const actual: unknown = spreadInput
                ? fn(...(input as number[] | string[]))
                : fn(input);
            expect(actual).toBe(output);
        });
    });
}

// eslint-disable-next-line jest/no-export
export { createTests };
