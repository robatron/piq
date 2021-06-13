import permutationPalindrome from '../permutationPalindrome';

describe('permutationPalindrome', () => {
    it('returns true if any permutation of a word is a palindrome', () => {
        ['civic', 'ivicc', 'cracare', 'otot'].forEach((word) => {
            expect(permutationPalindrome(word)).toBe(true);
        });
    });

    it('returns false if no permutations of a word is a palindrome', () => {
        ['civil', 'livci', 'ofot'].forEach((word) => {
            expect(permutationPalindrome(word)).toBe(false);
        });
    });
});
