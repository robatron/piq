/**
 * @lc app=leetcode id=43 lang=typescript
 *
 * [43] Multiply Strings
 *
 * https://leetcode.com/problems/multiply-strings/description/
 *
 * Medium (36.17%)
 *
 * Given two non-negative integers num1 and num2 represented as strings, return
 * the product of num1 and num2, also represented as a string.
 *
 * Note: You must not use any built-in BigInteger library or convert the inputs
 * to integer directly.
 *
 * Example 1:
 *
 * - Input:  num1 = "2", num2 = "3"
 * - Output: "6"
 *
 * Example 2:
 *
 * - Input:  num1 = "123", num2 = "456"
 * - Output: "56088"
 *
 * Constraints:
 *
 * - 1 <= num1.length, num2.length <= 200
 * - num1 and num2 consist of digits only.
 * - Both num1 and num2 do not contain any leading zero, except the number 0
 */

// @lc code=start
/** Convert a single digit represented as a string to a number */
const digitToNum = (d: string): number => d.charCodeAt(0) - '0'.charCodeAt(0);

/** Return the product of two numbers represented as strings */
const multiply = (num1: string, num2: string): string => {
    if ([num1[0], num2[0]].includes('0')) return '0';

    // Store partial products to be added together later
    const partialProducts: number[][] = [];

    for (let i1 = num1.length - 1; i1 >= 0; i1--) {
        const d1: number = digitToNum(num1[i1]);
        const place1: number = num1.length - 1 - i1;
        const partProd: number[] = new Array(place1 + 1).fill(0);

        for (let i2 = num2.length - 1; i2 >= 0; i2--) {
            const d2: number = digitToNum(num2[i2]);
            const place2: number = num2.length - 1 - i2 + place1;
            const partProdCarry: number = partProd[place2];
            const digitProduct: number = d1 * d2 + partProdCarry;
            const tensDigit: number = Math.floor(digitProduct / 10);
            const onesDigit: number = digitProduct - tensDigit * 10;

            partProd[place2] = onesDigit;
            if (i2 || tensDigit > 0) partProd.push(tensDigit);
        }

        partialProducts.push(partProd);
    }

    const finalProduct: number[] = [];
    let digitsRemain = true;
    let place = 0;

    while (digitsRemain) {
        digitsRemain = false;

        for (let i = 0; i < partialProducts.length; i++) {
            const partProd: number[] = partialProducts[i];

            if (place < partProd.length) {
                const digit = partProd[place];

                if (place >= finalProduct.length) {
                    finalProduct.push(digit);
                } else {
                    finalProduct[place] += digit;
                }

                digitsRemain = true;
            }
        }

        if (digitsRemain) {
            const placeSum = finalProduct[place];
            const placeSumTens = Math.floor(placeSum / 10);
            const placeSumOnes = placeSum - placeSumTens * 10;

            finalProduct[place] = placeSumOnes;

            if (placeSumTens) finalProduct.push(placeSumTens);
        }

        place++;
    }

    return finalProduct.reverse().join('');
};

// @lc code=end
export { digitToNum, multiply };
