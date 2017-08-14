var grid = [[], [], [], [], [], []], i, colIndex, rowIndex, gridString, playerTurn = 1, gameOver = 0

document.body.children[0].onclick = function(e) {
  colIndex = e.target.cellIndex
  if (!gameOver && +(colIndex + 1)) {
    // Drop into column
    rowIndex = 6
    while (grid[--rowIndex] && grid[rowIndex][colIndex]);

    if (rowIndex >= 0) {
      // Keep track of latest move
      grid[rowIndex][colIndex] = playerTurn
      // Count matches
      gridString = ''
      for (i = 42; i--;) {
        gridString = (grid[~~(i / 7)][i % 7] || " ") + gridString
      }
      /(\d)(\1{3}|(.{6}\1){3}|(.{7}\1){3}|(.{5}\1){3})/.exec(gridString) && ++gameOver && console.log('WINNER!')
      // Update board
      this.rows[rowIndex].cells[colIndex].style.background = playerTurn > 1 ? "red" : "#ff0"
      // Switch turns
      playerTurn = playerTurn > 1 ? 1 : 2
    }
  }
}
