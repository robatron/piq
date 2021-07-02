/*
I want to learn some big words so people think I'm smart.

I opened up a dictionary to a page in the middle and started flipping through,
looking for words I didn't know. I put each word I didn't know at increasing
indices in a huge array I created in memory. When I reached the end of the
dictionary, I started from the beginning and did the same thing until I reached
the page I started at.

Now I have an array of words that are mostly alphabetical, except they start
somewhere in the middle of the alphabet, reach the end, and then start from the
beginning of the alphabet. In other words, this is an alphabetically ordered
array that has been "rotated." For example:

    const words = [
        'ptolemaic',
        'retrograde',
        'supplant',
        'undulate',
        'xenoepist',
        'asymptote',  // <-- rotates here!
        'babka',
        'banoffee',
        'engender',
        'karpatka',
        'othellolagkage',
    ];

Write a function for finding the index of the "rotation point," which is where I
started working from the beginning of the dictionary. This array is huge (there
are lots of words I don't know) so we want to be efficient here.

To keep things simple, you can assume all words are lowercase.
*/

// Time complexity: O(n) worst case (if unrotated)
export const findRotationPointNaiive = (wordList: string[]): number => {
    if (wordList.length < 1) {
        return undefined;
    }

    let prevWord: string = wordList[0];

    for (let i = 1; i < wordList.length; i++) {
        const word = wordList[i];

        if (word < prevWord) {
            return i;
        }

        prevWord = word;
    }

    return 0;
};

// Time complexity: O(lg(n))
export default (wordList: string[]): number => {
    if (wordList.length < 1) {
        return undefined;
    }

    let start = 0;
    let end = wordList.length - 1;
    let size = end - start + 1;

    // Perform an iterative binary search for the rotation point
    while (size > 2) {
        const mid = Math.floor(size / 2) + start;
        const isLeftInOrder = wordList[start] <= wordList[mid];
        const isRightInOrder = wordList[mid] <= wordList[end];

        // Rotation point in left side if left side is out of order
        if (!isLeftInOrder) {
            end = mid;
        }

        // Otherwise rotation point in right side if right side out of order
        else if (!isRightInOrder) {
            start = mid;
        }

        // Otherwise both sides are in order, so the rotation point is the
        // starting index
        else {
            return start;
        }

        size = end + 1 - start;
    }

    if (wordList[start] <= wordList[end]) {
        return start;
    } else {
        return end;
    }
};
