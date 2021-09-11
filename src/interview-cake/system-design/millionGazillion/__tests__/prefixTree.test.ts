import { prefixTreeToWords, wordsToPrefixTree } from '../prefixTree';
import { SIMPSONS_NAMES, SIMPSONS_NAMES_PREFIX_TREE } from './simpsonsNames';

describe('wordsToPrefixTree', () => {
    it('converts words to a prefix tree object', () => {
        const actual = wordsToPrefixTree([...SIMPSONS_NAMES].sort());
        const expctd = SIMPSONS_NAMES_PREFIX_TREE;
        expect(actual).toStrictEqual(expctd);
    });

    it('creates an empty prefix tree for an empty word list', () => {
        const actual = wordsToPrefixTree([]);
        const expctd = {};
        expect(actual).toStrictEqual(expctd);
    });
});

describe('prefixTreeToWords', () => {
    it('converts a prefix tree object to words', () => {
        const actual = prefixTreeToWords(SIMPSONS_NAMES_PREFIX_TREE).sort();
        const expctd = [...SIMPSONS_NAMES].sort();
        expect(actual).toStrictEqual(expctd);
    });

    it('creates an empty word list for an empty prefix tree', () => {
        const actual = prefixTreeToWords({});
        const expctd = [];
        expect(actual).toStrictEqual(expctd);
    });
});
