/*
 * @lc app=leetcode id=983 lang=typescript
 *
 * [983] Minimum Cost For Tickets
 *
 * https://leetcode.com/problems/minimum-cost-for-tickets/description/
 *
 * Medium (63.36%)
 *
 * You have planned some train traveling one year in advance. The days of the
 * year in which you will travel are given as an integer array days. Each day is
 * an integer from 1 to 365.
 *
 * Train tickets are sold in three different ways:
 *
 * - a 1-day pass is sold for costs[0] dollars,
 * - a 7-day pass is sold for costs[1] dollars, and
 * - a 30-day pass is sold for costs[2] dollars.
 *
 * The passes allow that many days of consecutive travel.
 *
 * For example, if we get a 7-day pass on day 2, then we can travel for 7 days:
 * 2, 3, 4, 5, 6, 7, and 8.
 *
 * Return the minimum number of dollars you need to travel every day in the
 * given list of days.
 *
 * Example 1:
 *
 * - Input: days = [1,4,6,7,8,20], costs = [2,7,15]
 * - Output: 11
 * - Explanation: For example, here is one way to buy passes that lets you
 *   travel your travel plan:
 *   - On day 1, you bought a 1-day pass for costs[0] = $2, which covered day 1.
 *   - On day 3, you bought a 7-day pass for costs[1] = $7, which covered days
 *     3, 4, ..., 9.
 *   - On day 20, you bought a 1-day pass for costs[0] = $2, which covered day
 *     20.
 *   - In total, you spent $11 and covered all the days of your travel.
 *
 * Example 2:
 *
 * - Input: days = [1,2,3,4,5,6,7,8,9,10,30,31], costs = [2,7,15]
 * - Output: 17
 * - Explanation: For example, here is one way to buy passes that lets you
 *   travel your travel plan:
 *   - On day 1, you bought a 30-day pass for costs[2] = $15 which covered days
 *     1, 2, ..., 30.
 *   - On day 31, you bought a 1-day pass for costs[0] = $2 which covered day
 *     31.
 *   - In total, you spent $17 and covered all the days of your travel.
 *
 * Constraints:
 *
 * - 1 <= days.length <= 365
 * - 1 <= days[i] <= 365
 * - days is in strictly increasing order.
 * - costs.length == 3
 * - 1 <= costs[i] <= 1000
 */

/*
Log:

- Day 1:
  - +60 mins
    - Set up / review problem
    - Set up DP storage for bottom-up approach w/ base cases
    - (>30 mins) Peek at solution and discussions
      - There are travel and non-travel days
      - For non-travel days, the cost is the same as the previous day
      - Q&A:
        - Do we need to buy a pass today? If buying a pass, which pass should we
          buy? If we buy a n-day pass, cost is for the n-day pass, plus cost to
          travel remaining days.
        - How do we choose which pass to buy? The cheapest of:
          - 1-day pass + cheapest way to travel starting next day
          - 7-day pass + cheapest way to travel starting 8 days later
          - 30-day pass + cheapest way to travel starting 31 days later

- Day 2:
  - +90 mins
    - Reviewed problem, tackled with knowledge from yesterday
    - Solved, refactored

- Results:
  - 150 mins over 2 days with some light solution / discussion studying
    - Should only take me 40 mins for medium problems, so I need to get 3.75x
      faster (easy = 20 mins, medium = 40, hard = 60:
      https://betterprogramming.pub/5-tips-to-beat-the-leetcode-grind-a2388d32cd0)
*/

// @lc code=start

/**
 * Dynamic programming (bottom-up). Find the cheapest way to travel starting on
 * each day of the travel plan starting on the last day and expanding to the
 * first.
 *
 * - Time: O(365 * 3) = O(1) - Considering each pass cost for every travel day
 * - Space: O(365 * 2) = O(1) - Storing the cheapest way to travel starting each
 *   day in the travel plan
 *
 * LeetCode submission:
 *
 * - Your runtime beats 40 % of typescript submissions
 * - Your memory usage beats 10 % of typescript submissions (44.8 MB)
 */
const PASS_DAYS: number[] = [1, 7, 30];

const mincostTickets = (travelDays: number[], passCosts: number[]): number => {
    // Pre-calculated travel day details including a O(1) access set of the
    // travel days for reference
    const travelDayFirst: number = travelDays[0];
    const travelDayLast: number = travelDays[travelDays.length - 1];
    const travelDaySet: Set<number> = new Set(travelDays);

    // Cheapest way to travel starting on each calendar day encompassing all
    // travel days. (Note: We could make this more efficient by storing the
    // cheapest ways to travel only on the travel days, but this is already
    // constant space and would make the recurrence relation more complex, so
    // probably not worth it right now)
    const minTravelCost: number[] = new Array(travelDayLast + 1).fill(0);

    // Find the cheapest way to travel starting on each calendar day starting on
    // the last day and moving backwards thru the 1st
    for (let d = travelDayLast; d >= travelDayFirst; d--) {
        // How much would it cost to buy each pass today considering the
        // cheapest cost to travel the remaining days after the pass expires (if
        // there are any)?
        const validPassCosts: number[] = PASS_DAYS.map((daysCovered, i) => {
            const passCost: number = passCosts[i];
            const nextTravelDay: number = d + Number(daysCovered);
            const nextTravelCost: number =
                nextTravelDay < minTravelCost.length
                    ? minTravelCost[nextTravelDay]
                    : 0;
            return passCost + nextTravelCost;
        });

        // We can also choose not to buy any pass if this is a non-travel day,
        // in which case it would cost the cheapest way to travel starting the
        // next day
        if (!travelDaySet.has(d)) validPassCosts.push(minTravelCost[d + 1]);

        // What's the cheapest option today?
        minTravelCost[d] = Math.min(...validPassCosts);
    }

    // Return the cheapest way to execute travel plan starting on the first
    // travel day
    return minTravelCost[travelDayFirst];
};
// @lc code=end
export { mincostTickets };
