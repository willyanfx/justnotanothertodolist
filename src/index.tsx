import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { css, jsx, Global } from '@emotion/core';
import reset from './constants/reset';
ReactDOM.render(
    <>
        <Global
            styles={css`
                ${reset}
                *, *::after, *::before {
                    box-sizing: border-box;
                    -moz-osx-font-smoothing: grayscale;
                    -webkit-font-smoothing: antialiased;
                    font-smoothing: antialiased;
                }
            `}
        />
        <App />
    </>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
