




let N = 9;
function solveSuduko(grid, row, col) {

    /* If we have reached the 8th
       row and 9th column (0
       indexed matrix) ,
       we are returning true to avoid further
       backtracking       */
    if (row == N - 1 && col == N)
        return true;

    // Check if column value  becomes 9 ,
    // we move to next row
    // and column start from 0
    if (col == N)
    {
        row++;
        col = 0;
    }

    // Check if the current position
    // of the grid already
    // contains value >0, we iterate
    // for next column
    if (grid[row][col] != 0)
        return solveSuduko(grid, row, col + 1);

    for(let num = 1; num < 10; num++)
    {

        // Check if it is safe to place
        // the num (1-9)  in the given
        // row ,col ->we move to next column
        if (isSafe(grid, row, col, num))
        {

            /*  assigning the num in the current
            (row,col)  position of the grid and
            assuming our assigned num in the position
            is correct */
            grid[row][col] = num;

            // Checking for next
            // possibility with next column
            if (solveSuduko(grid, row, col + 1))
                return true;
        }

        /* removing the assigned num , since our
           assumption was wrong , and we go for next
           assumption with diff num value   */
        grid[row][col] = 0;
    }
    return false;
}
function isSafe(grid, row, col, num) {

    // Check if we find the same num
    // in the similar row , we
    // return false
    for(let x = 0; x <= 8; x++)
        if (grid[row][x] == num)
            return false;

    // Check if we find the same num
    // in the similar column ,
    // we return false
    for(let x = 0; x <= 8; x++)
        if (grid[x][col] == num)
            return false;

    // Check if we find the same num
    // in the particular 3*3
    // matrix, we return false
    let startRow = row - row % 3,
        startCol = col - col % 3;

    for(let i = 0; i < 3; i++)
        for(let j = 0; j < 3; j++)
            if (grid[i + startRow][j + startCol] == num)
                return false;

    return true;
}
function distinct(value, index, self) {
    return self.indexOf(value) === index;
}




export const getIndex = function (index) {
    let R = [], C = [], T = []
    let row = Math.floor(index / 9), column = index % 9
    let r = row - (row % 3), c = column - (column % 3)
    for(let i=0; i<3; i++) {
        for(let j=0; j<3; j++){
            // if((i+r)*9 + (j+c) === index) continue
            // if(row * 9 + (i*3+j)) continue
            // if((i*3+j) * 9 + column) continue
            T.push((i+r)*9 + (j+c))
            R.push(row * 9 + (i*3+j))
            C.push((i*3+j) * 9 + column)
        }
    }
    return {R,C,T}
}







export const isConstant = (val = 0) => {
    return ((val & (1 << 0)) !== 0)
}
export const isSelected = (val = 0) => {
    return ((val & (1 << 1)) !== 0)
}
export const isPointed = (val = 0) => {
    return ((val & (1 << 3)) !== 0)
}
export const clearSelected = (val = 0) => {
    return (val & ~(1 << 1))
}
export const toggleSelected = (val = 0) => {
    return (val ^ (1 << 1))
}
export const togglePointed = (val = 0) => {
    return (val ^ (1 << 3))
}
export const setConstant = (val=0) => {
    return (val | (1 << 1))
}
export const setSelected = (val= 0) => {
    return (val | (1 << 1))
}
export const setRelational = (val) => {
    return val | (1 << 9)
}
export const isRelational = (val = 0) => {
    return ((val & (1 << 9)) !== 0)
}
export const clearRelational = (val = 0) => {
    return (val & ~(1 << 9))
}
export const setConflict = (val = 0) =>{
    return (val | (1 << 10))
}
export const isConflict = (val = 0) => {
    return ((val & (1 << 10)) !== 0)
}
export const clearConflict = (val = 0) => {
    return (val & ~(1 << 10))
}
export const setHinted = (val = 0) => {
    return (val | (1 << 11))
}
export const isHinted = (val) => {
    return ((val & (1 << 11)) !== 0)
}

export const toMMSS = function (sec) {
    if(sec === undefined) return ""
    let date = new Date(0)
    date.setSeconds(sec)
    return date.toISOString().substr(14, 5);
}
export const nextMove = function (direction, current, status) {
    if(current === -1) return 0
    const row = Math.floor(current / 9), column =current % 9
    if (direction === 0) {           /** Left **/
    let row2 = Math.floor((current-1) /9) , column2 = (current-1) % 9
        if((row !== row2) && (column !== column2))
            return current+8
        else
            return current-1
    } else if(direction === 1) {    /** Top **/
    let res = current - 9
        if(res < 0) return res + 81
        else return res
    } else if(direction === 2) {
        /** Right **/
        let row2 = Math.floor((current + 1) / 9), column2 = (current + 1) % 9
        if ((row !== row2) && (column !== column2))
            return current - 8
        else
            return current + 1
    } else if(direction === 3) {    /** Top **/
    let res = current + 9
        if(res > 80) return res - 81
        else return res
    }
}
export const solveBoard = function (board){
    let grid = [...board]
    solveSuduko(grid, 0,0)
    return [...grid]
}

export function relationalCells(index) {
    let chunk = []
    let row = Math.floor(index / 9), column = index % 9
    let r = row - (row % 3), c = column - (column % 3)
    for(let i=0; i<3; i++) {
        for(let j=0; j<3; j++){
            chunk.push((i+r)*9 + (j+c))
            chunk.push(row * 9 + (i*3+j))
            chunk.push((i*3+j) * 9 + column)
        }
    }
    return chunk.filter(distinct).map(t => parseInt(t)).sort((a,b) => a-b)
}
