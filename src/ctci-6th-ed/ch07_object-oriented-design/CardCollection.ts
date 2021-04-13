import Card from './Card';

// A collection of cards from a standard 52-card deck
export default class CardCollection {
    protected _cards: Array<Card>;

    constructor(cards?: Array<Card>) {
        this._cards = cards ? cards : [];
    }

    // Return the number of cards in this collection
    get size(): number {
        return this._cards.length;
    }

    // Return all the cards in the collection
    reveal(): Array<Card> {
        return this._cards;
    }

    // Return all the cards as their short names
    revealAsCodes(): Array<string> {
        return this._cards.map((card) => card.code);
    }

    // Add one or more cards to the collection at the specified location
    add(cards: Array<Card> | Card, idx?: number): void {
        if (idx < 0) {
            idx = 0;
        }

        if (idx === undefined || idx > this._cards.length) {
            idx = this._cards.length;
        }

        if (!Array.isArray(cards)) {
            cards = [cards];
        }

        this._cards = [
            ...this._cards.slice(0, idx),
            ...cards,
            ...this._cards.slice(idx),
        ];
    }

    // Return the first index of the specified card
    indexOf(targetCard: Card): number {
        for (let i = 0; i < this._cards.length; i++) {
            const card = this._cards[i];
            if (
                card.rank === targetCard.rank &&
                card.suit === targetCard.suit
            ) {
                return i;
            }
        }

        return -1;
    }

    // Remove and return the specified card
    remove(idx: number): Card {
        const targetCard = this._cards[idx];

        this._cards = [
            ...this._cards.slice(0, idx),
            ...this._cards.slice(idx + 1),
        ];

        return targetCard;
    }
}
