var _ = require('lodash')

const square_size = 3
const possibilities = [1,2,3,4,5,6,7,8,9]

let validation = {
    failed: 'failed',
    partial: 'contains empty',
    ok: 'ok'
}

const checkDiff = (val) => {
    if(val.includes(0)){
        return validation.partial
    }

    let diff = _.difference(val, possibilities)
    if(diff.length > 0)
    {
        return validation.failed
    }
    return validation.ok
}

const validateRow = (sudoku, x) => {
    let val = sudoku[x]
    return checkDiff(val)
}

const validateColumn = (sudoku, y) => {
    let val = []

    for (let x = 0; x < sudoku.length; x++) {
        val.push(sudoku[x][y])
    }

    return checkDiff(val)
}

const validateSquare = (sudoku, _x, _y) => {
    let val = []

    for (let x = _x; x < square_size ; x++) {
        for (let y = _y; y < square_size ; y++) {
            val.push(sudoku[x][y])
        }
    }

    return checkDiff(val)
}

const findAndValidateSquare = (sudoku, _x, _y) => {

    for (let x = 0; x < square_size ; x++) {
        if( (x*square_size) < _x )
            continue

        for (let y = 0; y < square_size ; y++) {
            if( (y*square_size) < _y )
                continue

            return validateSquare(sudoku, (x*square_size), (y*square_size))
        }
    }
}

exports.validateAll = (sudoku) => {
    // check rows
    for (let x = 0; x < sudoku.length; x++) {
        if( !validateRow(sudoku,x) ){
            console.log(`not valid on row:${x}`)
            return false
        }
    }

    // check columns
    for (let y = 0; y < sudoku.length; y++) {
        if( !validateColumn(sudoku,y) ){
            console.log(`not valid on column:${y}`)
            return false
        }
    }

    // check squares
    for (let x = 0; x < square_size ; x++) {
        for (let y = 0; y < square_size ; y++) {
            if( !validateSquare(sudoku, (x*square_size), (y*square_size)) ){
                console.log(`not valid on square:${x}-${y}`)
                return false
            }
        }
    }

    return true
}

exports.validateCell = (sudoku, _x, _y) => {
    // check x row
    if( validateRow(sudoku, _x) === validation.failed ){
        console.log(`not valid on row:${_x}`)
        return false
    }

    // check y column
    if( validateColumn(sudoku, _y) === validation.failed ){
        console.log(`not valid on column:${_y}`)
        return false
    }

    // check squares
    if( findAndValidateSquare(_x, _y) === validation.failed ){
        console.log(`not valid on square containing:${_x}-${_y}`)
        return false
    }


    return true
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

exports.populateOptions = (sudoku) => {
    let possibilities = sudoku.map(function(arr) {
        return arr.slice()
    })

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
