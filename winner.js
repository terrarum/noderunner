var chainLength = 0;
var checkHistory = [];

// Check half the directions possible because the algorithm will check the opposite direction if necessary.
var baseDirs = [
    W,
    NW,
    N,
    NE
];

var baseCell = null;
// Check for a winner.
var checkWon = function(cellId, grid) {
    console.log("Cell placed at:", cellId);

    checkHistory = [];
    baseCell = getCellById(grid, cellId);

    // For each selected direction:
    $.each(baseDirs, function(i, dir) {
        if (isWon()) return;
        // Set chain to one because a token has been placed.
        chainLength = 1;
        // Check cell in given direction.
        checkDirection(baseCell, grid, dir);
        if (!isWon()) {
            // Check the opposite direction.
            checkDirection(baseCell, grid, getOppositeDirection(dir));
        }
    });

    playback();
};

// Playback the checked cells.
var waitTime = 200;
var playback = function() {
    if (history.length > 0) {
        $.each(checkHistory, function(i, cell) {
            _.delay(function() {
                if (!isCellValid(cell, baseCell.value)) {
                    highlightCell(cell, 'invalid');
                }
                else {
                    highlightCell(cell, 'valid');
                }

            }, waitTime * i);
        })
    }
};

var checkDirection = function(cell, grid, dir) {
    // Get a cell in a direction.
    var nextCell = getCellInDir(grid, cell, dir);

    checkHistory.push(cell);
    checkHistory.push(nextCell);

    // If the new cell is valid and has the same value as the baseCell.
    if (isCellValid(nextCell, baseCell.value)) {
        console.log("Next Cell:", nextCell);
        // Increase chain length.
        chainLength++;
        console.log("Chain Length:", chainLength);
        if (isWon()) {
            console.log("WINNER");
        }
        else {
            // Check the next cell.
            checkDirection(nextCell, grid, dir);
        }
    }
};

// Checks that cell is 'valid', validity meaning not undefined or null, and having the correct value.
var isCellValid = function(cell, value) {
    if (cell == undefined) {
        return false;
    }
    else if (cell.value !== value) {
        return false;
    }
    else {
        return true;
    }
}

// If chainLength equals WIN_LENGTH then the game has been won.
var isWon = function() {
    return chainLength == WIN_LENGTH;
};