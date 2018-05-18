import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './components/App';

// import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers'
import {createStore, applyMiddleware, compose } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk'


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose//if you want to  add redux extension capabilties in the browser
const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)))
// console.log("Getting store state", store.getState())

ReactDOM.render(<Provider store={store}>
  <BrowserRouter>
    <App/>
  </BrowserRouter>
</Provider>, document.getElementById('root'));


// registerServiceWorker();
