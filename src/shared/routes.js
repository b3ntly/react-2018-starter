import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Root from './root';
import NotFound from './notfound';

export default function Routes(props) {
    return (
        <Switch>
            <Route exact path='/' component={ Root }/>
            <Route component={ NotFound }/>
        </Switch>
    );
}