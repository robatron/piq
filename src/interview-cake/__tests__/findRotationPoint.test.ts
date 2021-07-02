import findRotationPoint, {
    findRotationPointNaiive,
} from '../findRotationPoint';

describe('findRotationPoint', () => {
    it('finds the rotation point in a list of words', () => {
        const words = [
            'supplant',
            'undulate',
            'xenoepist',
            'asymptote', // <-- rotates here!
            'babka',
            'banoffee',
            'engender',
            'karpatka',
            'othellolagkage',
            'ptolemaic',
            'retrograde',
        ];
        expect(findRotationPointNaiive(words)).toBe(3);
        expect(findRotationPoint(words)).toBe(3);
    });

    it('finds the rotation point in a list of words if they all start with the first letter', () => {
        const words = [
            'asupplant',
            'aundulate',
            'axenoepist',
            'aasymptote', // <-- rotates here!
            'ababka',
            'abanoffee',
            'aengender',
            'akarpatka',
            'aothellolagkage',
            'aptolemaic',
            'aretrograde',
        ];
        expect(findRotationPointNaiive(words)).toBe(3);
        expect(findRotationPoint(words)).toBe(3);
    });

    it('returns the 0th word if the array is not rotated at all', () => {
        const words = [
            'asymptote', // <-- "rotates" here!
            'babka',
            'banoffee',
            'engender',
            'karpatka',
            'othellolagkage',
            'ptolemaic',
            'retrograde',
            'supplant',
            'undulate',
            'xenoepist',
        ];
        expect(findRotationPointNaiive(words)).toBe(0);
        expect(findRotationPoint(words)).toBe(0);
    });

    it('return the only word if the word list contains only one word', () => {
        const words = [
            'asymptote', // <-- "rotates" here!
        ];
        expect(findRotationPointNaiive(words)).toBe(0);
        expect(findRotationPoint(words)).toBe(0);
    });

    it('returns undefined if the list is empty', () => {
        const words = [];
        expect(findRotationPointNaiive(words)).toBeUndefined();
        expect(findRotationPoint(words)).toBeUndefined();
    });
});
