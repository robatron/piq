/*
 * @lc app=leetcode id=1220 lang=typescript
 *
 * [1220] Count Vowels Permutation
 *
 * https://leetcode.com/problems/count-vowels-permutation/description/
 *
 * Hard (56.49%)
 *
 * Given an integer `n`, your task is to count how many strings of length `n`
 * can be formed under the following rules:
 *
 * - Each character is a lower case vowel ('a', 'e', 'i', 'o', 'u')
 * - Each vowel 'a' may only be followed by an 'e'.
 * - Each vowel 'e' may only be followed by an 'a' or an 'i'.
 * - Each vowel 'i' may not be followed by another 'i'.
 * - Each vowel 'o' may only be followed by an 'i' or a 'u'.
 * - Each vowel 'u' may only be followed by an 'a'.
 *
 * Since the answer may be too large, return it modulo 10^9 + 7.
 *
 * Example 1:
 *
 * - Input: n = 1
 * - Output: 5
 * - Explanation: All possible strings are: "a", "e", "i" , "o" and "u".
 *
 * Example 2:
 *
 * - Input: n = 2
 * - Output: 10
 * - Explanation: All possible strings are: "ae", "ea", "ei", "ia", "ie", "io",
 *   "iu", "oi", "ou" and "ua".
 *
 * Example 3:
 *
 * - Input: n = 5
 * - Output: 68
 *
 * Constraints:
 *
 * - 1 <= n <= 2 * 10^4
 */

// @lc code=start
const MOD: number = Math.pow(10, 9) + 7;

/**
 * Dynamic programming (bottom up). Count the number of permutations of new
 * strings we can make from the previous strings based on the relationship
 * between each new vowel we're trying to add and the count of the previous
 * permutations' topmost vowel.
 *
 * - Time: O(n) - Consider how the count of each vowel grows with each string of
 *   size 1..n
 * - Space: O(1) - Only storing counts for the previous fixed number of vowels
 *
 * LeetCode submission:
 *
 * - Your runtime beats 87.5 % of typescript submissions
 * - Your memory usage beats 87.5 % of typescript submissions (45.2 MB)
 */
const countVowelPermutation = (n: number): number => {
    // Counts of each vowel at the end of every valid string permutation for
    // strings of length n. Start with strings of length 1 and initialize every
    // vowel with 1 count as all vowels are allowed to follow nothing
    let counts: Record<string, number> = { a: 1, e: 1, i: 1, o: 1, u: 1 };

    // Sum the counts of the specified vowels `vs` and return it modulo 10^9 + 7
    const vowelCtModSum = (...vowels: string[]) =>
        vowels.reduce((sum, v) => (sum + counts[v]) % MOD, 0);

    // Find the number of strings that can be formed under the given rules
    // starting with string lengths of 2
    for (let i = 2; i <= n; i++) {
        counts = {
            a: vowelCtModSum('e', 'i', 'u'),
            e: vowelCtModSum('a', 'i'),
            i: vowelCtModSum('e', 'o'),
            o: vowelCtModSum('i'),
            u: vowelCtModSum('i', 'o'),
        };
    }

    // Calculate the final number of string permutations
    return vowelCtModSum(...'aeiou'.split(''));
};
// @lc code=end
export { countVowelPermutation };
