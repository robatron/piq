// Given some integer, find the maximal number you can obtain by deleting
// exactly one digit of the given number NUMERICALLY. Why not do this with
// string type conversions? B/c type conversions and string manipulation are
// more expensive.
const deleteDigit = (n: number): number => {
    let largestNum = 0;

    // "Select" the target digit by progressing through the powers of 10 until
    // the multiplier is larger than
    for (let mult = 1; mult < n; mult *= 10) {
        // Capture amount to left of target digit minus 1's place, eg,
        // place=2: 12[3]45 => 1200
        const left: number = Math.floor(n / (mult * 10)) * mult;

        // Capture amount to right of target digit, eg,
        // place=2: 12[3]45 => 12345 - 12300 = 45
        const right: number = n % mult;

        // Add left and right amounts together to "delete" target digit, eg,
        // place=2: 1200 + 45
        const amount: number = left + right;

        // Update largest number
        largestNum = Math.max(largestNum, amount);
    }

    return largestNum;
};

const deleteDigitLame = (n: number): number => {
    const digits: string = n + '';
    let largest: number = parseInt(digits.slice(1));

    for (let i = 1; i < digits.length; i++) {
        const cur: number = parseInt(digits.slice(0, i) + digits.slice(i + 1));
        largest = Math.max(largest, cur);
    }

    return largest;
};

export { deleteDigit, deleteDigitLame };
