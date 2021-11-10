type TestFn = (...args: unknown[]) => unknown;
type Opts = {
    maxInputDisplayLen?: number;
    spreadInput?: boolean;
    testNamePrefix?: string;
    testExpectType?: string;
};
type InOut = [unknown, unknown];
type DisplayData = number | string | unknown[];

const CONTINUE_CHAR = '…';
const ARROW_CHAR = '→';

/** Create a display string of arbitrary data */
function createDisplayString(data: DisplayData, maxDispLen = 10): string {
    if (typeof data === 'string' || typeof data === 'number') {
        const dataStr: string =
            typeof data === 'number' ? data.toString() : data;
        return dataStr.length > maxDispLen
            ? dataStr.split('').slice(0, maxDispLen).join('') + CONTINUE_CHAR
            : dataStr;
    }

    if (Array.isArray(data)) {
        let displayArray: unknown[] = data;
        let itemSuffix = '';

        if (data.length > maxDispLen) {
            displayArray = data.slice(0, maxDispLen);
            itemSuffix = `, ${CONTINUE_CHAR}`;
        }

        return `[${displayArray.join(',')}${itemSuffix}]`;
    }
}

/** Create a test name */
function createTestName(
    inputs: DisplayData | DisplayData[],
    output: DisplayData,
    maxDispLen = 10,
): string {
    const displayInputs: string | string[] = Array.isArray(inputs)
        ? inputs.map((input: DisplayData) =>
              createDisplayString(input, maxDispLen),
          )
        : createDisplayString(inputs, maxDispLen);
    const displayOutput: string = createDisplayString(output, maxDispLen);

    return `${displayInputs} ${ARROW_CHAR} ${displayOutput}`;
}

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
        testExpectType = 'toBe',
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
            expect(actual)[testExpectType](output);
        });
    });
}

// eslint-disable-next-line jest/no-export
export {
    ARROW_CHAR,
    CONTINUE_CHAR,
    createDisplayString,
    createTestName,
    createTests,
};
