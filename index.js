const { performance } = require('perf_hooks')
const util = require('./utilities')
const sudoku = require('./sudoku')

let puzzle = [
    [4,1,9, 0,8,0, 0,0,0],
    [5,0,8, 0,0,0, 0,0,6],
    [0,0,0, 5,0,0, 0,0,0],

    [0,9,0, 6,0,0, 0,0,4],
    [0,4,0, 0,0,0, 0,0,3],
    [6,0,0, 2,9,0, 0,0,0],

    [0,0,2, 3,0,1, 0,0,0],
    [0,0,0, 0,0,9, 2,5,0],
    [0,7,0, 0,0,0, 0,0,0],
]

const main = () => {
    let t0 = performance.now()

    util.print(puzzle)

    let pos = sudoku.populateOptions(puzzle)

    util.print(pos)

    sudoku.validateCell(puzzle, 5,5)

    // let solved = backtrack(puzzle, pos) // TODO: implement brute force.

    let t1 = performance.now()

    console.log(`done in ${(t1-t0).toFixed(2)}ms`)
}

main()
