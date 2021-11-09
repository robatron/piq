const DIGITS = new Set(
    Array(10)
        .fill(null)
        .map((_, i) => i.toString()),
);

const isDigit = (char: string): boolean => DIGITS.has(char);

export { isDigit };
