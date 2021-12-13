/**
 * @lc app=leetcode id=276 lang=typescript
 *
 * [276] Paint Fence (PREMIUM)
 *
 * https://leetcode.com/problems/paint-fence/
 *
 * Medium (41.37%)
 *
 * You are painting a fence of `n` posts with `k` different colors. You must
 * paint the posts following these rules:
 *
 * - Every post must be painted *exactly one* color.
 * - There *cannot* be three or more *consecutive posts* with the same color.
 *
 * Given the two integers `n` and `k`, return _the number of ways you can paint
 * the fence_.
 *
 * Example 1:
 *
 * - Input: n = 3, k = 2
 * - Output: 6
 * - Explanation: All the possibilities are shown. (Note that painting all the
 *   posts red or all the posts green is invalid because there cannot be three
 *   posts in a row with the same color.
 *
 * Example 2:
 *
 * - Input: n = 1, k = 1
 * - Output: 1
 *
 * Example 3:
 *
 * - Input: n = 7, k = 2
 * - Output: 42
 *
 * Constraints:
 *
 * - 1 <= n <= 50
 * - 1 <= k <= 105
 * - The testcases are generated such that the answer is in the range [0, 231 -
 *   1] for the given n and k.
 */

// @lc code=start
/**
 * Dynamic programming (bottom-up). Consider each fence post and how many *more*
 * ways there are to paint it than the last two posts.
 *
 * - Time: O(p) - Visit each post once Space:
 * - Space: O(p) - Store the ways to paint a fence of size p
 *
 * LeetCode submission results:
 * - Your runtime beats 9.09 % of typescript submissions
 * - Your memory usage beats 90.91 % of typescript submissions (39.7 MB)
 */
const numWaysDPBU = (posts: number, colors: number): number => {
    // There are no ways to paint a fence of 3+ posts with only 1 color
    if (posts >= 3 && colors === 1) return 0;

    // Number of ways to paint a fence of post count 1 thru `posts`
    const subWays: number[] = Array(posts + 1).fill(0);

    // Base cases: You can paint a fence of 1 post once with every color, and a
    // fence of 2 posts once with every color for every color
    subWays[1] = colors;
    subWays[2] = colors * colors;

    // Consider the remaining fence posts. There are two ways to paint a post:
    //
    // 1. We can always paint this post a different color as the previous post,
    //    so we can paint it (colors - 1) * subWays[p - 1] ways
    // 2. We can paint this post the same color as the previous post (1 way) but
    //    only if the post before it is a different color , so we can paint this
    //    post (colors - 1) * subWays[p - 2]
    //
    // Adding these scenarios together, we get the following ways to paint this
    // post: (colors - 1) * subWays[p - 1] + (colors - 1) * subWays[p - 2];
    for (let p = 3; p <= posts; p++) {
        subWays[p] = (colors - 1) * (subWays[p - 1] + subWays[p - 2]);
    }

    // Return the number of ways to paint the fence
    return subWays[posts];
};

/**
 * Dynamic programming (bottom-up, space optimized). Same as above except only
 * keep ways to paint a fence of previous two post size.
 *
 * - Time: O(p)
 * - Space: O(1)
 *
 * LeetCode submission:
 * - Your runtime beats 54.55 % of typescript submissions
 * - Your memory usage beats 90.91 % of typescript submissions (40.2 MB)
 */
const numWaysStateRedux = (posts: number, colors: number): number => {
    if (posts >= 3 && colors === 1) return 0;

    if (posts === 1) return colors;
    if (posts === 2) return colors * colors;

    let waysBack2: number = colors;
    let waysBack1: number = colors * colors;
    let ways: number;

    for (let p = 3; p <= posts; p++) {
        ways = (colors - 1) * (waysBack1 + waysBack2);
        waysBack2 = waysBack1;
        waysBack1 = ways;
    }

    return ways;
};

const numWays = numWaysStateRedux;
// @lc code=end

export { numWays, numWaysDPBU, numWaysStateRedux };
