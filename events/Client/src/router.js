/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
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
import RootApp from "./Features/RootApp/RootApp";
import AdminLayout from "./Layouts/AdminLayout";
import AdminEventsListPage from "./Pages/AdminEventsList/AdminEventsListPage";
import WithReset from "./UI/WithReset";
import { languageSelectors } from "./Features/Languages/LanguagesHandlers";
import { objIsEmpty } from "./Utils/jsTypesHelper";

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

const Routes = props => {
  const { appLanguages } = props;

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

              const currentLang = languageSelectors.selectLanguageByIsoCodeFromList(
                appLanguages,
                { isoCode: isoCodeParam }
              );

              const isValidIsoCode = !objIsEmpty(currentLang);

              if (!isValidIsoCode) return redirectToDefaultLang;

              const routesConfig = RoutesConfig({
                currentLangCode: currentLang.isoCode,
                history
              });

              const extraProps = {
                currentLangId: currentLang.languageId,
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

Routes.defaultProps = {
  appLanguages: {}
};

Routes.propTypes = {
  appLanguages: PropTypes.shape({})
};

const mapStateToProps = state => {
  return {
    appLanguages: languageSelectors.selectLanguages(state)
  };
};

export default connect(mapStateToProps, null)(Routes);