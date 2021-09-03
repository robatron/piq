import { indexOfMatchingParen } from '../matchParens';

/*
let desc = 'all openers then closers';
let actual = getClosingParen('((((()))))', 2);
let expected = 7;
assertEqual(actual, expected, desc);

desc = 'mixed openers and closers';
actual = getClosingParen('()()((()()))', 5);
expected = 10;
assertEqual(actual, expected, desc);


*/

describe('indexOfMatchingParen', () => {
    it('handles all openers then closers', () => {
        const str = '((((()))))';
        const openParenIdx = 2;
        const actual = indexOfMatchingParen(str, openParenIdx);
        const expctd = 7;

        expect(actual).toBe(expctd);
    });

    it('handles mixed openers and closers', () => {
        const str = '()()((()()))';
        const openParenIdx = 5;
        const actual = indexOfMatchingParen(str, openParenIdx);
        const expctd = 10;

        expect(actual).toBe(expctd);
    });

    /*
    desc = 'no matching closer';
    const noCloser = () => (getClosingParen('()(()', 2));
    assertThrowsError(noCloser, desc);
    */
    it('handles no matching closer', () => {
        const str = '()(()';
        const openParenIdx = 2;
        const actual = indexOfMatchingParen(str, openParenIdx);
        const expctd = -1;

        expect(actual).toBe(expctd);
    });
});
