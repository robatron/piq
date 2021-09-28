/*
You have a function rand7() that generates a random integer from 1 to 7. Use it
to write a function rand5() that generates a random integer from 1 to 5.

rand7() returns each integer with equal probability. rand5() must also return
each integer with equal probability.

https://www.interviewcake.com/question/javascript/simulate-5-sided-die?course=fc1&section=combinatorics-probability-math
*/

// Generate random integer from 1 thru 7
export const rand7 = (): number => Math.floor(Math.random() * 7) + 1;

// Generate a random integer from 1 thru 5 inclusive using only rand7()
export const dieOf5 = (): number => {
    let r = 7;
    while (r > 5) {
        r = rand7();
    }
    return r;
};
