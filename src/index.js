import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Amplify from 'aws-amplify';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-unresolved
import config from './aws-exports';
import App from './components/App';
import store from './redux/store';

Amplify.configure(config);
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>

            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
