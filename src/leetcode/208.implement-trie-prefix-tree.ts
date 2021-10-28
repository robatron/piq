/**
 * @lc app=leetcode id=208 lang=typescript
 *
 * [208] Implement Trie (Prefix Tree)
 *
 * Medium (55.69%)
 *
 * A `trie` (pronounced as "try") or prefix tree is a tree data structure used
 * to efficiently store and retrieve keys in a dataset of strings. There are
 * various applications of this data structure, such as autocomplete and
 * spellchecker.
 *
 * Implement the Trie class:
 *
 * - `Trie()` Initializes the trie object
 * - `void insert(String word)` Inserts the string `word` into the trie
 * - `boolean search(String word)` - Returns `true` if the string `word` is in
 *   the trie (i.e., was inserted before), and `false` otherwise
 * - `boolean startsWith(String prefix)` - Returns `true` if there is a
 *   previously inserted string `word` that has the prefix `prefix`, and `false`
 *   otherwise.
 *
 * Example:
 *
 *  Input:
 *      ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
 *
 *  Output:
 *      [null, null, true, false, true, null, true]
 *
 *  Explanation:
 *      Trie trie = new Trie();
 *      trie.insert("apple");
 *      trie.search("apple");   // return True
 *      trie.search("app");     // return False
 *      trie.startsWith("app"); // return True
 *      trie.insert("app");
 *      trie.search("app");     // return True
 *
 * Constraints:
 *
 * - `1 <= word.length, prefix.length <= 2000`
 * - `word` and `prefix` consist only of lowercase English letters
 * - At most `3 * 10^4` calls in total will be made to `insert`, `search`, and
 *   `startsWith`.
 *
 * https://leetcode.com/problems/implement-trie-prefix-tree/description/
 */

// @lc code=start
const END_OF_WORD = 'EoW';

type TrieNode = Record<string, unknown>;

class Trie {
    head: TrieNode = {};

    // Walk the trie following the given word and return the final node. If a
    // we hit a dead end in the path, return null by default, or optionally
    // construct the path as needed.
    private _walk(word: string, trailBlaze = false): TrieNode {
        let i = 0;
        let curTrieNode: TrieNode = this.head;

        while (i < word.length) {
            const curChar: string = word.charAt(i);
            let nextTrieNode: TrieNode;

            if (curTrieNode[curChar]) {
                nextTrieNode = curTrieNode[curChar] as TrieNode;
            } else if (trailBlaze) {
                nextTrieNode = {};
                curTrieNode[curChar] = nextTrieNode;
            } else {
                return null;
            }

            curTrieNode = nextTrieNode;
            i++;
        }

        return curTrieNode;
    }

    // Insert a new word into the trie
    insert = (word: string): TrieNode => {
        const tail: TrieNode = this._walk(word, true);
        tail[END_OF_WORD] = true;
        return this.head;
    };

    // Find an existing word in the trie
    search = (word: string): boolean => {
        const tail: TrieNode = this._walk(word);
        return Boolean(tail && tail[END_OF_WORD]);
    };

    // Find a prefix in the trie
    startsWith = (prefix: string): boolean => Boolean(this._walk(prefix));
}
// @lc code=end

export default Trie;
export { END_OF_WORD };
