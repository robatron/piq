/**
 * @lc app=leetcode id=139 lang=typescript
 *
 * [139] Word Break
 *
 * https://leetcode.com/problems/word-break/description/
 *
 * Medium (43.28%)
 *
 * Given a string `s` and a dictionary of strings `wordDict`, return true if `s`
 * can be segmented into a space-separated sequence of one or more dictionary
 * words.
 *
 * Note that the same word in the dictionary may be reused multiple times in the
 * segmentation.
 *
 * Example 1:
 *
 * - Input: s = "leetcode", wordDict = ["leet","code"]
 * - Output: true
 * - Explanation: Return true because "leetcode" can be segmented as "leet
 *   code".
 *
 * Example 2:
 *
 * - Input: s = "applepenapple", wordDict = ["apple","pen"]
 * - Output: true
 * - Explanation: Return true because "applepenapple" can be segmented as "apple
 *   pen apple". (Note that you are allowed to reuse a dictionary word.)
 *
 * Example 3:
 *
 * -Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
 * -Output: false
 *
 * Constraints:
 *
 * - 1 <= s.length <= 300
 * - 1 <= wordDict.length <= 1000
 * - 1 <= wordDict[i].length <= 20
 * - s and wordDict[i] consist of only lowercase English letters.
 * - All the strings of wordDict are unique.
 */

// @lc code=start

/**
 * Dynamic programming. Consider every prefix of str and track if we can create
 * the prefix by concatenating words from the word dictionary.
 *
 * Time: O(s * w * wl) where s = string length, w = word count, wl = average
 * word length
 */
const wordBreak = (str: string, wordDict: string[]): boolean => {
    // Track if we can make a string by concatinatig words from the dictionary
    // with every prefix of str
    const subStrWordBreak: boolean[] = new Array(str.length).fill(false);

    // Consider every prefix of str and see if we can make a string of
    // concatenated words from the dictionary
    for (let endIdx = 0; endIdx < str.length; endIdx++) {
        // See if we can find a word that fits after the previous matched word
        for (let w = 0; w < wordDict.length; w++) {
            const word: string = wordDict[w];
            const startIdx: number = endIdx - word.length + 1;

            // We know the word matches after the previous matched word if the
            // word fits in the substring, the previous matched word was valid
            // (or this is the first word we're considering), and this word
            // matches the substring
            if (
                // Does the word fit in the substring?
                startIdx >= 0 &&
                // Was the previous word break was valid (or is this the first
                // word we're considering)?
                (startIdx === 0 || subStrWordBreak[startIdx - 1]) &&
                // Does the word match the substring?
                word === str.substring(startIdx, endIdx + 1)
            ) {
                subStrWordBreak[endIdx] = true;
                break;
            }
        }
    }

    return subStrWordBreak[str.length - 1];
};
// @lc code=end
export { wordBreak };
