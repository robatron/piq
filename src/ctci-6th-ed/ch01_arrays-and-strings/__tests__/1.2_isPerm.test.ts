import { isPerm } from '../1.2_isPerm';

const anagram1 = 'anagram';
const anagram2 = 'nagaram';
const nonPerms = [
    // Same length, not an anagram
    'restful',

    // Different length
    'Homer Simpson',

    // Same length, all of these letters are in anagram1, but not all anagram1
    // letters are in here
    'aannaag',
];

describe('isPerm', () => {
    it('returns true if one string is a permutation of another', () => {
        expect(isPerm(anagram1, anagram2)).toBe(true);
    });

    it('returns false if one string is not a permutation of another', () => {
        nonPerms.forEach((np) => {
            expect(isPerm(anagram1, np)).toBe(false);
        });
    });
});
