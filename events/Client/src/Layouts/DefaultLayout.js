import React from "react";
import PropTypes from "prop-types";
import AppLogo from "../UI/Logo"
import "./DefaultLayout.css";
import { DEFAULT_PADDINGS_CLASS_NAME } from "../constants";

const DefaultLayout = props => {
  const { children } = props;
  return (
    <div className="App">
      <header className={`App-header ${DEFAULT_PADDINGS_CLASS_NAME}`}>
        <div className="App-name">
          <AppLogo />
          City events
        </div>
        <p className="App-menu">Menu</p>
      </header>
      <div className={`App-main ${DEFAULT_PADDINGS_CLASS_NAME}`}>
        {children}
      </div>
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default DefaultLayout;
