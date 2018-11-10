import { createServer } from 'http';
import fs from 'fs';
import path from 'path';
import express from 'express';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'mobx-react';

import { StaticRouter as Router } from 'react-router-dom';
import AppState from '../shared/store';
import Routes from '../shared/routes';

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
};

const renderView = (req, appstate) => {
    const context = {};

    const componentHTML = renderToString(
        <Provider appstate={appstate}>
            <Router location={ req.url } context={context}>
                <Routes />
            </Router>
        </Provider>
    );

    const HTML = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>MobX Test</title>
                <script>
                    window.__INITIAL_STATE__ = ${ JSON.stringify({ appstate: appstate.toJson() }) };
                </script>
            </head>
            <body>
                <div id="root">${componentHTML}</div>
                <script type="application/javascript" src="/bundle.js"></script>
            </body>
        </html>
    `;

    return HTML
}

const data = (timeout) => new Promise(resolve => setTimeout(() => resolve(['one', 'two', 'three', 'four']), timeout))
    
let app = express();
app.server = createServer(app);

app.get('/data', async(req, res, next) => {
    try {
        res.json(await data(1000))
        res.end()
    } catch(e){
        console.log(999, e)
    }
})

app.get('/bundle.js', async (req, res, next) => {
    try {
        res.sendFile(path.resolve(__dirname, '../../dist/bundle.js'));
    } catch (e){
        console.log(999, e)
    }
})

app.get('*', async (req, res, next) => {
    try {
        const appstate = new AppState();
        let d = await data(5000)
        d.forEach(elem => {
            console.log(elem)
            appstate.addItem(elem)
        })
        res.write(renderView(req, appstate));
        res.end()

    } catch(e){
        console.log(999, e)
    }
});

app.server.listen(3000, () => {
    console.log(`Started on port ${app.server.address().port}`);
});