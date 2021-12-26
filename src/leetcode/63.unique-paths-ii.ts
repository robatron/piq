/**
 * @lc app=leetcode id=63 lang=typescript
 *
 * [63] Unique Paths II
 *
 * https://leetcode.com/problems/unique-paths-ii/description/
 *
 * Medium (36.61%)
 *
 * A robot is located at the top-left corner of a `m x n` grid (marked 'Start'
 * in the diagram below).
 *
 * The robot can only move either down or right at any point in time. The robot
 * is trying to reach the bottom-right corner of the grid (marked 'Finish' in
 * the diagram below).
 *
 * Now consider if some obstacles are added to the grids. How many unique paths
 * would there be?
 *
 * An obstacle and space is marked as `1` and `0` respectively in the grid.
 *
 * Example 1:
 *
 * - Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
 * - Output: 2
 * - Explanation: There is one obstacle in the middle of the 3x3 grid above.
 *   There are two ways to reach the bottom-right corner:
 *   1. Right -> Right -> Down -> Down
 *   2. Down -> Down -> Right -> Right
 *
 * Example 2:
 *
 * - Input: obstacleGrid = [[0,1],[0,0]]
 * - Output: 1
 *
 * Constraints:
 *
 * - m == obstacleGrid.length
 * - n == obstacleGrid[i].length
 * - 1 <= m, n <= 100
 * - obstacleGrid[i][j] is 0 or 1.
 */

// @lc code=start

/**
 * Dynamic programming (bottom up, space optimized). Essentially the same as
 * space-optimized DP solution for "unique paths" (#62) except we're accounting
 * for obstacles now. Time and space complexity is identical.
 *
 * LeetCode submission:
 *
 * - Your runtime beats 83.02 % of typescript submissions
 * - Your memory usage beats 54.72 % of typescript submissions (41.4 MB)
 */
const uniquePathsWithObstacles = (obstacles: number[][]): number => {
    const rowLen: number = obstacles.length;
    const colLen: number = obstacles[0].length;

    // There are no unique paths if there are obstacles in either the stating or
    // ending cell!
    if (obstacles[0][0] || obstacles[rowLen - 1][colLen - 1]) return 0;

    // Track the number of ways to get to every cell in the row above the
    // current cell. Initialize the topmost row:
    // - If there were no obstacles, there would be exactly 1 way to get to each
    //   cell b/c they're either the next cell to the right of another cell, or
    //   the starting cell
    // - If there are obstacles, there are ways to get TO an obstacle cell, but
    //   no ways to get to FROM an obstacle cell, set them to 0 so they're not
    //   included when finding ways to get to another cell. Set all cells to the
    //   right of an obstacle to 0 also b/c the obstacle cell blocks all travel
    //   to them.
    const waysUp: number[] = [];
    obstacles[0].forEach((isObst: number) => {
        const isStartPos = !waysUp.length;
        const areWaysLeft: boolean = isStartPos || !!waysUp[waysUp.length - 1];
        const areWaysHere: boolean = !isObst && areWaysLeft;
        waysUp.push(Number(areWaysHere));
    });

    // Track the number of ways to get to the cell to the left of the current
    // cell and to the current cell itself. The current cell represents the
    // number of ways to get to the final cell in the topmost row.
    let waysHere = waysUp[waysUp.length - 1];
    let waysLeft: number;

    // Find the number of ways to get to every cell starting with row 1 (b/c we
    // already found the number of ways to get to every cell in the topmost row)
    for (let row = 1; row < rowLen; row++) {
        for (let col = 0; col < colLen; col++) {
            // The number of ways to get to this cell includes at least the
            // number of ways to get to the cell above it
            waysHere = waysUp[col];

            // Include the number of ways to get to the cell to the left of this
            // cell as long as we're not in the leftmost column
            if (col) waysHere += waysLeft;

            // Update the number of ways to get to the source cells for the next
            // cell with the number of ways to get to the current cell (or set
            // to 0 if this is an obstacle)
            waysUp[col] = waysLeft = !obstacles[row][col] ? waysHere : 0;
        }
    }

    return waysHere;
};
// @lc code=end
export { uniquePathsWithObstacles };
