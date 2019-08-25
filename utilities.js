
exports.print = (sudoku) => {
    let print_string = ''
    sudoku.forEach((row, row_index) => {
        row.forEach((cell_val, square_index) => {

            if(typeof cell_val === 'object'){
                print_string += `[${cell_val}]`
                // print_string += cell_val.length + ' '
            } else if(cell_val === 0){
                print_string += '_ '
            } else {
                print_string += cell_val + ' '
            }

            // end of line
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

// for testing puzzle and solutions via external solvers
exports.export = (sudoku) => {
    let export_string = ''
    sudoku.forEach((row) => {
        row.forEach((cell_val) => {

            if(cell_val === 0){
                export_string += '.'
            } else {
                export_string += cell_val
            }

        })
    })

    return export_string
}

exports.import = (import_string, size = 9) => {
    let puzzle = []

    if(import_string.length !== (size*size)) {
        throw new Error(`import string is not correct: (string:${import_string.length}-expected:${(size*size)})`)
    }

    for (let x = 0; x < size; x++) {
        let row = []

        for (let i = 0; i < size; i++) {
            const element = import_string.slice(0,1)
            import_string = import_string.substr(1)

            if(element === '.') {
                row.push(0)
            }
            else {
                row.push(parseInt(element))
            }

        }

        puzzle.push(row)
    }

    return puzzle
}
