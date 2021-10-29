import './index.scss'
import React, { useEffect } from 'react';
import { toMMSS } from '../../utils/game';
import { setPath } from '../../store/slice.general';
import { useDispatch } from 'react-redux';

export default function HistoryPage(){
    const dispatch = useDispatch()
    const text = localStorage.getItem("history")
    const history = JSON.parse(text)
    const board = history.board.map(i => <div className="history-cell">{i}</div>)
    useEffect(() => {
        dispatch(setPath({path: '/history'}))
    }, [dispatch])


    return (
        <div className="history-container">
            <h2>Last Game:  {history.title}</h2>
            <div className="history-board">
                {board}
                <div className="gap-vertical" />
                <div className="gap-vertical" />
                <div className="gap-horizontal" />
                <div className="gap-horizontal" />
            </div>
            <h3>Completion Time: {toMMSS(history.time)}</h3>
        </div>
    )
}