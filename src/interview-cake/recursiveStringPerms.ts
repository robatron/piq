/*
Write a recursive function for generating all permutations of an input string.
Return them as a set.

Don't worry about time or space complexity—if we wanted efficiency we'd write an
iterative version.

To start, assume every character in the input string is unique.

Your function can have loops—it just needs to also be recursive.
*/
const getPerms = (input: string): Set<string> => {
    const perms = new Set<string>();

    // If there's 1 or fewer characters, just return them unmodified
    if (input.length <= 1) {
        perms.add(input);
        return perms;
    }

    // If there're 2 characters, the possibilities are the unmodified input, and
    // the input reversed
    if (input.length === 2) {
        perms.add(input);
        perms.add(`${input[1]}${input[0]}`);
        return perms;
    }

    // Otherwise, there are > 2 characters. Set aside the first character, and
    // insert it in every possible position of all permutations of the rest of
    // the input
    const first = input[0];
    const rest = input.slice(1);
    const restPerms = getPerms(rest);

    restPerms.forEach((restPerm) => {
        for (let i = 0; i <= restPerm.length; i++) {
            const before = restPerm.slice(0, i);
            const after = restPerm.slice(i);
            perms.add(before + first + after);
        }
    });

    return perms;
};

export default getPerms;
