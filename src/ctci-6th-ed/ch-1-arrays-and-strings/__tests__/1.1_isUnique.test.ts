import _1_1 from '../1.1_isUnique';

const testStrAllUnique = 'abcdefghijklmnopqrstuvwxyz';
const testStrNotUnique = [
    // Duplicate in beginning of string
    'aabcdefghijklmnopqrstuvwxyz',

    // ... in the middle
    'abcdefghijklmnoopqrstuvwxyz',

    // At the end
    'abcdefghijklmnopqrstuvwxyzz',
];

['isUnique', 'isUniqueAlt'].forEach((fnName) => {
    describe(fnName, () => {
        it('returns true if a string has all unique characters', () => {
            expect(_1_1[fnName](testStrAllUnique)).toBe(true);
        });

        it('returns false if a string does not have all unique characters', () => {
            testStrNotUnique.forEach((str) => {
                expect(_1_1[fnName](str)).toBe(false);
            });
        });
    });
});
