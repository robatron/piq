import numUniqueEmails, { normalizeEmail } from '../929.unique-email-addresses';
import { createTests } from './utils';

describe(normalizeEmail.name, () => {
    createTests(
        [
            ['test.email+alex@leetcode.com', 'testemail@leetcode.com'],
            ['test.email.leet+alex@code.com', 'testemailleet@code.com'],
        ],
        normalizeEmail,
    );
});

describe(numUniqueEmails.name, () => {
    createTests(
        [
            [[], 0],
            [['a@b.com'], 1],
            [
                [
                    'test.email+alex@leetcode.com',
                    'test.e.mail+bob.cathy@leetcode.com',
                    'testemail+david@lee.tcode.com',
                ],
                2,
            ],
            [['a@leetcode.com', 'b@leetcode.com', 'c@leetcode.com'], 3],
            [
                [
                    'test.email+alex@leetcode.com',
                    'test.email.leet+alex@code.com',
                ],
                2,
            ],
        ],
        numUniqueEmails,
    );
});
