import './index.scss'
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import CellComponent from "../game.cell";
import {
    controlAssign,
    moveCursorWithKeyboard,
    multiSelectWithKeyboard,
    setPause,
} from "../../store/slice.game";
import { useHistory } from 'react-router-dom';

export default function BoardComponent(){
    const pause = useSelector(state => state.game.hasPause)
    const finish = useSelector(state => state.game.hasFinish)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleKeyDown = async (e) => {
        if(e.ctrlKey) {
            e.preventDefault()
        }
        if(e.keyCode === 8)                             /** Backspace Key   **/
            await dispatch(controlAssign({number: 0}))
        else if(e.keyCode > 36  && e.keyCode < 41)      /** Arrow Keys      **/
            await dispatch(moveCursorWithKeyboard({direction: e.keyCode - 37, clear: !e.ctrlKey}))
        else if(/^[1-9]+$/.test(e.key))                 /** [1-9] Keys      **/
            await dispatch(controlAssign({number: parseInt(e.key)}))
        else if(e.keyCode === 32 && e.ctrlKey)          /**  Ctrl + Spacebar Key    **/
            dispatch(multiSelectWithKeyboard())
        else if(e.keyCode === 88 && e.ctrlKey)
            await dispatch(controlAssign({number: 0}))
    }
    const board = Array(81).fill(0).map((r,i) => <CellComponent index={i} key={i} />)
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    })

    return(
        <div className="game-board-container">
            <div className="game-board">
                {board}
                <div className="gap-horizontal"/>
                <div className="gap-horizontal"/>
                <div className="gap-vertical"/>
                <div className="gap-vertical"/>
            </div>
            {pause ? <div onClick={() => dispatch(setPause({pause: false}))} className="game-board-mask">
                PAUSED
            </div> : ""}
            {finish ? <div onClick={() => history.push('/history')} className="game-board-mask">
                FINISHED
            </div> : ""}
        </div>
    )
}