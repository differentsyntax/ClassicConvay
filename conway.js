// Mridul Awasthi
// CS 375-001
// Homework 3

// Note: Every white cell is dead. Every non-white cell is alive.
// Note: Have also done the extra credit part.

var interv = 0;

function startInterval() {
	clearInterval(interv);	
	interv = setInterval(stepBoard, 100);
}

function stopInterval() {	
	clearInterval(interv);
}

function boardReset(row, col) {

    var table = document.getElementById("board");
    var countRows = table.rows.length;
    for (var i = 0; i < countRows; i++) {
        table.deleteRow(0);
    }

	for (var i = 0; i < row; i++) {
        var rows = table.insertRow(i);
        if(i%2 == 0){
            var color = 'black';
        } else {
            var color = 'white';
        }

		for (var j = 0; j < col; j++) {
            var cols = rows.insertCell(j);
            cols.style.backgroundColor = color;

            if(color === 'black') {
                color = 'white';
            } else {
                color = 'black';
            }
		}
	}
}

function randomBoard(row, col) {

    var table = document.getElementById("board");
    var countRows = table.rows.length;
    for (var i = 0; i < countRows; i++) {
        table.deleteRow(0);
    }

    var colorArr = ['gray', 'red', 'blue', 'yellow', 'orange', 'purple', 'green', 'pink', 'black', 'brown'];
	for (var i = 0; i < row; i++) {
        var rows = table.insertRow(i);
        for (var j = 0; j < col; j++) {
            var cols = rows.insertCell(j);
            if((i+j)%Math.floor(Math.random()*10) == 0){
                cols.style.backgroundColor = colorArr[Math.floor(Math.random() * 10)];
            } else {
                cols.style.backgroundColor = 'white'; // to avoid way too low number of dead cells
            }
            
        }
	}
}

function stepBoard() {
    var colorArr = ['gray', 'red', 'blue', 'yellow', 'orange', 'purple', 'green', 'pink', 'black', 'brown'];
    var board = document.getElementById('board');
    var h = board.rows.length;
    var w = board.rows[0].cells.length;
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
            } else if(board.rows[i-1].cells[j].style.backgroundColor !== 'white') {
                t = 1;
            } else {
                t = 0;
            }

            // bottom

            if(i + 1 === h) {
                b = 0;
            } else if(board.rows[i+1].cells[j].style.backgroundColor !== 'white') {
                b = 1;
            } else {
                b = 0;
            }

            // left

            if(j - 1 === -1) {
                l = 0;
            } else if(board.rows[i].cells[j-1].style.backgroundColor !== 'white') {
                l = 1;
            } else {
                l = 0;                
            }

            // right

            if(j + 1 === w) {
                r = 0;
            } else if(board.rows[i].cells[j+1].style.backgroundColor !== 'white' ) {
                r = 1;
            } else {
                r = 0;
            }

            // top-left

            if(i - 1 === -1 || j - 1 === -1) {
                tl = 0;
            } else if(board.rows[i-1].cells[j-1].style.backgroundColor !== 'white') {
                tl = 1;
            } else {
                tl = 0;
            }

            // top-right

            if(i - 1 === -1 || j + 1 === w) {
                tr = 0;
            } else if(board.rows[i-1].cells[j+1].style.backgroundColor !== 'white') {
                tr = 1;
            } else {
                tr = 0;
            }

            // bottom-left

            if(i + 1 === h || j - 1 === -1) {
                bl = 0;
            } else if(board.rows[i+1].cells[j-1].style.backgroundColor !== 'white') {
                bl = 1;
            } else {
                bl = 0;
            }

            // bottom-right

            if(i + 1 === h || j + 1 === w) {
                br = 0;
            } else if(board.rows[i+1].cells[j+1].style.backgroundColor !== 'white') {
                br = 1;
            } else {
                br = 0;
            }

            var live = t + b + l + r + tl + tr + bl + br;
            // console.log(live);

            if(board.rows[i].cells[j].style.backgroundColor !== 'white') {
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

    for(var i = 0; i < h; i++ ) {
        for(var j = 0; j < w; j++ ) {
            if(newBoard[i][j]){
                board.rows[i].cells[j].style.backgroundColor = colorArr[Math.floor(Math.random() * 10)];
            } else {
                board.rows[i].cells[j].style.backgroundColor = 'white';
            }
        }
    }
    
}