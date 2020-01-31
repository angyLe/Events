import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import LanguageFlag from "./LanguageFlag";
import { SEMANTIC_UI_FLAGS } from "../../constants";
import { getObj, getObjLength } from "../../Utils/jsTypesHelper";

export const LanguagePicker = props => {
  const { currentLangId, languages, history } = props;

  const changeLanguage = languageCode => {
    const currentLanguage = languages[currentLangId] || {};
    const { pathname } = window.location;
    const newPath = pathname.replace(currentLanguage.isoCode, languageCode);
    history.push(newPath);
  };

  const languagesObj = getObj(languages);
  const languageListLength = getObjLength(languagesObj);

  if (languageListLength <= 1) return null;
  if (!currentLangId) return null;

  const languagesResult = Object.keys(languagesObj).map(el => {
    const element = languagesObj[el];

    return (
      <LanguageFlag
        key={element.id}
        isActive={el == currentLangId}
        name={SEMANTIC_UI_FLAGS[element.isoCode]}
        changeLanguage={() => changeLanguage(element.isoCode)}
      />
    );
  });

  return <div className="Language-picker">{languagesResult}</div>;
};

LanguagePicker.defaultProps = {
  languages: {
    2: { isoCode: "nb", name: "norway", id: 1 },
    1: { isoCode: "en", name: "usa", id: 2 }
  }
};

LanguagePicker.propTypes = {
  languages: PropTypes.shape({}),
  currentLangId: PropTypes.number.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};

export default withRouter(LanguagePicker);
