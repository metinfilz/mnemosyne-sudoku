import './index.scss'

import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { Redirect } from "react-router-dom";

import GameControlComponent from "../../components/game.control";
import GameInfoComponent from "../../components/game.info";
import GameNumpadComponent from "../../components/game.numpad";
import {setPath} from "../../store/slice.general";
import {setPause} from "../../store/slice.game";
import BoardComponent from "../../components/game.board";

export default function GamePage(){
    const hasGame = useSelector(state => state.general.hasGame)
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(setPause({pause: true}))
    }
    useEffect(() => {
        dispatch(setPath({path: '/game'}))
        window.addEventListener("beforeunload", handleClose)
        return () => {
            handleClose()
            window.removeEventListener("beforeunload", handleClose)
        }
    }, [dispatch, handleClose])

    if(!hasGame)return(<Redirect to="/select" />)
    return(
        <div className="game-container">
            <GameInfoComponent />
            <div className="game-outer">
                <BoardComponent />
                <div className="game-inner">
                    <GameControlComponent />
                    <GameNumpadComponent />
                </div>
            </div>
        </div>
    )
}
