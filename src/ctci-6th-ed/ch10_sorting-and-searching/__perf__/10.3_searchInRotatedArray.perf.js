/**
 * This script is used to explore the performance of searchInRotatedArray.
 *
 * Run `build.sh` first, then either run this script directly to view a text
 * report, e.g.,
 *
 *     10:10:36 in piq/src/ctci-6th-ed/ch10_sorting-and-searching/__perf__ on  master [$!] took 6s
 *     [I] ➜ node 10.3_searchInRotatedArray.perf.js
 *
 *     It took 49 ms to generate and prepare the test lists of 100000 items each
 *       - Beginning-cut list: [ 788, 1376, 1769, ... ]
 *       - Middle-cut list:    [ ..., 99997867, 99998932, 99999289, 788, 1376, 1769, ... ]
 *       - End-cut list:       [ 99999289, 788, 1376, ... ]
 *
 *     It took 3251 ms to find 5 items in beginningCut list using brute-force to find the sequence start
 *       - But only 9 ms to find the same 5 items using binary search to find the sequence start (a 367.6x speedup!)
 *
 *     It took 1658 ms to find 12 items in middleCut list using brute-force to find the sequence start
 *       - But only 12 ms to find the same 12 items using binary search to find the sequence start (a 138.6x speedup!)
 *
 *     It took 9 ms to find 11 items in endCut list using brute-force to find the sequence start
 *       - But only 22 ms to find the same 11 items using binary search to find the sequence start (a 0.4x speedup!)
 *
 * Or run `profile.sh` to run the same report with the addition of an
 * interactive flame chart which will open in your default browser.
 */

import execTime from 'execution-time';
import {
    findStartOfRotArray,
    searchInRotArray,
} from './__build__/10.3_searchInRotatedArray.js';

// Config
const targetCount = 10000;
const testListLen = 100000;
const testListIntLow = 0;
const testListIntHigh = 100000000;

// Init perf measurement
const perf = execTime();

// Generate a test list of `testListLen` random items between `testListIntLow`
// and `testListIntHigh` in ascending order
const generateTestList = () => {
    const testList = [...Array(testListLen)].map(
        () => Math.floor(Math.random() * testListIntHigh) + testListIntLow,
    );

    // Sort the entire array in ascending order
    testList.sort((a, b) => (a < b && -1) || (a > b && 1) || 0);

    return testList;
};

// "Cut the deck" so the sequence optionally starts somewhere other than the
// beginning of the list
const cutList = (testList, splitIdx) => [
    ...testList.slice(splitIdx),
    ...testList.slice(0, splitIdx),
];

// For each search run, search for a random target within range
const execSearches = (testList, targetList, useBrute) => {
    const foundMap = {};

    targetList.forEach((testTarget) => {
        const result = searchInRotArray(
            testTarget,
            testList,
            undefined,
            undefined,
            useBrute,
        );

        if (result !== -1) {
            foundMap[testTarget] = result;
        }
    });

    return foundMap;
};

// Execute a single search w/ perf reporting
const execSearch = (testList, perfKey) => {
    const targetList = [...Array(targetCount)].map(
        () => Math.floor(Math.random() * testListIntHigh) + testListIntLow,
    );

    perf.start(perfKey + 'brute');
    const foundCountBrute = Object.keys(
        execSearches(testList, targetList, true),
    ).length;
    const execTimeBrute = perf.stop(perfKey + 'brute').time;

    console.log(
        `It took ${Math.round(
            execTimeBrute,
        )} ms to find ${foundCountBrute} items in ${perfKey} list using brute-force to find the sequence start`,
    );

    perf.start(perfKey);
    const foundCount = Object.keys(execSearches(testList, targetList)).length;
    const execTime = perf.stop(perfKey).time;

    console.log(
        `  - But only ${Math.round(
            execTime,
        )} ms to find the same ${foundCount} items using binary search to find the sequence start (a ${(
            execTimeBrute / execTime
        ).toFixed(1)}x speedup!)`,
    );
    console.log();
};

// ----------

// Generate the test lists
const testLists = (function genTestLists() {
    perf.start('genTestLists');

    const testList = generateTestList();
    const testListCutBeg = cutList(testList, 0);
    const testListCutMid = cutList(testList, Math.round((testListLen - 1) / 2));
    const testListCutEnd = cutList(testList, testListLen - 1);
    const perfGenTestList = perf.stop('genTestLists');

    console.log(
        `It took ${Math.round(
            perfGenTestList.time,
        )} ms to generate and prepare the test lists of ${testListLen} items each`,
    );
    console.log(
        `  - Beginning-cut list: [ ${testListCutBeg
            .slice(0, 3)
            .join(', ')}, ... ]`,
    );
    console.log(
        `  - Middle-cut list:    [ ..., ${testListCutMid
            .slice(
                findStartOfRotArray(testListCutMid) - 3,
                findStartOfRotArray(testListCutMid) + 3,
            )
            .join(', ')}, ... ]`,
    );
    console.log(
        `  - End-cut list:       [ ${testListCutEnd
            .slice(0, 3)
            .join(', ')}, ... ]`,
    );
    console.log();

    return {
        beg: testListCutBeg,
        mid: testListCutMid,
        end: testListCutEnd,
    };
})();

// Execute the performance runs
(function execSearchBegCut() {
    execSearch(testLists.beg, 'beginningCut');
})();

(function execSearchMidCut() {
    execSearch(testLists.mid, 'middleCut');
})();

(function execSearchEndCut() {
    execSearch(testLists.end, 'endCut');
})();
