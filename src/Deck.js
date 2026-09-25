import { Card, SUITS, RANKS } from "./Card.js";
import { Shuffler } from "./Shuffler.js";

export class Deck {
  #cards;
  #shuffler;
  constructor(cards = null, shuffler = new Shuffler()) {
    this.#shuffler = shuffler;
    this.#cards = cards || this.standardDeck();
  }

  shuffle() {
    this.#cards = this.#shuffler.shuffle(this.#cards);
  }

  standardDeck() {
    const cards = this.unShuffledDeck();
    return this.#shuffler.shuffle(cards);
  }

  unShuffledDeck() {
    const cards = [];
    for (const suit of SUITS) {
      for (const rank of RANKS) {
        cards.push(new Card(suit, rank));
      }
    }
    return cards;
  }
  draw() {
    if (this.isDeckEmpty()) {
      throw new Error("Deck is empty. Cannot draw a card.");
    }
    return this.#cards.pop();
  }

  drawMultiple(count) {
    if (count <= 0 || !Number.isInteger(count)) {
      throw new Error("Invalid count. Please provide a positive integer.");
    }
    if (count > this.remainingDeckSize()) {
      throw new Error(
        `Cannot draw ${count} cards. Only ${this.remainingDeckSize()} cards remaining in the deck.`,
      );
    }

    const drawnCards = [];
    for (let i = 0; i < count; i++) {
      const card = this.draw();
      drawnCards.push(card);
    }
    return drawnCards;
  }

  remainingDeckSize() {
    return this.#cards.length;
  }

  isDeckEmpty() {
    return this.#cards.length === 0;
  }

  getCards() {
    return [...this.#cards];
  }
}
