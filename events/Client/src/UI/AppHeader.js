import React from "react";
import PropTypes from "prop-types";
import AppLogo from "./Logo";
import { DEFAULT_PADDINGS_CLASS_NAME } from "../constants";
import "./AppHeader.css";

const AppHeader = props => {
  const { children, appName } = props;
  return (
    <header className={`App-header ${DEFAULT_PADDINGS_CLASS_NAME}`}>
      <div className="App-name">
        <AppLogo />
        {appName}
      </div>
      {children}
    </header>
  );
};

AppHeader.defaultProps = {
  children: null,
  appName: ""
};

AppHeader.propTypes = {
  children: PropTypes.node,
  appName: PropTypes.string
};

export default AppHeader;
