/*
Your quirky boss collects rare, old coins...

They found out you're a programmer and asked you to solve something they've been
wondering for a long time.

Write a function that, given:

    1. an amount of money
    2. a list of coin denominations

computes the number of ways to make the amount of money with coins of the
available denominations.

Example: for amount=4 (4¢) and denominations=[1,2,3] (1¢, 2¢ and 3¢), your
program would output 4 — the number of ways to make 4¢ with those
denominations:

    1. 1¢, 1¢, 1¢, 1¢
    2. 1¢, 1¢, 2¢
    3. 1¢, 3¢
    4. 2¢, 2¢

Pseudocode:

    def number_of_ways(amount, denominations):
        answer = 0
        for each denomination in denominations:
            for each num_times_to_use_denomination in \
                    possible_num_times_to_use_denomination_without_overshooting_amount:
                answer += number_of_ways(amount_remaining, other_denominations)
        return answer

https://www.interviewcake.com/question/python/coin
*/

export const coinCombosForAmount = (
    amount: number,
    coins: number[],
): number[][] => {
    const combos: number[][] = [];

    // Consider each coin in the set
    for (let coinIdx = 0; coinIdx < coins.length; coinIdx++) {
        const curCoin = coins[coinIdx];

        // If the coin is larger than the amount, it can't be part of any combo,
        // so move on to the next coin
        if (curCoin > amount) {
            break;
        }

        // If the coin is equal to the amount, it is an entire combo on its own.
        // Record it as a combo, and move on to the next coin.
        if (curCoin === amount) {
            combos.push([curCoin]);
            break;
        }

        // Otherwise, at least one coin can go into amount. Let's see how many
        // full coins can fit without going over.
        const coinsFitCount = Math.floor(amount / curCoin);

        // Consider every combination with the current coin repeated n number of
        // times without going over the amount, e.g., if the amount was 3, and
        // the current coin was 1, the coin could appear 1, 2, or 3 times.
        for (
            let repeatCoinIdx = coinsFitCount;
            repeatCoinIdx > 0;
            repeatCoinIdx--
        ) {
            const partialCombo = new Array(repeatCoinIdx);
            partialCombo.fill(curCoin);

            const restCombos = coinCombosForAmount(
                amount - curCoin * repeatCoinIdx,
                coins.slice(coinIdx + 1),
            );

            if (restCombos.length) {
                restCombos.forEach((restCombo) => {
                    combos.push([...partialCombo, ...restCombo]);
                });
            } else {
                combos.push(partialCombo);
            }
        }
    }

    return combos;
};
