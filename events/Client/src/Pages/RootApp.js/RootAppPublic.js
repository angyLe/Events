import React from "react";
import PropTypes from "prop-types";
import useLocationChanged from "../../CustomHooks/LocationChanged";

const RootApp = props => {
  const { children } = props;

  useLocationChanged();

  return <>{children}</>;
};

RootAppPublic.propTypes = {
  children: PropTypes.node.isRequired
};

export default RootAppPublic;
