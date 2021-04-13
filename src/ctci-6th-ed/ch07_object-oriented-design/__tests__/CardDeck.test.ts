import CardDeck from '../CardDeck';
import Card, {
    ALL_CARDS,
    ALL_CARD_CODES,
    ALL_CARD_RANKS,
    ALL_CARD_SUITS,
} from '../Card';

const TEST_CARDS = [new Card('AC'), new Card('2D'), new Card('3H')];

describe('CardDeck', () => {
    describe('constructor', () => {
        it('initializes a new deck with an optional set of cards', () => {
            const cardDeck = new CardDeck(TEST_CARDS);
            expect(cardDeck.size).toBe(TEST_CARDS.length);
            expect(cardDeck.revealAsCodes()).toStrictEqual(
                TEST_CARDS.map((card) => card.code),
            );
        });

        it('initializes a new deck with all cards of a 52-card deck', () => {
            const cardDeck = new CardDeck();
            expect(cardDeck.size).toBe(ALL_CARDS.length);
            expect(cardDeck.revealAsCodes()).toStrictEqual(ALL_CARD_CODES);
        });
    });

    it('deals cards from the top of the deck', () => {
        const cards = new CardDeck();

        expect(cards.size).toBe(52);

        [...ALL_CARD_SUITS].reverse().forEach((suit) => {
            [...ALL_CARD_RANKS].reverse().forEach((rank) => {
                const card = cards.deal();
                expect(card.suit).toBe(suit);
                expect(card.rank).toBe(rank);
            });
        });

        expect(cards.size).toBe(0);
        expect(cards.deal()).toBeUndefined();
    });

    it('shuffles cards', () => {
        const shuffledDeck = new CardDeck();

        shuffledDeck.shuffle();

        expect(shuffledDeck.size).toBe(52);

        while (shuffledDeck.size) {
            const topCardShuffledDeck = shuffledDeck.deal();
            expect(ALL_CARDS.indexOf(topCardShuffledDeck)).not.toBe(-1);
        }
    });
});
