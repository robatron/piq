/*
 * @lc app=leetcode id=918 lang=typescript
 *
 * [918] Maximum Sum Circular Subarray
 *
 * https://leetcode.com/problems/maximum-sum-circular-subarray/description/
 *
 * Medium (35.72%)
 *
 * Given a circular integer array nums of length n, return the maximum possible
 * sum of a non-empty subarray of nums.
 *
 * A circular array means the end of the array connects to the beginning of the
 * array. Formally, the next element of nums[i] is nums[(i + 1) % n] and the
 * previous element of nums[i] is nums[(i - 1 + n) % n].
 *
 * A subarray may only include each element of the fixed buffer nums at most
 * once. Formally, for a subarray nums[i], nums[i + 1], ..., nums[j], there
 * does not exist i <= k1, k2 <= j with k1 % n == k2 % n.
 *
 * Example 1:
 *
 * - Input: nums = [1,-2,3,-2]
 * - Output: 3
 * - Explanation: Subarray [3] has maximum sum 3.
 *
 * Example 2:
 *
 * - Input: nums = [5,-3,5]
 * - Output: 10
 * - Explanation: Subarray [5,5] has maximum sum 5 + 5 = 10.
 *
 * Example 3:
 *
 * - Input: nums = [-3,-2,-3]
 * - Output: -2
 * - Explanation: Subarray [-2] has maximum sum -2.
 *
 * Constraints:
 *
 * - n == nums.length
 * - 1 <= n <= 3 * 10^4
 * - -3 * 10^4 <= nums[i] <= 3 * 10^4
 */

// @lc code=start
/**
 * Dynamic programming (variation on Kadane's algorithm). There are two possible
 * cases:
 *
 * 1. The max subarray sum is in the middle - We can use stock Kadane's
 *    algorithm for this as we would with a non-circular array
 * 2. The max subarray sum wraps around from the end to the beginning - We can
 *    modify Kadane's algorithm to find the min subarray sum and subtract it
 *    from the total array sum
 *
 * Once we've found values for these two cases, we simply take the larger of the
 * two, ie, max(maxSum, totalSum - minSum)!
 *
 * Corner case: If the array contains only negatives, the total array sum and
 * the min subarray sum will be the same resulting in 0, while the max subarray
 * sum will be negative. To handle this case, we can simply return the max
 * subarray sum if we detect the max subarray sum is negative!
 *
 * - Time: O(n) b/c we're visiting every item only once
 * - Space: O(1) b/c not using any additional data structures
 */
const maxSubarraySumCircular = (nums: number[]): number => {
    // Track the total sum, the current min/max subarray sums, and the overall
    // min/max subarray sums
    let totalSum: number = nums[0];
    let curMinSum: number = nums[0];
    let curMaxSum: number = nums[0];
    let minSum: number = nums[0];
    let maxSum: number = nums[0];

    // For every new number, determine if it would be better to add it to the
    // current min/max subarray sums, or take it by itself. Also keep the total
    // and overall min/max sums updated.
    for (let i = 1; i < nums.length; i++) {
        const num: number = nums[i];

        totalSum += num;
        curMinSum = Math.min(curMinSum + num, num);
        curMaxSum = Math.max(curMaxSum + num, num);
        minSum = Math.min(minSum, curMinSum);
        maxSum = Math.max(maxSum, curMaxSum);
    }

    // Corner case: If we have all negatives, totalSum will equal the minSum
    // which gives us 0, which will be larger than maxSum which will be
    // negative. If maxSum is negative, we know we've encountered this case, so
    // the max subarray sum is just the maxSum.
    return maxSum > 0 ? Math.max(maxSum, totalSum - minSum) : maxSum;
};
// @lc code=end
export { maxSubarraySumCircular };
