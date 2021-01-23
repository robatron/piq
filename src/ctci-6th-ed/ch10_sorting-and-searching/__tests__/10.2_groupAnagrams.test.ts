import { groupAnagrams, areAnagrams } from '../10.2_groupAnagrams';

describe('isAnagram', () => {
    it("fails if strings aren't the same length", () => {
        const strA = 'abc';
        const strB = 'abcd';
        expect(areAnagrams(strA, strB)).toStrictEqual(false);
    });

    it('fails if strings are not anagrams', () => {
        expect(areAnagrams('a', 'i')).toStrictEqual(false);
        expect(areAnagrams('on', 'to')).toStrictEqual(false);
        expect(areAnagrams('see', 'car')).toStrictEqual(false);
        expect(areAnagrams('fore', 'pear')).toStrictEqual(false);
        expect(areAnagrams('where', 'latte')).toStrictEqual(false);
    });

    it('detects anagrams', () => {
        expect(areAnagrams('a', 'a')).toStrictEqual(true);
        expect(areAnagrams('on', 'no')).toStrictEqual(true);
        expect(areAnagrams('arc', 'car')).toStrictEqual(true);
        expect(areAnagrams('reap', 'pear')).toStrictEqual(true);
        expect(areAnagrams('elbow', 'below')).toStrictEqual(true);
    });

    it('ignores case', () => {
        expect(areAnagrams('a', 'A')).toStrictEqual(true);
        expect(areAnagrams('on', 'No')).toStrictEqual(true);
        expect(areAnagrams('arc', 'cAr')).toStrictEqual(true);
        expect(areAnagrams('reap', 'peaR')).toStrictEqual(true);
        expect(areAnagrams('elbow', 'bElOw')).toStrictEqual(true);
    });

    it('ignores spaces', () => {
        expect(areAnagrams('Funeral', 'Real fun')).toStrictEqual(true);
        expect(areAnagrams('The eyes', 'They see')).toStrictEqual(true);
        expect(areAnagrams('Dormitory', 'Dirty room')).toStrictEqual(true);
        expect(areAnagrams('Conversation', 'Voices rant on')).toStrictEqual(
            true,
        );
        expect(areAnagrams('The morse code', 'Here come dots')).toStrictEqual(
            true,
        );
    });
});

describe('groupAnagrams', () => {
    describe('base cases', () => {
        it('returns an empty list for an empty list', () => {
            const list = [];

            groupAnagrams(list);

            expect(list).toStrictEqual([]);
        });

        it('returns a copy of the original list if there is only one element', () => {
            const list = ['abc'];

            groupAnagrams(list);

            expect(list).toStrictEqual(['abc']);
        });

        it('returns a copy of the original list if there are only 2 elements', () => {
            const list = ['abc', 'def'];

            groupAnagrams(list);

            expect(list).toStrictEqual(['abc', 'def']);
        });
    });

    it('puts anagrams next to each other', () => {
        const testStrList = [
            'a',
            'arc',
            'below',
            'car',
            'no',
            'reap',
            'on',
            'pear',
            'elbow',
        ];
        const expected = [
            'a',
            'arc',
            'car',
            'below',
            'elbow',
            'reap',
            'pear',
            'on',
            'no',
        ];

        groupAnagrams(testStrList);

        expect(testStrList).toStrictEqual(expected);
    });
});
