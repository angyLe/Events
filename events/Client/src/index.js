/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import DefaultLayout from "./Layouts/DefaultLayout";
import EventsInfo from "./Pages/EventsInfo/EventsInfo";
import combineReducers from "./combineReducers";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";

const configureStore = initialState => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewares = [thunk];
  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares)
    // other store enhancers if any
  );

  const store = createStore(combineReducers, initialState, enhancer);
  return store;
};

const store = configureStore();

const TestPage = () => {
  return <div>Event page</div>;
};

const NotFoundPage = () => {
  return <div>Not Found</div>;
};

const renderWithLayout = (Component, Layout) => props => (
  <Layout {...props}>
    <Component {...props} />
  </Layout>
);

render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={renderWithLayout(EventsInfo, DefaultLayout)}
        />
        <Route
          path="/event"
          component={renderWithLayout(TestPage, DefaultLayout)}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
