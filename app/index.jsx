import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import Game from './containers/Game';
import reducer from './reducer';

import './style.css';

const store = compose(applyMiddleware(thunk))(createStore)(reducer);

ReactDOM.render(
    <Provider store={store}>
        <Game />
    </Provider>,
    document.getElementById('app'),
);
