var playerTurn = 0
var grid = [[], [], [], [], [], []]
var gameOver = false

function updateMatches(value, matches) {
  return value == playerTurn ? (matches || 0) + 1 : 0
}

var table = document.querySelector('table')
table.addEventListener('click', function(e) {
  var colIndex = e.target.cellIndex
  if (gameOver || colIndex == void 0) {
    return
  }
  // Drop into column
  var i, rowIndex
  for (i = 5; i >= 0; i--) {
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
  for (i = 0; i < 7; i++) {
    // Horizontal matches
    matchesHoriz = updateMatches(grid[rowIndex][i], matchesHoriz)
    if (i < 6) {
      // Vertical matches
      matchesVert = updateMatches(grid[i][colIndex], matchesVert)
      // Diagonal matches
      matchesDiagonal1 = updateMatches(
        grid[i][colIndex + rowIndex - i], matchesDiagonal1)
      matchesDiagonal2 = updateMatches(
        grid[i][colIndex - rowIndex + i], matchesDiagonal2)
    }
    // Check win
    if (matchesHoriz >= 4 ||
        matchesVert >= 4 ||
        matchesDiagonal1 >= 4 ||
        matchesDiagonal2 >= 4) {
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
