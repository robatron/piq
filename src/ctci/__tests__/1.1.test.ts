import { hasAllUniqueChars } from '../1.1';

describe('1.1', () => {
    it('returns true if a string has all unique characters', () => {
        const testStr = 'abc';
        expect(hasAllUniqueChars(testStr)).toBe(true);
    });

    it('returns false if a string does not have all unique characters', () => {
        const testStr = 'abbc';
        expect(hasAllUniqueChars(testStr)).toBe(false);
    });
});
