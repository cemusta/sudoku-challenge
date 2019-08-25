const { performance } = require('perf_hooks')
const util = require('./utilities')
const sudoku = require('./sudoku')

const solvePuzzle = (input) => {

    console.log(`Puzzle: ${input.length}, givens:${input.length - input.split('').filter(x=> x==='.').length}`)
    let puzzle = util.import(input)
    // util.print(puzzle)

    let valid_puzzle = sudoku.validateAll(puzzle)
    console.log(`puzzle:${util.export(puzzle)}\n`)

    if(!valid_puzzle) {
        console.error('this is not a valid puzzle, quitting')
        return false
    }

    {
        let t0 = performance.now()
        console.log('non-optimized backtrack algorithm')
        let solution = sudoku.solve(puzzle, false)
        let t1 = performance.now()
        if(!solution) {
            console.error('failed to find a solution...')
        } else {
            // util.print(solution)
            console.log('solution:', util.export(solution))
        }
        console.log(`finished in ${(t1-t0).toFixed(2)}ms\n`)
    }

    {
        let t0 = performance.now()
        console.log('optimized backtrack algorithm')
        let solution = sudoku.solve(puzzle, true)
        let t1 = performance.now()
        if(!solution) {
            console.error('failed to find a solution...')
        } else {
            // util.print(solution)
            console.log('solution:', util.export(solution))
        }
        console.log(`finished in ${(t1-t0).toFixed(2)}ms\n`)
    }
}

let original_question = '419.8....5.8.....6...5......9.6....4.4......36..29......23.1........925..7.......'
let wrong =             '111222333111222333111222333444555666444555666444555666777888999777888999777888999'
let hard = '.17..69..356194.2..89..71.6.65...273872563419.43...685521......798..53..634...59.'
let sudoku_solver_one_solution = '..26...7.....3...6.7..4.3....9...6.3.......1....81..92..6....25....5....32.4..8.9'

solvePuzzle(sudoku_solver_one_solution)
