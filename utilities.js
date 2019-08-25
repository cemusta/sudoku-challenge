
exports.print = (sudoku) => {
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
