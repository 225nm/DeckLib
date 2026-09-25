import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Card, SUITS, RANKS } from "../src/Card.js";
import { Deck } from "../src/Deck.js";
import { Hand } from "../src/Hand.js";
import { DiscardPile } from "../src/DiscardPile.js";
import { Shuffler } from "../src/Shuffler.js";

describe("Card Game Library Unit Tests", () => {
  
  describe("Card Class", () => {
    it("should instantiate with valid suit and rank", () => {
      const card = new Card("Hearts", "A");
      assert.strictEqual(card.getSuit(), "Hearts");
      assert.strictEqual(card.getRank(), "A");
      assert.strictEqual(card.getRankWeight(), 14);
      assert.strictEqual(card.toString(), "A of Hearts");
    });

    it("should throw TypeError for invalid suit or rank", () => {
      assert.throws(() => new Card("Jokers", "A"), TypeError);
      assert.throws(() => new Card("Spades", "15"), TypeError);
    });

    it("should compare cards correctly with compareTo()", () => {
      const aceSpades = new Card("Spades", "A");
      const twoHearts = new Card("Hearts", "2");
      const aceHearts = new Card("Hearts", "A");

      assert.strictEqual(aceSpades.compareTo(twoHearts) > 0, true);
      assert.strictEqual(twoHearts.compareTo(aceSpades) < 0, true);
      // Tie-breaker by suit weight (Hearts < Spades)
      assert.strictEqual(aceHearts.compareTo(aceSpades) < 0, true);
    });
  });

  describe("Hand Class", () => {
    it("should add and remove cards correctly", () => {
      const hand = new Hand();
      const card1 = new Card("Clubs", "5");
      const card2 = new Card("Diamonds", "K");

      hand.addCard(card1);
      hand.addCard(card2);

      assert.strictEqual(hand.getHandSize(), 2);

      const removed = hand.removeCard(card1);
      assert.strictEqual(removed.getRank(), "5");
      assert.strictEqual(hand.getHandSize(), 1);
    });

    it("should sort cards by value (Ace high)", () => {
      const hand = new Hand([
        new Card("Hearts", "A"),
        new Card("Clubs", "2"),
        new Card("Spades", "10"),
      ]);

      hand.sortByValue();
      const cards = hand.getCards();

      assert.strictEqual(cards[0].getRank(), "2");
      assert.strictEqual(cards[1].getRank(), "10");
      assert.strictEqual(cards[2].getRank(), "A");
    });

    it("should play a card from hand to discard pile", () => {
      const hand = new Hand([new Card("Hearts", "7")]);
      const discardPile = new DiscardPile();
      const cardToPlay = hand.getCards()[0];

      hand.playCard(cardToPlay, discardPile);

      assert.strictEqual(hand.getHandSize(), 0);
      assert.strictEqual(discardPile.getPileSize(), 1);
      assert.strictEqual(discardPile.getTopCard().toString(), "7 of Hearts");
    });
  });

  describe("DiscardPile Class", () => {
    it("should track cards and return top card correctly", () => {
      const pile = new DiscardPile();
      const c1 = new Card("Spades", "3");
      const c2 = new Card("Hearts", "Q");

      pile.addCard(c1);
      pile.addCard(c2);

      assert.strictEqual(pile.getPileSize(), 2);
      assert.strictEqual(pile.getTopCard().toString(), "Q of Hearts");
    });

    it("should clear all cards when clear() is called", () => {
      const pile = new DiscardPile([new Card("Diamonds", "4")]);
      assert.strictEqual(pile.getPileSize(), 1);

      const cleared = pile.clearPile();
      assert.strictEqual(cleared.length, 1);
      assert.strictEqual(pile.getPileSize(), 0);
    });
  });

  describe("Deck & DiscardPile Integration", () => {
    it("should draw cards and successfully reshuffle discard pile back into deck", () => {
      const deck = new Deck();
      const discardPile = new DiscardPile();

      // Draw all 52 cards
      const allCards = deck.drawMultiple(52);
      assert.strictEqual(deck.remainingDeckSize(), 0);

      // Add them to discard pile
      discardPile.addCard(allCards);
      assert.strictEqual(discardPile.getPileSize(), 52);

      // Reshuffle discard pile back into deck
      deck.reshuffleDiscardPile(discardPile);

      assert.strictEqual(deck.remainingDeckSize(), 52);
      assert.strictEqual(discardPile.getPileSize(), 0);
    });
  });

});