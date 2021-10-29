import './index.scss'
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { stopGame} from "../../store/slice.general";
import { Link, useHistory } from 'react-router-dom';

export default function HeaderComponent(){
    const history = useHistory()
    const path = useSelector(state => state.general.path)
    const hasHistory = useSelector(state => state.general.hasHistory)
    const hasGame = useSelector(state => state.general.hasGame)
    const dispatch = useDispatch()
    useEffect(() => {
    }, [path, hasHistory, hasGame])
    return(
        <div className="header-container">
            <Link to="/"><div onClick={() => {}} className="header-name">Mnemosyne-Sudoku</div></Link>
            {(path !== '/' || path !== '/history') ?
                <div onClick={() => {dispatch(stopGame()); history.push('./select')}} className="header-new-game">New Game</div> :
                <></>
            }
        </div>
    )
}