Noderunner
=========

A test to create an algorithm that will follow nodes in a grid to determine if there are N consecutive nodes in a row.

Logic
-----

This will be used to check whether a player has won a game of Tic Tac Toe.

Steps:
* Player places a marker on the grid.
* Check the cells around the marker.
* If an adjacent cell has the same marker in it:
    * Check the next cell in the same direction.
    * When the end is reached, return to the marker and check the opposite direction.
    * When the end is reached, the found cells are the total length of the consecutive markers.
    * If found == N, winner.
    
    
Currently, the algorithm will stop checking nodes once a winner has been found. This is not necessarily the best way of operating; you might want to highlight multiple winning lines for example. I just did it because I wanted to make sure I could do it correctly.