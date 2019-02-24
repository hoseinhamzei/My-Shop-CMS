import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import './index.css';
import App from './App';
import Login from './Login';
import Notfound from './Notfound';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.scss';
import 'bootstrap/dist/js/bootstrap';

const routing = (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/cms" component={App} />
        <Route component={Notfound}/>
      </Switch>
    </Router>
  )



ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
