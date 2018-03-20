import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware, compose} from 'redux'
import reducer from './reducers'
import {Provider } from 'react-redux'
// ^notice above import exports function calendar as default (so do some other imports). This allows us to import anything exported as default without any {}, as well as have a generic name. For example, we can give it a name of 'something' rather than reducer

// custom 'logger' below that can be passed as an argument to applyMiddleware. Also, note that 'logger' is a curried function, so store returns another function called next which returns action
//there should be a logger function that you can use via applyMiddleware
const logger = store => next => action => {
   console.group(action.type)
   console.info('disptaching', action)
   let result = next(action)
   console.log('next state', store.getState())
   console.groupEnd("BEOW",action.type)
   return result
}


// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// passing reducer and redux devtool extension as parameters to store.
const store = createStore(
   reducer,
   composeEnhancer(
      applyMiddleware(logger)
   )

)
console.log(store) //will log an the store object with built-in methods like dispatch() and getState()
console.log(store.getState())

ReactDOM.render(
   <Provider store={store}>
      <App/>
   </Provider>, document.getElementById('root'));
registerServiceWorker();
