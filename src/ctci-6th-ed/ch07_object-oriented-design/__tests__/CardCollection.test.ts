import Card, { CardRank, CardSuit } from '../Card';
import CardCollection from '../CardCollection';

const TEST_CARDS = [
    new Card(CardRank.ace, CardSuit.clubs),
    new Card(CardRank.two, CardSuit.diamonds),
    new Card(CardRank.three, CardSuit.hearts),
];

describe('CardCollection', () => {
    describe('constructor', () => {
        it('initializes an empty collection', () => {
            const cards = new CardCollection();
            expect(cards.size).toBe(0);
            expect(cards.reveal()).toStrictEqual([]);
        });

        it('can be initialized with a set of cards', () => {
            const cards = new CardCollection(TEST_CARDS);
            expect(cards.size).toBe(TEST_CARDS.length);
            expect(cards.reveal()).toStrictEqual(TEST_CARDS);
        });
    });

    describe('add', () => {
        describe('one', () => {
            const newCard = new Card('4S');

            it('adds a card to the beginning of the collection', () => {
                const cards = new CardCollection(TEST_CARDS);

                cards.add(newCard, 0);

                expect(cards.size).toBe(TEST_CARDS.length + 1);
                expect(cards.revealAsCodes()).toStrictEqual([
                    '4S',
                    'AC',
                    '2D',
                    '3H',
                ]);
            });

            it('adds a card to the beginning of the collection if < 0', () => {
                const cards = new CardCollection(TEST_CARDS);

                cards.add(newCard, -3);

                expect(cards.size).toBe(TEST_CARDS.length + 1);
                expect(cards.revealAsCodes()).toStrictEqual([
                    '4S',
                    'AC',
                    '2D',
                    '3H',
                ]);
            });

            it('adds a card to the middle of the collection', () => {
                const cards = new CardCollection(TEST_CARDS);

                cards.add(newCard, 1);

                expect(cards.size).toBe(TEST_CARDS.length + 1);
                expect(cards.revealAsCodes()).toStrictEqual([
                    'AC',
                    '4S',
                    '2D',
                    '3H',
                ]);
            });

            it('adds a card to the end of the collection', () => {
                const cards = new CardCollection(TEST_CARDS);

                cards.add(newCard, TEST_CARDS.length);

                expect(cards.size).toBe(TEST_CARDS.length + 1);
                expect(cards.revealAsCodes()).toStrictEqual([
                    'AC',
                    '2D',
                    '3H',
                    '4S',
                ]);
            });

            it('adds a card to the end of the collection if > size', () => {
                const cards = new CardCollection(TEST_CARDS);

                cards.add(newCard, cards.size + 3);

                expect(cards.size).toBe(TEST_CARDS.length + 1);
                expect(cards.revealAsCodes()).toStrictEqual([
                    'AC',
                    '2D',
                    '3H',
                    '4S',
                ]);
            });

            it('adds a card to the end of the collection if idx is not defined', () => {
                const cards = new CardCollection(TEST_CARDS);

                cards.add(newCard);

                expect(cards.size).toBe(TEST_CARDS.length + 1);
                expect(cards.revealAsCodes()).toStrictEqual([
                    'AC',
                    '2D',
                    '3H',
                    '4S',
                ]);
            });
        });

        describe('many', () => {
            const newCards = [new Card('4S'), new Card('5C')];

            it('adds a card to the beginning of the collection', () => {
                const cards = new CardCollection(TEST_CARDS);

                cards.add(newCards, 0);

                expect(cards.size).toBe(TEST_CARDS.length + newCards.length);
                expect(cards.revealAsCodes()).toStrictEqual([
                    '4S',
                    '5C',
                    'AC',
                    '2D',
                    '3H',
                ]);
            });

            it('adds a card to the middle of the collection', () => {
                const cards = new CardCollection(TEST_CARDS);

                cards.add(newCards, 1);

                expect(cards.size).toBe(TEST_CARDS.length + newCards.length);
                expect(cards.revealAsCodes()).toStrictEqual([
                    'AC',
                    '4S',
                    '5C',
                    '2D',
                    '3H',
                ]);
            });

            it('adds a card to the end of the collection', () => {
                const cards = new CardCollection(TEST_CARDS);

                cards.add(newCards, TEST_CARDS.length);

                expect(cards.size).toBe(TEST_CARDS.length + newCards.length);
                expect(cards.revealAsCodes()).toStrictEqual([
                    'AC',
                    '2D',
                    '3H',
                    '4S',
                    '5C',
                ]);
            });

            it('adds a card to the end of the collection if idx > size', () => {
                const cards = new CardCollection(TEST_CARDS);

                cards.add(newCards, TEST_CARDS.length + 1);

                expect(cards.size).toBe(TEST_CARDS.length + newCards.length);
                expect(cards.revealAsCodes()).toStrictEqual([
                    'AC',
                    '2D',
                    '3H',
                    '4S',
                    '5C',
                ]);
            });

            it('adds a card to the end of the collection if idx is undefined', () => {
                const cards = new CardCollection(TEST_CARDS);

                cards.add(newCards);

                expect(cards.size).toBe(TEST_CARDS.length + newCards.length);
                expect(cards.revealAsCodes()).toStrictEqual([
                    'AC',
                    '2D',
                    '3H',
                    '4S',
                    '5C',
                ]);
            });
        });
    });

    it('finds the index of cards', () => {
        const cards = new CardCollection(TEST_CARDS);
        TEST_CARDS.forEach((testCard, idx) => {
            expect(cards.indexOf(testCard)).toBe(idx);
        });
    });

    describe('remove', () => {
        it('removes a card from the beginning of the collection', () => {
            const cards = new CardCollection(TEST_CARDS);

            const targetCard = cards.remove(0);

            expect(targetCard).toBe(TEST_CARDS[0]);
            expect(cards.size).toBe(TEST_CARDS.length - 1);
            expect(cards.revealAsCodes()).toStrictEqual(['2D', '3H']);
        });

        it('removes a card from the middle of the collection', () => {
            const cards = new CardCollection(TEST_CARDS);

            const targetCard = cards.remove(1);

            expect(targetCard).toBe(TEST_CARDS[1]);
            expect(cards.size).toBe(TEST_CARDS.length - 1);
            expect(cards.revealAsCodes()).toStrictEqual(['AC', '3H']);
        });

        it('removes a card from the end of the collection', () => {
            const cards = new CardCollection(TEST_CARDS);

            const targetCard = cards.remove(2);

            expect(targetCard).toBe(TEST_CARDS[2]);
            expect(cards.size).toBe(TEST_CARDS.length - 1);
            expect(cards.revealAsCodes()).toStrictEqual(['AC', '2D']);
        });
    });
});
