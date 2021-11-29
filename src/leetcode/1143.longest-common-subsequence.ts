/**
 * @lc app=leetcode id=1143 lang=typescript
 *
 * [1143] Longest Common Subsequence
 *
 * https://leetcode.com/problems/longest-common-subsequence/description/
 *
 * Medium (58.77%)
 *
 * Given two strings text1 and text2, return the length of their longest common
 * subsequence. If there is no common subsequence, return 0.
 *
 * A subsequence of a string is a new string generated from the original string
 * with some characters (can be none) deleted without changing the relative
 * order of the remaining characters.
 *
 * - For example, "ace" is a subsequence of "abcde".
 *
 * A common subsequence of two strings is a subsequence that is common to both
 * strings.
 *
 * Example 1:
 *
 * - Input: text1 = "abcde", text2 = "ace"
 * - Output: 3
 * - Explanation: The longest common subsequence is "ace" and its length is 3.
 *
 * Example 2:
 *
 * - Input: text1 = "abc", text2 = "abc"
 * - Output: 3
 * - Explanation: The longest common subsequence is "abc" and its length is 3.
 *
 * Example 3:
 *
 * - Input: text1 = "abc", text2 = "def"
 * - Output: 0
 * - Explanation: There is no such common subsequence, so the result is 0.
 *
 * Constraints:
 *
 * - 1 <= text1.length, text2.length <= 1000
 * - text1 and text2 consist of only lowercase English characters.
 */

// @lc code=start
const longestCommonSubsequence = (text1: string, text2: string): number => {
    // Base case: There are no subsequences at all if size of either text is 0
    if (!text1?.length || !text2?.length) return 0;

    // Subproblem storage: Longest common subseq (LCS) for all of both text's
    // prefixes. 1st index are all end indexes of all prefixes of text1, and the
    // 2nd index is the same but for text2. The value at each position is the
    // LCS for the specified prefixes.
    const comSeqLens: number[][] = Array(text1.length + 1)
        .fill(0)
        .map(() => Array(text2.length + 1).fill(0));

    // Test every prefix of text2 with every prefix of text1 starting with the
    // full text and removing a character from the end each loop
    for (let endIdx1: number = text1.length - 1; endIdx1 >= 0; endIdx1--) {
        for (let endIdx2: number = text2.length - 1; endIdx2 >= 0; endIdx2--) {
            const endChar1: string = text1[endIdx1];
            const endChar2: string = text2[endIdx2];

            // If the end chars for both current prefixes match, the LCS for
            // them are the LCS of the previous prefixes plus 1 (for the match)
            if (endChar1 === endChar2) {
                comSeqLens[endIdx1][endIdx2] =
                    comSeqLens[endIdx1 + 1][endIdx2 + 1] + 1;
            }

            // Otherwise, the end chars do not match, so the LCS for the current
            // prefixes is the larger of either the LCS of the current text1
            // prefix and the previous text2 prefix or vice versa
            else {
                const lenKeep1: number = comSeqLens[endIdx1][endIdx2 + 1];
                const lenKeep2: number = comSeqLens[endIdx1 + 1][endIdx2];
                comSeqLens[endIdx1][endIdx2] = Math.max(lenKeep1, lenKeep2);
            }
        }
    }

    // The total LCS is the LCS for the prefixes of the first char of both text1
    // and text2
    return comSeqLens[0][0];
};

// @lc code=end

export { longestCommonSubsequence };
