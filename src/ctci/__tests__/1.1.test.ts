import onePointOne from '../1.1';

const testStrAllUnique = 'abc';
const testStrNotUnique = 'abbc';

['hasAllUniqueChars', 'hasAllUniqueCharsAlt'].forEach((fnName) => {
    describe(fnName, () => {
        it('returns true if a string has all unique characters', () => {
            expect(onePointOne[fnName](testStrAllUnique)).toBe(true);
        });

        it('returns false if a string does not have all unique characters', () => {
            expect(onePointOne[fnName](testStrNotUnique)).toBe(false);
        });
    });
});
