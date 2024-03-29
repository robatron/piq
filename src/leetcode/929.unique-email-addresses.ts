/**
 * @lc app=leetcode id=929 lang=typescript
 *
 * [929] Unique Email Addresses
 *
 * https://leetcode.com/problems/unique-email-addresses/description/
 *
 * Easy (67.46%)
 *
 * Every valid email consists of a *local name* and a *domain name*, separated
 * by the '@' sign. Besides lowercase letters, the email may contain one or more
 * '.' or '+'.
 *
 * For example, in "alice@leetcode.com", "alice" is the local name, and
 * "leetcode.com" is the domain name.
 *
 * If you add periods '.' between some characters in the local name part of an
 * email address, mail sent there will be forwarded to the same address without
 * dots in the local name. Note that this rule does not apply to domain names.
 *
 * For example, "alice.z@leetcode.com" and "alicez@leetcode.com" forward to the
 * same email address.
 *
 * If you add a plus '+' in the local name, everything after the first plus sign
 * will be ignored. This allows certain emails to be filtered. Note that this
 * rule does not apply to domain names.
 *
 * For example, "m.y+name@email.com" will be forwarded to "my@email.com".
 *
 * It is possible to use both of these rules at the same time.
 *
 * Given an array of strings `emails` where we send one email to each
 * `email[i]`, *return the number of different addresses that actually receive
 * mails.*
 *
 * Example 1:
 *
 * - Input: ["test.email+alex@leetcode.com",
 *   "test.e.mail+bob.cathy@leetcode.com", "testemail+david@lee.tcode.com"]
 * - Output: 2
 * - Explanation: "testemail@leetcode.com" and "testemail@lee.tcode.com"
 *   actually receive mails.
 *
 * Example 2:
 *
 * - Input: emails = ["a@leetcode.com","b@leetcode.com","c@leetcode.com"]
 * - Output: 3
 *
 * Constraints:
 *
 * - 1 <= emails.length <= 100
 * - 1 <= emails[i].length <= 100
 * - email[i] consist of lowercase English letters, '+', '.' and '@'
 * - Each emails[i] contains exactly one '@' character
 * - All local and domain names are non-empty
 * - Local names do not start with a '+' character.
 */

// @lc code=start
/**
 * Return an email address with all '.' and '+' (and everything after) removed
 * from the local name.
 */
const normalizeEmail = (email: string): string => {
    const [localName, domainName] = email.split('@');
    const localNameChars: string[] = [];

    for (let i = 0; i < localName.length; i++) {
        const char: string = email[i];

        if (char === '+') break;
        if (char !== '.') localNameChars.push(char);
    }

    return `${localNameChars.join('')}@${domainName}`;
};

/** Return the total number of unique email destinations */
const numUniqueEmails = (emails: string[]): number => {
    const uniqueEmails: Set<string> = new Set();

    emails.forEach((email) => {
        const [local, domain]: string[] = email.split('@');
        const [localNoFilter]: string[] = local.split('+');
        const localClean: string = localNoFilter.replace(/\./g, '');
        const emailClean = `${localClean}@${domain}`;

        uniqueEmails.add(emailClean);
    });

    return uniqueEmails.size;
};
// @lc code=end

export { normalizeEmail };
export default numUniqueEmails;
