/*
Write a function fib() that takes an integer n and returns the nth Fibonacci number.

Let's say our Fibonacci series is 0-indexed and starts with 0. So:

    fib(0);  // => 0
    fib(1);  // => 1
    fib(2);  // => 1
    fib(3);  // => 2
    fib(4);  // => 3
    ...

https://www.interviewcake.com/question/javascript/nth-fibonacci?course=fc1&section=dynamic-programming-recursion
*/
class Fibber {
    memo: Record<number, number> = {};

    fibMemo(n: number): number {
        if (n === 1 || n === 0) {
            return n;
        }

        if (this.memo[n] !== undefined) {
            return this.memo[n];
        }

        const result = this.fibMemo(n - 1) + this.fibMemo(n - 2);

        this.memo[n] = result;

        return result;
    }

    fibIter(n: number): number {
        if (n === 1 || n === 0) {
            return n;
        }

        let a = 0;
        let b = 1;

        for (let i = 2; i <= n; i++) {
            const sum = a + b;
            a = b;
            b = sum;
        }

        return b;
    }
}

export default Fibber;
