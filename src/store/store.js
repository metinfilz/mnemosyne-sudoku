import {configureStore} from "@reduxjs/toolkit";
import {gameSlice} from "./slice.game";
import {generalSlice} from "./slice.general";

export const store = configureStore({
    reducer: {
        game: gameSlice.reducer,
        general: generalSlice.reducer
    },
    preloadedState: load()
})

function load(){
    try {
        let text = localStorage.getItem('store')
        if(!text) return {}
        return (JSON).parse(text)
    } catch (e){
        console.error(e)
        return {}
    }
}

store.subscribe(() => {
    localStorage.setItem("store", JSON.stringify(store.getState()))
})
