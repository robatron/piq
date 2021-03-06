import { reverseArrayString } from '../_old_5th-ed_1.2_reverseString';

describe('reverseArrayString', () => {
    it('reverses an array string in-place', () => {
        // Array to be modified in-place
        const testArrayString = 'abcdefghijklmnopqrstuvwxyz'.split('');

        // Reverse a copy of the target string to test against
        const expectedResult = [...testArrayString];
        expectedResult.reverse();

        // Reverse array in-place
        reverseArrayString(testArrayString);

        expect(testArrayString).toStrictEqual(expectedResult);
    });
});
