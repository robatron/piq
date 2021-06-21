/*
Given an array of integers, find the highest product you can get from three of
the integers.

The input arrayOfInts will always have at least three integers.
*/

export default (nums: number[]): number => {
    if (nums.length < 3) {
        throw new Error('At least 3 numbers are required');
    }

    // Keep track of the highest and lowest values
    let min = Math.min(nums[0], nums[1]);
    let max = Math.max(nums[0], nums[1]);

    // Keep track of the highest and lowest products of 2
    let minProduct2 = nums[0] * nums[1];
    let maxProduct2 = nums[0] * nums[1];

    // Keep track of the highest product of 3
    let maxProduct3 = nums[0] * nums[1] * nums[2];

    for (let i = 2; i < nums.length; i++) {
        const cur = nums[i];

        // Update the highest product of 3
        maxProduct3 = Math.max(
            maxProduct3,
            cur * minProduct2,
            cur * maxProduct2,
        );

        // Update highest and lowest products of 2
        minProduct2 = Math.min(minProduct2, cur * min, cur * max);
        maxProduct2 = Math.max(maxProduct2, cur * min, cur * max);

        // Update the highest and lowest numbers
        min = Math.min(min, cur);
        max = Math.max(max, cur);
    }

    return maxProduct3;
};
