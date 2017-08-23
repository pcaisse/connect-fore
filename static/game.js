var COLS = 7
var ROWS = 6
var MATCHES_TO_WIN = 4

var playerTurn = 0
var grid = [[], [], [], [], [], []]
var gameOver = false

function updateMatches(value, matches) {
  return value === playerTurn ? (matches || 0) + 1 : 0
}

var table = document.querySelector('table')
table.addEventListener('click', function(e) {
  var colIndex = e.target.cellIndex
  if (gameOver || typeof colIndex === "undefined") {
    return
  }
  // Drop into column
  var i, rowIndex
  for (i = ROWS - 1; i >= 0; i--) {
    if (typeof grid[i][colIndex] === "undefined") {
      rowIndex = i
      break
    }
  }
  if (typeof rowIndex === "undefined") {
    return
  }
  // Keep track of latest move
  grid[rowIndex][colIndex] = playerTurn
  // Count matches
  var matchesHoriz, matchesVert, matchesDiagonal1, matchesDiagonal2
  for (i = 0; i < COLS; i++) {
    // Horizontal matches
    matchesHoriz = updateMatches(grid[rowIndex][i], matchesHoriz)
    if (i < ROWS) {
      // Vertical matches
      matchesVert = updateMatches(grid[i][colIndex], matchesVert)
      // Diagonal matches
      matchesDiagonal1 = updateMatches(
        grid[i][colIndex + rowIndex - i], matchesDiagonal1)
      matchesDiagonal2 = updateMatches(
        grid[i][colIndex - rowIndex + i], matchesDiagonal2)
    }
    // Check win
    if (matchesHoriz >= MATCHES_TO_WIN ||
        matchesVert >= MATCHES_TO_WIN ||
        matchesDiagonal1 >= MATCHES_TO_WIN ||
        matchesDiagonal2 >= MATCHES_TO_WIN) {
      gameOver = true
    }
  }
  if (gameOver) {
    console.log('WINNER!')
  }
  // Update board
  table.rows[rowIndex].cells[colIndex].style.backgroundColor =
    playerTurn ? "red" : "yellow"
  // Switch turns
  playerTurn = playerTurn ? 0 : 1
})
