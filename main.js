var WIN_LENGTH = 4,
    NW = 0,
    N = 1,
    NE = 2,
    E = 3,
    SE = 4,
    S = 5,
    SW = 6,
    W = 7;

// Cell Model.
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
};

// Get a cell by its position.
var getCellByPos = function(grid, x, y) {
    return grid[y][x];
};

// Get the cell in the given direction from the given cell.
var getCellInDir = function(grid, cell, dir) {
    var newCell;
    switch (dir) {
        case NW:
            newCell = getCellByPos(grid, cell.x - 1, cell.y - 1);
            break;
        case N:
            newCell = getCellByPos(grid, cell.x, cell.y - 1);
            break;
        case NE:
            newCell = getCellByPos(grid, cell.x + 1, cell.y - 1);
            break;
        case E:
            newCell = getCellByPos(grid, cell.x + 1, cell.y);
            break;
        case SE:
            newCell = getCellByPos(grid, cell.x + 1, cell.y + 1);
            break;
        case S:
            newCell = getCellByPos(grid, cell.x, cell.y + 1);
            break;
        case SW:
            newCell = getCellByPos(grid, cell.x - 1, cell.y + 1);
            break;
        case W:
            newCell = getCellByPos(grid, cell.x - 1, cell.y);
            break;
        default:
            newCell = null;
    }
    return newCell;
};

var getCellElementById = function(id) {
    var $cellEl;
    $('.js-cell').each(function() {
        if ($(this).attr('data-id') == id) {
            $cellEl = $(this);
            return false;
        }
    });
    return $cellEl;
};

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

    // Refresh currently selected grid.
    $('.js-refresh').on('click', function() {
        populateGrid(grid, $('.js-grid-select').val());
    });

    // Listen for cell clicks.
    $('.js-grid-container').on('click', '.js-cell', function() {
        var cellId = $(this).attr('data-id');
        updateCell(cellId, grid, 1);
        checkWon(cellId, grid);
    });

    $('.js-win-length').html(WIN_LENGTH);
});