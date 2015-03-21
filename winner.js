var chainLength = 0;

// Check for a winner.
var checkWon = function(cellId, grid) {
    console.log("Cell placed at:", cellId);

    chainLength++;

    var cell = getCellById(grid, cellId);
    console.log("Cell:", cell);

    // Get north west cell.
    var cellNW = getCellInDir(grid, cell, NW);
    console.log("Cell NW:", cellNW);

    // Check the cells around the current cell.


    // If any contain the same marker, store them and their direction.

    // Follow that direction and count the new total for each valid marker found.

    // If an invalid marker is found, go in the opposite direction.

    // If the total is equal to or greater than the winning amount, an winner has been found.

};

// Check adjacent cells.
var checkAdjacentCells = function() {

}