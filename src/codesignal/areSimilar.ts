/*
Two arrays are called *similar* if one can be obtained from another by swapping
at most one pair of elements in one of the arrays.

Given two arrays `a` and `b`, check whether they are *similar*.

Example

- For `a = [1, 2, 3]` and `b = [1, 2, 3]`, the output should be\
  `areSimilar(a, b) = true`.

  The arrays are equal, no need to swap any elements.

- For `a = [1, 2, 3]` and `b = [2, 1, 3]`, the output should be\
  `areSimilar(a, b) = true`.

  We can obtain `b` from `a` by swapping `2` and `1` in `b`.

- For `a = [1, 2, 2]` and `b = [2, 1, 1]`, the output should be\
  `areSimilar(a, b) = false`.

  Any swap of any two elements either in `a` or in `b` won't
  make `a` and `b` equal.

Input/Output

- [execution time limit] 5 seconds (ts)

- [input] array.integer a

  Array of integers.

  *Guaranteed constraints:*\
  `3 ≤ a.length ≤ 10^5^`,\
  `1 ≤ a[i] ≤ 1000`.

- [input] array.integer b

  Array of integers of the same length as `a`.

  *Guaranteed constraints:*\
  `b.length = a.length`,\
  `1 ≤ b[i] ≤ 1000`.

- [output] boolean

  `true` if `a` and `b` are similar, `false` otherwise.

https://app.codesignal.com/arcade/intro/level-4/xYXfzQmnhBvEKJwXP
*/

export const areSimilar = (a: number[], b: number[]): boolean => {
    let swapIdx: number = null;
    let swapCt = 0;

    for (let i = 0; i < a.length; i++) {
        // Found mismatch
        if (a[i] !== b[i]) {
            // We've swapped before, but only one swap is allowed
            if (swapCt) {
                return false;
            }

            // Start a swap, record the location
            else if (swapIdx === null) {
                swapIdx = i;
            }

            // End the last swap, verify we could complete it
            else if (b[i] === a[swapIdx] && b[swapIdx] === a[i]) {
                swapIdx === null;
                swapCt++;
            }

            // Can't complete the current swap which means we either can't
            // ever complete it, or we'd have to start another swap when only
            // one is allowed.
            else {
                return false;
            }
        }
    }

    // If we didn't run into any trouble, the lists are similar!
    return true;
};
