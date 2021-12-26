/**
 * @lc app=leetcode id=64 lang=typescript
 *
 * [64] Minimum Path Sum
 *
 * https://leetcode.com/problems/minimum-path-sum/description/
 *
 * Medium (58.18%)
 *
 * Given a m x n grid filled with non-negative numbers, find a path from top
 * left to bottom right, which minimizes the sum of all numbers along its path.
 *
 * Note: You can only move either down or right at any point in time.
 *
 * Example 1:
 *
 * - Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
 * - Output: 7
 * - Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.
 *
 * Example 2:
 *
 * - Input: grid = [[1,2,3],[4,5,6]]
 * - Output: 12
 *
 * Constraints:
 *
 * - m == grid.length
 * - n == grid[i].length
 * - 1 <= m, n <= 200
 * - 0 <= grid[i][j] <= 100
 */

// @lc code=start
/**
 * Dynamic programming (bottom up). Find and track the minimum sum for each
 * cell. Note:
 *
 * - Time: O(m*n) - Visit every cell in the grid once
 * - Space: O(m*n) - Store the minimum sum for every cell. Note: We could
 *   optimize by only storing the min sums for every cell in the row above and
 *   one cell to the left of the current cell as we did for the "space
 *   optimized" solution in #62.
 *
 * LeetCode submission:
 *
 * - Your runtime beats 52.94 % of typescript submissions
 * - Your memory usage beats 8.82 % of typescript submissions (45.4 MB)
 */
const minPathSum = (grid: number[][]): number => {
    const rowCt: number = grid.length;
    const colCt: number = grid[0].length;

    // Min path sum for every cell
    const minSums: number[][] = [];

    for (let row = 0; row < rowCt; row++) {
        minSums.push([]);

        for (let col = 0; col < colCt; col++) {
            const cellVal: number = grid[row][col];
            const sumUp = row > 0 ? minSums[row - 1][col] : null;
            const sumLeft = col > 0 ? minSums[row][col - 1] : null;
            const sums: number[] = [sumUp, sumLeft].filter((s) => s !== null);
            const minSum: number = sums.length > 0 ? Math.min(...sums) : 0;

            minSums[row].push(cellVal + minSum);
        }
    }

    return minSums[rowCt - 1][colCt - 1];
};
// @lc code=end
export { minPathSum };
