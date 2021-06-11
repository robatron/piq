import inFlightEntertainment, {
    inFlightEntertainmentPairsNaiive,
} from '../inFlightEntertainment';

describe('inFlightEntertainmentPairs', () => {
    it('returns all pairs of runtimes that exactly equal the flight time', () => {
        const flightTime = 10;
        const movieRuntimes = [5, 5, 4, 6, 3, 7];
        expect(
            inFlightEntertainmentPairsNaiive(flightTime, movieRuntimes),
        ).toStrictEqual([
            [5, 5],
            [4, 6],
            [3, 7],
        ]);
    });

    it('returns undefined if no pairs of runtimes equal the flight time', () => {
        const flightTime = 10;
        const movieRuntimes = [1, 2, 3, 4, 5];
        expect(
            inFlightEntertainmentPairsNaiive(flightTime, movieRuntimes),
        ).toBeUndefined();
    });
});

describe('inFlightEntertainment', () => {
    it('returns true if there is at least one pair of runtimes that equal the flight time', () => {
        const flightTime = 10;
        const movieRuntimes = [5, 5, 1, 2, 3];
        expect(inFlightEntertainment(flightTime, movieRuntimes)).toBe(true);
    });

    it('returns false if there are no pairs of runtimes that equal the flight time', () => {
        const flightTime = 10;
        const movieRuntimes = [1, 2, 3, 4];
        expect(inFlightEntertainment(flightTime, movieRuntimes)).toBe(false);
    });

    it('only counts each runtime once', () => {
        const flightTime = 10;
        const movieRuntimes = [5, 2, 3, 4, 1];
        expect(inFlightEntertainment(flightTime, movieRuntimes)).toBe(false);
    });
});
