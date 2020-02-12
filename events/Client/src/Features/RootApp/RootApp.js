import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { languageOperations } from "../Languages/LanguageApi";
import { languageSelectors } from "../Languages/LanguagesHandlers";
import FetchingState from "../../UI/FetchingState";
import { FETCH_STATE } from "../../constants";

import useLocationChanged from "../../CustomHooks/LocationChanged";

const RootApp = props => {
  const { children, fetchLanguagesFromServer, fetchState } = props;

  useLocationChanged();

  useEffect(() => {
    fetchLanguagesFromServer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FetchingState showLoadingOnInit fetchState={fetchState}>
      {children}
    </FetchingState>
  );
};

RootApp.defaultProps = {
  languages: {},
  fetchState: FETCH_STATE.loading
};

RootApp.propTypes = {
  children: PropTypes.node.isRequired,
  fetchLanguagesFromServer: PropTypes.func.isRequired,
  languages: PropTypes.shape({}),
  fetchState: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
  return {
    languages: languageSelectors.selectLanguages(state),
    fetchState: languageSelectors.selectFetchState(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchLanguagesFromServer: () => {
      dispatch(languageOperations.fetchLanguagesFromServer());
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RootApp)
);
