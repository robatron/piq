/**
 * Class and utilities representing a card of a standard 52 card deck. See
 * https://en.wikipedia.org/wiki/Standard_52-card_deck
 */

// Represents a card of a standard 52-card deck
export default class Card {
    private _rank: CardRank;
    private _suit: CardSuit;

    // Create a new Card from a card code or from a rank and suit
    constructor(val: CardRank | string, suit?: CardSuit) {
        // If suit is not defined, assume we have a card code, so attempt to
        // parse out the rank and suit from it
        if (suit === undefined) {
            this._rank = CardRankFromCode[val[0]];
            this._suit = CardSuitFromCode[val[1]];
        }

        // Otherwise, assume we just have a rank and suit
        else {
            this._rank = val as CardRank;
            this._suit = suit as CardSuit;
        }

        // Validate rank and suit, throw if either are invalid
        const isValidRank = Object.values(CardRank).includes(this._rank);
        const isValidSuit = Object.values(CardSuit).includes(this._suit);

        if (!isValidRank || !isValidSuit) {
            throw new Error(
                `Card ${
                    (!isValidRank ? `rank "${this._rank}"` : '') +
                    (!isValidSuit && !isValidRank ? ' and ' : '') +
                    (!isValidSuit ? `suit "${this._suit}"` : '')
                } is invalid (for val = ${val}, suit = ${suit})`,
            );
        }
    }

    get rank(): CardRank {
        return this._rank;
    }

    get suit(): CardSuit {
        return this._suit;
    }

    get code(): string {
        return `${CardRankToCode[this.rank]}${CardSuitToCode[this.suit]}`;
    }

    get name(): string {
        return `${this.rank} of ${this.suit}`;
    }

    get color(): CardColor {
        if (BLACK_SUITS.includes(this._suit)) {
            return CardColor.black;
        }
        return CardColor.red;
    }

    get isFaceCard(): boolean {
        return FACE_CARDS.includes(this._rank);
    }

    get isHonorCard(): boolean {
        return HONOR_CARDS.includes(this._rank);
    }

    get isNumberCard(): boolean {
        return NUMBER_CARDS.includes(this._rank);
    }
}

// Possible card colors
export enum CardColor {
    black = 'black',
    red = 'red',
}

// Card suits
export enum CardSuit {
    clubs = 'clubs',
    diamonds = 'diamonds',
    hearts = 'hearts',
    spades = 'spades',
}

// Card suit -> card suit code
export const CardSuitToCode = {
    [CardSuit.clubs]: 'C',
    [CardSuit.diamonds]: 'D',
    [CardSuit.hearts]: 'H',
    [CardSuit.spades]: 'S',
} as const;

// Card suit code -> card suit
export const CardSuitFromCode = {
    C: CardSuit.clubs,
    D: CardSuit.diamonds,
    H: CardSuit.hearts,
    S: CardSuit.spades,
} as const;

// Possible card ranks
export enum CardRank {
    ace = 'ace',
    two = 2,
    three = 3,
    four = 4,
    five = 5,
    six = 6,
    seven = 7,
    eight = 8,
    nine = 9,
    ten = 10,
    jack = 'jack',
    queen = 'queen',
    king = 'king',
}

// Card rank -> card rank code
export const CardRankToCode = {
    [CardRank.ace]: 'A',
    [CardRank.two]: '2',
    [CardRank.three]: '3',
    [CardRank.four]: '4',
    [CardRank.five]: '5',
    [CardRank.six]: '6',
    [CardRank.seven]: '7',
    [CardRank.eight]: '8',
    [CardRank.nine]: '9',
    [CardRank.ten]: 'T',
    [CardRank.jack]: 'J',
    [CardRank.queen]: 'Q',
    [CardRank.king]: 'K',
} as const;

// Card rank code -> card rank
export const CardRankFromCode = {
    A: CardRank.ace,
    '2': CardRank.two,
    '3': CardRank.three,
    '4': CardRank.four,
    '5': CardRank.five,
    '6': CardRank.six,
    '7': CardRank.seven,
    '8': CardRank.eight,
    '9': CardRank.nine,
    T: CardRank.ten,
    J: CardRank.jack,
    Q: CardRank.queen,
    K: CardRank.king,
} as const;

// All card suits
export const ALL_CARD_SUITS: ReadonlyArray<CardSuit> = [
    CardSuit.clubs,
    CardSuit.diamonds,
    CardSuit.hearts,
    CardSuit.spades,
];

// Just black suits
export const BLACK_SUITS: ReadonlyArray<CardSuit> = [
    CardSuit.clubs,
    CardSuit.spades,
];

// Just red suits (inverse black)
export const RED_SUITS: ReadonlyArray<CardSuit> = ALL_CARD_SUITS.filter(
    (cardSuit) => !BLACK_SUITS.includes(cardSuit),
);

// All card ranks, in order
export const ALL_CARD_RANKS: ReadonlyArray<CardRank> = [
    CardRank.ace,
    CardRank.two,
    CardRank.three,
    CardRank.four,
    CardRank.five,
    CardRank.six,
    CardRank.seven,
    CardRank.eight,
    CardRank.nine,
    CardRank.ten,
    CardRank.jack,
    CardRank.queen,
    CardRank.king,
];

// Face cards only
export const FACE_CARDS: ReadonlyArray<CardRank> = [
    CardRank.jack,
    CardRank.queen,
    CardRank.king,
];

// Honor cards (face cards + ace)
export const HONOR_CARDS: ReadonlyArray<CardRank> = [
    ...FACE_CARDS,
    CardRank.ace,
];

// Number cards (a.k.a. pip)
export const NUMBER_CARDS: ReadonlyArray<CardRank> = ALL_CARD_RANKS.filter(
    (cardRank) => !HONOR_CARDS.includes(cardRank),
);

// All 52 cards, in order
export const ALL_CARDS: ReadonlyArray<Card> = ((): Array<Card> => {
    const allCards: Array<Card> = [];

    ALL_CARD_SUITS.forEach((suit) => {
        ALL_CARD_RANKS.forEach((rank) => {
            allCards.push(new Card(rank, suit));
        });
    });

    return allCards;
})();

// ALL 52 card codes, in order
export const ALL_CARD_CODES: ReadonlyArray<string> = ((): Array<string> => {
    const allCardCodes: Array<string> = [];

    ALL_CARD_SUITS.forEach((suit) => {
        ALL_CARD_RANKS.forEach((rank) => {
            allCardCodes.push(`${CardRankToCode[rank]}${CardSuitToCode[suit]}`);
        });
    });

    return allCardCodes;
})();
