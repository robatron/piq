import wordCloud from '../wordCloud';

describe('wordCloud', () => {
    it('counts the occurrences of each word', () => {
        const sentence =
            'After beating the eggs, Dana read the next step: Add milk and eggs, then add flour and sugar. Dana did so. The end.';
        const wordCounts = wordCloud(sentence);
        const wordCountsObj = Object.fromEntries([...wordCounts.entries()]);

        expect(wordCountsObj).toStrictEqual({
            // These words all appear once, and their case is preserved
            After: 1,
            beating: 1,
            did: 1,
            end: 1,
            flour: 1,
            milk: 1,
            next: 1,
            read: 1,
            so: 1,
            step: 1,
            sugar: 1,
            then: 1,

            // These words appear more than once and their case is consistent,
            // so their case is also preserved
            Dana: 2,
            and: 2,
            eggs: 2,

            // These words appear more than once, but their case is
            // inconsistent, so their case defaults to lowercase.
            add: 2,
            the: 3,
        });
    });

    it('handles sentences with inter-word punctuation', () => {
        const sentence =
            "We came, we saw, we conquered...then we ate Bill's (Mille-Feuille) cake. The bill came to five dollars.";
        const wordCounts = wordCloud(sentence);
        const wordCountsObj = Object.fromEntries([...wordCounts.entries()]);

        expect(wordCountsObj).toStrictEqual({
            ate: 1,
            bill: 1,
            cake: 1,
            came: 2,
            conquered: 1,
            dollars: 1,
            five: 1,
            saw: 1,
            The: 1,
            then: 1,
            to: 1,
            we: 4,

            // These words have punctuation in the middle of them
            'Mille-Feuille': 1,
            "Bill's": 1,
        });
    });
});
