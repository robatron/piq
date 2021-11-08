function createTests(
    ios: [number, number][],
    fn: (...args: unknown[]) => unknown,
    opts?: { maxInputDisplayLen?: number; testNamePrefix?: string },
): void;

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

/**
 * Create tests for the specified function with the specified array of inputs
 * and expected outputs
 */
function createTests(
    ios: [number | number[] | string, number][],
    fn: (...args: unknown[]) => unknown,
    {
        maxInputDisplayLen = 10,
        testNamePrefix = '',
    }: { maxInputDisplayLen?: number; testNamePrefix?: string } = {},
): void {
    ios.forEach(([input, output]: [number | number[] | string, number]) => {
        const prefix: string = testNamePrefix ? testNamePrefix + ' ' : '';
        let displayInput: string;

        // Treat number inputs as strings for simplicity
        if (typeof input === 'number') {
            const inputStr = (input as number).toString();
            displayInput =
                inputStr.length > maxInputDisplayLen
                    ? inputStr.slice(0, maxInputDisplayLen + 1) + '...'
                    : inputStr;
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

        // Construct display input for strings
        else if (typeof input === 'string') {
            displayInput =
                input.length > maxInputDisplayLen
                    ? input.slice(0, maxInputDisplayLen + 1) + '...'
                    : input;
            displayInput = `'${displayInput}'`;
        }

        // Create the actual test
        test(`${prefix}${displayInput} => ${output}`, () => {
            expect(fn(input)).toBe(output);
        });
    });
}

// eslint-disable-next-line jest/no-export
export { createTests };
