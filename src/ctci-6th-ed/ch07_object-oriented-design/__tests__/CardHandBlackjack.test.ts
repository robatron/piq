import Card, { CardSuit, FACE_CARDS, NUMBER_CARDS } from '../Card';
import CardHandBlackjack from '../CardHandBlackjack';

describe('CardHandBlackjack', () => {
    it('creates a new empty hand', () => {
        const hand = new CardHandBlackjack();
        expect(hand.size).toBe(0);
        expect(hand.value).toBe(0);
    });

    it('can hit and update hand value', () => {
        const hand = new CardHandBlackjack();

        hand.hit(new Card('2C'));

        expect(hand.size).toBe(1);
        expect(hand.value).toBe(2);

        hand.hit(new Card('3C'));

        expect(hand.size).toBe(2);
        expect(hand.value).toBe(5);
    });

    describe('value', () => {
        it('accurately calculates all number values', () => {
            const hand = new CardHandBlackjack();
            let expectedValue = 0;

            NUMBER_CARDS.forEach((cardRanks) => {
                const newCard = new Card(cardRanks, CardSuit.clubs);

                expectedValue += cardRanks as number;
                hand.hit(newCard);

                expect(hand.value).toBe(expectedValue);
            });
        });

        it('accurately calculates all face values', () => {
            const hand = new CardHandBlackjack();
            let expectedValue = 0;

            FACE_CARDS.forEach((cardRanks) => {
                const newCard = new Card(cardRanks, CardSuit.clubs);

                expectedValue += 10;
                hand.hit(newCard);

                expect(hand.value).toBe(expectedValue);
            });
        });

        it('accurately ace values', () => {
            const hand = new CardHandBlackjack();

            // 1st ace should add 11
            hand.hit(new Card('AC'));
            expect(hand.value).toBe(11);

            // 2nd ace should add only 1 b/c otherwise the hand would bust
            hand.hit(new Card('AD'));
            expect(hand.value).toBe(11 + 1);

            // 3nd ace should also only add 1 b/c the hand has already busted
            hand.hit(new Card('AD'));
            expect(hand.value).toBe(11 + 1 + 1);
        });
    });

    describe('isBust', () => {
        it('returns true when the hand value is larger than 21', () => {
            const hand = new CardHandBlackjack();

            hand.hit(new Card('JC'));
            expect(hand.value).toBe(10);

            hand.hit(new Card('QD'));
            expect(hand.value).toBe(10 + 10);

            hand.hit(new Card('KH'));
            expect(hand.value).toBe(10 + 10 + 10);

            expect(hand.isBust).toBe(true);
        });

        it('returns false when the hand value is <= than 21', () => {
            const hand = new CardHandBlackjack();

            // < 21
            expect(hand.isBust).toBe(false);

            hand.hit(new Card('AC'));
            expect(hand.value).toBe(11);

            hand.hit(new Card('QD'));
            expect(hand.value).toBe(11 + 10);

            // = 21
            expect(hand.isBust).toBe(false);
        });
    });

    describe('isBlackjack', () => {
        it('returns true when the hand value is 21', () => {
            const hand = new CardHandBlackjack();

            hand.hit(new Card('AC'));
            expect(hand.value).toBe(11);

            hand.hit(new Card('KD'));
            expect(hand.value).toBe(11 + 10);

            expect(hand.isBlackjack).toBe(true);
        });

        it('returns false when the hand value < or > 21', () => {
            const hand = new CardHandBlackjack();

            expect(hand.isBlackjack).toBe(false);

            hand.hit(new Card('JC'));
            expect(hand.value).toBe(10);

            hand.hit(new Card('QD'));
            expect(hand.value).toBe(10 + 10);

            hand.hit(new Card('KH'));
            expect(hand.value).toBe(10 + 10 + 10);

            expect(hand.isBlackjack).toBe(false);
        });
    });
});
