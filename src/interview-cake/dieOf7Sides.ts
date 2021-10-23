/*
You have a function rand5() that generates a random integer from 1 to 5. Use it
to write a function rand7() that generates a random integer from 1 to 7.

rand5() returns each integer with equal probability. rand7() must also return
each integer with equal probability.

https://www.interviewcake.com/question/javascript/simulate-7-sided-die?course=fc1&section=combinatorics-probability-math
*/

// Random number from 1 thru 5
const rand5 = (): number => Math.floor(Math.random() * 5) + 1;

// Generate random number from 1 thru 7 using only rand5()
export const dieOf7 = (): number => {
    let side;

    // Roll two 5-sided dice until we get a valid combo that can be
    while (!side) {
        const d1 = rand5();
        const d2 = rand5();

        // Which of the 25 possible 5-sided die combos is this?
        const comboNumber = d1 * 5 - 5 + d2;

        // Of the 25 possible combos, only consider the first 21 combos which we
        // can evenly divide by 7 to get the final side of the 7-sided die!
        if (comboNumber <= 21) {
            side = (comboNumber % 7) + 1;
        }
    }

    return side;
};
