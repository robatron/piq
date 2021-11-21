/**
 * @lc app=leetcode id=740 lang=typescript
 *
 * [740] Delete and Earn
 *
 * https://leetcode.com/problems/delete-and-earn/description/
 *
 * Medium (53.79%)
 *
 * You are given an integer array nums. You want to maximize the number of
 * points you get by performing the following operation any number of times:
 *
 * Pick any nums[i] and delete it to earn nums[i] points. Afterwards, you must
 * delete every element equal to nums[i] - 1 and every element equal to nums[i]
 * + 1.
 *
 * Return the maximum number of points you can earn by applying the above
 * operation some number of times.
 *
 *
 * Example 1:
 *
 * - Input: nums = [3,4,2]
 * - Output: 6
 * - Explanation: You can perform the following operations:
 *   - Delete 4 to earn 4 points. Consequently, 3 is also deleted. nums = [2].
 *   - Delete 2 to earn 2 points. nums = [].
 *   - => You earn a total of 6 points.
 *
 * Example 2:
 *
 * - Input: nums = [2,2,3,3,3,4]
 * - Output: 9
 * - Explanation: You can perform the following operations:
 *   - Delete a 3 to earn 3 points. All 2's and 4's are also deleted. nums =
 *     [3,3].
 *   - Delete a 3 again to earn 3 points. nums = [3].
 *   - Delete a 3 once more to earn 3 points. nums = [].
 *   - => You earn a total of 9 points.
 *
 * Constraints:
 *
 * - 1 <= nums.length <= 2 * 10^4
 * - 1 <= nums[i] <= 10^4
 */

// @lc code=start
const NUM_MIN = 1;
const NUM_MAX = 10000;

/**
 * Brute force recursive.
 *
 * Time:    O(2n^2)  - Traverse n twice for every n
 * Space:   O(1)     - Constant number of storage vars
 */
const deleteAndEarnBrute = (nums: number[]): number => {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];

    let maxScore = 0;

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        const newNums: number[] = [
            ...nums.slice(0, i),
            ...nums.slice(i + 1),
        ].filter((n) => n !== num - 1 && n !== num + 1);

        maxScore = Math.max(maxScore, num + deleteAndEarn(newNums));
    }

    return maxScore;
};

const deleteAndEarnDP = (nums: number[]): number => {
    // Radix (bucket) sort the number of times we see each num -- O(n)
    const numCounts: number[] = new Array(NUM_MAX + 1).fill(0);
    nums.forEach((n) => numCounts[n]++);

    // Total scores *so far* if we avoided or used the previous num
    let scoreAvoidPrev = 0;
    let scoreUsingPrev = 0;

    // Largest total score we've seen so far
    let scoreMax = 0;

    // Previous num we've considered
    let prevNum = NUM_MIN - 1;

    // Consider every num we've seen at least once
    for (let num = 1; num < numCounts.length; num++) {
        if (numCounts[num] > 0) {
            const isNextToPrev = num - 1 === prevNum;
            const score = num * numCounts[num];

            // If this num was next to the previous num, we can't include the
            // previous num when updating the total score using this num.
            // Similarly if this num isn't next to the previous num, we can
            // include the largest previous total score
            scoreUsingPrev = isNextToPrev
                ? scoreAvoidPrev + score
                : scoreMax + score;

            // The total score when avoiding this num is just the largest
            // previous total score
            scoreAvoidPrev = scoreMax;

            prevNum = num;
            scoreMax = Math.max(scoreUsingPrev, scoreAvoidPrev);
        }
    }

    return scoreMax;
};

const deleteAndEarn = deleteAndEarnDP;
// @lc code=end
export { deleteAndEarn, deleteAndEarnBrute, deleteAndEarnDP };
