import './index.scss'
import painting from '../../assets/painting.jpg'
import { Link } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { setPath } from "../../store/slice.general";

export default function MainPage(){
    const hasGame = useSelector(state => state.general.hasGame)
    const path = useSelector(state => state.general.path)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPath({path: '/'}))
    }, [dispatch, hasGame, path])

    return(
        <div className="main-container">
            <div className="painting-container">
                <img src={painting} alt=""/>
                <p>Mnemosyne (<i>aka Lamp of Memory or Ricordanza</i>) by Dante Gabriel Rossetti (c. 1876 to 1881)</p>
            </div>
            <div className="info-container">
                <h2>About Mnemosyne</h2>
                <p>Mnemosyne (/nɪˈmɒzɪniː, nɪˈmɒsɪniː/; Greek: Μνημοσύνη, pronounced [mnɛːmosýːnɛː]) is the goddess of memory in Greek mythology. The term Mnemosyne is derived from the same source as the word mnemonic, that being the Greek word mnēmē, which means "remembrance, memory".</p>
                <p>Mnemosyne is the mother of the nine Muses.</p>
                <h2>About Sudoku</h2>
                <p>Sudoku (数独, sūdoku, digit-single) (/suːˈdoʊkuː, -ˈdɒk-, sə-/, originally called Number Place)[1] is a logic-based,[2][3] combinatorial[4] number-placement puzzle. In classic sudoku, the objective is to fill a 9×9 grid with digits so that each column, each row, and each of the nine 3×3 subgrids that compose the grid (also called "boxes", "blocks", or "regions") contain all of the digits from 1 to 9. The puzzle setter provides a partially completed grid, which for a well-posed puzzle has a single solution.</p>
                <Link to={hasGame ? "/game" : "/select"}>
                    {hasGame ? "RESUME PLAYING": "START PLAYING"}
                </Link>
            </div>
        </div>
    )
}