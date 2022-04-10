import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Amplify from 'aws-amplify';
import { Provider } from 'react-redux';
import App from './components/App';
import config from './aws-exports';
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
