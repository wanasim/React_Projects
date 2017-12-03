import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {createStore} from 'redux'
import reducer from './reducers'
// ^notice above import exports function calendar as 'default' (so do some other imports). This allows us to import anything exported as default without any {}, as well as have a generic name. For example, we can give it a name of 'something' rather than reducer

// passing reducer and redux devtool extension as parameters to store.
const store = createStore(
   reducer,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
console.log(store) //will log an the store object with built-in methods like dispatch() and getState()
console.log(store.getState())

ReactDOM.render(<App store={store}/>, document.getElementById('root'));
registerServiceWorker();
