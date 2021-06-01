/*
You created a game that is more popular than Angry Birds.

Each round, players receive a score between 0 and 100, which you use to rank
them from highest to lowest. So far you're using an algorithm that sorts in
O(n lg n) time, but players are complaining that their rankings aren't
updated fast enough. You need a faster sorting algorithm.

Write a method that takes:

    1. an array of `unsortedScores`
    2., the `highestPossibleScore` in the game

and returns a sorted array of scores in less than O(n lg n) time.

For example:

    int[] unsortedScores = {37, 89, 41, 65, 91, 53};
    final int HIGHEST_POSSIBLE_SCORE = 100;

    int[] sortedScores = sortScores(unsortedScores, HIGHEST_POSSIBLE_SCORE);
    // sortedScores: [91, 89, 65, 53, 41, 37]

We’re defining `n` as the number of unsortedScores because we’re expecting
the number of players to keep climbing.

And, we'll treat `highestPossibleScore` as a constant instead of factoring it into
our big O time and space costs because the highest possible score isn’t going to
change. Even if we do redesign the game a little, the scores will stay around
the same order of magnitude.

https://www.interviewcake.com/question/java/top-scores
*/
export default (
    unsortedScores: number[],
    highestPossibleScore: number,
): number[] => {
    const scoreCounts: number[] = new Array(highestPossibleScore + 1);
    const sortedScores: number[] = [];

    // Track the count of each score. If the score is larger than the highest
    // possible score, drop it.
    unsortedScores.forEach((unsortedScore) => {
        if (unsortedScore <= highestPossibleScore) {
            scoreCounts[unsortedScore] = !scoreCounts[unsortedScore]
                ? 1
                : scoreCounts[unsortedScore] + 1;
        }
    });

    // For every defined score, add it to the sorted array the amount of times
    // it appears on the unsorted array.
    for (let scoreVal = scoreCounts.length; scoreVal >= 0; scoreVal--) {
        const scoreCount = scoreCounts[scoreVal];
        if (scoreCount) {
            for (let i = 0; i < scoreCount; i++) {
                sortedScores.push(scoreVal);
            }
        }
    }

    return sortedScores;
};
