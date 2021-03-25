// Calculate the `n`th Fibonacci number iteratively
export const fibIterative = (n: number): number => {
    let a = 0;
    let b = 1;

    if (n === 0) return a;
    if (n === 1) return b;

    for (let i = 2; i <= n; ++i) {
        const s: number = a + b;
        a = b;
        b = s;
    }

    return b;
};

// Calculate the `n`th Fibonacci value recursively
export const fibRecursive = (n: number): number => {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return fibRecursive(n - 1) + fibRecursive(n - 2);
};
