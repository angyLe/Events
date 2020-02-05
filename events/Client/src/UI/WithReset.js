import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import { useDispatch } from "react-redux";

const WithReset = props => {
  const { children } = props;

  const resetState = useDispatch();

  useEffect(() => {
    return () => {
      resetState({ type: "RESET" });
    };
  });

  return <>{children}</>;
};

WithReset.propTypes = {
  children: PropTypes.node.isRequired
};

export default WithReset;
