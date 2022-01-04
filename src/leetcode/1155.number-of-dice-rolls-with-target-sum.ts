/*
 * @lc app=leetcode id=1155 lang=typescript
 *
 * [1155] Number of Dice Rolls With Target Sum
 *
 * https://leetcode.com/problems/number-of-dice-rolls-with-target-sum/description/
 *
 * Medium (47.53%)
 *
 * You have `n` dice and each die has `k` faces numbered from `1` to `k`.
 *
 * Given three integers `n`, `k`, and `target`, return the number of possible
 * ways (out of the `k^n` total ways) to roll the dice so the sum of the face-up
 * numbers equals `target`. Since the answer may be too large, return it modulo
 * `10^9 + 7`.
 *
 * Example 1:
 *
 * - Input: n = 1, k = 6, target = 3
 * - Output: 1
 * - Explanation: You throw one die with 6 faces. There is only one way to get a
 *   sum of 3.
 *
 * Example 2:
 *
 * - Input: n = 2, k = 6, target = 7
 * - Output: 6
 * - Explanation: You throw two dice, each with 6 faces. There are 6 ways to get
 *   a sum of 7: 1+6, 2+5, 3+4, 4+3, 5+2, 6+1.
 *
 * Example 3:
 *
 * - Input: n = 30, k = 30, target = 500
 * - Output: 222616187
 * - Explanation: The answer must be returned modulo 10^9 + 7.
 *
 * Constraints:
 *
 * - 1 <= n, k <= 30
 * - 1 <= target <= 1000
 */

/*
Log:

- Day 1:
  - +30 mins
    - Read/set up problem, attempt to fit into DP pattern, look at hint, run out
      of time
  - +30 mins
    - Read discussion forums, try to understand top-down DP solutions
      - Get confused by all the single-char var names in solutions
    - Understand base-case: There is always exactly 1 way to make a target of 0
      regardless of the number of dice: by taking 0 dies
      - Apparenty we don't *have* to roll all the dice? Description unclear
      - Why do all the solutions only init waysToRoll[0][0] = 1 and not
        waysToRoll[0..dieCt][0] = 1 ?
    - Don't understand why solutions always use waysToRoll[dieCt][target] and
      not waysToRoll[target][dieCt] yet, but everyone's doing it that way...
      Maybe it doesn't matter?
    - Done for the day

- day 2 +60 mins
  - Attempt to solve on own again, run out of time
  - Study discussion forums again
  - This explaination clicked:
    https://leetcode.com/problems/number-of-dice-rolls-with-target-sum/discuss/355894/Python-DP-with-memoization-explained
    - Think of iterating thru the sides as the face the current die lands on.
      How many ways can we make this amount by rolling this die on this face?

- day 3 +45 mins
  - Review solution, write comments, experiment w/ refactoring, make sure I
    understand how it works

- Results:
  - 165 mins over 2 days with lots of solution / discussion review
    - Should only take me 40 mins w/ minimal hints for medium problems, so I
      need to get ~4.2x faster on these. (See
      https://betterprogramming.pub/5-tips-to-beat-the-leetcode-grind-a2388d32cd0)
*/

// @lc code=start
const MOD: number = Math.pow(10, 9) + 7;

/**
 * Dynamic programming (bottom up). Build up the number of ways we can roll
 * small target amounts with fewer numbers of dice.
 *
 * - Time: O(s * d * t) - Consider every side of every die for every target
 * - Space: O(d * t) - Store the number of ways we can roll all target amounts
 *   with all dice numbers
 *
 * LeetCode submission:
 *
 * - Your runtime beats 52.94 % of typescript submissions
 * - Your memory usage beats 100 % of typescript submissions (42.4 MB)
 */
const numRollsToTarget = (
    dieCt: number,
    sideCt: number,
    target: number,
): number => {
    // Number of possible ways to make all targets (0 thru target) with all
    // number of dice (0 thru dieCt). E.g., `waysToRoll[t][d]` means "number of
    // ways to roll target `t` with `d` dice"
    const waysToRoll: number[][] = Array(target + 1)
        .fill(null)
        .map(() => Array(dieCt + 1).fill(0));

    // There's one way to make a target of 0 with 0 (or any number of dice): by
    // not using any dice
    waysToRoll[0][0] = 1;

    // For every target amount and number of dice: how many ways are there to
    // roll this target amount with this number of dice?
    for (let a = 1; a <= target; a++) {
        for (let d = 1; d <= dieCt; d++) {
            let waysToRollAmount = 0;

            // Prentend like we're rolling just one of the dies on each side. If
            // the die side value can contribute to this target amount, the ways
            // to roll this amount is just the ways to roll the remaining amount
            // which we've calculated earlier
            for (let s = 1; s <= sideCt; s++) {
                if (s <= a) {
                    const amountRemaining: number = a - s;
                    const waysToRollAmountRemaining: number =
                        waysToRoll[amountRemaining][d - 1];
                    waysToRollAmount += waysToRollAmountRemaining % MOD;
                }
            }

            waysToRoll[a][d] = waysToRollAmount;
        }
    }

    // Return the number of ways we can roll the given dice count to make the
    // target amount
    return waysToRoll[target][dieCt] % MOD;
};
// @lc code=end
export { numRollsToTarget };
