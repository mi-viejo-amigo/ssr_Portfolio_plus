import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { store } from "./services/store/store";
import { Provider } from "react-redux"
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'

const root = document.getElementById('root');

if (root) {
    ReactDOM.hydrateRoot(
      root,
      <>
        <StrictMode>
          <Router>
            <Provider store={store}>
              <App />
            </Provider>
          </Router>
        </StrictMode>
      </>
    )
}

