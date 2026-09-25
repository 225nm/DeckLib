# DeckLib
A module for simple 52 card deck logic using JS.

Contains the following classes:
Card, Deck, DiscardPile, Hand, Shuffler.

## Features 
- Standard 52-card deck — built automatically (new Deck()), or supply your own array of Cards for custom variants.
- Encapsulated state — Card, Deck, Hand, and DiscardPile all use private fields; you interact through their public methods only, so internal state can't be mutated by accident.
- Validated cards — Card throws immediately if constructed with an invalid suit or rank, instead of failing silently later.
- Built-in comparison — card.compareTo(otherCard) compares by rank, with suit as a tiebreaker, so hands can be sorted out of the box via hand.sortByValue().
- Swappable shuffling — Deck accepts any object with a shuffle(cards) method (see Shuffler), so you can supply your own shuffling strategy without modifying Deck itself. Comes with fisher-yates as default.
- Safe draw operations — draw(), drawMultiple(count), and getTopCard() throw clear errors on invalid input or an empty deck, rather than returning undefined.
- Full hand/discard workflow — move cards between a Hand and a DiscardPile with playCard(), and reshuffle a spent discard pile back into the deck with reshuffleDiscardPile().
- Readable output — Card implements Node's custom inspect symbol, so console.log() prints cards as "K of Spades" instead of an opaque object with hidden private fields.


## Installation 
### bash:
- npm install github:eb225nm/decklib

- Ensure that your package.json has type: "module"

- Place "import { Deck, Hand, DiscardPile, Card } from 'DeckLib'"
at the top of your js file to use the libraries features.

## Example usage

```
import { Deck, Hand, DiscardPile } from "decklib";

const deck = new Deck();       // shuffled standard 52-card deck
const discardPile = new DiscardPile(); // Discard pile for played cards
const hand = new Hand(deck.drawMultiple(5)); // A player hand with 5 drawn cards

hand.sortByValue(); // Sort the hand by value
console.log(hand.getCards());  // e.g. [2 of Hearts, 7 of Clubs, ...]

const [firstCard] = hand.getCards(); // Plays the first card in the hand
hand.playCard(firstCard, discardPile);

console.log(deck.remainingDeckSize()); // Gets the remaining deck size
console.log(discardPile.getPileSize()); // Gets the discard pile size
```

### Example output
```
[ 2 of Spades, 4 of Hearts, 6 of Clubs, 7 of Diamonds, 7 of Clubs ]
47
1
```