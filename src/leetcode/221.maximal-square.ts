/**
 * @lc app=leetcode id=221 lang=typescript
 *
 * [221] Maximal Square
 *
 * https://leetcode.com/problems/maximal-square/description/
 *
 * Medium (41.27%)
 *
 * Given an m x n binary matrix filled with 0's and 1's, find the largest
 * square containing only 1's and return its area.
 *
 * Example 1:
 *
 * - Input: [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
 * - Output: 4
 *
 * Example 2:
 *
 * - Input: [["0","1"],["1","0"]]
 * - Output: 1
 *
 * Example 3:
 *
 * - Input: [["0"]]
 * - Output: 0
 *
 * Constraints:
 *
 * - m == matrix.length
 * - n == matrix[i].length
 * - 1 <= m, n <= 300
 * - matrix[i][j] is '0' or '1'.
 */

// @lc code=start

/**
 * Brute-force: Find the area of the largest square of continuous 1s by visiting
 * every position and when the top-left corner of a square is found, see how
 * large the square is by traversing to the bottom and left, updating the max
 * area for every successful test.
 *
 * - Time: O((mn)^2) - m*n to visit every position, and m*n for every position
 *   if all others are 1
 * - Space: O(1) - No additional data structures used
 */
const maxSquareBF = (matrix: string[][]): number => {
    let maxArea = 0;

    // Return true if given position is "1", false if anything else or
    // coordinates out-of-bounds
    const is1 = (row: number, col: number) =>
        row < matrix.length &&
        col < matrix[row].length &&
        matrix[row][col] === '1';

    // Returns true if given position is "1", and all positions above and to the
    // left (based on prospective square edge length) are also "1"
    const isPartOfSquare = (row: number, col: number, edgeLen: number) => {
        for (let i = 0; i < edgeLen; i++) {
            if (!is1(row - i, col) || !is1(row, col - i)) return false;
        }
        return true;
    };

    // Visit every position and look for continuous squares of 1s
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            let subRow: number = row;
            let subCol: number = col;
            let edgeLen = 1;

            // If the current position is part a square, continually update the
            // max square area as we find more of the same continuous square
            while (isPartOfSquare(subRow, subCol, edgeLen)) {
                const area = (subRow + 1 - row) * (subCol + 1 - col);
                maxArea = Math.max(maxArea, area);

                subRow++;
                subCol++;
                edgeLen++;
            }
        }
    }

    return maxArea;
};

/**
 * Dynamic programming. Consider every submatrix from size 1*1 to m*n keeping
 * track of the largest possible square we can make at each position.
 *
 * Time: O(m*n) - Visit each position only once
 * Space: O(m*n) - Track max square length per position
 */
const maxSquareDP = (matrix: string[][]): number => {
    // Largest square length encountered so far
    let maxLen = 0;

    // Store the max square lengths of each submatrix at the bottom-right index
    const maxLens: number[][] = [];

    // Consider every bottom-right index of every submatrix
    for (let row = 0; row < matrix.length; row++) {
        maxLens.push([]);

        for (let col = 0; col < matrix[row].length; col++) {
            let curLen = 0;

            // If we find a 1, this position is (at least) part of a square!
            if (matrix[row][col] === '1') {
                curLen++;

                // As long as positions to the left, top-left, and top exist,
                // add the smallest max square length (which may be 0) to get
                // the total max square length for this position.
                if (row > 0 && col > 0) {
                    const left: number = maxLens[row][col - 1];
                    const upLeft: number = maxLens[row - 1][col - 1];
                    const right: number = maxLens[row - 1][col];

                    curLen += Math.min(left, upLeft, right);
                }
            }

            // Record this new local max square length and update the global
            // max length if necessary
            maxLens[row].push(curLen);
            maxLen = Math.max(maxLen, curLen);
        }
    }

    // Return the area of the max square length
    return maxLen * maxLen;
};

// Which algorithm should we "enable" for LeetCode?
const maximalSquare = maxSquareDP;
// @lc code=end

export { maximalSquare, maxSquareBF, maxSquareDP };
