var grid = [[], [], [], [], [], []], i, colIndex, rowIndex, gridString, value
var playerTurn = 0
var gameOver = 0

document.body.children[0].addEventListener('click', function(e) {
  colIndex = e.target.cellIndex
  if (!gameOver && +(colIndex + 1)) {
    // Drop into column
    rowIndex = 6
    while (grid[--rowIndex] && grid[rowIndex][colIndex] + 1);

    if (rowIndex >= 0) {
      // Keep track of latest move
      grid[rowIndex][colIndex] = playerTurn
      // Count matches
      gridString = ''
      for (i = 0; i < 42; i++) {
        value = grid[~~(i / 7)][i % 7]
        gridString += +(value + 1) ? value : " "
      }
      /(\d)(\1{3}|(.{6}\1){3}|(.{7}\1){3}|(.{5}\1){3})/.exec(gridString) && ++gameOver && console.log('WINNER!')
      // Switch turns
      playerTurn = +!playerTurn
      // Update board
      this.rows[rowIndex].cells[colIndex].style.background = playerTurn ? "#ff0" : "red"
    }
  }
})
