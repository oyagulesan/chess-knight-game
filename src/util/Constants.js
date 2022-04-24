export const minCount = 32;
export const maxCount = 63;
export const cellHeight = 150;
export const top = "120px";
export const left = "40px";
export const selectedColors = ["rgb(0, 0, 150)", "rgb(100, 100, 200)", "#FFF"];
export const colors = ["rgb(0, 0, 255)", "rgb(200, 200, 255)", "#FFF"];
export const divCell = 40;
export const height = "40px";
export const width = "30px";
export const knight = require("../assets/images/knight.png");
export const initialPosition = [180, 400];
export const findMax = (a, b) => {
  return a && b ? (a > b ? a : b) : a || b || 0;
};
export const indexOf2dArray = (array2d, itemtofind) => {
  const index = [].concat
    .apply([], [].concat.apply([], array2d))
    .indexOf(itemtofind);

  // return "false" if the item is not found
  if (index === -1) {
    return false;
  }

  // Use any row to get the rows' array length
  // Note, this assumes the rows are arrays of the same length
  const numColumns = array2d[0].length;

  // row = the index in the 1d array divided by the row length (number of columns)
  const row = parseInt(index / numColumns);

  // col = index modulus the number of columns
  const col = index % numColumns;

  return [row, col];
};
export const findValidPositions = (board, position) => {
	const validPositions = [];
	if (position[0] - 1 >= 0 && position[1] - 2 >= 0 && board[position[0] - 1][position[1] - 2] === 1) {
		validPositions.push([position[0] - 1, position[1] - 2])
	}
	if (position[0] - 2 >= 0 && position[1] - 1 >= 0 && board[position[0] - 2][position[1] - 1] === 1) {
		validPositions.push([position[0] - 2, position[1] - 1])
	}
	if (position[0] + 1 <= 7 && position[1] - 2 >= 0 && board[position[0] + 1][position[1] - 2] === 1) {
		validPositions.push([position[0] + 1, position[1] - 2])
	}
	if (position[0] + 2 <= 7 && position[1] - 1 >= 0 && board[position[0] + 2][position[1] - 1] === 1) {
		validPositions.push([position[0] + 2, position[1] - 1])
	}
	if (position[0] - 1 >= 0 && position[1] + 2 <= 7 && board[position[0] - 1][position[1] + 2] === 1) {
		validPositions.push([position[0] - 1, position[1] + 2])
	}
	if (position[0] - 2 >= 0 && position[1] + 1 <= 7 && board[position[0] - 2][position[1] + 1] === 1) {
		validPositions.push([position[0] - 2, position[1] + 1])
	}
	if (position[0] + 1 <= 7 && position[1] + 2 <= 7 && board[position[0] + 1][position[1] + 2] === 1) {
		validPositions.push([position[0] + 1, position[1] + 2])
	}
	if (position[0] + 2 <= 7 && position[1] + 1 <= 7 && board[position[0] + 2][position[1] + 1] === 1) {
		validPositions.push([position[0] + 2, position[1] + 1])
	}
	return validPositions
}
export const countCellsToFill = (board) => {
	return board.reduce((row1, row2) => 
		row1.reduce((col1, col2) => col1 + col2, 0) + row2.reduce((col1, col2) => col1 + col2, 0), 0)
}
export const validate = (x1, y1, x2, y2) => {
  return (
    (Math.abs(x1 - x2) === 1 && Math.abs(y1 - y2) === 2) ||
    (Math.abs(x1 - x2) === 2 && Math.abs(y1 - y2) === 1)
  );
};

function isValidPosition(board, position) {
  return (
    board[position[0]] !== undefined &&
    board[position[0]][position[1]] !== undefined &&
    board[position[0]][position[1]] === 1
  );
}

function addIfValidPosition(board, moves, row, col) {
  if (isValidPosition(board, [row, col])) {
    moves.push([row, col]);
  }
}

function getPossibleMoves(board, position) {
  var moves = [];
  addIfValidPosition(board, moves, position[0] + 2, position[1] + 1);
  addIfValidPosition(board, moves, position[0] + 2, position[1] - 1);
  addIfValidPosition(board, moves, position[0] - 2, position[1] + 1);
  addIfValidPosition(board, moves, position[0] - 2, position[1] - 1);
  addIfValidPosition(board, moves, position[0] + 1, position[1] + 2);
  addIfValidPosition(board, moves, position[0] + 1, position[1] - 2);
  addIfValidPosition(board, moves, position[0] - 1, position[1] + 2);
  addIfValidPosition(board, moves, position[0] - 1, position[1] - 2);
  return moves;
}

export function buildRandomPosition(moveCount) {
  const max = 1000;
  var trycount = max;
  while (trycount > 0) {
    trycount--;
    var board = tryBuildingRandomPosition(moveCount);
    if (board.length > 0) return board;
  }
  alert("Couldn't build in " + max + " tries");
  return [];
}

function tryBuildingRandomPosition(moveCount) {
  const board = Array.from({ length: 8 }, () => {
    return Array.from({ length: 8 }, () => {
      return 1;
    });
  });
  let position = [getRandomInt(8), getRandomInt(8)];
  board[position[0]][position[1]] = 0;
  for (var i = 0; i < moveCount; i++) {
    var moves = getPossibleMoves(board, position);
    if (moves.length === 0) {
      return [];
    }
    position = moves[getRandomInt(moves.length)];
    board[position[0]][position[1]] = 0;
  }
console.log(board)
  return board;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
