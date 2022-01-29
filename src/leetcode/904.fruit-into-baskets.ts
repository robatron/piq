/*
 * @lc app=leetcode id=904 lang=typescript
 *
 * [904] Fruit Into Baskets
 *
 * https://leetcode.com/problems/fruit-into-baskets/description/
 *
 * Medium (43.10%)
 *
 * You are visiting a farm that has a single row of fruit trees arranged from
 * left to right. The trees are represented by an integer array fruits where
 * fruits[i] is the type of fruit the i^th tree produces.
 *
 * You want to collect as much fruit as possible. However, the owner has some
 * strict rules that you must follow:
 *
 * You only have two baskets, and each basket can only hold a single type of
 * fruit. There is no limit on the amount of fruit each basket can hold.
 * Starting from any tree of your choice, you must pick exactly one fruit from
 * every tree (including the start tree) while moving to the right. The picked
 * fruits must fit in one of your baskets. Once you reach a tree with fruit that
 * cannot fit in your baskets, you must stop.
 *
 * Given the integer array fruits, **return the maximum number of fruits you can
 * pick.**
 *
 * Example 1:
 *
 * - Input: fruits = [1,2,1]
 * - Output: 3
 * - Explanation: We can pick from all 3 trees.
 *
 * Example 2:
 *
 * - Input: fruits = [0,1,2,2]
 * - Output: 3
 * - Explanation: We can pick from trees [1,2,2].
 *   - If we had started at the first tree, we would only pick from trees [0,1].
 *
 * Example 3:
 *
 * - Input: fruits = [1,2,3,2,2]
 * - Output: 4
 * - Explanation: We can pick from trees [2,3,2,2].
 *   - If we had started at the first tree, we would only pick from trees [1,2].
 *
 * Constraints:
 *
 * - 1 <= fruits.length <= 10^5
 * - 0 <= fruits[i] < fruits.length
 */

/*
Log:

- D1 +30 mins
  - Reviewed a couple discussions 20 mins in, realized brain was fried, not
    worth continuing today

- D2 +30 +30 +30 +25 = +115 mins
  - Re-read description, go to discussion right away b/c already spent 30 mins
    yesterday, look for hints
  - This hint makes sense, going to try it: "Find the maxium sliding window that
    only contains 2 numbers ... if size is bigger than 2, left pointer starts to
    shrink". Credit:
    https://leetcode.com/problems/fruit-into-baskets/discuss/171954/Java-Very-simple-solution-few-lines-Time-O(n)-Space-O(1)/1042749
  - Felt like I knew how to solve after reading above hint, but took ~60-90 mins
    to implement myself. What took so long? Ironing out the details. I never
    felt "stuck" this time.
  - Running into a failing LeetCode submission test, but brain is burned out.
    Need a break.

- D3 +30 +20 +30 = +80 mins
  - Understand there's an issue w/ updating the most-recent first tree, but
    can't figure out how to fix it in time. Looking up solutions.
  - Attempting new approach based on this solution tracking the highest index of
    each fruit type:
    https://leetcode.com/problems/fruit-into-baskets/discuss/170808/Java-Longest-Subarray-with-atmost-2-Distinct-elements
  - Break time
  - Got it!
  - Nvm, failing LC submission test :-(
  - Error: First fruit tree not necessarily the one we need to delete when
    encountering a new fruit
  - Brain fried; done for the day

- D4 +30 mins
  - Fix, cleanup, submit

- Results:
  - 255 mins over 4 days. Medium problems should take me 40 mins, so I need to
    be 6.4x faster
  - Want to clean up more, but *must* practice moving with imperfect solutions

Notes:

- Question reworded: "What is the length of longest subarray that contains up to
  two distinct integers?" Credit:
  https://leetcode.com/problems/fruit-into-baskets/discuss/170765/Another-poorly-worded-question/201467
*/

// @lc code=start

/**
 * Find the max number of fruits we can pick from adjacent trees with at most 2
 * types of fruits. Use a sliding window solution based on Kadane's algorithm,
 * i.e., end of window continually expands by 1 while the start of the window
 * shrinks as needed.
 *
 * - Time: O(n) - Only consider every tree once
 * - Space: O(1) - Store a constant number of variables independent of the
 *   number of fruit trees
 *
 * LC submission:
 *
 * - Your runtime beats 25 % of typescript submissions
 * - Your memory usage beats 7.5 % of typescript submissions
 */
const totalFruit = (fruits: number[]): number => {
    const N: number = fruits.length;

    // A row of 1 or 2 fruit trees can produce either 1 or 2 distinct fruits, so
    // the max fruits we can pick is also either 1 or 2
    if (N <= 2) return N;

    // The current types of fruits in our baskets, and the most recent tree we
    // picked them from. Start by picking the fruit from the first tree.
    const basketFruits: Map<number, number> = new Map();
    basketFruits.set(fruits[0], 0);

    // The start tree of the current window, starting with the first tree
    let startTree = 0;

    // The number of fruits picked in the current window, starting with the
    // first fruit we just picked
    let curFruitsPicked = 1;

    // The largest number of fruits picked in any window, starting with the
    // fruit we just picked
    let maxFruitsPicked = 1;

    // Find the largest sliding window of trees that contain only 2 fruit types
    for (let endTree = 1; endTree < N; endTree++) {
        const curFruit: number = fruits[endTree];

        // Pick the current fruit if we have room, i.e., we have a free basket
        // OR a basket already containing this kind of fruit
        if (basketFruits.size < 2 || basketFruits.has(curFruit)) {
            basketFruits.set(curFruit, endTree);
            curFruitsPicked++;
        }

        // Otherwise there's no room for this fruit. Dump the basket with the
        // fruit we're displacing with this fruit
        else {
            // Find the fruit to dump (the fruit *not* next to the new fruit)
            const prevFruit: number = fruits[endTree - 1];
            let dumpFruit: number;

            for (const [fruit] of basketFruits) {
                if (fruit !== prevFruit) dumpFruit = fruit;
            }

            // The new start tree will be one to the right of the fruit we just
            // dumped
            startTree = basketFruits.get(dumpFruit) + 1;

            basketFruits.set(curFruit, endTree);
            basketFruits.delete(dumpFruit);

            // Update the number of fruits picked with the current window size
            curFruitsPicked = endTree - startTree + 1;
        }

        // Update the max fruits picked
        maxFruitsPicked = Math.max(maxFruitsPicked, curFruitsPicked);
    }

    // Return the largest number of fruits we picked in any window
    return maxFruitsPicked;
};
// @lc code=end
export { totalFruit };
