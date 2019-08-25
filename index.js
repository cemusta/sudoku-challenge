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
    // process.setMaxListeners(0)

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

main()
