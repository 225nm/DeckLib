import { Card } from './src/Card.js';
import { Deck } from './src/Deck.js';
import { Shuffler } from './src/Shuffler.js';

const deck = new Deck()
const unshuffledDeck = deck.unShuffledDeck()
//console.log("New deck in a not shuffled order:")
//console.log(deck.#cards);

console.log("Shuffled deck:")
console.log(deck.getCards());