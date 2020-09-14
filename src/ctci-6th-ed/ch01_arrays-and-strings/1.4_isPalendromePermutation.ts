/**
 * 1.4 - Palindrome Permutation
 *
 * Given a string, write a function to check if it is a permutation of a
 * palindrome. A palindrome is a word or phrase that is the same forwards and
 * backwards. A permutation is a rearrangement of letters. The palindrome does
 * not need to be limited to just dictionary words.
 *
 * Example:
 *
 *  Input:  Tact Coa
 *  Output: True (permutations: "taco cat", "atco cta", etc.)
 */
export const isPalendromePermutation = (target: string): boolean => {
    // Make all characters lower case, remove all non-word characters, and
    // convert to array
    const tgt = target.toLowerCase().replace(/\W+/gi, '').split('');

    // Always consider 0 and 1 character strings symmetric
    if ([0, 1].includes(tgt.length)) {
        return true;
    }

    // Keep track of each character and how often they occur
    const charCount = tgt.reduce((accum, char) => {
        accum[char] = accum[char] ? accum[char] + 1 : 1;
        return accum;
    }, {});
    const charCounts: number[] = Object.values(charCount);

    // If the target string length is even, all character counts must also be
    // even, e.g., "anna": a = 2, n = 2
    if (tgt.length % 2 === 0) {
        for (let i = 0; i < charCounts.length; ++i) {
            if (charCounts[i] % 2 !== 0) {
                return false;
            }
        }
        return true;
    }

    // If the target string length is odd, all character counts except one must
    // be even, and exactly one must be odd, e.g., "racecar": r = 2, a = 2, c =
    // 2, e = 1
    else {
        let hasOddCount = false;
        for (let i = 0; i < charCounts.length; ++i) {
            if (charCounts[i] % 2 !== 0) {
                // If this is the first odd count, note it and move on
                if (!hasOddCount) {
                    hasOddCount = true;
                    continue;
                }

                // If there's already been an odd count, this isn't a
                // valid palindrome
                return false;
            }
        }

        // We should end up with all even counts, and exactly one odd count
        if (hasOddCount) {
            return true;
        }
    }

    // Otherwise, it fails all rules, so return false
    return false;
};
