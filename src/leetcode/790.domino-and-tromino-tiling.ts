/*
 * @lc app=leetcode id=790 lang=typescript
 *
 * [790] Domino and Tromino Tiling
 *
 * https://leetcode.com/problems/domino-and-tromino-tiling/description/
 *
 * Medium (41.37%)
 *
 * You have two types of tiles: a 2 x 1 domino shape and a tromino shape. You
 * may rotate these shapes.
 *
 * Given an integer n, return the number of ways to tile an 2 x n board. Since
 * the answer may be very large, return it modulo 10^9 + 7.
 *
 * In a tiling, every square must be covered by a tile. Two tilings are
 * different if and only if there are two 4-directionally adjacent cells on the
 * board such that exactly one of the tilings has both squares occupied by a
 * tile.
 *
 * Example 1:
 *
 * - Input: n = 3
 * - Output: 5
 * - Explanation: The five different ways are show above.
 *
 * Example 2:
 *
 * - Input: n = 1
 * - Output: 1
 *
 * Constraints:
 *
 * - 1 <= n <= 1000
 *
 * Notes:
 *
 * - Tile types:
 *
 *   - 1. Vertical domino (standing up)     |
 *   - 2. Horizontal domino (laying down)   ⎯
 *   - 5. Tromino "L"                       ⎿
 *   - 3. Tromino "R"                       ⎾
 *   - 6. Tromino "reverse 'L'"             ⏌
 *   - 4. Tromino "reverse 'R'"             ⏋
 *
 */

/*
Log:

- Day 1:
  - +30 mins
    - Set up and read problem, take a stab at setting up domino DP array, peek
      at solution
  - +60 mins
    - Study solution and discussions
      - https://leetcode.com/problems/domino-and-tromino-tiling/discuss/116664/Schematic-explanation-of-two-equivalent-DP-recurrence-formula
        - Actually 6 types of tiles: 2 for dominos, and 4 for trominos due to
          rotations
        - "How many ways are there to complete the board where the _final column
          is complete?_" 4 types of tiles can reside in the last, column: 1.
          Domino vert, 2. Domino horiz (paired w/ another horiz domino), 3.
          Tromino "mirrored 'L'", 4. Tromino "mirrored 'r'". (We cannot complete
          the board with the other two tromino rotations b/c they would leave a
          gap either at the top or bottom of the final column)
          - There are d-1 ways for 1, d-2 ways for 2, t-1 ways for 3, and t-1
            ways for 4
        - Good visual to add onto prev discussion:
          https://leetcode.com/problems/domino-and-tromino-tiling/discuss/116612/Easy-to-understand-O(n)-solution-with-Drawing-Picture-Explanation!
  - +60 mins
    - Attempt to remember / define the recurrance relation for a "full board",
      add tile types, from previous reading session
    - Completed recurrance relation with help from
      https://leetcode.com/problems/domino-and-tromino-tiling/discuss/116664/Schematic-explanation-of-two-equivalent-DP-recurrence-formula

- Day 2:
  - +60 mins
    - Rewrite comments for waysFull, write docs for waysOverfull
    - Review solutions to verify comments:
      https://leetcode.com/problems/domino-and-tromino-tiling/solution/,
      https://leetcode.com/problems/domino-and-tromino-tiling/discuss/116612/Easy-to-understand-O(n)-solution-with-Drawing-Picture-Explanation!
  - +60 mins
    - Review, rewrite, define recurrence relation for full and overfull boards
    - Add unit tests, and submit
    - Submission accepted!

- Results:
  - 270 mins over 2 days with lots of solution / discussion studying
    - Should only take me 40 mins for medium problems, so I need to get 6.75x
      faster (easy = 20 mins, medium = 40, hard = 60:
      https://betterprogramming.pub/5-tips-to-beat-the-leetcode-grind-a2388d32cd0)
*/

// @lc code=start
const MOD: number = Math.pow(10, 9) + 7;

/**
 * Dynamic programming (bottom up). Count up all the ways to tile a full and
 * overfull board.
 *
 * - Time: O(n) - Consider every board size
 * - Space: O(n) - Store a count for each board size
 *
 * LeetCode submission:
 *
 * - Your runtime beats 28.57 % of typescript submissions
 * - Your memory usage beats 42.86 % of typescript submissions (41.1 MB)
 */
const numTilings = (boardLen: number): number => {
    // Base cases: There is only one way to tile a 2 x 1 board, with one
    // vertical domino (|), and 2 ways to tile a 2 x 2 board, with two vertical
    // dominos (||) or with two horizontal dominos (==)
    if (boardLen <= 2) return boardLen;

    // Store the number of ways we can tile a 2 x n board *filling every cell*.
    // The last tile(s), occupying all of the final column and (possibly) some
    // or all of the penultimate column, could be one of:
    //
    // 1. One vertical domino (|) - Fills final column
    // 2. Two horizontal dominos (==) - Fills 2 final columns
    // 3. A tromino in the "reverse L" (⏌) or "reverse R" (⏋) orientations -
    //    Fills final column and bottom or top cell of the previous column
    //
    // To find the total number of ways to tile a full board of a given size
    // size, we need to consider the previous number of ways to tile boards of
    // previous sizes b/c we could append ...
    //
    // - ... one vertical domino (|) to the end of every way to tile a full
    //   board of size n-1
    // - ... two stacked horizontal dominos (==) to the end of every way to tile
    //   a full board of size n-2 (b/c they're two columns wide)
    // - ... a tromino to the end of every way to tile an *overfull* board with
    //   an extra top or bottom cell hanging out past the end of size n-2 (to be
    //   defined shortly)
    //
    // So the number of ways to tile a full board of size `n` would be:
    //
    // - waysFull[n] = waysToAddVerticalDomino + waysToAddTwoHorizontalDominos +
    //   waysToAddATromino
    // - waysFull[n] = waysFull[n-1] + waysFull[n-2] + waysOverfull[n-2]
    const waysFull: number[] = Array(boardLen + 1).fill(0);

    // Store the number of ways we can tile a 2 x n board *with one cell hanging
    // out past the end* of the final column. The last tile, occupying one or
    // both of the cells in the final column, could be one of:
    //
    // 1. A tromino in the "L" (⎿) or "R" (⎾) orientation - Fills the entire
    //    final column with a leg or arm hanging out past the end
    // 2. A horizontal domino (⎯) laying in the corner of a tromino (⎿- or ⎾-)
    //
    // To find the total number of ways to tile an overfilled board of a given
    // size, we need to consider the previous number of ways to tile both kinds
    // of boards of previous sizes b/c we could append ...
    //
    // - ... an "L" (⎿) or "R" (⎾) trominto to the end of every way to tile a
    //   *full* board of size n-1
    // - ... a horizontal domino (⎯) to the end of every way to tile an overfull
    //   board of size n-1
    //
    // So the number of ways to tile an overfilled board of size `n` would be:
    //
    // - waysOverfull[n] = waysToAddLTrom + waysToAddRTrom + waysToAddHorizDom
    // - waysOverfull[n] = 2 * waysFull[n-1] + waysOverfull[n-1]
    const waysOverfull: number[] = Array(boardLen + 1).fill(0);

    // Base cases: With a board of 1 column  With a board of size ...
    // - ... 1 column, there's 1 way to tile a full board (with one vertical
    //   domino), and 2 ways tile an overfilled board (with an "L" or "R"
    //   tromino).
    // - ... 2 columns, there're 2 ways to tile a full board with dominos only,
    //   and 4 ways to tile an overfilled board with a vertical domino before
    //   and a horizontal domino after both an "L" and "R" trominos (|⎿, |⎾, ⎿-,
    //   and ⎾-)
    waysFull[1] = 1;
    waysFull[2] = 2;
    waysOverfull[1] = 2;
    waysOverfull[2] = 4;

    // Count up all the ways to fully and overfully tile boards of all sizes
    // above the base cases thru the given board length
    for (let n = 3; n <= boardLen; n++) {
        waysFull[n] =
            (waysFull[n - 1] + waysFull[n - 2] + waysOverfull[n - 2]) % MOD;
        waysOverfull[n] = (2 * waysFull[n - 1] + waysOverfull[n - 1]) % MOD;
    }

    return waysFull[boardLen];
};
// @lc code=end
export { numTilings };
