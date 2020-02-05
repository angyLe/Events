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
import RootApp from "./Features/RootApp/RootAppPublic";
import AdminLayout from "./Layouts/AdminLayout";
import AdminEventsListPage from "./Pages/AdminEventsList/AdminEventsListPage";
import WithReset from "./UI/WithReset";

const renderWithLayout = (Component, Layout, extraProps) => props => {
  if (!Layout) return <Component />;

  return (
    <Layout {...props} {...extraProps}>
      <WithReset>
        <Component {...props} {...extraProps} />
      </WithReset>
    </Layout>
  );
};

const RoutesConfig = ({ currentLangCode, history }) => {
  const navigate = url => {
    history.push({
      pathname: `/${currentLangCode}/${url}`
      //search: "?query=abc",
    });
  };

  const adminNavigate = url => {
    history.push({
      pathname: `/admin/${url}`
    });
  };

  const navigateToEventTranslation = ({ eventId }) => {
    navigate(`event/${eventId}`);
  };

  const navigateToEventsList = () => {
    navigate("");
  };

  const navigateToEventEditor = args => {
    const { eventId = null } = args || {};
    if (eventId) {
      adminNavigate(`eventEditor/${eventId}`);
    } else {
      adminNavigate(`eventEditor`);
    }
  };

  return {
    navigateToEventTranslation,
    navigateToEventsList,
    navigateToEventEditor
  };
};

const Routes = () => {
  return (
    <Router>
      <RootApp>
        <Switch>
          <Route
            path="/admin"
            render={({ history, match: { url } }) => {
              const routesConfig = RoutesConfig({
                history
              });

              const extraProps = {
                routesConfig
              };
              return (
                <Switch>
                  <Route
                    exact
                    path={`${url}/`}
                    component={renderWithLayout(
                      AdminEventsListPage,
                      AdminLayout,
                      extraProps
                    )}
                  />
                  <Route
                    path={`${url}/eventEditor/:eventId?`}
                    component={renderWithLayout(
                      EventEditorPage,
                      AdminLayout,
                      extraProps
                    )}
                  />
                  <Route component={renderWithLayout(PageNotFound, null)} />
                </Switch>
              );
            }}
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
              const redirectToDefaultLang = (
                <Redirect to={{ pathname: "/en" }} />
              );

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
              );
            }}
          />
          <Route component={PageNotFound} />
        </Switch>
      </RootApp>
    </Router>
  );
};

export default Routes;
