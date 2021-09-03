import { areBracketsValid } from '../bracketValidator';

describe('areBracketsValid', () => {
    /*
    let desc = 'valid short code';
    assertEqual(isValid('()'), true, desc);
    */
    it('handles a valid short code', () => {
        const brackets = '()';
        expect(areBracketsValid(brackets)).toBe(true);
    });

    /*
    desc = 'valid longer code';
    assertEqual(isValid('([]{[]})[]{{}()}'), true, desc);
    */
    it('handles a valid longer code', () => {
        const brackets = '([]{[]})[]{{}()}';
        expect(areBracketsValid(brackets)).toBe(true);
    });

    /*
    desc = 'mismatched opener and closer';
    assertEqual(isValid('([][]}'), false, desc);
    */
    it('mismatched opener and closer', () => {
        const brackets = '([][]}';
        expect(areBracketsValid(brackets)).toBe(false);
    });

    /*
    desc = 'missing closer';
    assertEqual(isValid('[[]()'), false, desc);
    */
    it('missing closer', () => {
        const brackets = '[[]()';
        expect(areBracketsValid(brackets)).toBe(false);
    });

    /*
    desc = 'extra closer';
    assertEqual(isValid('[[]]())'), false, desc);
    */
    it('extra closer', () => {
        const brackets = '[[]]())';
        expect(areBracketsValid(brackets)).toBe(false);
    });

    /*
    desc = 'empty string';
    assertEqual(isValid(''), true, desc);
    */
    it('empty string', () => {
        const brackets = '';
        expect(areBracketsValid(brackets)).toBe(true);
    });
});
