var playerTurn = 0
var grid = [[], [], [], [], [], []]
var gameOver = 0

document.body.children[0].onclick = function(e) {
  var colIndex = e.target.cellIndex
  if (gameOver || colIndex == void 0) {
    return
  }
  // Drop into column
  rowIndex = 6
  while (grid[--rowIndex] && grid[rowIndex][colIndex] + 1);
  if (rowIndex == void 0) {
    return
  }
  // Keep track of latest move
  grid[rowIndex][colIndex] = playerTurn
  // Count matches
  var matchesHoriz = matchesVert = matchesDiagonal1 = matchesDiagonal2 = 0
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
  // Update board
  this.rows[rowIndex].cells[colIndex].style.background =
    playerTurn ? "red" : "#ff0"
  // Switch turns
  playerTurn = +!playerTurn
}
