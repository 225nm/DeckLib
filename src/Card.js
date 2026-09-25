export const SUITS = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
export const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }
}