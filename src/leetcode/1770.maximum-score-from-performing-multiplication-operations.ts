/**
 * @lc app=leetcode id=1770 lang=typescript
 *
 * [1770] Maximum Score from Performing Multiplication Operations
 *
 * https://leetcode.com/problems/maximum-score-from-performing-multiplication-operations/description/
 *
 * Medium (31.57%)
 *
 * You are given two integer arrays nums and multipliers of size n and m
 * respectively, where n >= m. The arrays are 1-indexed.
 *
 * You begin with a score of 0. You want to perform exactly m operations. On the
 * i^th operation (1-indexed), you will:
 *
 * - Choose one integer x from either the start or the end of the array nums.
 * - Add multipliers[i] * x to your score.
 * - Remove x from the array nums.
 *
 * Return the maximum score after performing m operations.
 *
 * Example 1:
 *
 * - Input: nums = [1,2,3], multipliers = [3,2,1]
 * - Output: 14
 * - Explanation: An optimal solution is as follows:
 *   - Choose from the end, [1,2,3], adding 3 * 3 = 9 to the score.
 *   - Choose from the end, [1,2], adding 2 * 2 = 4 to the score.
 *   - Choose from the end, [1], adding 1 * 1 = 1 to the score.
 *   - The total score is 9 + 4 + 1 = 14.
 *
 * Example 2:
 *
 * - Input: nums = [-5,-3,-3,-2,7,1], multipliers = [-10,-5,3,4,6]
 * - Output: 102
 * - Explanation: An optimal solution is as follows:
 *   - Choose from the start, [-5,-3,-3,-2,7,1], adding -5 * -10 = 50 to the
 *     score.
 *   - Choose from the start, [-3,-3,-2,7,1], adding -3 * -5 = 15 to the score.
 *   - Choose from the start, [-3,-2,7,1], adding -3 * 3 = -9 to the score.
 *   - Choose from the end, [-2,7,1], adding 1 * 4 = 4 to the score.
 *   - Choose from the end, [-2,7], adding 7 * 6 = 42 to the score.
 *   - The total score is 50 + 15 - 9 + 4 + 42 = 102.
 *
 * Constraints:
 *
 * - n == nums.length
 * - m == multipliers.length
 * - 1 <= m <= 10^3
 * - m <= n <= 10^5
 * - -1000 <= nums[i], multipliers[i] <= 1000
 */

/*
Log:

- D1 +30 mins
  - Carefully reading and absorbing problem statement
  - Why does it matter that arrays are "1-indexed" for the problem?
  - Just noticed there are hints available which we can use if we get stuck
  - Can't always just choose the largest each step, b/c taking a hit might help
    the overall score
  - Think about taking first or last: Can't take the first if first was taken
    last time, and vice versa
  - Writing out examples
  - 30 mins in, looking at 1st hint (already knew), taking a break

- D1 +40 mins
  - First 20 mins think through and implement first solution
  - Add example tests, none pass yet
  - 30 mins in, read last 2 hints, but were not helpful
  - Review discussions, my solution is greedy and will not work (b/c you can't
    *always* take the largest subscore. See 2nd example in problem statement)
  - Promising discussion to review next time:
    https://leetcode.com/problems/maximum-score-from-performing-multiplication-operations/discuss/1078881/C%2B%2B-DP-(SIMPLEST-TO-UNDERSTAND)-greater-Recursive-to-Memorisation-greater-Complete-EXPLANATION
  - Break time

- D1 +40 mins
  - Review discussion, recursive makes sense: take left and rest, take right and
    rest
  - Most solutions are top-down w/ memoization, but I want bottom-up DP. Search
    for "bottom-up" w/ most votes:
    https://leetcode.com/problems/maximum-score-from-performing-multiplication-operations/discuss/?currentPage=1&orderBy=most_votes&query=bottom-up
    - JS solution:
      https://leetcode.com/problems/maximum-score-from-performing-multiplication-operations/discuss/1077080/JavaScript-Bottom-Up-DP
    - Python solution:
      https://leetcode.com/problems/maximum-score-from-performing-multiplication-operations/discuss/1075495/Python3-bottom-up-dp/856183
    - Java solution:
      https://leetcode.com/problems/maximum-score-from-performing-multiplication-operations/discuss/1075697/JAVA-Bottom-Up-DP-O(m2)-Runtime
    - Can make a 2D array where each position represents the max score we can
      make by choosing from the start i number of times, or end j number of
      times

- D2 +90 mins
  - Review problem description, try to implement previous solutions by memory
  - ~ 60 mins in, example tests passing :-)
  - Failed LC submission test, but issue was I was tracking max score when using
    any amount of multipliers, not all multipliers

- Results:
  - 160 mins over 2 days with ~60 mins careful discussion review
    - Should only take me 40 mins w/ minimal hints for medium problems, so I
      need to get 4x faster on these. (See
      https://betterprogramming.pub/5-tips-to-beat-the-leetcode-grind-a2388d32cd0)
  - Was able to understand discussions well enough and implement on my own the
    next day
  - Progress is progress 🤷

Notes:

- nums = [1,2,3], multipliers = [3,2,1]

  - nums    multipliers tookFirst       tookLast
  - [1,2,3] [3,2,1]     3 * 1 = 3       3 * 3 = 9 ✅
  - [1,2,3] [2, 1]      2 * 2 = 4 ✅    2 * 2 = 4
  - [1,2,3] [1]         1 * 1 = 1 ✅    1 * 1 = 1
*/

// @lc code=start
/**
 * Dynamic programming (bottom-up). Find the max score we can get with every
 * combination of 'start' and 'end' products, then find the largest of combos
 * using all multipliers.
 *
 * - Time: O(m * m) - Consider `m` numbers for every multiplier
 * - Space: O(m * m) - Store max scores of every combo of `m` products (actually
 *   m * m / 2, but we have to ignore constants)
 *
 * LeetCode submission:
 *
 * - 62/62 cases passed (420 ms)
 * - Your runtime beats 87.5 % of typescript submissions
 * - Your memory usage beats 43.75 % of typescript submissions (83.6 MB)
 */
const maximumScore = (nums: number[], mults: number[]): number => {
    const N: number = nums.length;
    const M: number = mults.length;

    // Highest score we can get by taking `s` nums from the start and `e` nums
    // from the end and multiplying them by `mults[s + e - 1]` multiplier. I.e.,
    // `maxScores[3][5]` means "max score by taking 3 nums from the start and 5
    // nums from the end`
    const maxScores: number[][] = [[0]];

    // Find the max score by taking only from the start
    for (let s = 1; s <= M; s++) {
        const mult: number = mults[s - 1];
        const num: number = nums[s - 1];
        const prevMaxScore: number = maxScores[s - 1][0];
        const maxStartScore: number = mult * num + prevMaxScore;
        maxScores.push([maxStartScore]);
    }

    // Find the max score by taking only from the end
    for (let e = 1; e <= M; e++) {
        const mult: number = mults[e - 1];
        const num: number = nums[N - e];
        const prevMaxEndScore: number = maxScores[0][e - 1];
        const maxEndScore: number = mult * num + prevMaxEndScore;
        maxScores[0].push(maxEndScore);
    }

    // Find the max scores of all other product combinations of taking some from
    // the start and some from the end
    for (let s = 1; s < M; s++) {
        for (let e = 1; s + e <= M; e++) {
            const mult: number = mults[s + e - 1];

            // If we've taken `s` from the start, what's our max score if we
            // then take `e` from the end?
            const numEnd: number = nums[N - e];
            const maxScorePrevEnd: number = maxScores[s][e - 1];
            const maxScoreEnd = mult * numEnd + maxScorePrevEnd;

            // If we've taken `e` from the end, what's our max score if we then
            // take `s` from the start?
            const numStart: number = nums[s - 1];
            const maxScorePrevStart: number = maxScores[s - 1][e];
            const maxScoreStart: number = mult * numStart + maxScorePrevStart;

            // The max score we can get by taking `s` from the start and `e`
            // from the end is the larger of the two above scenarios
            const maxComboScore: number = Math.max(maxScoreStart, maxScoreEnd);

            // We have all the 'start' rows, but we need to build out 'end'
            // columns as we go
            maxScores[s].push(maxComboScore);
        }
    }

    // Find the highest score among all product combinations that use all the
    // multipliers (the final column in every row)
    let maxScore = -Infinity;
    for (let i = 0; i <= M; i++) {
        maxScore = Math.max(maxScore, maxScores[i][M - i]);
    }

    // Return the max overall score we found using all the multipliers
    return maxScore;
};

// @lc code=end
export { maximumScore };
