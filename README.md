# Connect "Fore!"
code golf in JS

## Challenge

Implement the game [Connect Four](https://en.wikipedia.org/wiki/Connect_Four) such that the source code of `game.js` is as short as possible.

## Gameplay

Gameplay is [as described here](https://en.wikipedia.org/wiki/Connect_Four#Gameplay).

* Game board is 7 columns x 6 rows
* Players alternate turns
* Player 1 is yellow; Player 2 is red
* The object of the game is to connect 4 same colored discs in a row (down, across, or diagonally)
* Play continues until a player wins

## Implementation Requirements

* Clicking on the game board will cause the disc to be dropped into that column
* Attempting to place a disc in a column that is full is ignored
* Upon winning, the string 'WINNER!' must be logged to the console and no further moves can be made
* No errors are thrown through normal gameplay
* Must work on modern browsers (TODO: Define this more precisely)
* No external libraries
