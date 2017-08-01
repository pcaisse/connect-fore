var playerTurn = 0, grid = [[], [], [], [], [], []], gameOver = 0, i, colIndex, rowIndex, matchesHoriz, matchesVert, matchesDiagonal1, matchesDiagonal2

function updateMatches(value, matches) {
  return value == playerTurn ? (matches || 0) + 1 : 0
}

document.querySelector('table').addEventListener('click', function(e) {
  colIndex = e.target.cellIndex
  if (gameOver || colIndex == void 0) {
    return
  }
  // Drop into column
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
  for (i = 0; i < 7; i++) {
    // Horizontal matches
    matchesHoriz = updateMatches(grid[rowIndex][i], matchesHoriz)
    if (i < 6) {
      // Vertical matches
      matchesVert = updateMatches(grid[i][colIndex], matchesVert)
      // Diagonal matches
      matchesDiagonal1 = updateMatches(grid[i][colIndex + rowIndex - i], matchesDiagonal1)
      matchesDiagonal2 = updateMatches(grid[i][colIndex - rowIndex + i], matchesDiagonal2)
    }
    // Check win
    if ([matchesHoriz, matchesVert, matchesDiagonal1, matchesDiagonal2].some(function(m) { return m == 4 })) {
      gameOver = 1
    }
  }
  if (gameOver) {
    console.log('WINNER!')
  }
  // Switch turns
  playerTurn = +!playerTurn
  // Update board
  this.rows[rowIndex].cells[colIndex].style.background = playerTurn ? "#ff0" : "red"
})
