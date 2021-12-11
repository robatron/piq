/**
 * @lc app=leetcode id=300 lang=typescript
 *
 * [300] Longest Increasing Subsequence
 *
 * https://leetcode.com/problems/longest-increasing-subsequence/description/
 *
 * Medium (47.27%)
 *
 * Given an integer array `nums`, return the length of the longest strictly
 * increasing subsequence.
 *
 * A subsequence is a sequence that can be derived from an array by deleting
 * some or no elements without changing the order of the remaining elements. For
 * example, [3,6,2,7] is a subsequence of the array [0,3,1,6,2,2,7].
 *
 *
 * Example 1:
 *
 * - Input: nums = [10, 9, 2, 5, 3, 7, 101, 18]
 * - Output: 4
 * - Explanation: The longest increasing subsequence is [2, 3, 7, 101],
 *   therefore the length is 4.
 *
 * Example 2:
 *
 * - Input: nums = [0, 1, 0, 3, 2, 3]
 * - Output: 4
 *
 * Example 3:
 *
 * - Input: nums = [7, 7, 7, 7, 7, 7, 7]
 * - Output: 1
 *
 * Constraints:
 *
 * - 1 <= nums.length <= 2500
 * - -10^4 <= nums[i] <= 10^4
 *
 * Follow up: Can you come up with an algorithm that runs in O(n log(n)) time
 * complexity?
 */

// @lc code=start

/**
 * Dynamic programming. Find the LIS of every prefix in nums.
 *
 * Time: O(n^2) b/c n states and loop up to n recurrence relation
 * Space: O(n) b/c state for every prefix in nums
 */
const lengthOfLIS = (nums: number[]): number => {
    const maxLens: number[] = new Array(nums.length).fill(1);
    let maxLen = 1;

    for (let i = 1; i < nums.length; i++) {
        const num: number = nums[i];

        for (let j = 0; j < i; j++) {
            const prevNum: number = nums[j];
            const len: number = maxLens[j];

            if (prevNum < num) {
                maxLens[i] = Math.max(maxLens[i], len + 1);
                maxLen = Math.max(maxLen, maxLens[i]);
            }
        }
    }

    return maxLen;
};
// @lc code=end

export { lengthOfLIS };
