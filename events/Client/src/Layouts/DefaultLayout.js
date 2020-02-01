import React from "react";
import PropTypes from "prop-types";
import LanguagePicker from "../Features/Languages/LanguagePicker";
import "./DefaultLayout.css";
import { DEFAULT_PADDINGS_CLASS_NAME } from "../constants";
import AppHeader from "../UI/AppHeader";

const DefaultLayout = props => {
  const { children, currentLangId } = props;
  return (
    <div className="App">
      <AppHeader appName="City events">
        <LanguagePicker currentLangId={currentLangId} />
      </AppHeader>
      <div className={`App-main ${DEFAULT_PADDINGS_CLASS_NAME}`}>
        {children}
      </div>
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
  currentLangId: PropTypes.number.isRequired
};

export default DefaultLayout;
