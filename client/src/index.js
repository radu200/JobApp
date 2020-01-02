import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import {Provider } from 'react-redux'
import store from './redux/store';
import {BrowserRouter as Router} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';



ReactDOM.render(
  <Provider store={store}>
     <Router>
        <App />
     </Router>
   </Provider>,
  document.getElementById('root')
 );



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
