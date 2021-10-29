import './index.scss'
import { useDispatch, useSelector } from 'react-redux';
import {controlAssign} from "../../store/slice.game";

export default function GameControlComponent() {
    const hintGiven = useSelector(state => state.game.hasHinted)


    const dispatch = useDispatch()
    return(
        <div>
            <div className="game-control-container">
                <div onClick={() => dispatch(controlAssign({number: 0}))}>ERASE</div>
                <div className={hintGiven ? "hint-given" : ""}
                     onClick={() => !hintGiven ? dispatch(controlAssign({number: 0, hint: true})) : null }>
                    {hintGiven ? "HINT GIVEN" : "GIVE HINT"}</div>



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

