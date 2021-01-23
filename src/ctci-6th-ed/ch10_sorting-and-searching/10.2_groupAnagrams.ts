/**
 * 10.2 - Group Anagrams
 *
 * Write a method to sort an array of strings so that all the anagrams are next
 * to each other
 */

/**
 * Detect if two strings are anagrams. Case insensitive. Ignores spaces.
 */
export const areAnagrams = (strA: string, strB: string): boolean => {
    // Drop both strings to lowercase and strip whitespace
    const normStrA = strA.toLowerCase().replace(/\s/g, '');
    const normStrB = strB.toLowerCase().replace(/\s/g, '');

    // Keep track of the character counts of each string. The index will be the
    // character code of the letter, and the value will be the count.
    const charCountA: Array<number> = [];
    const charCountB: Array<number> = [];

    // If the strings aren't the same length, we know it's not an anagram
    if (normStrA.length !== normStrB.length) {
        return false;
    }

    // Count up all letters in both strings
    for (let i = 0; i < normStrA.length; i++) {
        const charA = normStrA[i];
        const charB = normStrB[i];

        const charCodeA = charA.charCodeAt(0);
        const charCodeB = charB.charCodeAt(0);

        if (charCountA[charCodeA]) {
            charCountA[charCodeA]++;
        } else {
            charCountA[charCodeA] = 1;
        }

        if (charCountB[charCodeB]) {
            charCountB[charCodeB]++;
        } else {
            charCountB[charCodeB] = 1;
        }
    }

    // If the character counts are identical between both strings, the strings
    // are anagrams of each other
    return charCountA.every((itemA, i) => itemA === charCountB[i]);
};

export const groupAnagrams = (strList: Array<string> = []): void => {
    // Nothing to do if there are 2 or fewer elements
    if (strList.length <= 2) {
        return;
    }

    for (let curIdx = 0; curIdx < strList.length; curIdx++) {
        const curStr = strList[curIdx];

        for (let runIdx = curIdx + 1; runIdx < strList.length; runIdx++) {
            const runStr = strList[runIdx];

            if (areAnagrams(curStr, runStr)) {
                // Unless the items are already next to each other, swap the
                // runner item with the item immediately to the right of the
                // anagram group
                if (runIdx - curIdx > 1) {
                    const tmp = strList[curIdx + 1];
                    strList[curIdx + 1] = runStr;
                    strList[runIdx] = tmp;
                }
                curIdx++;
            }
        }
    }
};
