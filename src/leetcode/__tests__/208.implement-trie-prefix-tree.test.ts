import Trie, { END_OF_WORD } from '../208.implement-trie-prefix-tree';

// Trie trie = new Trie();
// expect(trie.insert('apple')).toBe(undefined);
// expect(trie.search('apple')).toBe(true);
// expect(trie.search('app')).toBe(false);
// expect(trie.startsWith('app')).toBe(true);
// expect(trie.insert('app')).toBe(false);
// expect(trie.search('app')).toBe(true);
test('Example', () => {
    const trie = new Trie();
    const expectedTrie = {
        a: {
            p: {
                p: {
                    l: {
                        e: {
                            [END_OF_WORD]: true,
                        },
                    },
                },
            },
        },
    };
    expect(trie.insert('apple')).toStrictEqual(expectedTrie);
    expect(trie.search('apple')).toBe(true);
    expect(trie.startsWith('apple')).toBe(true);
    expect(trie.search('app')).toBe(false);
    expect(trie.startsWith('app')).toBe(true);

    expectedTrie.a.p.p[END_OF_WORD] = true;
    expect(trie.insert('app')).toStrictEqual(expectedTrie);
    expect(trie.search('app')).toBe(true);

    expectedTrie.a.p['a'] = {
        r: { t: { [END_OF_WORD]: true } },
    };
    expect(trie.insert('apart')).toStrictEqual(expectedTrie);
    expect(trie.search('apart')).toBe(true);
});

test('Submission test', () => {
    const trie = new Trie();
    expect(trie.search('a')).toBe(false);
});
