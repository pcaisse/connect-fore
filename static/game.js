grid = [[], [], [], [], [], []], playerTurn = 0, gameOver = 0

document.body.children[0].onclick = function(e) {
  colIndex = e.target.cellIndex
  if (!gameOver && colIndex + 1) {
    // Drop into column
    rowIndex = 6
    while (grid[--rowIndex] && grid[rowIndex][colIndex] + 1);

    if (rowIndex >= 0) {
      // Keep track of latest move
      grid[rowIndex][colIndex] = playerTurn
      // Count matches
      gridString = ''
      for (i = 42; i--;) {
        gridString = (grid[~~(i / 7)][i % 7] + 1 || " ") + gridString
      }
      /(\d)(\1{3}|(.{6}\1){3}|(.{7}\1){3}|(.{5}\1){3})/.exec(gridString) && ++gameOver && console.log('WINNER!')
      // Update board
      this.rows[rowIndex].cells[colIndex].style.background = playerTurn ? "red" : "#ff0"
      // Switch turns
      playerTurn = +!playerTurn
    }
  }
}
