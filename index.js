const { performance } = require('perf_hooks')
const util = require('./utilities')
const sudoku = require('./sudoku')

const solvePuzzle = (input) => {

    console.log(`Puzzle: ${input.length}, givens:${input.length - input.split('').filter(x=> x==='.').length}\n`)

    let puzzle = util.import(input)

    util.print(puzzle)

    console.log('puzzle:', util.export(puzzle))

    {
        let t0 = performance.now()
        console.log('non-optimized backtrack algorithm')

        let solution = sudoku.solve(puzzle, false)

        if(!solution) {
            console.log('\nfailed to find a solution...\n\n\n')
        } else {

            console.log('\ndone:\n')

            util.print(solution)

            console.log('solution:', util.export(solution))
        }
        let t1 = performance.now()
        console.log(`finished in ${(t1-t0).toFixed(2)}ms`)
    }

    // {
    //     let t0 = performance.now()
    //     console.log('optimized backtrack algorithm')

    //     let solution = sudoku.solve(puzzle, true)

    //     if(!solution) {
    //         console.log('\nfailed to find a solution...\n\n\n')
    //     } else {

    //         console.log('\ndone:\n')

    //         util.print(solution)
    //     }
    //     let t1 = performance.now()
    //     console.log(`finished in ${(t1-t0).toFixed(2)}ms`)
    // }
}

// let string_puzzle = '419.8....5.8.....6...5......9.6....4.4......36..29......23.1........925..7.......'
let string_puzzle2 = '..26...7.....3...6.7..4.3....9...6.3.......1....81..92..6....25....5....32.4..8.9'

solvePuzzle(string_puzzle2)
