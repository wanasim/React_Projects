import React from 'react';
import ReactDOM from 'react-dom';
// import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './components/App';

// import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers'
import {createStore, applyMiddleware, compose } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk'


// const composeEnhancer //if you want to  add redux extension capabilties in the browser
// const store = createStore(reducer, applyMiddleware(thunk))
const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(<Provider store={store} ><App /></Provider>, document.getElementById('root'));
// registerServiceWorker();
