import { shuffle, shuffleInPlace } from '../shuffle';

describe('shuffle', () => {
    it('returns a shuffled copy of a list', () => {
        const list = '7dmrwmAll9gXiRTmDvkGr7CUKgktH6F7mrK8ybMdOPxtI'.split('');
        const listBackup = [...list];
        const shuffled = shuffle(list);

        // Original list should not be modified
        expect(list).toStrictEqual(listBackup);

        // Shuffled list should be in a different order than the original (Note:
        // it's possible to be in the same order, but it's very unlikely)
        expect(shuffled).not.toStrictEqual(list);

        // The shuffled list should contain the same items and be the same
        // size as the original list
        expect(list.sort()).toStrictEqual(shuffled.sort());
    });
});

describe('shuffleInPlace', () => {
    it('shuffles a list in place', () => {
        const list = 'ETYzELYCjO27G758C8PjSXn5tsoo46gHJd8BHqzzYb6br'.split('');
        const listBackup = [...list];

        shuffleInPlace(list);
        console.log('🚀 shuffled', list);

        // Original list SHOULD be modified and be in a different order than the
        // original (Note: it's possible to be in the same order, but it's very
        // unlikely)
        expect(list).not.toStrictEqual(listBackup);

        // The shuffled list should contain the same items and be the same size
        // as the original
        expect(list.sort()).toStrictEqual(listBackup.sort());
    });
});
