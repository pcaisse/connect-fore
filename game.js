var playerTurn = 0
var grid = [[], [], [], [], [], []]
var COLS = 7
var ROWS = 6
var MATCHES_TO_WIN = 4
var gameOver = false

function updateMatches(value, matches) {
  return value == playerTurn ? (matches || 0) + 1 : 0
}

document.querySelector('table').addEventListener('click', function(e) {
  if (gameOver || e.target.cellIndex == void 0) {
    return
  }
  var colIndex = e.target.cellIndex
  var i, rowIndex
  // Drop into column
  for (i = ROWS - 1; i >= 0; i--) {
    if (grid[i][colIndex] == void 0) {
      rowIndex = i
      break
    }
  }
  if (rowIndex == void 0) {
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
      matchesDiagonal1 = updateMatches(grid[i][colIndex + rowIndex - i], matchesDiagonal1)
      matchesDiagonal2 = updateMatches(grid[i][colIndex - rowIndex + i], matchesDiagonal2)
    }
    // Check win
    if ([matchesHoriz, matchesVert, matchesDiagonal1, matchesDiagonal2].some(function(m) { return m == MATCHES_TO_WIN })) {
      gameOver = true
    }
  }
  if (gameOver) {
    console.log('WINNER!')
  }
  // Switch turns
  playerTurn = playerTurn ? 0 : 1
  // Update board
  this.rows[rowIndex].cells[colIndex].style.background = playerTurn ? "#ff0" : "red"
})
