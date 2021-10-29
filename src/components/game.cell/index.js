import './index.scss'

import { useDispatch, useSelector } from "react-redux";
import {moveCursorWithMouse} from "../../store/slice.game";

import { isConflict, isConstant, isHinted, isPointed, isRelational, isSelected } from '../../utils/game';

export default function CellComponent({index}){
    const status = useSelector(state => state.game.status[index])
    const value = useSelector(state => state.game.board[index])
    const dispatch = useDispatch()

    const handleClick = (e)=>{
        dispatch(moveCursorWithMouse({index: index, clear: !e.altKey && !e.ctrlKey}))
    }
    return(
        <div onClick={handleClick} className={"game-cell" +
        (isConflict(status) ? " e": "") +
        (isSelected(status) ? " s": "") +
        (isHinted(status) ? " h": "") +
        (isPointed(status)  ? " p": "") +
        (isRelational(status) ? " r": "")+
        (isConstant(status) ? " c": "") }>
            {value !== 0 ? value : null}
        </div>
    )
}