import './index.scss'
import {useDispatch} from "react-redux";
import {controlAssign} from "../../store/slice.game";

export default function GameControlComponent() {
    const dispatch = useDispatch()
    return(
        <div>
            <div className="game-control-container">
                {/*<div onClick={() => dispatch(controlUndo())}>UNDO</div>*/}
                <div onClick={() => dispatch(controlAssign({number: 0}))}>ERASE</div>
                <div onClick={() => dispatch(controlAssign({number: 0, hint: true}))}>HINT</div>
            </div>
            <div className="game-control-info">
                <h2>Shortcut's</h2>
                <p><strong>Ctrl+X</strong> Erase Cell</p>
                <p><strong>Backspace</strong> Erase Cell</p>
                <p><strong>Arrows</strong> Movements</p>
            </div>
        </div>
    )
}

