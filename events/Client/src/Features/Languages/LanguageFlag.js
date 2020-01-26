import React from "react";
import PropTypes from "prop-types";
import { Flag, Button } from "semantic-ui-react";
import "./LanguageFlag.css";

const LanguageFlag = props => {
  const { isActive, name } = props;
  if (!name) return null;

  return (
    <Button className="Language-picker-flag-btn" size="small">
      <Flag
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
  name: PropTypes.string.isRequired
};

export default LanguageFlag;
