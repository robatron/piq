import electionsWinners from '../electionWinners';
import test10 from './electionWinners.test/test-10.json';

test('sample', () => {
    const votes = [2, 3, 5, 2];
    const remaining = 3;
    const expctd = 2;
    expect(electionsWinners(votes, remaining)).toBe(expctd);
});

test('sample 2', () => {
    const votes = [5, 1, 3, 4, 1];
    const remaining = 0;
    const expctd = 1;
    expect(electionsWinners(votes, remaining)).toBe(expctd);
});

test('no votes, no winners', () => {
    const votes = [];
    const remaining = 0;
    const expctd = 0;
    expect(electionsWinners(votes, remaining)).toBe(expctd);
});

test('excessive number of votes', () => {
    const { votes, k: remaining } = test10.input;
    const expctd = test10.output;
    expect(electionsWinners(votes, remaining)).toBe(expctd);
});
