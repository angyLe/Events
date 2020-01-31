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
import RootAppPublic from "./Features/RootApp/RootAppPublic";

const renderWithLayout = (Component, Layout, extraProps) => props => {
  if (!Layout) return <Component />;

  return (
    <Layout {...props} {...extraProps}>
      <Component {...props} {...extraProps} />
    </Layout>
  );
};

const Test = () => {
  return <div>Test</div>;
};

const RoutesConfig = ({ currentLangCode, history }) => {
  const navigate = url => {
    console.log("url");
    console.log(url);
    console.log(history);

    history.push({
      pathname: `/${currentLangCode}/${url}`
      //search: "?query=abc",
    });

    //history.push(`${currentLangCode}/${url}`);
  };

  const navigateToEventTranslation = ({ eventId }) => {
    navigate(`event/${eventId}`);
  };

  const navigateToEventsList = () => {
    navigate("");
  };

  return { navigateToEventTranslation, navigateToEventsList };
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
              history,
              match: { url, params }
            } = routeInfo;

            const isoCodeParam =
              typeof params === "object" ? params.lang : null;
            const redirectToDefaultLang = <Redirect to={{ pathname: "/en" }} />;

            if (!isoCodeParam) return redirectToDefaultLang;

            const isoCodes = ["nb", "en"];

            /* TODO: Add temporary solution to pass language id as props. It must be
            replaced later by retrieving data from languages array.
            */
            const languageIds = {
              nb: 2,
              en: 1
            };
            const isValidIsoCode = isoCodes.includes(isoCodeParam);

            if (!isValidIsoCode) return redirectToDefaultLang;

            const routesConfig = RoutesConfig({
              currentLangCode: isoCodeParam,
              history
            });

            const extraProps = {
              currentLangId: languageIds[isoCodeParam],
              routesConfig
            };

            return (
              <RootAppPublic>
                <Switch>
                  <Route
                    exact
                    path={`${url}/`}
                    component={renderWithLayout(
                      EventsInfoPage,
                      DefaultLayout,
                      extraProps
                    )}
                  />

                  <Route
                    path={`${url}/event/:id`}
                    component={renderWithLayout(
                      EventDetails,
                      DefaultLayout,
                      extraProps
                    )}
                  />
                  <Route component={renderWithLayout(PageNotFound, null)} />
                </Switch>
              </RootAppPublic>
            );
          }}
        />

        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
