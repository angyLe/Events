import React from "react";
import { PropTypes } from "prop-types";
import { FETCH_STATE } from "../constants";
import tr from "../Utils/translationHelper";

const FetchingState = props => {
  const { fetchState, children } = props;

  if (fetchState === FETCH_STATE.loading) {
    return <>{tr("FetchLoading", "Loading...")}</>;
  }

  if (fetchState === FETCH_STATE.error) {
    return <>{tr("FetchError", "Could not get data ")}</>;
  }

  return <>{children}</>;
};

FetchingState.defaultProps = {
  fetchState: null
};

FetchingState.propTypes = {
  fetchState: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default FetchingState;
