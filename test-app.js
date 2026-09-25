import { Card } from './src/Card.js';
import { Deck } from './src/Deck.js';
import { Shuffler } from './src/Shuffler.js';
import { Hand } from './src/Hand.js';

const deck = new Deck()
const unshuffledDeck = deck.unShuffledDeck()
console.log("New deck in a not shuffled order:")
console.log(unshuffledDeck);

console.log("Shuffled deck:")
console.log(deck.getCards());

deck.draw()
console.log("Deck after drawing one card:")
console.log(deck.getCards());


deck.drawMultiple(5);
console.log("Deck after drawing 5 additional cards:")
console.log(deck.getCards());

console.log("Current top card of the deck:")
console.log(deck.getTopCard());

const hand = new Hand();
hand.addCard(deck.drawMultiple(3));
console.log("Hand after drawing 3 cards from the deck:")
console.log(hand.getCards());
hand.sortByValue();
console.log("Hand after sorting by value:")
console.log(hand.getCards());

deck.drawMultiple(43);
console.log("Deck after drawing the 43 remaining cards:")
console.log(deck.getCards());

const Deck2 = new Deck();
console.log("New deck2 in a shuffled order:")
console.log(Deck2.getCards());

console.log("This should draw the last card and throw an error:")
deck.draw()