# Connect "Fore!" 🏌

## Challenge

Implement the game [Connect Four](https://en.wikipedia.org/wiki/Connect_Four) such that the source code of `game.js` is as short as possible without editing any other files.

## Gameplay

Gameplay is [as described here](https://en.wikipedia.org/wiki/Connect_Four#Gameplay):

* Game board is 6 x 7 (6 rows and 7 columns)
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
* Must conform to the [ECMAScript 5 specification](https://www.ecma-international.org/ecma-262/5.1/)
* **No external libraries**

## Development

For development, please [install Yarn](https://yarnpkg.com/lang/en/docs/install/) and run `yarn install`. There are several commands (see `package.json`) which are useful in development:

|Command                  |Description|
|-------------------------|-----------|
|`yarn test`              |Runs [tests](#tests)|
|`yarn char-count`        |Returns the number of characters in `static/game.js` (unminified)|
|`yarn char-count-min`    |Minifies `static/game.js` and returns the number of characters in the minified version|
|`yarn compare-counts`    |Compares the character count `static/game.js` of the currently checked out commit to that of the previous commit|
|`yarn start`             |"Production" build with minified JS|
|`yarn debug`             |Build unminifed version of JS for debugging|

## Tests

The test suite consists entirely of integration tests so as not to constrain the implementation in any way. For testing, a simple static file server is stood up and then UI tests are run against the code (see `test/test.js`).

Run tests via `yarn test`.
