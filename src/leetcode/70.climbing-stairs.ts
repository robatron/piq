/**
 * @lc app=leetcode id=70 lang=typescript
 *
 * [70] Climbing Stairs
 *
 * https://leetcode.com/problems/climbing-stairs/description/
 *
 * Easy (50.00%)
 *
 * You are climbing a staircase. It takes n steps to reach the top.
 *
 * Each time you can either climb 1 or 2 steps. In how many distinct ways can
 * you climb to the top?
 *
 * Example 1:
 *
 * - Input: n = 2
 * - Output: 2
 * - Explanation: There are two ways to climb to the top:
 *   - 1. 1 step + 1 step
 *   - 2. 2 steps
 *
 * Example 2:
 *
 * - Input: n = 3
 * - Output: 3
 * - Explanation: There are three ways to climb to the top.
 *   - 1. 1 step + 1 step + 1 step
 *   - 2. 1 step + 2 steps
 *   - 3. 2 steps + 1 step
 *
 * Example 3:
 *
 * - Input: n = 4
 * - Output: 5
 * - Explaination: There are five ways to climb to the top.
 *   - 1. 1 + 1 + 1 + 1
 *   - 2. 1 + 1 + 2
 *   - 3. 1 + 2 + 1
 *   - 4. 2 + 1 + 1
 *   - 5. 2 + 2
 *
 * Constraints:
 *
 * - 1 <= n <= 45
 */

/**
 * Brute-force. "From my current stair, how many ways are there to get to the
 * top stair from one stair up (if I climb one step), and how many ways are
 * there to get to the top stair from two stairs up (if I climb two steps)?"
 *
 * - Time:  O(2^n)  - There are two recursive calls for every stair
 * - Space: O(n)    - There is a new level on the call stack for every stair
 */
const climbStairsBruteForce = (
    // Total number of stairs
    stairs: number,

    // Which stair are we currently on? (Start at 0 since we haven't taken any
    // steps yet)
    stair = 0,
): number => {
    // There are 0 ways to get to a missing top stair from anywhere, and 0 ways
    // to get to a top stair from nowhere
    if (stairs === 0 || stair > stairs) return 0;

    // There is 1 way to get to the top stair if we're already on it
    if (stair === stairs) return 1;

    // How many ways are there to get to the top stair if we take one more step?
    // How about 2 more steps?
    return (
        climbStairsBruteForce(stairs, stair + 1) +
        climbStairsBruteForce(stairs, stair + 2)
    );
};

/**
 * Dynamic programming. "From my current stair, how many ways _were_ there to
 * get to one stair down (if I had gotten here by climbing one stair), and how
 * many ways were there to get to two stairs down (if I had gotten here by
 * climbing two stairs)?"
 *
 * - Time:  O(n)    - Only one operation per stair
 * - Space: O(n)    - Storing one value, the number of ways to get to each step
 */
const climbStairsDP = (stairs: number): number => {
    // Initialize an array big enough to track the number of ways there
    // are to get to every stair and initialize to 0. The index will correspond
    // to the stair number. (The 0th index will not be used.)
    const ways: number[] = new Array(stairs + 1).fill(0);

    // From the starting position, we know there is only one way to get to the
    // 1st stair (by taking one step), and two ways to get to the 2nd (by taking
    // two single steps, and by taking one double step)
    ways[1] = 1;
    ways[2] = 2;

    // For every stair, how many ways were there to get here from one stair back
    // via a single step? How about two stairs back?
    for (let stair = 3; stair <= stairs; stair++) {
        ways[stair] = ways[stair - 1] + ways[stair - 2];
    }

    // Return the number of ways there are to get to the top stair
    return ways[stairs];
};

// @lc code=start

/**
 * Fibonacci style. Same as DP, but we actually only need to keep track of ways
 * to get to one stair back and two stairs back!
 *
 * - Time:  O(n)    - Visit every stair
 * - Space: O(1)    - Only need to store ways to get to the last two stairs 🙂
 */
const climbStairsFib = (stairs: number): number => {
    if (stairs <= 1) return stairs;
    if (stairs === 2) return 2;

    // Keep track of the number of ways to get to one stair back, two stairs
    // back, and the current stair
    let back1 = 1;
    let back2 = 2;
    let ways: number;

    // For every stair, how many ways were there to get here from one stair
    // back? how about two stairs back?
    for (let stair = 3; stair <= stairs; stair++) {
        ways = back1 + back2;
        back1 = back2;
        back2 = ways;
    }

    return ways;
};

// Which algorithm should we enable for LeetCode?
const climbStairs = climbStairsFib;

// @lc code=end

export default climbStairs;
export { climbStairsBruteForce, climbStairsDP, climbStairsFib };
