import { Card, SUITS, RANKS } from "./Card.js";

export class Deck {
  constructor(cards) {
    this.cards = cards || this.standardDeck();
  }

  standardDeck() {
    const cards = [];
    for (const suit of SUITS) {
      for (const rank of RANKS) {
        cards.push(new Card(suit, rank));
      }
    }
    return cards;
  }
}
