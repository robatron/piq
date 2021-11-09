/**
 * @lc app=leetcode id=989 lang=typescript
 *
 * [989] Add to Array-Form of Integer
 *
 * https://leetcode.com/problems/add-to-array-form-of-integer/description/
 *
 * Easy (45.11%)
 *
 * The **array-form** of an integer `num` is an array representing its digits in left
 * to right order.
 *
 * - For example, for `num = 1321`, the array form is `[1,3,2,1]`.
 *
 * Given `num`, the **array-form** of an integer, and an integer `k`, _return the
 * **array-form** of the integer `num + k`_.
 *
 * Example 1:
 *
 * - Input: num = [1,2,0,0], k = 34
 * - Output: [1,2,3,4]
 * - Explanation: 1200 + 34 = 1234
 *
 * Example 2:
 *
 * - Input: num = [2,7,4], k = 181
 * - Output: [4,5,5]
 * - Explanation: 274 + 181 = 455
 *
 * Example 3:
 *
 * - Input: num = [2,1,5], k = 806
 * - Output: [1,0,2,1]
 * - Explanation: 215 + 806 = 1021
 *
 * Example 4:
 *
 * - Input: num = [9,9,9,9,9,9,9,9,9,9], k = 1
 * - Output: [1,0,0,0,0,0,0,0,0,0,0]
 * - Explanation: 9999999999 + 1 = 10000000000
 *
 * Constraints:
 *
 * - 1 <= num.length <= 10^4
 * - 0 <= num[i] <= 9
 * - num does not contain any leading zeros except for the zero itself.
 * - 1 <= k <= 10^4
 */

// @lc code=start

/** Convert an integer to an array of digits, LSD first */
const intToRevArrForm = (int: number): number[] => {
    if (int === 0) return [0];

    const digits: number[] = [];
    let remainder: number = int;

    while (remainder >= 1) {
        const digit: number = remainder % 10;
        digits.push(digit);
        remainder = Math.floor(remainder / 10);
    }

    return digits;
};

/** Add an integer `k` to an array of digits, MSD first */
const addToArrayForm = (num: number[], k: number): number[] => {
    const revNum: number[] = [...num].reverse();
    const revAns: number[] = intToRevArrForm(k);
    const maxLen: number = Math.max(revAns.length, revNum.length);

    for (let place = 0; place < maxLen; place++) {
        if (place >= revAns.length) revAns.push(0);
        if (place >= revNum.length) revNum.push(0);

        const isLastPlace: boolean = place < maxLen - 1;
        const prevCarry: number = revAns[place];
        const digit: number = revNum[place];

        const sum: number = digit + prevCarry;
        const carry: number = Math.floor(sum / 10);
        const rmndr: number = sum % 10;

        revAns[place] = rmndr;
        if (isLastPlace || carry) {
            const nextPlace = place + 1;
            if (nextPlace < revAns.length) revAns[nextPlace] += carry;
            else revAns.push(carry);
        }
    }

    return revAns.reverse();
};
// @lc code=end
export { addToArrayForm, intToRevArrForm };
