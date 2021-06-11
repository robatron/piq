/*
You've built an inflight entertainment system with on-demand movie streaming.

Users on longer flights like to start a second movie right when their first one
ends, but they complain that the plane usually lands before they can see the
ending. So you're building a feature for choosing two movies whose total
runtimes will equal the exact flight length.

Write a function that takes an integer flightLength (in minutes) and an array of
integers movieLengths (in minutes) and returns a boolean indicating whether
there are two numbers in movieLengths whose sum equals flightLength.

When building your function:

- Assume your users will watch exactly two movies
- Don't make your users watch the same movie twice
- Optimize for runtime over memory

https://www.interviewcake.com/question/javascript/inflight-entertainment
*/

// Find all pairs of movie runtimes that fit perfectly into a flight time
// O(n^2)
export const inFlightEntertainmentPairsNaiive = (
    flightTime: number,
    movieRuntimes: number[],
): number[][] => {
    const doubleFeatureRuntimes: { [key: number]: number[][] } = {};

    for (let i = 0; i < movieRuntimes.length; i++) {
        for (let ii = i + 1; ii < movieRuntimes.length; ii++) {
            const movie1 = movieRuntimes[i];
            const movie2 = movieRuntimes[ii];
            const doubleFeatureRuntime = doubleFeatureRuntimes[movie1 + movie2];

            if (doubleFeatureRuntime) {
                doubleFeatureRuntimes[movie1 + movie2].push([movie1, movie2]);
            } else {
                doubleFeatureRuntimes[movie1 + movie2] = [[movie1, movie2]];
            }
        }
    }

    return doubleFeatureRuntimes[flightTime];
};

// Return if there are at least two movie runtimes that perfectly fit in a
// flight time. Uses a hash table. O(n) time, O(n) space.
export const inFlightEntertainmentHashTable = (
    flightTime: number,
    movieRuntimes: number[],
): boolean => {
    const runtimeIdxs: { [key: number]: number } = {};

    // Make a map of runtimes to indexes
    for (let i = 0; i < movieRuntimes.length; i++) {
        runtimeIdxs[movieRuntimes[i]] = i;
    }

    // Look through all of the runtimes and see if there is at least one other
    // runtime that adds up to the flight time when added together
    for (let i = 0; i < movieRuntimes.length; i++) {
        const runtime = movieRuntimes[i];
        const runtime2Idx = runtimeIdxs[flightTime - runtime];
        if (runtime2Idx !== undefined && runtime2Idx !== i) {
            return true;
        }
    }

    return false;
};

// Return if there are at least two movie runtimes that perfectly fit in a
// flight time. Uses a set. O(n) time, O(n) space.
export default (flightTime: number, movieRuntimes: number[]): boolean => {
    const processedMovieRuntimes = new Set();

    for (let i = 0; i < movieRuntimes.length; i++) {
        const movieRuntime = movieRuntimes[i];
        const desiredRuntime = flightTime - movieRuntime;

        if (processedMovieRuntimes.has(desiredRuntime)) {
            return true;
        }

        processedMovieRuntimes.add(movieRuntime);
    }

    return false;
};
