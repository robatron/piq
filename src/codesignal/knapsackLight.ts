const knapsackLight = (
    v1: number,
    w1: number,
    v2: number,
    w2: number,
    capacity: number,
): number => knapsackRecursive([w1, w2], [v1, v2], capacity);

// Traditional recursive knapsack algorithm
const knapsackRecursive = (
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
