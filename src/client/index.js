import 'babel-core/register';
import 'babel-polyfill';

import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import AppState from '../shared/store';
import Routes from '../shared/routes';

const element = document.getElementById('root');
const appstate = new AppState(window.__INITIAL_STATE__);

let r = ReactDOM.hydrate(
    <Provider appstate={ appstate }>
        <Router>
            <Routes path={ window.location.pathname }/>
        </Router>    
    </Provider>,
    element
)