// A cell.
var cellModel = function(id, x, y) {
    return {
        id: id,
        value: null,
        x: x,
        y: y
    }
};

// Create a two-dimensional grid.
var createGrid = function(gridSize) {
    var cellId = 0;
    var grid = [];

    for (var rowCounter = 0; rowCounter < gridSize; rowCounter++) {
        var row = [];
        for (var colCounter = 0; colCounter < gridSize; colCounter++) {
            row.push(cellModel(cellId, colCounter, rowCounter))
            cellId++;
        }
        grid.push(row);
    }
    return grid;
};

// Render the grid to the screen.
var renderGrid = function(grid) {
    var $grid = $('.js-grid');
    $grid.empty();
    for (var row = 0; row < grid.length; row++) {
        var $row = $('<div/>').addClass('grid__row js-row');
        $grid.append($row);
        for (var col = 0; col < grid[row].length; col++) {
            var cell = grid[row][col];
            var $cell = $('<div/>').addClass('grid__row__cell js-cell').html(cell.value).attr('data-id', cell.id);
            $row.append($cell);
        }
    }
};

// Get a cell by its ID.
var getCellById = function(grid, id) {
    for (var row = 0; row < grid.length; row++) {
        for (var col = 0; col < grid[row].length; col++) {
            if (grid[row][col].id == id) {
                return grid[row][col];
            }
        }
    }
}

var getCellElementById = function(id) {
    var $cellEl;
    $('.js-cell').each(function() {
        console.log($(this).attr('data-id') == id)
        if ($(this).attr('data-id') == id) {
            $cellEl = $(this);
            return false;
        }
    })
    return $cellEl;
}

// Update a specific cell.
var updateCell = function(id, grid) {
    // Update cell model.
    var cell = getCellById(id);
    cell.value = "X";

    // Render updated cell.
    var $cellEl = getCellElementById(id);
    $cellEl.html("X");
}

// Add some content to the grid.
var populateGrid = function(grid) {

}

$(function() {
    var grid = createGrid(10);
    populateGrid(grid);
    renderGrid(grid);

    $('.js-grid-container').on('click', '.js-cell', function() {
       updateCell($(this).attr('data-id'), grid);
    });
});
