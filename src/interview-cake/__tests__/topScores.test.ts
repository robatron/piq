import topScores from '../topScores';

describe('topScores', () => {
    it('sorts a list of scores assuming a high score limit', () => {
        const unsortedScores = [37, 89, 41, 65, 91, 53];
        const highestPossibleScore = 100;

        expect(topScores(unsortedScores, highestPossibleScore)).toStrictEqual([
            91,
            89,
            65,
            53,
            41,
            37,
        ]);
    });

    it('throws out scores above the highest possible score', () => {
        const unsortedScores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const highestPossibleScore = 5;

        expect(topScores(unsortedScores, highestPossibleScore)).toStrictEqual([
            5,
            4,
            3,
            2,
            1,
            0,
        ]);
    });
});
