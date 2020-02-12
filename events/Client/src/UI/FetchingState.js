import React from "react";
import { PropTypes } from "prop-types";
import { FETCH_STATE } from "../constants";
import tr from "../Utils/translationHelper";

const FetchingState = props => {
  const { fetchState, children, showLoadingOnInit } = props;

  if (
    fetchState === FETCH_STATE.loading ||
    (fetchState === null && showLoadingOnInit)
  ) {
    return (
      <span style={{ display: "flex", justifyContent: "center" }}>
        {tr("FetchLoading", "Loading...")}
      </span>
    );
  }

  if (fetchState === FETCH_STATE.error) {
    return <>{tr("FetchError", "Could not get data ")}</>;
  }

  return <>{children}</>;
};

FetchingState.defaultProps = {
  fetchState: null,
  showLoadingOnInit: false
};

FetchingState.propTypes = {
  showLoadingOnInit: PropTypes.bool,
  fetchState: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default FetchingState;
