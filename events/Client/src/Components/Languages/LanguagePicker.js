import React from "react";
import PropTypes from "prop-types";
import LanguageFlag from "./LanguageFlag";

const LanguagePicker = props => {
  const { activeLanguageIsoCode, languages } = props;

  if (!languages || languages.length <= 1) return null;
  if (!activeLanguageIsoCode) return null;

  const flagsName = { en: "america", nb: "norway" };

  const languagesResult = languages.map(element => (
    <LanguageFlag
      key={element.id}
      isActive={element.isoCode === activeLanguageIsoCode}
      name={flagsName[element.isoCode]}
    />
  ));

  return <div className="Language-picker">{languagesResult}</div>;
};

LanguagePicker.defaultProps = {
  languages: [
    { isoCode: "nb", name: "norway", id: 1 },
    { isoCode: "en", name: "usa", id: 2 }
  ],
  activeLanguageIsoCode: "en"
};

LanguagePicker.propTypes = {
  languages: PropTypes.instanceOf(Array).isRequired,
  activeLanguageIsoCode: PropTypes.string.isRequired
};

export default LanguagePicker;