/*
 * @lc app=leetcode id=97 lang=typescript
 *
 * [97] Interleaving String
 *
 * https://leetcode.com/problems/interleaving-string/description/
 *
 * Medium (34.11%)
 *
 * Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of
 * s1 and s2.
 *
 * An interleaving of two strings s and t is a configuration where they are
 * divided into non-empty substrings such that:
 *
 * - s = s1 + s2 + ... + sn
 * - t = t1 + t2 + ... + tm
 * - |n - m| <= 1
 * - The interleaving is s1 + t1 + s2 + t2 + s3 + t3 + ... or t1 + s1 + t2 + s2
 *   + t3 + s3 + ...
 *
 * Note: a + b is the concatenation of strings a and b.
 *
 * Example 1:
 *
 * - Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
 * - Output: true
 *
 * Example 2:
 *
 * - Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
 * - Output: false
 *
 * Example 3:
 *
 * - Input: s1 = "", s2 = "", s3 = ""
 * - Output: true
 *
 * Constraints:
 *
 * - 0 <= s1.length, s2.length <= 100
 * - 0 <= s3.length <= 200
 * - s1, s2, and s3 consist of lowercase English letters.
 *
 * Follow up: Could you solve it using only O(s2.length) additional memory
 * space?
 */

/*
Log:

- D1 +60 mins
  - The difference in string sizes can be at most 1
  - What're the base cases? The s3 size must be the sum of the sizes of s1 and
    s2. There are other base cases...
  - What questions? For every substring of unknown size in s3, how do we decide
    its size, and how do we decide from which string to take it?
  - Stuck after 30 mins, looking at solution / discussions
    - Cur chars and remaining chars can be interleaved to form s3?
    - Solution for 2D dynamic programming is helpful, but confusing. Don't quite
      understand. Looking to discussions
    - Making sense:
      - We could use recursive backtracking to find if "the current chars and
        the rest of the strings are valid", but that would take exponential time
        b/c we'd be calling the function twice for every char in s3.
      - We can sidestep this issue by making a 2D grid to show there's a valid
        path from the beginning to the end. "Dead ends" are recorded but
        ignored.

- D1 +60 mins
  - Drew out examples, created tests
  - Solution that doesn't quite work
  - Brain totally fried

- D2 +90 mins
  - Review code written yesterday, re-diagram, tweak solution, still not working
  - Review solutions / discussions
  - Realizing we're looking at a sliding window in s3, not just "the next one"
  - Still don't understand the relationship between a match in s1 and a look
    back in s2 and viceversa
  - Helpful explaination and diagram:
    https://leetcode.com/problems/interleaving-string/discuss/31901/C%2B%2B-dp-solution-with-explanation
  - Fog is clearing re: why we need to also match the opposite string in the
    previous state with the current match: For every state, we're asking: "Does
    the c1 match c3? If so, we need to also know if the previous c2 also
    interleaves" but why can't we consider the previous c1 on c1 matches? I
    don't even know how to ask the question...
  - Brain fried; Need a break

- D2 +60 mins
  - Study solution and discussion:
    https://leetcode.com/problems/interleaving-string/solution/,
    https://leetcode.com/problems/interleaving-string/discuss/31901/C%2B%2B-dp-solution-with-explanation
  - Walk through both and implement solution (basically copied)
  - Feel like I understand, but don't think I could come up with it on my own
  - Review, comment, document (slightly more clear how it works now)
  - Submit to LC, failing test, fix test, done

- Results:
  - 270 mins over 2 days with lots of solution / discussion studying
    - Should only take me 40 mins for medium problems, so I need to get 6.75x
      faster (easy = 20 mins, medium = 40, hard = 60:
      https://betterprogramming.pub/5-tips-to-beat-the-leetcode-grind-a2388d32cd0)
  - Difficult to understand solutions even when reading them directly
  - Finally basically copied the solution(s) to finish
  - Very difficult to verbalize or explain problem and how solutions worked.
    Started understanding better when I could verbalize problem and solution
    components clearly.
*/

/*
Notes:

                                                  s1  s2   s1 s2 s1
s1 = aabcc, s2 = dbbca, s3 = aadbbcbcac --> ans = aa  dbbc bc a  c

s1 = rows, s2 = columns

    _       d       b           b               c               a                   Looking for:
_   1       0       0           0               0               0                   _ a a d b b
a   (a)     0       0           0               0               0                   a a d b b c
a   (aa)    (aa)d   (aa)db      (aa)dbb         (aa)dbbc        0                   a d b b c b
b   0       (aab)   (aab)b      0               (aab)bc(b)      0                   d b b c b c
c   0       0       (aab)b(c)   (aab)b(c)b      (aab)b(c)b(c)   (aab)b(c)b(c)a      b b c b c a
c   0       0       0           (aab)b(c)b(c)   0               (aab)b(c)b(c)a(c)   b c b c a c
*/

// @lc code=start

/**
 * Dynamic programming (bottom-up). Find if all prefixes of s1 and s2 can
 * interleave to create all prefixes of s3 (of s1 + s2 prefix lengths).
 *
 * - Time: O(n1 * n2) Consider every char in s2 for every char in s1
 * - Space: O(n1 * n2) Store if every prefix of s1 and s2 is valid
 *
 * LeetCode submission:
 *
 * - Your runtime beats 50 % of typescript submissions
 * - Your memory usage beats 25 % of typescript submissions (42.5 MB)
 */
function isInterleave(s1: string, s2: string, s3: string): boolean {
    const n1: number = s1.length;
    const n2: number = s2.length;
    const n3: number = s3.length;

    // The sum of the sizes of s1 & s2 must at least add up to the size of s3 in
    // order to form s3 by interleaving s1 and s2!
    if (n1 + n2 !== n3) return false;

    if (!n1) return s2 === s3;
    if (!n2) return s1 === s3;

    // Paths for matching prefixes of all sizes of s1 and s2 to all prefixes of
    // s3. I.e., validPaths[l1][l2] means "can we use the prefix of s1 of size
    // l1 and the prefix s2 of size l2 to create the prefix of s3 of size l1 +
    // l2?"
    const prefixes: boolean[][] = Array(n1 + 1)
        .fill(null)
        .map(() => Array(n2 + 1).fill(false));

    // Empty prefixes of s1 and s2 match the empty prefix of s3
    prefixes[0][0] = true;

    // Find all matching prefixes for s1 if s2 were blank and vice versa
    for (let l1 = 1; l1 <= n1; l1++) {
        prefixes[l1][0] = prefixes[l1 - 1][0] && s1[l1 - 1] === s3[l1 - 1];
    }
    for (let l2 = 1; l2 <= n2; l2++) {
        prefixes[0][l2] = prefixes[0][l2 - 1] && s2[l2 - 1] === s3[l2 - 1];
    }

    // Find if all other prefixes of s1 and s2 can interleave to create all
    // prefixes of s3. As we grow each prefix by one character:
    //
    // 1. Does the new character in the expanded prefix match the new character
    //    in the the corresponding prefix of s3?
    // 2. Does the expanded prefix one char smaller also interleave with the
    //    other prefix of the same size to create the corresponding smaller
    //    prefix of s3?
    //
    // If the answer to both of these questions is true, we can interleave the
    // new expanded prefix with the prefix of the same size to create the
    // corresponding prefix of s3!
    for (let l1 = 1; l1 <= n1; l1++) {
        for (let l2 = 1; l2 <= n2; l2++) {
            const c1: string = s1[l1 - 1];
            const c2: string = s2[l2 - 1];
            const c3: string = s3[l1 + l2 - 1];

            const c1Match = c1 === c3;
            const c2Match = c2 === c3;

            const prevP1Valid: boolean = prefixes[l1 - 1][l2];
            const prevP2Valid: boolean = prefixes[l1][l2 - 1];

            prefixes[l1][l2] =
                (c1Match && prevP1Valid) || (c2Match && prevP2Valid);
        }
    }

    // Return if the full prefixes of s1 and s2 can interleave to create the
    // full prefix of s3 ("full prefix" == "original string")
    return prefixes[n1][n2];
}
// @lc code=end
export { isInterleave };
