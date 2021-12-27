/**
 * @lc app=leetcode id=931 lang=typescript
 *
 * [931] Minimum Falling Path Sum
 *
 * https://leetcode.com/problems/minimum-falling-path-sum/description/
 *
 * Medium (65.96%)
 *
 * Given an `n x n` array of integers `matrix`, return the minimum sum of any
 * falling path through `matrix`.
 *
 * A falling path starts at any element in the first row and chooses the element
 * in the next row that is either directly below or diagonally left/right.
 * Specifically, the next element from position `(row, col)` will be `(row + 1,
 * col - 1)`, `(row + 1, col)`, or `(row + 1, col + 1)`.
 *
 * Example 1:
 *
 * - Input: matrix = [[2,1,3],[6,5,4],[7,8,9]]
 * - Output: 13
 * - Explanation: There are two falling paths with a minimum sum as shown.
 *
 * Example 2:
 *
 * - Input: matrix = [[-19,57],[-40,-5]]
 * - Output: -59
 * - Explanation: The falling path with a minimum sum is shown.
 *
 * Constraints:
 *
 * - n == matrix.length == matrix[i].length
 * - 1 <= n <= 100
 * - -100 <= matrix[i][j] <= 100
 */

// @lc code=start

/**
 * Dynamic programming (bottom up). Find and track the minimum falling sum to
 * each cell and return the minimum falling sum of the cells in the bottom row.
 *
 * - Time: O(n^2) - Visit every cell
 * - Space: O(n) - Store the min sum for cells in the previous and current row
 */
const minFallingPathSum = (matrix: number[][]): number => {
    const size: number = matrix.length;
    const isColValid = (col) => col >= 0 && col <= size - 1;

    // Only one falling path if the matrix only has one cell
    if (size === 1) return matrix[0][0];

    // Store the min sum to fall to each cell in the current and previous rows.
    // We'll start on the topmost row as the previous row and initialize the
    // cell with the values in the matrix
    let minSumsPrevRow: number[] = [...matrix[0]];
    let minSumsCurRow: number[];

    // Find the min sum to fall to every cell after the topmost row
    for (let row = 1; row < size; row++) {
        minSumsCurRow = [];

        for (let col = 0; col < size; col++) {
            const val: number = matrix[row][col];

            // The possible sums to fall to this cell are the sums of this cell
            // value and the min sums of the cells we can fall from for each. We
            // can only fall from up to 3 cells above this one: the cell above,
            // up-left, and up-right.
            const cellSums: number[] = [col - 1, col, col + 1]
                .map((c) => (isColValid(c) ? val + minSumsPrevRow[c] : null))
                .filter((sum) => sum !== null);

            // The min sum to fall to this cell is just the smallest of the
            // possible sums
            minSumsCurRow.push(Math.min(...cellSums));
        }

        minSumsPrevRow = [...minSumsCurRow];
    }

    // Return the smallest sum in the final row
    return Math.min(...minSumsCurRow);
};
// @lc code=end
export { minFallingPathSum };
