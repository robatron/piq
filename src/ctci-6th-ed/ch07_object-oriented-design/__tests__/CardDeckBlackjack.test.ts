import CardDeckBlackjack from '../CardDeckBlackjack';
import { ALL_CARDS } from '../Card';

describe('BlackjackDeck', () => {
    describe('constructor', () => {
        it('initializes a new default blackjack deck', () => {
            const defaultDeckCount = 3;
            const bjDeck = new CardDeckBlackjack();

            let expectedDeck = [];
            for (let i = 0; i < defaultDeckCount; i++) {
                expectedDeck = [...expectedDeck, ...ALL_CARDS];
            }

            expect(bjDeck.size).toBe(ALL_CARDS.length * defaultDeckCount);
            expect(bjDeck.reveal()).toStrictEqual(expectedDeck);
        });

        it('initialized a blackjack deck with n decks', () => {
            const deckCount = 5;
            const bjDeck = new CardDeckBlackjack(deckCount);

            let expectedDeck = [];
            for (let i = 0; i < deckCount; i++) {
                expectedDeck = [...expectedDeck, ...ALL_CARDS];
            }

            expect(bjDeck.size).toBe(ALL_CARDS.length * deckCount);
            expect(bjDeck.reveal()).toStrictEqual(expectedDeck);
        });
    });

    describe('findAllIndexOf', () => {
        it('can find all indexes of the target card', () => {
            const deckCount = 3;
            const bjDeck = new CardDeckBlackjack(deckCount);
            let outerIdx = 0;

            ALL_CARDS.forEach((targetCard) => {
                const actualIdxs: Array<number> =
                    bjDeck.findAllIndexOf(targetCard);
                const expectIdxs: Array<number> = [];

                for (let i = 0; i < deckCount; i++) {
                    expectIdxs.push(i * 52 + outerIdx);
                }

                expect(actualIdxs).toStrictEqual(expectIdxs);

                outerIdx++;
            });
        });
    });
});
