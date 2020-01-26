/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import DefaultLayout from "./Layouts/DefaultLayout";
import EventsInfoPage from "./Pages/EventsInfo/EventsInfoPage";
import EventDetails from "./Pages/EventDetails/EventDetailsPage";
import { DEFAULT_LANG } from "./constants";
import PageNotFound from "./Pages/PageNotFound";
import EventEditorPage from "./Pages/EventEditor/EventEditorPage";

const renderWithLayout = (Component, Layout) => props => {
  if (!Layout) return <Component />;

  return (
    <Layout {...props}>
      <Component {...props} />
    </Layout>
  );
};

const Test = () => {
  return <div>Test</div>;
};

const Test2 = () => {
  return <div>Test2</div>;
};

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route
          path="/admin"
          render={({ match: { url } }) => (
            <>
              <Switch>
                <Route
                  exact
                  path={`${url}/`}
                  component={renderWithLayout(Test, DefaultLayout)}
                />
                <Route
                  path={`${url}/eventEditor/:id?`}
                  component={renderWithLayout(EventEditorPage, DefaultLayout)}
                />
                <Route component={renderWithLayout(PageNotFound, null)} />
              </Switch>
            </>
          )}
        />

        <Route
          path="/"
          exact
          render={() => (
            <Redirect
              to={{
                pathname: `/${DEFAULT_LANG}`
              }}
            />
          )}
        />

        <Route
          path="/:lang"
          render={routeInfo => {
            const {
              match: { url, params }
            } = routeInfo;

            const isoCodeParam =
              typeof params === "object" ? params.lang : null;
            const redirectToDefaultLang = <Redirect to={{ pathname: "/en" }} />;

            if (!isoCodeParam) return redirectToDefaultLang;

            const isoCodes = ["nb", "en"];
            const isValidIsoCode = isoCodes.includes(isoCodeParam);

            if (!isValidIsoCode) return redirectToDefaultLang;

            return (
              <>
                <Switch>
                  <Route
                    exact
                    path={`${url}/`}
                    component={renderWithLayout(EventsInfoPage, DefaultLayout)}
                  />

                  <Route
                    path={`${url}/event/:id`}
                    component={renderWithLayout(EventDetails, DefaultLayout)}
                  />
                  <Route component={renderWithLayout(PageNotFound, null)} />
                </Switch>
              </>
            );
          }}
        />

        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
