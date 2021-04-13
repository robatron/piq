import Card, {
    ALL_CARD_CODES,
    ALL_CARD_RANKS,
    ALL_CARD_SUITS,
    ALL_CARDS,
    BLACK_SUITS,
    CardColor,
    CardRank,
    CardRankFromCode,
    CardRankToCode,
    CardSuit,
    CardSuitToCode,
    FACE_CARDS,
    HONOR_CARDS,
    NUMBER_CARDS,
    RED_SUITS,
    CardSuitFromCode,
} from '../Card';

describe('Card', () => {
    describe('constructor', () => {
        it('can be instantiated with all possible cards', () => {
            ALL_CARD_SUITS.forEach((suit) => {
                ALL_CARD_RANKS.forEach((rank) => {
                    const card = new Card(rank, suit);
                    expect(card.rank).toBe(rank);
                    expect(card.suit).toBe(suit);
                });
            });
        });

        it('can be instantiated with all possible card codes', () => {
            ALL_CARD_SUITS.forEach((suit) => {
                ALL_CARD_RANKS.forEach((rank) => {
                    const card = new Card(
                        `${CardRankToCode[rank]}${CardSuitToCode[suit]}`,
                    );
                    expect(card.rank).toBe(rank);
                    expect(card.suit).toBe(suit);
                });
            });
        });

        describe('validation', () => {
            it('throws if the rank is invalid', () => {
                expect(() => {
                    new Card('invalid-rank' as CardRank, CardSuit.clubs);
                }).toThrowErrorMatchingInlineSnapshot(
                    `"Card rank \\"invalid-rank\\" is invalid (for val = invalid-rank, suit = clubs)"`,
                );

                expect(() => {
                    new Card('?C');
                }).toThrowErrorMatchingInlineSnapshot(
                    `"Card rank \\"undefined\\" is invalid (for val = ?C, suit = undefined)"`,
                );
            });

            it('throws if the suit is invalid', () => {
                expect(() => {
                    new Card(CardRank.ace, 'invalid-suit' as CardSuit);
                }).toThrowErrorMatchingInlineSnapshot(
                    `"Card suit \\"invalid-suit\\" is invalid (for val = ace, suit = invalid-suit)"`,
                );

                expect(() => {
                    new Card('A?');
                }).toThrowErrorMatchingInlineSnapshot(
                    `"Card suit \\"undefined\\" is invalid (for val = A?, suit = undefined)"`,
                );
            });

            it('throws if the rank and suit are invalid', () => {
                expect(() => {
                    new Card(
                        'invalid-rank' as CardRank,
                        'invalid-suit' as CardSuit,
                    );
                }).toThrowErrorMatchingInlineSnapshot(
                    `"Card rank \\"invalid-rank\\" and suit \\"invalid-suit\\" is invalid (for val = invalid-rank, suit = invalid-suit)"`,
                );

                expect(() => {
                    new Card('??');
                }).toThrowErrorMatchingInlineSnapshot(
                    `"Card rank \\"undefined\\" and suit \\"undefined\\" is invalid (for val = ??, suit = undefined)"`,
                );
            });
        });
    });

    it('reports its full name', () => {
        ALL_CARD_SUITS.forEach((cardSuit) => {
            ALL_CARD_RANKS.forEach((CardRank) => {
                const card = new Card(CardRank, cardSuit);
                expect(card.name).toBe(`${card.rank} of ${card.suit}`);
            });
        });
    });

    it('reports its short name', () => {
        ALL_CARD_SUITS.forEach((cardSuit) => {
            ALL_CARD_RANKS.forEach((CardRank) => {
                const card = new Card(CardRank, cardSuit);
                expect(card.code).toBe(
                    `${CardRankToCode[card.rank]}${CardSuitToCode[card.suit]}`,
                );
            });
        });
    });

    it('reports card color', () => {
        ALL_CARD_SUITS.forEach((suit) => {
            ALL_CARD_RANKS.forEach((rank) => {
                const card = new Card(rank, suit);
                if ([CardSuit.clubs, CardSuit.spades].includes(card.suit)) {
                    expect(card.color).toBe(CardColor.black);
                } else if (
                    [CardSuit.diamonds, CardSuit.hearts].includes(card.suit)
                ) {
                    expect(card.color).toBe(CardColor.red);
                } else {
                    throw new Error('Unexpected suit');
                }
            });
        });
    });

    it('reports if its a face card', () => {
        ALL_CARD_SUITS.forEach((suit) => {
            ALL_CARD_RANKS.forEach((rank) => {
                const card = new Card(rank, suit);
                if (
                    [CardRank.jack, CardRank.queen, CardRank.king].includes(
                        card.rank,
                    )
                ) {
                    expect(card.isFaceCard).toBe(true);
                } else {
                    expect(card.isFaceCard).toBe(false);
                }
            });
        });
    });

    it('reports if its an honor card', () => {
        ALL_CARD_SUITS.forEach((suit) => {
            ALL_CARD_RANKS.forEach((rank) => {
                const card = new Card(rank, suit);
                if (
                    [
                        CardRank.ace,
                        CardRank.jack,
                        CardRank.queen,
                        CardRank.king,
                    ].includes(card.rank)
                ) {
                    expect(card.isHonorCard).toBe(true);
                } else {
                    expect(card.isHonorCard).toBe(false);
                }
            });
        });
    });

    it('reports if its a number card', () => {
        ALL_CARD_SUITS.forEach((suit) => {
            ALL_CARD_RANKS.forEach((rank) => {
                const card = new Card(rank, suit);
                if (
                    ![
                        CardRank.ace,
                        CardRank.jack,
                        CardRank.queen,
                        CardRank.king,
                    ].includes(card.rank)
                ) {
                    expect(card.isNumberCard).toBe(true);
                } else {
                    expect(card.isNumberCard).toBe(false);
                }
            });
        });
    });
});

describe('module consts', () => {
    describe('CardColor', () => {
        it('should match expected values', () => {
            expect(CardColor).toMatchInlineSnapshot(`
                Object {
                  "black": "black",
                  "red": "red",
                }
            `);
        });
    });

    describe('CardSuit', () => {
        it('should match expected values', () => {
            expect(CardSuit).toMatchInlineSnapshot(`
                Object {
                  "clubs": "clubs",
                  "diamonds": "diamonds",
                  "hearts": "hearts",
                  "spades": "spades",
                }
            `);
        });
    });

    describe('CardSuitToCode', () => {
        it('should match expected values', () => {
            expect(CardSuitToCode).toMatchInlineSnapshot(`
                Object {
                  "clubs": "C",
                  "diamonds": "D",
                  "hearts": "H",
                  "spades": "S",
                }
            `);
        });
    });

    describe('CardSuitFromCode', () => {
        it('should match expected values', () => {
            expect(CardSuitFromCode).toMatchInlineSnapshot(`
                Object {
                  "C": "clubs",
                  "D": "diamonds",
                  "H": "hearts",
                  "S": "spades",
                }
            `);
        });
    });

    describe('CardRank', () => {
        it('should match expected values', () => {
            expect(CardRank).toMatchInlineSnapshot(`
                Object {
                  "10": "ten",
                  "2": "two",
                  "3": "three",
                  "4": "four",
                  "5": "five",
                  "6": "six",
                  "7": "seven",
                  "8": "eight",
                  "9": "nine",
                  "ace": "ace",
                  "eight": 8,
                  "five": 5,
                  "four": 4,
                  "jack": "jack",
                  "king": "king",
                  "nine": 9,
                  "queen": "queen",
                  "seven": 7,
                  "six": 6,
                  "ten": 10,
                  "three": 3,
                  "two": 2,
                }
            `);
        });
    });

    describe('CardRankToCode', () => {
        it('should match expected values', () => {
            expect(CardRankToCode).toMatchInlineSnapshot(`
                Object {
                  "10": "T",
                  "2": "2",
                  "3": "3",
                  "4": "4",
                  "5": "5",
                  "6": "6",
                  "7": "7",
                  "8": "8",
                  "9": "9",
                  "ace": "A",
                  "jack": "J",
                  "king": "K",
                  "queen": "Q",
                }
            `);
        });
    });

    describe('CardRankFromCode', () => {
        it('should match expected values', () => {
            expect(CardRankFromCode).toMatchInlineSnapshot(`
                Object {
                  "2": 2,
                  "3": 3,
                  "4": 4,
                  "5": 5,
                  "6": 6,
                  "7": 7,
                  "8": 8,
                  "9": 9,
                  "A": "ace",
                  "J": "jack",
                  "K": "king",
                  "Q": "queen",
                  "T": 10,
                }
            `);
        });
    });

    describe('ALL_CARD_SUITS', () => {
        it('should match expected values', () => {
            expect(ALL_CARD_SUITS).toMatchInlineSnapshot(`
                Array [
                  "clubs",
                  "diamonds",
                  "hearts",
                  "spades",
                ]
            `);
        });
    });

    describe('BLACK_SUITS', () => {
        it('should match expected values', () => {
            expect(BLACK_SUITS).toMatchInlineSnapshot(`
                Array [
                  "clubs",
                  "spades",
                ]
            `);
        });
    });

    describe('RED_SUITS', () => {
        it('should match expected values', () => {
            expect(RED_SUITS).toMatchInlineSnapshot(`
                Array [
                  "diamonds",
                  "hearts",
                ]
            `);
        });
    });

    describe('ALL_CARD_RANKS', () => {
        it('should match expected values', () => {
            expect(ALL_CARD_RANKS).toMatchInlineSnapshot(`
                Array [
                  "ace",
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9,
                  10,
                  "jack",
                  "queen",
                  "king",
                ]
            `);
        });
    });

    describe('FACE_CARDS', () => {
        it('should match expected values', () => {
            expect(FACE_CARDS).toMatchInlineSnapshot(`
                Array [
                  "jack",
                  "queen",
                  "king",
                ]
            `);
        });
    });

    describe('HONOR_CARDS', () => {
        it('should match expected values', () => {
            expect(HONOR_CARDS).toMatchInlineSnapshot(`
                Array [
                  "jack",
                  "queen",
                  "king",
                  "ace",
                ]
            `);
        });
    });

    describe('NUMBER_CARDS', () => {
        it('should match expected values', () => {
            expect(NUMBER_CARDS).toMatchInlineSnapshot(`
                Array [
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9,
                  10,
                ]
            `);
        });
    });

    describe('ALL_CARDS', () => {
        it('should contain all possible cards', () => {
            const allCards: Array<Card> = [];

            ALL_CARD_SUITS.forEach((suit) => {
                ALL_CARD_RANKS.forEach((rank) => {
                    allCards.push(new Card(rank, suit));
                });
            });

            expect(ALL_CARDS.length).toEqual(52);
            expect(ALL_CARDS).toStrictEqual(allCards);
        });

        it('should match expected values', () => {
            expect(ALL_CARDS).toMatchSnapshot();
        });
    });

    describe('ALL_CARD_CODES', () => {
        it('should contain all possible card codes', () => {
            const allCardCodes: Array<string> = [];

            ALL_CARD_SUITS.forEach((suit) => {
                ALL_CARD_RANKS.forEach((rank) => {
                    allCardCodes.push(
                        `${CardRankToCode[rank]}${CardSuitToCode[suit]}`,
                    );
                });
            });

            expect(ALL_CARD_CODES.length).toEqual(52);
            expect(ALL_CARD_CODES).toStrictEqual(allCardCodes);
        });

        it('should match expected values', () => {
            expect(ALL_CARD_CODES).toMatchSnapshot();
        });
    });
});
