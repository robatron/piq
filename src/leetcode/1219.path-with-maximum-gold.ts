/*
 * @lc app=leetcode id=1219 lang=typescript
 *
 * [1219] Path with Maximum Gold
 *
 * https://leetcode.com/problems/path-with-maximum-gold/description/
 *
 * Medium (66.07%)
 *
 * In a gold mine grid of size m x n, each cell in this mine has an integer
 * representing the amount of gold in that cell, 0 if it is empty.
 *
 * Return the maximum amount of gold you can collect under the conditions:
 *
 * - Every time you are located in a cell you will collect all the gold in that
 *   cell.
 * - From your position, you can walk one step to the left, right, up, or down.
 * - You can't visit the same cell more than once.
 * - Never visit a cell with 0 gold.
 * - You can start and stop collecting gold from any position in the grid that
 *   has some gold.
 *
 * Example 1:
 *
 * - Input: grid = [[0,6,0],[5,8,7],[0,9,0]]
 * - Output: 24
 * - Explanation:
 *   - [[0,6,0],
 *   - ⁠[5,8,7],
 *   - ⁠[0,9,0]]
 *   - Path to get the maximum gold, 9 -> 8 -> 7.
 *
 * Example 2:
 *
 * - Input: grid = [[1,0,7],[2,0,6],[3,4,5],[0,3,0],[9,0,20]]
 * - Output: 28
 * - Explanation:
 *   - [[1,0,7],
 *   - ⁠[2,0,6],
 *   - ⁠[3,4,5],
 *   - ⁠[0,3,0],
 *   - ⁠[9,0,20]]
 *   - Path to get the maximum gold, 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7.
 *
 * Constraints:
 *
 * - m == grid.length
 * - n == grid[i].length
 * - 1 <= m, n <= 15
 * - 0 <= grid[i][j] <= 100
 * - There are at most 25 cells containing gold.
 */

// @lc code=start
type Cell = [number, number];
type Grid = number[][];

// Find the path with the highest total value using DFS starting from a cell
const getMaxGoldFromCell = (grid: number[][], [row, col]: Cell): number => {
    const ROWS: number = grid.length;
    const COLS: number = grid[0].length;

    // Value of this cell. Consider it 0 if it's out of bounds.
    const val =
        row >= 0 && row < ROWS && col >= 0 && col < COLS ? grid[row][col] : 0;

    // Base case: Nothing else to do if this cell has no value
    if (!val) return 0;

    // Copy the grid and clear the cell value (so it's not visited again)
    const newGrid: Grid = grid.map((row) => [...row]);
    newGrid[row][col] = 0;

    // Find the adjacent path with the highest total value
    let maxPathVal = 0;
    const adjacentCells: Cell[] = [
        [row - 1, col], // North
        [row + 1, col], // South
        [row, col + 1], // East
        [row, col - 1], // West
    ];
    adjacentCells.forEach((adjCell: Cell) => {
        const pathVal: number = getMaxGoldFromCell(newGrid, adjCell);
        if (pathVal > maxPathVal) maxPathVal = pathVal;
    });

    // Return the cell value + the max value starting from the max neighbor
    return val + maxPathVal;
};

/**
 * Recursive DFS. Find the max total gold we can collect starting from any cell
 * by using recursive DFS to check every path from every cell.
 *
 * - Time: O(n * m * 3 ^ 25) to start at every cell then check 3^25 cells
 * - Space: O(n^2 * m^2) copy the entire grid every node
 */
const getMaximumGold = (grid: number[][]): number => {
    const ROWS: number = grid.length;
    const COLS: number = grid[0].length;

    let maxVal = 0;

    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const pathVal: number = getMaxGoldFromCell(grid, [r, c]);
            if (pathVal > maxVal) maxVal = pathVal;
        }
    }

    return maxVal;
};
// @lc code=end
export { getMaximumGold };
