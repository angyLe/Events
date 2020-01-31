import React from "react";
import PropTypes from "prop-types";
import { Flag, Button } from "semantic-ui-react";
import "./LanguageFlag.css";

const LanguageFlag = props => {
  const { isActive, name, changeLanguage } = props;
  if (!name) return null;

  return (
    <Button className="Language-picker-flag-btn" size="small">
      <Flag
        onClick={changeLanguage}
        className={
          isActive
            ? "Language-picker-flag-active"
            : "Language-picker-flag-inactive"
        }
        name={name}
      />
    </Button>
  );
};

LanguageFlag.propTypes = {
  isActive: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  changeLanguage: PropTypes.func.isRequired
};

export default LanguageFlag;
