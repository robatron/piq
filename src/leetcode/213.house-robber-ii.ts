/**
 * @lc app=leetcode id=213 lang=typescript
 *
 * [213] House Robber II
 *
 * https://leetcode.com/problems/house-robber-ii/description/
 *
 * Medium (38.88%)
 *
 * You are a professional robber planning to rob houses along a street. Each
 * house has a certain amount of money stashed. All houses at this place are
 * arranged in a circle. That means the first house is the neighbor of the last
 * one. Meanwhile, adjacent houses have a security system connected, and it will
 * automatically contact the police if two adjacent houses were broken into on
 * the same night.
 *
 * Given an integer array nums representing the amount of money of each house,
 * return the maximum amount of money you can rob tonight without alerting the
 * police.
 *
 * Example 1:
 *
 * - Input: nums = [2,3,2]
 * - Output: 3
 * - Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money
 *   = 2), because they are adjacent houses.
 *
 * Example 2:
 *
 * - Input: nums = [1,2,3,1]
 * - Output: 4
 * - Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
 *   Total amount you can rob = 1 + 3 = 4.
 *
 * Example 3:
 *
 * - Input: nums = [1,2,3]
 * - Output: 3
 *
 * Constraints:
 *
 * - 1 <= nums.length <= 100
 * - 0 <= nums[i] <= 1000
 */

// @lc code=start

/**
 * We can either rob the 1st thru 2nd-to-last house, or the 2nd thru the last
 * house, so we can run the original house robber algorithm (198) once for each
 * range and choose the highest!
 *
 * Time:    O(2n) => O(n)  - Traverse the nums twice, but constants go to zero
 * Space:   O(1)           - Still only tracking the previous few houses
 */
const rob2 = (nums: number[]): number => {
    // Trivial cases: No haul can come from no houses, only 1 haul can come from
    // one house, and the larger of 2 or 3 hauls from two or three houses.
    if (nums.length === 0) return null;
    if (nums.length === 1) return nums[0];
    if ([2, 3].includes(nums.length)) return Math.max(...nums);

    // Find the max hauls of the valid house ranges, 1st thru 2nd-to-last, and
    // 2nd thru last. The valid house set length is always 1 less than the total
    // house set length, and we can start at either the 0th or the 1st index
    // (corresponding to the 1st or 2nd starting house)
    const validHauls: number[] = [0, 1].map((start) => {
        const maxHauls: number[] = [nums[start], nums[start + 1]];

        for (let i = start + 2; i < start + nums.length - 1; i++) {
            if (i === start + 2) maxHauls.push(nums[start] + nums[start + 2]);
            else {
                maxHauls.push(Math.max(maxHauls[0], maxHauls[1]) + nums[i]);
                maxHauls.shift();
            }
        }

        return Math.max(...maxHauls);
    });

    // Simply return the largest valid haul
    return Math.max(...validHauls);
};

// "Export" to LeetCode
const rob = rob2;
// @lc code=end

export { rob, rob2 };
