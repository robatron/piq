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

https://www.interviewcake.com/question/javascript/coin?course=fc1&section=dynamic-programming-recursion
*/

type CoinCombo = number[];
type CoinComboSet = CoinCombo[];

export default class CoinComboer {
    loops = 0;
    memo: Record<string, number[][]> = {};

    // Return all possible coin combos for an amount (iteratively)
    getCoinCombos = (amount: number, coins: number[]): CoinComboSet => {
        // Track all possible combos for every amount from 0 thru amount
        const combos: CoinComboSet[] = Array.from({ length: amount + 1 }).map(
            () => [],
        );

        // Find all combos we can make with each coin for every amount starting
        // at the current coin's value (b/c we can't make any combos with
        // amounts smaller than the current coin)
        coins.forEach((curCoin) => {
            for (let curAmount = curCoin; curAmount <= amount; curAmount++) {
                const remainder = curAmount - curCoin;

                // If there's no remainder, there's only one combo for this
                // amount composed of only this coin
                if (!remainder) {
                    combos[curAmount].push([curCoin]);
                }

                // Otherwise, combos for this amount are just the remainder
                // combos with this coin added to them
                combos[remainder].forEach((remainderCombo) => {
                    combos[curAmount].push(remainderCombo.concat(curCoin));
                });
            }
        });

        // Finally, return the combos for original amount
        return combos[amount];
    };

    // Return all possible coin combos for an amount (recursively)
    getCoinCombosRecursive = (
        amount: number,
        coins: CoinCombo,
    ): CoinComboSet => {
        const combos: CoinComboSet = [];

        // Can't make any combos for an amount smaller than 1 or with no coins
        if (amount <= 0 || !coins.length) {
            return combos;
        }

        // Find all combos for the amount with the given coins
        for (let coinIdx = 0; coinIdx < coins.length; coinIdx++) {
            const curCoin = coins[coinIdx];

            // If the coin is larger than the amount, it can't be part of any
            // combo, so move on to the next coin
            if (curCoin > amount) {
                continue;
            }

            // If the coin is equal to the amount, it is an entire combo on its
            // own, so record it as a combo and move on to the next coin
            if (curCoin === amount) {
                combos.push([curCoin]);
                continue;
            }

            // Otherwise, at least one coin can go into amount. Find how many
            // full coins can fit without going over.
            const coinsFitCount = Math.floor(amount / curCoin);

            // Consider every combination with the current coin repeated n
            // number of times without going over the amount, e.g., if the
            // amount was 3, and the current coin was 1, the coin could appear
            // in the combo 1, 2, or 3 times.
            for (
                let repeatCoinIdx = coinsFitCount;
                repeatCoinIdx > 0;
                repeatCoinIdx--
            ) {
                const repeatCombo = new Array(repeatCoinIdx).fill(curCoin);
                const remainder = amount - curCoin * repeatCoinIdx;

                // If there's no remainder, this coin repeated this number of
                // times is a full combo
                if (remainder === 0) {
                    combos.push(repeatCombo);
                }

                // Otherwise, find any combos with the the remainder and the
                // rest of the coins and combine them with the repeated combo
                else {
                    const restCoins = coins.slice(coinIdx + 1);
                    const restCombos = this.getCoinCombosRecursive(
                        remainder,
                        restCoins,
                    );

                    restCombos.forEach((restCombo) => {
                        combos.push(repeatCombo.concat(restCombo));
                    });
                }
            }
        }

        return combos;
    };
}
