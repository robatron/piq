export type Word = string;
export type Prefix = string | symbol;
export type PrefixTree = Record<Prefix, unknown>;

// Convert a list of words to a prefix tree
export const wordsToPrefixTree = (words: string[]): PrefixTree => {
    const prefixTree = {};

    words.forEach((word) => {
        let treeNode = prefixTree;

        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            const isLastChar = i === word.length - 1;

            if (treeNode[char] === undefined) {
                treeNode[char] = {};
            }

            if (!isLastChar) {
                treeNode = treeNode[char];
            } else {
                treeNode[char] = {};
            }
        }
    });

    return prefixTree;
};

// Convert a prefix tree to a list of words
export const prefixTreeToWords = (tree: PrefixTree): Word[] => {
    const words: Word[] = [];
    const firstPrefixes: Prefix[] = Object.keys(tree);

    // No words to make from an empty prefix tree!
    if (!firstPrefixes.length) {
        return words;
    }

    // Traverse the prefix tree using DFS. The search stack consists of a tuple
    // of a prefix and its tree. The tree root has no prefix itself, so set it
    // to null.
    const ROOT_PREFIX = Symbol('/');
    const searchStack: [Prefix, PrefixTree][] = [[ROOT_PREFIX, tree]];

    // Track the sizes of subwords common to multiple full words
    const subwordSizes: number[] = [];

    // Track the current word as we traverse
    let curWord: Prefix[] = [];

    while (searchStack.length) {
        // Pop the current prefix and its tree, and push the child prefixes and
        // their trees to be searched next
        const [prefix, prefixTree] = searchStack.pop();
        const nextPrefixes = Object.keys(prefixTree);
        const nextPrefixCount = nextPrefixes.length;
        nextPrefixes.forEach((char) => {
            searchStack.push([char, prefixTree[char] as PrefixTree]);
        });

        // The root prefix isn't part of any word
        if (prefix !== ROOT_PREFIX) {
            curWord.push(prefix);

            // If this node has multiple children, the current word so far is
            // part of multiple words. Track this subword size so we know how
            // much to flush when we reach the end of the current word
            if (nextPrefixCount > 1) {
                for (let i = 0; i < nextPrefixCount - 1; i++) {
                    subwordSizes.push(curWord.length);
                }
            }

            // If we've reached the end of the current word, flush it but keep
            // the current common subword
            if (nextPrefixCount === 0) {
                words.push(curWord.join(''));
                const lastSubwordSize = subwordSizes.pop();
                curWord = curWord.slice(
                    0,
                    lastSubwordSize !== undefined ? lastSubwordSize : 0,
                );
            }
        }
    }

    return words;
};
