import React from 'react';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import throttle from 'lodash.throttle';
import { createStore, applyMiddleware } from 'redux';
import { UserAuthWrapper as authWrapper } from 'redux-auth-wrapper';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reducer from './reducers';
import App from './containers/app';
import Home from './containers/home';
import Login from './containers/login';
import Signup from './containers/signup';
import { saveState, loadState } from './localStorage';

// By default we add redux-
const middlewares = [ thunk ];

// If in development; we add Redux-Logger for debugging
if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger');
  const logger = createLogger();
  middlewares.push(logger);
}

// Here we load the state from localStorage if it exists.
const persistedState = loadState();
const store = createStore(reducer, persistedState, applyMiddleware(...middlewares));

// Persists user state to localStorage whenever state changes
store.subscribe(throttle(() => {
  saveState({
    app: {
      user: store.getState().app.user
    }
  });
}, 1000));

// Redirects to /login by default
const userIsAuthenticated = authWrapper({
  authSelector: (state) => state.app.user
});

// Routing is done here. To add a new route, simply import the container,
// and pass it as a path prop in a new <Route/> component.
// If the route needs to be auth protected; simply wrap the component prop
// with userIsAuthenticated(), as in the index route.
ReactDOM.render((
  <Provider store={store}>
    <div>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={userIsAuthenticated(Home)} />
          <Route path="login" component={Login} />
          <Route path="signup" component={Signup} />
        </Route>
      </Router>
    </div>
  </Provider>
), document.getElementById('root'));
