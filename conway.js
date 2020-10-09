// Mridul Awasthi
// CS 375-001

function createBoard(row, col) {

	var count = 0;
	let container = document.getElementById("table-container");
	let table = document.createElement("table");

	for (let i = 0; i < row; i++) {
        var rows = table.insertRow(i);
        if(i%2 == 0){
            var color = 'black';
        } else {
            var color = 'white';
        }
		console.log('check');
		for (let j = 0; j < col; j++) {
            var cols = rows.insertCell(j);
            cols.style.backgroundColor = color;
            if(color === 'black') {
                color = 'white';
            } else {
                color = 'black';
            }
			count += 1;
		}
	}
	container.append(table);
}
createBoard(25, 25);

function stepBoard(board) {

    var h = board.length;
    if(!h) {
        return board;
    }
    var w = board[0].length;

    // initialize duplicate array

    var newBoard = [];
    for(var i=0; i<h; i++) {
        newBoard[i] = new Array(w);
    }

    // Any live cell with exactly two or three live neighbours remains alive.
    // Any dead cell with exactly three live neighbours becomes a live cell.
    // All other live cells die in the next generation. Similarly, all other dead cells stay dead.

    for(var i = 0; i < h; i++ ) {
        for(var j = 0; j < w; j++ ) {
            if(board[i][j] === '') {
                return board;
            }

            var t = 0;
            var b = 0;
            var l = 0;
            var r = 0;
            var tl = 0;
            var tr = 0;
            var bl = 0;
            var br = 0;

            // top
                
            if(i - 1 === -1 ) {
                t = 0;
            } else if(board[i-1][j] ) {
                t = 1;
            } else {
                t = 0;
            }

            // bottom

            if(i + 1 === h) {
                b = 0;
            } else if(board[i+1][j] ) {
                b = 1;
            } else {
                b = 0;
            }

            // left

            if(j - 1 === -1) {
                l = 0;
            } else if(board[i][j-1]) {
                l = 1;
            } else {
                l = 0;                
            }

            // right

            if(j + 1 === w) {
                r = 0;
            } else if(board[i][j + 1] ) {
                r = 1;
            } else {
                r = 0;
            }

            // top-left

            if(i - 1 === -1 || j - 1 === -1) {
                tl = 0;
            } else if(board[i - 1][j - 1] ) {
                tl = 1;
            } else {
                tl = 0;
            }

            // top-right

            if(i - 1 === -1 || j + 1 === w) {
                tr = 0;
            } else if(board[i - 1][j + 1] ) {
                tr = 1;
            } else {
                tr = 0;
            }

            // bottom-left

            if(i + 1 === h || j - 1 === -1) {
                bl = 0;
            } else if(board[i + 1][j - 1] ) {
                bl = 1;
            } else {
                bl = 0;
            }

            // bottom-right

            if(i + 1 === h || j + 1 === w) {
                br = 0;
            } else if(board[i + 1][j + 1] ) {
                br = 1;
            } else {
                br = 0;
            }

            var live = t + b + l + r + tl + tr + bl + br;
            // console.log(live);

            if(board[i][j]) {
                if(live === 2 || live === 3) {
                    newBoard[i][j] = true;
                } else {
                    newBoard[i][j] = false;
                }
            } else {
                if(live === 3) {
                    newBoard[i][j] = true;
                } else {
                    newBoard[i][j] = false;
                }
            }
        }
    }

    return newBoard;
}