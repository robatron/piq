/**
 * @lc app=leetcode id=3 lang=typescript
 *
 * [3] Longest Substring Without Repeating Characters
 *
 * https://leetcode.com/problems/longest-substring-without-repeating-characters/
 */

// @lc code=start
const MAX_INPUT_DISPLAY_LENGTH = 10;

const log = (...args) => console.log(...args);
const display = (s: string) =>
    s.length > MAX_INPUT_DISPLAY_LENGTH
        ? s.slice(0, MAX_INPUT_DISPLAY_LENGTH + 1) + '...'
        : s;

// Find the longest substring in O(n) time and O(m) space where n is
// the string length and m is the character set
const lengthOfLongestSubstring = (s: string, debug = false): number => {
    const seen: Map<string, number> = new Map<string, number>();
    let maxLen = 0;
    let startIdx = 0;
    let endIdx = 0;

    while (endIdx < s.length) {
        const char: string = s.charAt(endIdx);
        const seenIdx: number = seen.get(char);

        if (seen.has(char) && seenIdx >= startIdx) {
            maxLen = Math.max(maxLen, endIdx - startIdx);
            startIdx = seenIdx + 1;
        }

        seen.set(char, endIdx);
        endIdx++;
    }

    maxLen = Math.max(maxLen, endIdx - startIdx);

    debug &&
        log(
            '✅',
            `Input: "${display(s)}"`,
            `Result: ${maxLen}`,
            `Loops: ${endIdx}`,
        );

    return maxLen;
};

// @lc code=end

// Older, less efficient solution clearing the whole 'seen' map and moving the
// left pointer back to just after the duplicate. O(2n) time and O(m) space.
const lengthOfLongestSubstringOlder = (s: string, debug = false): number => {
    const seenAt: Map<string, number> = new Map<string, number>();
    let maxSubstrLen = 0;
    let substrStartIdx = 0;
    let loopCt = 0;

    const done = (maxLen: number) => {
        debug &&
            log(
                '💁',
                `Input: "${display(s)}"`,
                `Result: ${maxLen}`,
                `Loops: ${loopCt}`,
            );

        return maxLen;
    };

    if (s.length <= 1) return done(s.length);

    for (let i = 0; i <= s.length; i++) {
        const char: string = s.charAt(i);

        if (seenAt.has(char) || i === s.length) {
            const substrLen: number = i - substrStartIdx;
            maxSubstrLen = Math.max(maxSubstrLen, substrLen);
            const sawIdx: number = seenAt.get(char);

            // log(`Already saw '${char}' at ${sawIdx}!`, {
            //     left: substrStartIdx,
            //     substr: s.slice(substrStartIdx, i),
            //     seenAt: seenAt,
            // });

            substrStartIdx = sawIdx + 1;
            i = sawIdx;
            seenAt.clear();

            // log(`Update: right => ${i}, left => ${substrStartIdx}, seen => {}`);
        } else {
            // log(`Saw '${char}' at ${i}`);
            seenAt.set(char, i);
        }

        loopCt++;
    }

    return done(maxSubstrLen);
};

// Oldest, least efficient solution going back over the whole string - 1 every
// time. O(n^2) time, O(m) space
const lengthOfLongestSubstringOldest = (s: string, debug = false): number => {
    const seenAt: Set<string> = new Set<string>();
    let maxSubstrLen = 0;
    let substrStartIdx = 0;
    let loopCt = 0;

    const done = (maxLen: number) => {
        debug &&
            log(
                '🙅',
                `Input: "${display(s)}"`,
                `Result: ${maxLen}`,
                `Loops: ${loopCt}`,
            );

        return maxLen;
    };

    if (s.length <= 1) return done(s.length);

    for (let i = 0; i <= s.length; i++) {
        const char: string = s.charAt(i);

        if (seenAt.has(char) || i === s.length) {
            const substrLen: number = i - substrStartIdx;
            maxSubstrLen = Math.max(maxSubstrLen, substrLen);

            // console.log({
            //     i,
            //     char,
            //     substrStartIdx,
            //     substring: s.slice(substrStartIdx, i),
            //     seenAt,
            // });

            substrStartIdx += 1;
            i = substrStartIdx - 1;
            seenAt.clear();
        } else {
            // console.log('...', { i, char });
            seenAt.add(char);
        }

        loopCt++;
    }

    return done(maxSubstrLen);
};

export {
    lengthOfLongestSubstring,
    lengthOfLongestSubstringOlder,
    lengthOfLongestSubstringOldest,
    MAX_INPUT_DISPLAY_LENGTH,
};
