var chainLength = 0;

// Check for a winner.
var checkWon = function(cellId, grid) {
    console.log("Cell placed at:", cellId);

    chainLength++;

    var cell = getCellById(grid, cellId);
    console.log("Cell:", cell);

    // For the current cell, check the cells to the West, North West, North
    // and North East. The algorithm will check the opposite directions as well.
    // The chosen directions are entirely arbitrary.
    var baseDirs = [
        W,
        NW,
        N,
        NE
    ];

    // For each selected direction:
    $.each(baseDirs, function(i, dir) {
        // Check cell in given direction.

        // If next cell is valid then check next cell
        // increment chainLength
        // repeat

        // if next cell is invalid
        // check opposite direction from origin
        // don't keep checking opposite forever
    });

};

// Check adjacent cells.
var checkAdjacentCells = function() {

}