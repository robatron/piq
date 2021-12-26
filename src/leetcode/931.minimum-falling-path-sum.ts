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
 * - Space: O(n^2) - Store a value for every space. Note: We could optimize
 *   space by only keeping the previous row of min sums b/c our recurrance
 *   refers to a fixed number of states (prev col, this col, and next col of
 *   previous row).
 */
const minFallingPathSum = (matrix: number[][]): number => {
    const size: number = matrix.length;

    // Only one falling path if the matrix only has one cell
    if (size === 1) return matrix[0][0];

    // Store the min sum to fall to each cell in the matrix. We can initialize
    // the cells in the topmost row since we already know the min sum to fall to
    // them is just their values in the matrix.
    const minSums: number[][] = Array(size)
        .fill(0)
        .map((_, rowIdx) => [...matrix[rowIdx]]);

    // Find the min sum to fall to every cell after the topmost row
    for (let row = 1; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const val: number = matrix[row][col];
            const minSumsUp: number[] = minSums[row - 1];

            // The possible sums to fall to this cell are the sums of this cell
            // value and the min sums of the cells we can fall from for each. We
            // can only fall from 3 cells above this one: the cell above,
            // up-left, and up-right. Create an array of these sums if possible.
            const cellSums: number[] = [col - 1, col, col + 1]
                .map((c) => c >= 0 && c <= size - 1 && val + minSumsUp[c])
                .filter((sum) => sum);

            // The min sum to fall to this cell is just the smallest of the
            // possible sums
            minSums[row][col] = Math.min(...cellSums);
        }
    }

    // Return the smallest sum in the final row
    return Math.min(...minSums[size - 1]);
};
// @lc code=end
export { minFallingPathSum };
