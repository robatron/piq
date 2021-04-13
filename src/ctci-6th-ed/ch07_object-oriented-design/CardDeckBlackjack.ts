import Card, { ALL_CARDS } from './Card';
import CardDeck from './CardDeck';

// Represents a Blackjack deck
export default class CardDeckBlackjack extends CardDeck {
    constructor(deckCount = 3) {
        let decks = [];

        for (let i = 0; i < deckCount; i++) {
            decks = decks.concat(ALL_CARDS);
        }

        super(decks);
    }

    // Return a list of indexes of the target card
    findAllIndexOf(targetCard: Card): Array<number> {
        const indexes: Array<number> = [];

        this.reveal().forEach((card, i) => {
            if (
                card.rank === targetCard.rank &&
                card.suit === targetCard.suit
            ) {
                indexes.push(i);
            }
        });

        return indexes;
    }
}
