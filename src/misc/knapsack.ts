// Traditional recursive knapsack algorithm
export const knapsackRecursive = (
    weights: number[],
    values: number[],
    capacity: number,
    idx = 0,
): number => {
    const weight = weights[idx];
    const val = values[idx];

    // Base cases: we have capacity and items left
    if (capacity <= 0 || idx >= weights.length) {
        return 0;
    }

    // What's the maximum value we can make by including the item (assuming the
    // item can fit) and excluding it?
    const maxValIncl =
        weight <= capacity &&
        val + knapsackRecursive(weights, values, capacity - weight, idx + 1);
    const maxValExcl = knapsackRecursive(weights, values, capacity, idx + 1);

    // Can we make more by including or excluding the item?
    return Math.max(maxValIncl, maxValExcl);
};

// export const knapsackIterative = (
//     weights: number[],
//     values: number[],
//     capacity: number,
// ): number => {
//     let maxVal = -Infinity;
//     const stack = [[], []];

//     for (let i = 0; i < weights.length; i++) {
//         const weight = weights[i];
//         const val = values[i];

//         const valIncl;
//     }
// };
