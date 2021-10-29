import './index.scss'

import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { prepareStore } from '../store';
import { HeaderComponent } from '../components';
import { GamePage, HistoryPage, MainPage, SelectPage } from '../pages';

export function App() {
    const store = prepareStore()
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="app-container">
                    <HeaderComponent/>
                    <Switch>
                        <Route exact path="/" component={MainPage}/>
                        <Route path="/game" component={GamePage}/>
                        <Route path="/history" component={HistoryPage}/>
                        <Route path="/select" component={SelectPage}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    )
}