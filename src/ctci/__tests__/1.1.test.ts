import onePointOne from '../1.1';

const testStrAllUnique = 'abcdefghijklmnopqrstuvwxyz';
const testStrNotUniqueBeg = 'aabcdefghijklmnopqrstuvwxyz';
const testStrNotUniqueMid = 'abcdefghijklmnoopqrstuvwxyz';
const testStrNotUniqueEnd = 'abcdefghijklmnopqrstuvwxyzz';

['hasAllUniqueChars', 'hasAllUniqueCharsAlt'].forEach((fnName) => {
    describe(fnName, () => {
        it('returns true if a string has all unique characters', () => {
            expect(onePointOne[fnName](testStrAllUnique)).toBe(true);
        });

        it('returns false if a string does not have all unique characters', () => {
            expect(onePointOne[fnName](testStrNotUniqueBeg)).toBe(false);
            expect(onePointOne[fnName](testStrNotUniqueMid)).toBe(false);
            expect(onePointOne[fnName](testStrNotUniqueEnd)).toBe(false);
        });
    });
});
