
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
