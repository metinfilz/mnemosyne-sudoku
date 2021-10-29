import {createSlice, current} from "@reduxjs/toolkit";
import {
    isConstant,
    isSelected,
    nextMove,
    togglePointed,
    setSelected,
    setConflict,
    clearConflict,
    clearSelected,
    toggleSelected,
    relationalCells,
    setRelational,
    clearRelational, solveBoard, setHinted, checkRow, getIndex,
} from '../utils/game';
import mapDispatchToProps from 'react-redux/lib/connect/mapDispatchToProps';

function isConflicted(val, i, data) {
    if(val === 0) return false
    const row = Math.floor(i / 9), column = i % 9
    const tRow = Math.floor(row / 3), tColumn = Math.floor(column / 3)
    let stack=[]
    Array(3).fill(0).map((r, i) => Array(3).fill(0).map((r, j) => {
        stack.push(data[9*tColumn+27*tRow + j + i*9])
    }))
    if(stack.filter(r => r === val).length > 1) {
        return true
    }
    stack = []
    for(let j =0; j<9; j++){
        stack.push(data[(row*9)+j], data[9*j+column])
    }
    return stack.filter(r => r === val).length > 2
}

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        title: "",
        cursor: -1,
        solution: Array.of(81),
        board: Array.of(81),
        status: Array.of(81),
        hintId: -1,
        conflicts: [],

        hasFinish: false,
        hasHinted: false,
        hasPause: false,
    },
    reducers: {
        loadGame: (state, action) => {
            const {id, board} = action.payload
            let solution = []
            board.map(i => solution.push([...i]))
            solveBoard(solution)
            state.title = `GAME ${id+1}`
            state.board = [].concat(...board)
            state.solution = [].concat(...solution)
            state.status = state.board.map(val => val !== 0 ? 1 : 0)
            state.hasGame = true
            state.cursor = -1
            state.timeCount = 0
            state.hasPause = true
            state.hasFinish = false
            state.hasHinted = false
            state.hintId = -1
        },
        setPause: (state, action) => {
            const { pause } = action.payload
            if(!state.hasFinish) {
                state.hasPause = pause
            }
        },
        tick: (state) => {
            state.timeCount += 1
        },
        moveCursorWithKeyboard: (state, action) => {
            const {direction, clear} = action.payload
            state.status = state.status.map(i => clearRelational(i))
            if(clear) state.status.map((val, i) => isSelected(val) ? state.status[i] = clearSelected(state.status[i]): null)
            if(state.cursor > -1) state.status[state.cursor] = togglePointed(state.status[state.cursor])
            state.cursor = nextMove(direction, state.cursor, state.status.map(val => val))
            state.status[state.cursor] = togglePointed(state.status[state.cursor])
            state.status = state.status.map(i => clearRelational(i))
            relationalCells(state.cursor).map(i => {
                state.status[i] = setRelational(state.status[i])
                return null
            })
        },
        moveCursorWithMouse: (state, action) => {
            const {index, clear} = action.payload
            state.status = state.status.map(i => clearRelational(i))
            if(clear) state.status.map((val, i) => isSelected(val) ? state.status[i] = clearSelected(state.status[i]): null)
            if(state.cursor > -1) state.status[state.cursor] = togglePointed(state.status[state.cursor])
            state.cursor = index
            state.status[index] = togglePointed(state.status[index])
            if(!clear && !isConstant(state.status[state.cursor]))
                state.status[state.cursor] = toggleSelected(state.status[state.cursor])
            relationalCells(index).map(i => {
                state.status[i] = setRelational(state.status[i])
                return null
            })
        },
        multiSelectWithKeyboard: (state) => {
            if(isConstant(state.status[state.cursor]))
                return
            state.status[state.cursor] = toggleSelected(state.status[state.cursor])
        },
        controlAssign: (state, action) => {
            const { number, hint } = action.payload
            if(state.hasPause || (state.cursor < 0) || isConstant(state.status[state.cursor])) return
            if(hint){
                if(state.hasHinted) return
                while(1) {
                    let i = Math.floor(Math.random() * 81)
                    if(state.board[i] === 0){
                        state.board[i] = state.solution[i]
                        state.hasHinted = true
                        state.hintId = i
                        state.status[i] = setHinted(state.status[i])
                        break
                    }
                }
                return
            } else {
                state.board[state.cursor] = number
            }
            state.board.map((_,i) => state.status[i] = clearConflict(state.status[i]))
            state.board.map((val, i) => {
                const chunk = relationalCells(i)
                chunk.map(j => {
                    if((state.board[i] !== 0) && (state.board[i] === state.board[j])) {
                        if(i !== j) {
                            state.status[j] = setConflict(state.status[j])
                        }
                    }
                })
            })
            if(state.board.filter(i => i !== 0).length === 81) {
                let finish = true
                for(let i = 0; i < 81; i++)
                    finish &= (state.board[i] === state.solution[i])
                state.hasFinish = finish;
                state.hasPause = finish;
                localStorage.setItem('history', JSON.stringify({board: state.solution, time: state.timeCount, title: state.title}))
            }
        },
    }
})

export const { loadGame, setPause, controlAssign,tick, moveCursorWithKeyboard, moveCursorWithMouse, multiSelectWithKeyboard } = gameSlice.actions
