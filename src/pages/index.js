import './index.scss'

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import GamePage from "./game";
import SelectPage from "./select";
import MainPage from "./main";
import HistoryPage from "./history";
import HeaderComponent from "../components/page.header";

export default function PageRouter(){
    return(
        <Router>
            <div className="page-container">
                <HeaderComponent />
                <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route path="/game" component={GamePage} />
                    <Route path="/select" component={SelectPage} />
                    <Route path="/history" component={HistoryPage} />
                </Switch>
            </div>
        </Router>
    )
}