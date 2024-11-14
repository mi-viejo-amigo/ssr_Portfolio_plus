// import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { store } from "./services/store/store";
import { Provider } from "react-redux"
import { StaticRouter } from 'react-router-dom/server';
import { StrictMode } from 'react';
import App from './App'

export function render(url: string) {
    const html = ReactDOMServer.renderToString(
        <StrictMode>
        <StaticRouter location={url} >
            <Provider store={store}>
                <App />
            </Provider>
        </StaticRouter>
        </StrictMode>
    )
    return { html }
}