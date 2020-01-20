import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App';
import './index.scss';
import store from './redux/store';
import persistor from './redux/persistedStore';
import * as serviceWorker from './serviceWorker';
import Loading from './Utils/Loading'


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
        <App />
    </PersistGate>
   </Provider>,
  document.getElementById('root')
 );



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
