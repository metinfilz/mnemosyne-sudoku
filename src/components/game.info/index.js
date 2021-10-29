import './index.scss'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPause, tick} from "../../store/slice.game";
import useInterval from "../../hooks/useInterval";
import {toMMSS} from "../../utils/game";

export default function GameInfoComponent(){
    const count = useSelector(state => state.game.timeCount)
    const pause = useSelector(state => state.game.hasPause)
    const title = useSelector(state => state.game.title)
    const dispatch = useDispatch()
    const [time, setTime] = useState(0)

    useInterval(() => {
        if(!pause)
            dispatch(tick())
    }, 1000)

    useEffect(() => {
        setTime(count)
    }, [count, time])


    useEffect(()=> {
        const r = document.querySelector(':root')
        if(pause)
            r.style.setProperty('--game-info-time-icon', 'var(--icon-play)')
        else
            r.style.setProperty('--game-info-time-icon', 'var(--icon-pause  )')

    }, [dispatch, pause])

    return(
        <div className="game-info-container">
            <div className="game-info-title">{title}</div>
            <div onClick={() => dispatch(setPause({ pause: !pause }))} className="game-info-time"><span>{toMMSS(time)}</span><div className="game-info-time-icon" /></div>
        </div>
    )
}