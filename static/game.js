var playerTurn = 0
var gridString = Array(43).join()
var gameOver = 0

document.body.children[0].onclick = function(e) {
  var colIndex = e.target.cellIndex
  if (!gameOver && colIndex + 1) {
    // Drop into column
    for (var index = 35 + colIndex; index >= 0 && gridString[index] != ","; index -= 7);
    if (index >= 0) {
      // Keep track of latest move
      gridString = gridString.slice(0, index) + playerTurn + gridString.slice(index + 1);
      // Count matches
      /(\d)(\1{3}|(.{6}\1){3}|(.{7}\1){3}|(.{5}\1){3})/.exec(gridString) && ++gameOver && console.log('WINNER!')
      // Update board
      this.rows[~~(index / 7)].cells[index % 7].style.background =
        playerTurn ? "red" : "#ff0"
      // Switch turns
      playerTurn = +!playerTurn
    }
  }
}
