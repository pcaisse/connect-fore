# Connect "Fore!"

## Challenge

Implement the game [Connect Four](https://en.wikipedia.org/wiki/Connect_Four) such that the source code of `game.js` is as short as possible.

## Gameplay

Gameplay is [as described here](https://en.wikipedia.org/wiki/Connect_Four#Gameplay).

* Game board is 7 columns x 6 rows
* Players alternate turns
* Player 1 is yellow; Player 2 is red
* The object of the game is to connect 4 same colored discs in a row (down, across, or diagonally)
* Play continues until a player wins

## Requirements

* Clicking on the game board will cause the disc to be "dropped" into that column
* Attempting to place a disc in a column that is full is ignored
* Upon winning, the string 'WINNER!' must be logged to the console and no further moves can be made
* No errors are thrown through normal gameplay
* Must pass all tests
* **No external libraries**
* Must conform to the [ECMAScript 5 specification](https://www.ecma-international.org/ecma-262/5.1/)

## Tests

The test suite consists entirely of integration tests so as not to constrain the implementation in any way. For testing, a simple static file server is stood up and then UI tests are run against the code (see `test/test.js`).

Run tests via `yarn test`.
