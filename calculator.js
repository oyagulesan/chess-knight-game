const findValidPositions = (board, position) => {
	const validPositions = [];
	if (position[0] - 1 >= 0 && position[1] - 2 >= 0 && board[position[0] - 1][position[1] - 2] === 0) {
		validPositions.push([position[0] - 1, position[1] - 2])
	}
	if (position[0] - 2 >= 0 && position[1] - 1 >= 0 && board[position[0] - 2][position[1] - 1] === 0) {
		validPositions.push([position[0] - 2, position[1] - 1])
	}
	if (position[0] + 1 <= 7 && position[1] - 2 >= 0 && board[position[0] + 1][position[1] - 2] === 0) {
		validPositions.push([position[0] + 1, position[1] - 2])
	}
	if (position[0] + 2 <= 7 && position[1] - 1 >= 0 && board[position[0] + 2][position[1] - 1] === 0) {
		validPositions.push([position[0] + 2, position[1] - 1])
	}
	if (position[0] - 1 >= 0 && position[1] + 2 <= 7 && board[position[0] - 1][position[1] + 2] === 0) {
		validPositions.push([position[0] - 1, position[1] + 2])
	}
	if (position[0] - 2 >= 0 && position[1] + 1 <= 7 && board[position[0] - 2][position[1] + 1] === 0) {
		validPositions.push([position[0] - 2, position[1] + 1])
	}
	if (position[0] + 1 <= 7 && position[1] + 2 <= 7 && board[position[0] + 1][position[1] + 2] === 0) {
		validPositions.push([position[0] + 1, position[1] + 2])
	}
	if (position[0] + 2 <= 7 && position[1] + 1 <= 7 && board[position[0] + 2][position[1] + 1] === 0) {
		validPositions.push([position[0] + 2, position[1] + 1])
	}
	return validPositions
}
const countCellsToFill = (board) => {
	return board.reduce((row1, row2) => {
        return row1 + 
            (row2 === 0 ? 0 : row2.reduce((col1, col2) => col1 + col2, 0));
    }, 0)
}

// Clean duplicates
const uniqueFilter = (value, index, self) => {
    return self.findIndex(brd => brd.map(row => row.join("-")).join("-")
        === value.map(row => row.join("-")).join("-")) === index;
}
const getBoards = (localBoard, position, localCounter) => {
    const validPositions = findValidPositions(localBoard, position);
    if (validPositions.length === 0) {
        return [localBoard]
    } else {
        let ctr = localCounter + 1;
        let res = []
        for (let i = 0; i < validPositions.length; i++) {
            const brd = localBoard.map(row => row.map(item => item))
            brd[validPositions[i][0]][validPositions[i][1]] = ctr;
            res = res.concat(getBoards(brd, validPositions[i], ctr))
        }
        return res
    }
}

console.log('started calculation', new Date());
let resultBoards = Array.from({ length: 64 }, () => {
    return [];
});

for (let i = 0; i < 1; i++) {
    for (let initX = 0; initX < 8; initX++) {
        for (let initY = 0; initY < 8; initY++) {
            const board = Array.from({ length: 8 }, () => {
                return Array.from({ length: 8 }, () => {
                  return 0;
                });
            });
            let counter = 1
            board[initX][initY] = counter;
            let x = initX;
            let y = initY;
    
            /* All possibilities evaluation */
            const results = getBoards(board, [x, y], counter);
            // eslint-disable-next-line no-loop-func
            results.forEach(res => {
                const max = res.reduce((row1, row2) => {
                    const max1 = typeof row1 === 'number' ? row1 : row1.reduce((a, b) => a > b ? a : b)
                    const max2 = row2.reduce((a, b) => a > b ? a : b)
                    return max1 > max2 ? max1 : max2
                })
                resultBoards[max - 1].push(res);
            })
            /* Random
            while (true) {
                const validPositions = findValidPositions(board, [x, y])
                if (validPositions.length > 0) {
                    const ind = Math.floor((Math.random() * (validPositions.length - 1)));
                    counter++;
                    board[validPositions[ind][0]][validPositions[ind][1]] = counter;
                } else {
                    const cellsToFill = 64 - counter; // countCellsToFill(board)
                    if (resultBoards.findIndex(brd => brd.map(row => row.join("-")).join("-")
                        === board.map(row => row.join("-")).join("-")) < 0) {
                        resultBoards[cellsToFill].push(board)
                    }
                    break;
                }
            }
            */
        }
    }
}


resultBoards.forEach((item, index) => {
    console.log('index', index, 'size', item.length)
})

resultBoards = resultBoards.map(res => res.filter(uniqueFilter));

resultBoards.forEach((item, index) => {
    console.log('after unique filter applied - index', index, 'size', item.length)
})

console.log('finished calculation', new Date());
const FILE_PATH = 'public/resultBoards.json';

const FileSystem = require("fs");
// Read from file
// const initBoards = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
FileSystem.writeFile(FILE_PATH, JSON.stringify(resultBoards), (error) => {
    if (error) throw error;
});
