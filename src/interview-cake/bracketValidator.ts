/*
You're working with an intern that keeps coming to you with JavaScript code that
won't run because the braces, brackets, and parentheses are off. To save you
both some time, you decide to write a braces/brackets/parentheses validator.

Let's say:

'(', '{', '[' are called "openers." ')', '}', ']' are called "closers." Write an
efficient function that tells us whether or not an input string's openers and
closers are properly nested.

Examples:

"{ [ ] ( ) }" should return true "{ [ ( ] ) }" should return false "{ [ }"
should return false

https://www.interviewcake.com/question/javascript/bracket-validator?course=fc1&section=queues-stacks
*/
export const areBracketsValid = (str: string): boolean => {
    // Opener and closer brackets to consider
    const brackets: Map<string, string> = new Map([
        ['(', ')'],
        ['{', '}'],
        ['[', ']'],
    ]);
    const openers = new Set(brackets.keys());
    const closers = new Set(brackets.values());

    // Stack of openers we've seen so far
    const lastOpener: string[] = [];

    // Check every every character in the string against every bracket
    for (let si = 0; si < str.length; si++) {
        const char = str[si];

        // Track every opener bracket we see
        if (openers.has(char)) {
            lastOpener.push(char);
        }

        // If we see an closer bracket, make sure the last opener we've seen is
        // its partner, otherwise the brackets are invalid!
        else if (closers.has(char) && char !== brackets.get(lastOpener.pop())) {
            return false;
        }
    }

    // If we get through the whole string with no unexpected closer brackets and
    // we don't have any unmatched brackets left over, our brackets are valid!
    return lastOpener.length === 0;
};
