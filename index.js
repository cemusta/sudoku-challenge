const { performance } = require('perf_hooks')

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

const print = (sudoku) => {
    let print_string = ''
    sudoku.forEach((row, row_index) => {
        row.forEach((cell_val, square_index) => {

            if(typeof cell_val === 'object'){
                print_string += cell_val.length + ' '
            } else if(cell_val === 0){
                print_string += '_ '
            } else {
                print_string += cell_val + ' '
            }

            // end of group
            if(square_index % 3 === 2){
                print_string += ' '
            }
        })

        print_string += '\n'

        // end of group
        if(row_index % 3 === 2){
            print_string += '\n'
        }
    })

    console.log(print_string)
}

const findCellOptions = (sudoku, x, y) => {
    let possibilities = [1,2,3,4,5,6,7,8,9]

    // sweep x dimention and eliminate options
    for (let i = 0; i < sudoku[x].length; i++) {
        let val = sudoku[x][i]
        let index = possibilities.indexOf(val)
        if (index > -1) {
            possibilities.splice(index, 1)
        }
    }

    // sweep y dimention and eliminate options
    for (let i = 0; i < sudoku.length; i++) {
        let val = sudoku[i][y]
        let index = possibilities.indexOf(val)
        if (index > -1) {
            possibilities.splice(index, 1)
        }
    }

    return possibilities
}

const populateSolutionOptions = (sudoku) => {
    let possibilities = sudoku

    let total = 1 //at least one solution

    for (let x = 0; x < sudoku.length; x++) {
        for (let y = 0; y < sudoku[x].length; y++) {

            let value = sudoku[x][y]

            if(value === 0) {
                let pos = findCellOptions(sudoku, x, y)
                total = total * pos.length
                possibilities[x][y] = pos
            } else {
                possibilities[x][y] = 'x'
            }
        }
    }

    console.log(`${total} possibilities\n`)

    return possibilities
}

const main = () => {
    let t0 = performance.now()

    print(puzzle)

    let pos = populateSolutionOptions(puzzle)

    print(pos)

    // let solved = backtrack(puzzle, pos) // TODO: implement brute force.

    let t1 = performance.now()

    console.log(`done in ${(t1-t0).toFixed(2)}ms`)
}

main()
