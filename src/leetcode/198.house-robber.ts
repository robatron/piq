/**
 * @lc app=leetcode id=198 lang=typescript
 *
 * [198] House Robber
 *
 * https://leetcode.com/problems/house-robber/description/
 *
 * Medium (45.16%)
 *
 * You are a professional robber planning to rob houses along a street. Each
 * house has a certain amount of money stashed, the only constraint stopping you
 * from robbing each of them is that adjacent houses have security systems
 * connected and it will automatically contact the police if two adjacent houses
 * were broken into on the same night.
 *
 * Given an integer array nums representing the amount of money of each house,
 * return the maximum amount of money you can rob tonight without alerting the
 * police.
 *
 * Example 1:
 *
 * - Input: nums = [1,2,3,1]
 * - Output: 4
 * - Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
 *   Total amount you can rob = 1 + 3 = 4.
 *
 * Example 2:
 *
 * - Input: nums = [2,7,9,3,1]
 * - Output: 12
 * - Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house
 *   5 (money = 1). Total amount you can rob = 2 + 9 + 1 = 12.
 *
 * Constraints:
 *
 * - 1 <= nums.length <= 100
 * - 0 <= nums[i] <= 400
 */

// @lc code=start

/**
 * Dynamic programming. Track the max hauls of the most recent 3 houses so we
 * can reference the max hauls 1 and 2 houses back.
 *
 * Time:    O(n)    Only traverse the houses once
 * Space:   O(1)    Only track the most recent 3 houses
 */
function rob(nums: number[]): number {
    // Trivial cases: No houses => 0 haul, 1 house => house haul, 2 houses =>
    // largest single house haul
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    if (nums.length === 2) return Math.max(nums[0], nums[1]);

    let maxHaulBack2 = 0;
    let maxHaulBack1: number = nums[0];
    let currentHaul: number;

    for (let i = 1; i < nums.length; i++) {
        currentHaul = Math.max(maxHaulBack1, maxHaulBack2 + nums[i]);
        maxHaulBack2 = maxHaulBack1;
        maxHaulBack1 = currentHaul;
    }

    return currentHaul;
}
// @lc code=end
export { rob };
