/**
 * @lc app=leetcode id=461 lang=typescript
 *
 * [461] Hamming Distance
 *
 * https://leetcode.com/problems/hamming-distance/description/
 *
 * Easy (73.65%)
 *
 * The Hamming distance between two integers is the number of positions at which
 * the corresponding bits are different.
 *
 * Given two integers x and y, return the Hamming distance between them.
 *
 * Example 1:
 *
 * - Input: x = 1, y = 4
 * - Output: 2
 * - Explanation:
 *
 *       1   (0 0 0 1)
 *       4   (0 1 0 0) ⁠
 *              ↑   ↑
 *
 *   The above arrows point to positions where the corresponding bits are
 *   different.
 *
 * Example 2:
 *
 * - Input: x = 3, y = 1
 * - Output: 1
 *
 * Constraints:
 *
 * - 0 <= x, y <= 2^31 - 1
 */

// @lc code=start
const hammingDistance = (x: number, y: number): number => {
    // Bitwise XOR both numbers which first converts them to 32-bit integers
    // expressed in binary, then XORs each bit to produce the result in decimal
    let XORdec: number = x ^ y;

    // Track the number of 1s that would be in the XOR result if it were
    // converted to binary
    let hamDist = 0;

    while (XORdec > 0) {
        hamDist = hamDist + (XORdec % 2);
        XORdec = Math.floor(XORdec / 2);
    }

    return hamDist;
};

// @lc code=end
export { hammingDistance };
