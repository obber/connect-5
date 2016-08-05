const idToCoordinates = (tileId) => (
  // tileId is expected to be a 2 digit string. e.g. "aa", "cs", etc.
  // we grab the integer representation of the coordinates with charCodeAt - 97.
  // "a" maps to 0, "s" maps to 18. (19 possible slots)

  // the first character repsents the column index
  // the second character represents the row index
  {
    x: tileId.charCodeAt(1) - 97, 
    y: tileId.charCodeAt(0) - 97
  }
);

const isOpen = (board, tileId) => {
  // returns boolean indicating whether a board is open at that slot
  const { x, y } = idToCoordinates(tileId);
  return board[y][x] === 0;
};

const runCount = (board, tileId, direction) => {
  const { x, y } = idToCoordinates(tileId);

  // returns the consecutive run count that the id is a part of
  let count = 1;
  let player = 0;

  // get the player who made the move (integer 1 or 2)
  if (board[y][x] === 1 || board[y][x] === 2) {
    player = board[y][x];
  } else {
    throw new Error("the last move was not placed on the board properly.");
  }

  // current position (x and y will be reassigned as we look for runs)
  const cur = { x, y };

  switch (direction) {
    case "horizontal":
      // look left
      while (board[y][--cur.x] === player) {
        count++;
      }
      // reset pos
      cur.x = x;
      // look right
      while (board[y][++cur.x] === player) {
        count++;
      }
      break;

    case "vertical":
      // look up
      while (board[cur.y - 1] && board[--cur.y][x] === player) {
        count++;
      }
      // reset pos
      cur.y = y;
      // look down
      while (board[cur.y + 1] && board[++cur.y][x] === player) {
        count++;
      }
      break;

    case "major":
      // look left & up
      while (board[cur.y - 1] && board[--cur.y][--cur.x] === player) {
        count++;
      }
      // reset pos
      cur.y = y;
      cur.x = x;
      // look right & down
      while (board[cur.y + 1] && board[++cur.y][++cur.x] === player) {
        count++;
      }
      break;

    case "minor":
      // look left & down
      while (board[cur.y + 1] && board[++cur.y][--cur.x] === player) {
        count++;
      }
      // reset pos
      cur.y = y;
      cur.x = x;
      // look right & up
      while (board[cur.y - 1] && board[--cur.y][++cur.x] === player) {
        count++;
      }
      break;

    default:
      throw new Error("invalid direction within runcount invocation");
  }

  return count;
}

export { idToCoordinates, runCount, isOpen };
