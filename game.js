var playerTurn = 0, grid = [[], [], [], [], [], []], gameOver = 0, i, colIndex, rowIndex, matchesHoriz = matchesVert = matchesDiagonal1 = matchesDiagonal2 = 0

document.querySelector('table').addEventListener('click', function(e) {
  colIndex = e.target.cellIndex
  try {
    (gameOver || colIndex == void 0) && z
    // Drop into column
    rowIndex = 6
    while (grid[--rowIndex][colIndex] != void 0) {}
  } catch (e) {
    return
  }
  // Keep track of latest move
  grid[rowIndex][colIndex] = playerTurn
  // Count matches
  for (i = 0; i < 7; i++) {
    // Horizontal matches
    matchesHoriz = playerTurn == grid[rowIndex][i] && matchesHoriz + 1 || 0
    if (i < 6) {
      // Vertical matches
      matchesVert = playerTurn == grid[i][colIndex] && matchesVert + 1 || 0
      // Diagonal matches
      matchesDiagonal1 = playerTurn == grid[i][colIndex + rowIndex - i] && matchesDiagonal1 + 1 || 0
      matchesDiagonal2 = playerTurn == grid[i][colIndex - rowIndex + i] && matchesDiagonal2 + 1 || 0
    }
    // Check win
    Math.max(matchesHoriz, matchesVert, matchesDiagonal1, matchesDiagonal2) > 3 && gameOver++
  }
  gameOver && console.log('WINNER!')
  // Switch turns
  playerTurn = +!playerTurn
  // Update board
  this.rows[rowIndex].cells[colIndex].style.background = playerTurn ? "#ff0" : "red"
})
