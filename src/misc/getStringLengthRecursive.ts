/**
 * Get the length of a string recursively. If there is a character at the
 * pointer index, call itself again with the pointer advanced by one.
 * Otherwise, we've run past the end of the string, so just return the pointer,
 * which will be the length of the string because we started the pointer at 0.
 */
export const getStringLengthRecrusive = (s = '', pointer = 0): number =>
    s[pointer] ? getStringLengthRecrusive(s, pointer + 1) : pointer;
