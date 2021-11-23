/**
 * @lc app=leetcode id=55 lang=typescript
 *
 * [55] Jump Game
 *
 * https://leetcode.com/problems/jump-game/description/
 *
 * Medium (36.89%)
 *
 * You are given an integer array nums. You are initially positioned at the
 * array's first index, and each element in the array represents your maximum
 * jump length at that position.
 *
 * Return true if you can reach the last index, or false otherwise.
 *
 * Example 1:
 *
 * - Input: [2, 3, 1, 1, 4]
 * - Output: true
 * - Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
 *
 * Example 2:
 *
 * - Input: [3, 2, 1, 0, 4]
 * - Output: false
 * - Explanation: You will always arrive at index 3 no matter what. Its maximum
 *   jump length is 0, which makes it impossible to reach the last index.
 *
 * Constraints:
 *
 * - 1 <= nums.length <= 10^4
 * - 0 <= nums[i] <= 10^5
 */

// @lc code=start

/**
 * Walk backwards starting from the 2nd to last index and keep track of the
 * earliest "good" index, i.e., the earliest index from which we can reach the
 * last index (directly or indirectly). If the earliest "good" index is the
 * first index by the time we're done, we can reach the end from the start!
 *
 * Time: O(n) - Traverse the array once
 * Space: O(1) - Only track the earliest "good" index
 */
const canJump = (nums: number[]): boolean => {
    // Our first "good" index is the last index (our target index)
    let goodIdx: number = nums.length - 1;

    for (let i = nums.length - 2; i >= 0; i--) {
        const maxJumps: number = nums[i];
        const maxJumpIdx: number = i + maxJumps;

        if (maxJumpIdx >= goodIdx) goodIdx = i;
    }

    // Can we reach the last index from the first index?
    return goodIdx === 0;
};
// @lc code=end
export { canJump };
