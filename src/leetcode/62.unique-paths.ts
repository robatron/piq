/**
 * @lc app=leetcode id=62 lang=typescript
 *
 * [62] Unique Paths
 *
 * https://leetcode.com/problems/unique-paths/description/
 *
 * Medium (58.58%)
 *
 * There is a robot on an m x n grid. The robot is initially located at the
 * top-left corner (i.e., grid[0][0]). The robot tries to move to the
 * bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move
 * either down or right at any point in time.
 *
 * Given the two integers m and n, return the number of possible unique paths
 * that the robot can take to reach the bottom-right corner.
 *
 * The test cases are generated so that the answer will be less than or equal to
 * 2 * 10^9.
 *
 * Example 1:
 *
 * - Input: m = 3, n = 7
 * - Output: 28
 *
 * Example 2:
 *
 * - Input: m = 3, n = 2
 * - Output: 3
 * - Explanation: From the top-left corner, there are a total of 3 ways to reach
 *   the bottom-right corner:
 *   1. Right -> Down -> Down
 *   2. Down -> Down -> Right
 *   3. Down -> Right -> Down
 *
 * Constraints:
 *
 * - 1 <= m, n <= 100
 */

// @lc code=start

/**
 * Dynamic programming (bottom up). Track number of ways to get to each position
 * which are just the number of ways to get to the position above plus the
 * number of ways to get to the position to the left (b/c the only ways to get
 * to the current position are by moving down or moving right).
 *
 * - Base case: The number of ways to get to the top-left column is 1 b/c we're
 *   already there!
 *
 * - Edge cases: The number of ways to get to any position in the row above the
 *   topmost row is 0, as is the number of ways to get to any position to the
 *   left of the leftmost column. (B/c those positions don't exist.)
 *
 * - Time: O(m*n) b/c visit every position once
 * - Space: O(m*n) b/c we track the number of ways to get to every position (we
 *   can probably improve this b/c there are a fixed number of previous
 *   positions we reference in the recurrance relation)
 *
 * Done in 15 mins, LC submission accepted first try 😊
 *
 * - Your runtime beats 86.03 % of typescript submissions
 * - Your memory usage beats 7.94 % of typescript submissions (41.4 MB)
 *
 * @todo: Optimize space. Don't need to track number of ways to get to every
 * position just the space above and left of the current position.
 */
const uniquePathsDP = (m: number, n: number): number => {
    // Track the number of ways to get to all positions in the matrix. The only
    // way to get to a position in the topmost row is from the position to the
    // left it since there are no positions above so fill the first row with 1s.
    const ways: number[][] = [Array(n).fill(1)];

    // Find the number of ways to get to every position (skipping the first row)
    for (let row = 1; row < m; row++) {
        ways.push([]); // Push a new column array for every row

        for (let col = 0; col < n; col++) {
            let curWays: number;

            // The number of ways to get to any position in the leftmost column
            // is just the number of ways to get to the position above (b/c
            // there are no positions to the left).
            if (!col) curWays = ways[row - 1][col];
            // The number of ways to get to any other position is the number of
            // ways to get to the position above PLUS the position to the left.
            else curWays = ways[row][col - 1] + ways[row - 1][col];

            ways[row].push(curWays);
        }
    }

    // Return the number of ways to get to the bottom-right position
    return ways[m - 1][n - 1];
};

/**
 * Dynamic programming (space optimized). Same as before except we're only
 * keeping track of the number of ways to get to every position above and one
 * position to the left of every other position. (We can do this b/c the
 * recurrence relation only refers to a fixed number of previous states.)
 *
 * - Time: O(m*n) b/c same as before
 * - Space: O(n) b/c storing number of ways to get to every position above
 *
 * LeetCode submission:
 *
 * - Your runtime beats 5.3 % of typescript submissions
 * - Your memory usage beats 98.75 % of typescript submissions (39.8 MB)
 */
const uniquePathsDPSpaceOpt = (m: number, n: number): number => {
    // Track the number of ways to get to the position above and to the left of
    // the current position. The only way to get to a position in the topmost
    // row is from the position to the left of it since there are no positions
    // above so fill the first row with 1s.
    const waysUp: number[] = Array(n).fill(1);
    let waysLeft = 1;
    let waysCur = 1;

    // Find the number of ways to get to every position (skipping the first row)
    for (let row = 1; row < m; row++) {
        for (let col = 0; col < n; col++) {
            // The number of ways to get to any position in the leftmost column
            // is just the number of ways to get to the position above (b/c
            // there are no positions to the left). Update the position left for
            // the next position to the right.
            if (!col) {
                waysCur = waysUp[col];
                waysLeft = waysCur;
            }
            // The number of ways to get to any other position is the number of
            // ways to get to the position above PLUS the position to the left.
            // Update the positions above AND left for the following positions.
            else {
                waysCur = waysUp[col] + waysLeft;
                waysLeft = waysCur;
                waysUp[col] = waysCur;
            }
        }
    }

    return waysCur;
};

// Which function to enable for LC?
const uniquePaths = uniquePathsDPSpaceOpt;

// @lc code=end
export { uniquePaths, uniquePathsDP, uniquePathsDPSpaceOpt };
