import { shuffle, shuffleInPlace } from '../shuffle';

describe('shuffle', () => {
    it('returns a shuffled copy of a list', () => {
        const unshuffled = '7Kh0gz4beN'.split('');
        const shuffled = shuffle(unshuffled);

        expect(shuffled.length).toBe(unshuffled.length);
        unshuffled.forEach((unshuffledItem) => {
            const occurrences = shuffled
                .join('')
                .match(new RegExp(`${unshuffledItem}`, 'g')).length;
            expect(occurrences).toBe(1);
        });
    });
});

describe('shuffleInPlace', () => {
    it('shuffles a list in place', () => {
        const unshuffled = 'abcdefhijk'.split('');
        const shuffled = [...unshuffled];

        shuffleInPlace(shuffled);

        console.log('🚀 shuffled', shuffled);

        expect(shuffled.length).toBe(unshuffled.length);
        unshuffled.forEach((unshuffledItem) => {
            const matches = shuffled
                .join('')
                .match(new RegExp(`${unshuffledItem}`, 'g'));
            const occurrences = (matches && matches.length) || 0;
            expect(occurrences).toBe(1);
        });
    });
});
