import util from "node:util";

export const SUITS = ["Hearts", "Diamonds", "Clubs", "Spades"];
export const RANKS = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

export class Card {
  #suit;
  #rank;
  constructor(suit, rank) {
    this.#suit = suit;
    this.#rank = rank;
  }

  getSuit() {
    return this.#suit;
  }

  getRank() {
    return this.#rank;
  }

  toString() {
    return `${this.#rank} of ${this.#suit}`;
  }

  // Fixes node.js console.log() output for Card instances when using private fields
  [util.inspect.custom]() {
    return this.toString();
  }
}
