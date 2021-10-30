import { getStringLengthRecrusive } from '../getStringLengthRecursive';

describe('getStringLengthRecursive', () => {
    it('returns 0 for an empty string', () => {
        expect(getStringLengthRecrusive()).toBe(0);
    });

    it('returns the length of a string', () => {
        const pangram = 'Sphinx of black quartz, judge my vow';
        expect(getStringLengthRecrusive(pangram)).toBe(pangram.length);
    });
});
