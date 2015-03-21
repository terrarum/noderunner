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
var createGrid = function(gridSize, data) {
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
        if ($(this).attr('data-id') == id) {
            $cellEl = $(this);
            return false;
        }
    })
    return $cellEl;
}

// Update a specific cell.
var updateCell = function(id, grid, value) {
    // Update cell model.
    var cell = getCellById(grid, id);
    var cellValue;
    switch (value) {
        case 0:
            cellValue = "";
            break;
        case 1:
            cellValue = "X";
            break;
        case 2:
            cellValue = "O";
            break
        default:
            cellValue = "";
    }
    cell.value = cellValue;

    // Render updated cell.
    var $cellEl = getCellElementById(id);
    $cellEl.html(cellValue);
}

// Add some content to the grid.
var populateGrid = function(grid, boardId) {
    boardId = boardId == undefined ? 0 : boardId;
    gridContent = window.boards[boardId].board;
    for (var row = 0; row < grid.length; row++) {
        for (var col = 0; col < grid[row].length; col++) {
            updateCell(grid[row][col].id, grid, gridContent[row][col])
        }
    }
}

// Check for a winner.
var checkWon = function(cellId, grid) {

}

$(function() {
    var grid = createGrid(8);
    renderGrid(grid);
    populateGrid(grid);

    // Add grids to dropdown.
    $.each(window.boards, function(i, el) {
       $('.js-grid-select').append('<option value="' + i + '">' + el.name + '</option>')
    });

    // Listen for new grid being selected.
    $('.js-grid-select').on('change', function() {
        populateGrid(grid, $(this).val());
    });

    // Listen for cell clicks.
    $('.js-grid-container').on('click', '.js-cell', function() {
        var cellId = $(this).attr('data-id');
        updateCell(cellId, grid, 1);
        checkWon(cellId, grid);
    });
});

// Unit tests.
// Populate grid, 'click' on a cell, compare algorithm result to expected result.