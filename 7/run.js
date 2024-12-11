function moveTrain(board, mov) {
  const directions = {
    U: { i: -1, j: 0 },
    D: { i: 1, j: 0 },
    L: { i: 0, j: -1 },
    R: { i: 0, j: 1 },
  };

  const direction = directions[mov];
  let result = "none";
  let headPosition = null;

  for (let i = 0; i < board.length; i++) {
    const j = board[i].indexOf("@");
    if (j !== -1) {
      headPosition = { i, j };
      const di = headPosition.i + direction.i;
      const dj = headPosition.j + direction.j;
      if (
        di < 0 ||
        di >= board.length ||
        dj < 0 ||
        dj >= board[0].length ||
        board[di][dj] === "o"
      ) {
        result = "crash";
        break;
      } else if (board[di][dj] === "*") result = "eat";
      break;
    }
  }

  return result;
}
