import Card, { ALL_CARDS } from './Card';
import CardCollection from './CardCollection';

// Represents a standard 52-card deck
export default class CardDeck extends CardCollection {
    constructor(cards?: Array<Card>) {
        super(cards ? cards : [].concat(ALL_CARDS));
    }

    // Deal a single card from the top of the deck
    deal(): Card {
        return this._cards.pop();
    }

    // Shuffle the deck using Knuth shuffle
    shuffle(): void {
        for (let i = this._cards.length - 1; i > 0; i--) {
            const randBelowIdx = Math.floor(Math.random() * i);
            const tmp = this._cards[i];
            this._cards[i] = this._cards[randBelowIdx];
            this._cards[randBelowIdx] = tmp;
        }
    }
}
