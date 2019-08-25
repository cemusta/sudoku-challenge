// var _ = require('lodash')
// const util = require('./utilities')

const square_size = 3
const board_size = 9
// const possibilities = [1,2,3,4,5,6,7,8,9]

const validation = {
    failed: 'failed',
    partial: 'partial',
    ok: 'ok'
}

const checkDiff = (val) => {

    val = val.filter(x=> x !== 0)

    if((new Set(val)).size !== val.length) { // duplicates
        return validation.failed
    }

    if(val.length < board_size){
        return validation.partial
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

    for (let x = _x; x < _x + square_size ; x++) {
        for (let y = _y; y < _y + square_size ; y++) {
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
        let val_result = validateRow(sudoku,x)
        if( val_result === validation.failed ){
            // console.log(`not valid on row:${x}`)
            return false
        }
    }

    // check columns
    for (let y = 0; y < sudoku.length; y++) {
        let val_result = validateColumn(sudoku,y)
        if( val_result === validation.failed ){
            // console.log(`not valid on column:${y}`)
            return false
        }
    }

    // check squares
    for (let x = 0; x < square_size ; x++) {
        for (let y = 0; y < square_size ; y++) {
            let val_result = validateSquare(sudoku, (x*square_size), (y*square_size))
            if( val_result === validation.failed ){
                // console.log(`not valid on square:${x}-${y}`)
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

const findCellPossibilities = (sudoku, _x, _y) => {
    let possibilities = [1,2,3,4,5,6,7,8,9]

    // sweep x dimention and eliminate options
    for (let y = 0; y < sudoku[_x].length; y++) {
        let val = sudoku[_x][y]
        let index = possibilities.indexOf(val)
        if (index > -1) {
            possibilities.splice(index, 1)
        }
    }

    // sweep y dimention and eliminate options
    for (let x = 0; x < sudoku.length; x++) {
        let val = sudoku[x][_y]
        let index = possibilities.indexOf(val)
        if (index > -1) {
            possibilities.splice(index, 1)
        }
    }

    // sweep thru the local square
    let sqx = ( _x - (_x % square_size) )
    let sqy = ( _y - (_y % square_size) )
    for (let x = 0; x < square_size ; x++) {
        for (let y = 0; y < square_size ; y++) {
            let val = sudoku[sqx + x][sqy + y]
            let index = possibilities.indexOf(val)
            if (index > -1) {
                possibilities.splice(index, 1)
            }
        }
    }

    return possibilities
}

exports.calculatePossibilities = (sudoku) => {
    let pos_array = sudoku.map(function(arr) {
        return arr.slice()
    })

    let total = 1 //at least one solution

    for (let x = 0; x < sudoku.length; x++) {
        for (let y = 0; y < sudoku[x].length; y++) {

            let value = sudoku[x][y]

            if(value === 0) {
                let pos = findCellPossibilities(sudoku, x, y)
                if(pos.length === 0) {
                    return null // invalid solution
                }
                total = total * pos.length
                pos_array[x][y] = pos
            } else {
                pos_array[x][y] = 'x'
            }
        }
    }

    // console.log(`${total} permutation left\n`)

    return pos_array
}

exports.solve = (_sudoku, optimize) => {
    let solution = _sudoku.map(function(arr) {
        return arr.slice()
    })

    let pos = this.calculatePossibilities(solution)
    // util.print(pos)

    // optimization before start
    if(optimize){
        let improvement = false
        do {
            improvement = strategyOnlyOne(solution, pos)
        } while (improvement)
    }

    console.log('starting backtrack brute force')

    solution = backtrack(solution, pos, optimize, 0)

    return solution
}

const backtrack = (sudoku, pos, optimize, depth) => {

    // console.log(`new backtracking started, depth: ${depth}`)

    // 1- validate state, cancel tree if not valid
    if( !this.validateAll(sudoku) ) {
        // console.log('not valid, returning')
        return null
    }

    // 2- find first empty cell
    let cell = findNextEmptyCell(sudoku)

    // 3- if no 0 means its solved.
    if(cell === null){
        return sudoku
    }

    let cell_possibilities = pos[cell.x][cell.y]

    for (let i = 0; i < cell_possibilities.length; i++) {
        const possibility_selected = cell_possibilities[i]

        // console.log(`next empty: ${cell.x}:${cell.y}, trying (${possibility_selected} out of [${cell_possibilities}])`)

        let solution_clone = sudoku.map(function(arr) {
            return arr.slice()
        })

        solution_clone[cell.x][cell.y] = possibility_selected

        // // 4- optimize if possible
        if(optimize) {
            let improvement = false
            do {
                improvement = strategyOnlyOne(solution_clone, pos)
            } while (improvement)
        }

        let pos_clone = this.calculatePossibilities(solution_clone)
        if(!pos_clone) {
            continue // invalid solution
        }

        let value = backtrack(solution_clone, pos_clone, optimize, ++depth)

        if(value !== null) { // if not null means solved?
            return value
        }
    }


    return null // tried all but failed.
}

const findNextEmptyCell = (sudoku) => {
    for (let x = 0; x < sudoku.length ; x++) {
        for (let y = 0; y < sudoku.length ; y++) {
            let val = sudoku[x][y]
            if( val === 0 ){
                return { x, y }
            }
        }
    }

    return null
}

const strategyOnlyOne = (sudoku, pos) => {
    for (let x = 0; x < pos.length; x++) {
        for (let y = 0; y < pos.length; y++) {
            let val = pos[x][y]
            if( val !== 'x' && val.length === 1){
                // console.log(`found [${x}:${y}]: ${val} via (onlyOne)`)
                sudoku[x][y] = val.pop()
                return true
            }
        }
    }
    return false
}


// TODO: implement naked twin for further optimization.
// eslint-disable-next-line no-unused-vars
const strategyNakedTwin = (sudoku, pos) => {
    // sweep rows for naked twins
    for (let x = 0; x < pos.length; x++) {
        let row = pos[x]
        for(let y = 0; y < pos.length; y++)
        {
            let val = pos[x][y]
            if( val === 'x' ){
                continue
            }

            if( val.length !== 2){ //only handle twins for now
                continue
            }

            let found = row.filter( x=> JSON.stringify(x) === JSON.stringify(val) )
            if ( found.length > 1) {
                console.log(`found twin on row:${x}`)
            }
        }
    }

    // sweep columns for naked twins
    for(let y = 0; y < pos.length; y++) {
        let col = []
        for (let x = 0; x < pos.length; x++) {
            col.push(pos[x][y])
        }

        for (let x = 0; x < pos.length; x++) {
            let val = pos[x][y]
            if( val === 'x' ){
                continue
            }

            if( val.length !== 2){ //only handle twins for now
                continue
            }

            let found = col.filter( x=> JSON.stringify(x) === JSON.stringify(val) )
            if ( found.length > 1) {
                console.log(`found twin on col:${y}`)
            }
        }

    }

    return false
}
