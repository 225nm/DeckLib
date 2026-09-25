import { Card } from "./Card.js";

export class Hand {
  #cards;

  constructor(cards = []) {
    this.#cards = [...cards];
  }

  addCard(cards) {
    if (Array.isArray(cards)) {
      this.#cards.push(...cards);
    } else {
      this.#cards.push(cards);
    }
  }

  removeCard(card) {
    if (!(card instanceof Card)) {
      throw new TypeError("Argument must be an instance of Card.");
    }
    const index = this.#cards.findIndex(
      (c) => c.getSuit() === card.getSuit() && c.getRank() === card.getRank(),
    );
    if (index !== -1) {
      return this.#cards.splice(index, 1);
    }
  }

  getHandSize() {
    return this.#cards.length;
  }

  getCards() {
    return [...this.#cards];
  }

  sortByValue() {
    this.#cards.sort((a, b) => a.compareTo(b));
  }

  playCard(card, discardPile) {
    const playedCard = this.removeCard(card);
    if (!playedCard) {
      throw new Error("Card not found in hand.");
    }
    discardPile.addCard(playedCard);
  }
}
