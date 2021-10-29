import {createSlice} from "@reduxjs/toolkit";

export const generalSlice = createSlice({
    name: 'general',
    initialState: {
        hasGame: false,
        hasHistory: true,
        path: '/'
    },
    reducers: {
        setHistory: (state) => {
            state.history = true
        },
        setPath: (state, action) => {
            const { path } = action.payload
            state.path = path
        },
        startGame: (state) => {
            state.hasGame = true
        },
        stopGame:(state) => {
            state.hasGame = false
        },
    }
})

export const { setHistory, setPath, startGame ,stopGame } = generalSlice.actions