import Card, { CardRank } from './Card';
import CardCollection from './CardCollection';

// Target "blackjack" number
export const BLACKJACK_SCORE = 21;
export const FACE_VALUE = 10;
export const HIGH_ACE_VALUE = 11;
export const LOW_ACE_VALUE = 1;

export default class CardHandBlackjack extends CardCollection {
    constructor() {
        super();
    }

    // Return the current value of the hand
    get value(): number {
        const aces: Array<Card> = [];
        const nonAces: Array<Card> = [];

        this._cards.forEach((card) => {
            if (card.rank === CardRank.ace) {
                aces.push(card);
            } else {
                nonAces.push(card);
            }
        });

        // Calculate the value of the non-ace cards (face and number)
        const nonAcesVal: number = nonAces.reduce((accum, card) => {
            if (card.isFaceCard) {
                accum += FACE_VALUE;
            } else {
                accum += card.rank as number;
            }

            return accum;
        }, 0);

        // Calculate the value of the ace cards, high or low, depending on the
        // accumulated value so far
        const acesVal: number = aces.reduce((accum) => {
            accum +=
                accum + nonAcesVal + HIGH_ACE_VALUE > BLACKJACK_SCORE ? 1 : 11;
            return accum;
        }, 0);

        return nonAcesVal + acesVal;
    }

    // Return bust status
    get isBust(): boolean {
        return this.value > BLACKJACK_SCORE;
    }

    // Return blackjack status
    get isBlackjack(): boolean {
        return this.value === BLACKJACK_SCORE;
    }

    // Add a single card to the hand and update the hand value
    hit(card: Card): void {
        this._cards.push(card);
    }
}
