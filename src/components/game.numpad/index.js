import './index.scss'
import {useDispatch} from "react-redux";
import {controlAssign} from "../../store/slice.game";

export default function GameNumpadComponent(){
    const dispatch = useDispatch()
    return(
        <div className="game-numpad">
            <div onClick={() => dispatch(controlAssign({number: 1}))}>1</div>
            <div onClick={() => dispatch(controlAssign({number: 2}))}>2</div>
            <div onClick={() => dispatch(controlAssign({number: 3}))}>3</div>
            <div onClick={() => dispatch(controlAssign({number: 4}))}>4</div>
            <div onClick={() => dispatch(controlAssign({number: 5}))}>5</div>
            <div onClick={() => dispatch(controlAssign({number: 6}))}>6</div>
            <div onClick={() => dispatch(controlAssign({number: 7}))}>7</div>
            <div onClick={() => dispatch(controlAssign({number: 8}))}>8</div>
            <div onClick={() => dispatch(controlAssign({number: 9}))}>9</div>
        </div>
    )
}