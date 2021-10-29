import './index.scss'
import React, {useCallback, useEffect, useRef, useState} from "react";
import gameFetch from "../../hooks/gameFetch";
import {useDispatch, useSelector} from "react-redux";
import { configureGame, loadGame } from '../../store/slice.game';
import readFromFile from "../../utils/readFromFile";
import {setPath, startGame} from "../../store/slice.general";
import {Redirect} from "react-router-dom";
import { solveBoard } from '../../utils/game';

export default function SelectPageComponent(){
    const hasGame = useSelector(state => state.general.hasGame)
    const path = useSelector(state => state.general.path)
    const [ index, setIndex] = useState(0);
    const { finish, loading, list } = gameFetch(index);
    const dispatch = useDispatch()
    const loader = useRef(null);
    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            setIndex((prev) => prev + 10);
        }
    }, []);
    const prepareGame = async (index) => {
        console.log(index)
        const chunk = await readFromFile(index).then(t => t[0])
        dispatch(loadGame({id: index, board: chunk}))
        dispatch(startGame())
    }

    useEffect(() => {
        if(path !== '/select') dispatch(setPath({path: '/select'}))
    }, [hasGame, dispatch, path])

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "500px",
            threshold: 1
        });
        if(!finish ) {
            if(!loading) {
                if (loader.current) observer.observe(loader.current);
            }
        }

        return () => {
            if(loader.current)
                observer.unobserve(loader.current)
        }
    }, [handleObserver, finish, list, loading]);




    if(hasGame) return (<Redirect to="/game" />)
    return (
        <div className="select-container"><div>
            {list.map((r,i) =>
                <div key={i}>
                    <div key={"a"+i} className="select-title">GAME {i+1}</div>
                    <div key={"b"+i} className="select-board">
                        {r.map((rr => rr.map((rrr,ii) =>
                            <div key={ii} className={"select-cell" + (rrr !== 0 ? " c": "")}>
                                {rrr !== 0 ? rrr : null}
                            </div>
                        )))}
                        <div key={"c"+i} className="gap-vertical" />
                        <div key={"d"+i} className="gap-vertical" />
                        <div key={"e"+i} className="gap-horizontal" />
                        <div key={"f"+i} className="gap-horizontal" />
                    </div>
                    <div key={"g"+i} className="select-options">
                        <div key={"h"+i} onClick={() => prepareGame(i)} className="select-button">START</div>
                    </div>
                </div>)}
            {loading && <div className="select-loading">Loading...</div>}
            <div ref={loader} />
        </div></div>
    );
}