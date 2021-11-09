import { createTestName, createTests } from './utils';
import {
    addToArrayForm,
    intToRevArrForm,
} from '../989.add-to-array-form-of-integer';

describe(addToArrayForm.name, () => {
    type Input = [number[], number];
    type Output = number[];
    type InputOutput = [Input, Output];

    const ios: InputOutput[] = [
        [[[0], 0], [0]],
        [
            [[1, 2, 0, 0], 34],
            [1, 2, 3, 4],
        ],
        [
            [[2, 7, 4], 181],
            [4, 5, 5],
        ],
        [
            [[2, 1, 5], 806],
            [1, 0, 2, 1],
        ],
        [
            [[9, 9, 9, 9, 9, 9, 9, 9, 9, 9], 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        [
            [[0], 1000],
            [1, 0, 0, 0],
        ],
    ];

    ios.forEach(([inputs, output]) =>
        test(createTestName(inputs, output), () =>
            expect(addToArrayForm(...inputs)).toStrictEqual(output),
        ),
    );
});

describe(intToRevArrForm.name, () => {
    createTests(
        [
            [0, [0]],
            [123, [3, 2, 1]],
        ],
        intToRevArrForm,
        {
            testExpectType: 'toStrictEqual',
        },
    );
});
