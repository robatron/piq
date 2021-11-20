type Func = (...args: unknown[]) => unknown;
type Opts = {
    maxInputDisplayLen?: number;
    spreadInput?: boolean;
    testExpectType?: string;
    testNamePrefix?: string;
};
type Input = boolean | number | number[] | string | string[];
type Output = Input;
type InAndOut = [Input, Output];
type DisplayData = number | number[] | string | string[] | unknown[];

const CONTINUE_CHAR = '…';
const ARROW_CHAR = '→';

const formatInOrOut = (inOrOut: string | number, maxDispLen = 10): string => {
    let dataStr: string =
        typeof inOrOut === 'number' ? inOrOut.toString() : inOrOut;

    if (dataStr.length > maxDispLen) {
        dataStr =
            dataStr.split('').slice(0, maxDispLen).join('') + CONTINUE_CHAR;
    }

    if (typeof inOrOut === 'string') {
        dataStr = `'${dataStr}'`;
    }

    return dataStr;
};

/** Format an input or output string */
const formatInsOrOuts = (inOrOut: DisplayData, maxDispLen = 10): string => {
    if (typeof inOrOut === 'string' || typeof inOrOut === 'number') {
        return formatInOrOut(inOrOut, maxDispLen);
    }

    if (Array.isArray(inOrOut)) {
        let displayArray: string[] = inOrOut.map((io) =>
            formatInsOrOuts(io, maxDispLen),
        );
        let itemSuffix = '';

        if (displayArray.length > maxDispLen) {
            displayArray = displayArray.slice(0, maxDispLen);
            itemSuffix = `,${CONTINUE_CHAR}`;
        }

        return `[${displayArray.join(',')}${itemSuffix}]`;
    }
};

/** Create a test name */
const createTestName = (
    inputs: DisplayData,
    output: DisplayData,
    maxDispLen = 10,
): string => {
    const displayInputs: string = formatInsOrOuts(inputs, maxDispLen);
    const displayOutput: string = formatInsOrOuts(output, maxDispLen);

    return `${displayInputs} ${ARROW_CHAR} ${displayOutput}`;
};

/** Create a single test for a function, input(s), and expected output */
const createTest = (
    inNOut: InAndOut,
    fn: Func,
    {
        maxInputDisplayLen = 10,
        spreadInput = false,
        testNamePrefix = '',
        testExpectType = 'toBe',
    }: Opts = {},
): void => {
    const [input, output] = inNOut;
    const prefix: string = testNamePrefix ? testNamePrefix + ' ' : '';
    const testName: string = createTestName(input, output, maxInputDisplayLen);

    test(`${prefix}${testName}`, () => {
        const actual: unknown = spreadInput
            ? fn(...(input as number[] | string[]))
            : fn(input);
        expect(actual)[testExpectType](output);
    });
};

/** Create tests for a function, inputs, and expected outputs */
const createTests = (
    insNOuts: InAndOut[],
    fn: Func,
    {
        maxInputDisplayLen = 10,
        spreadInput = false,
        testExpectType = 'toBe',
        testNamePrefix = '',
    }: Opts = {},
): void =>
    insNOuts.forEach((inAndOut: InAndOut) =>
        createTest(inAndOut, fn, {
            maxInputDisplayLen,
            spreadInput,
            testExpectType,
            testNamePrefix,
        }),
    );

// eslint-disable-next-line jest/no-export
export {
    ARROW_CHAR,
    CONTINUE_CHAR,
    formatInsOrOuts as createDisplayString,
    createTestName,
    createTests,
};
