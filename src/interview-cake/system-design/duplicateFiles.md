# Find duplicate files

You left your computer unlocked and your friend decided to troll you by copying a lot of your files to random spots all over your file system.

Even worse, she saved the duplicate files with random, embarrassing names ("this_is_like_a_digital_wedgie.txt" was clever, I'll give her that).

Write a function that returns an array of all the duplicate files. We'll check them by hand before actually deleting them, since programmatically deleting files is really scary. To help us confirm that two files are actually duplicates, return an array of arrays where:

-   the first item is the duplicate file
-   the second item is the original file For example:

```js
[
    ['/tmp/parker_is_dumb.mpg', '/home/parker/secret_puppy_dance.mpg'],
    ['/home/trololol.mov', '/etc/apache2/httpd.conf'],
];
```

You can assume each file was only duplicated once.

Since we'll be traversing our file system, we can't solve this with plain JavaScript. We use Node for our solution. You can also change to a server-side language for this challenge.

## Considerations

-   We'll have to check every file on the filesystem
    -   There will be exceptions: How do we handle unaccessible files? Device files? Symlinks?
-   We can't realistically compare files byte-for-byte (at least initially) for efficiency
    -   It would take too much time to compare every file to every other file
    -   It would take too much space to store the entire contents of every file in a set
-   _Hashing_ would be a good option: Generate a reasonably-sized hash for every file and store them in a set we can check every other file against.
    -   If a file isn't in the set, hash and store it
    -   If a file is in the set, we have a duplicate
    -   Instead of hashing, could inspect size: beginning, middle, and end _x_ bytes - would be faster, but less accurate
-   How do we know which file is the duplicate, and which is the original?
    -   Could have the user provide a list of original files
    -   Could go by a "last modified" timestamp - the MRM file is _probably_ the duplicate (unless it's a programmatically managed file)

## Assumptions

-   Two different files can't have the same fingerprint - but they could
-   The most-recently edited file is the duplicate - not always true
-   Two files with the same contents are duplicates of each other - not always true; could have different empty files

Given these assumptions, would want a human to verify
