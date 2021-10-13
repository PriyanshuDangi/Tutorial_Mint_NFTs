import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Mint from './components/mint/Mint.jsx';
import Home from './components/home/Home.jsx';
import Char2Bytes from './components/char2Bytes/Char2Bytes.jsx';

const App = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact component={Char2Bytes} path="/char2Bytes" />
                    <Route exact component={Mint} path="/mint" />
                    <Route exact component={Home} path="/" />
                </Switch>
            </Router>
        </div>
    );
};

export default App;
