import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import LanguageFlag from "./LanguageFlag";
import { SEMANTIC_UI_FLAGS } from "../../constants";
import { getObj, getObjLength } from "../../Utils/jsTypesHelper";
import { languageSelectors } from "./LanguagesHandlers";

export const LanguagePicker = props => {
  const { currentLangId, appLanguages, history } = props;

  const changeLanguage = languageCode => {
    const currentLanguage = appLanguages[currentLangId] || {};
    const { pathname } = window.location;
    const currentIsoCode = languageSelectors.selectLanguageIsoCode(
      currentLanguage
    );
    const newPath = pathname.replace(currentIsoCode, languageCode);
    history.push(newPath);
  };

  const languagesObj = getObj(appLanguages);
  const languageListLength = getObjLength(languagesObj);

  if (languageListLength <= 1) return null;
  if (!currentLangId) return null;

  const languagesResult = Object.keys(languagesObj).map(el => {
    const element = languagesObj[el];
    const isoCode = languageSelectors.selectLanguageIsoCode(element);

    return (
      <LanguageFlag
        key={el}
        isActive={el.toString() === currentLangId.toString()}
        name={SEMANTIC_UI_FLAGS[element.isoCode]}
        changeLanguage={() => changeLanguage(isoCode)}
      />
    );
  });

  return <div className="Language-picker">{languagesResult}</div>;
};

LanguagePicker.defaultProps = {
  appLanguages: {}
};

LanguagePicker.propTypes = {
  appLanguages: PropTypes.shape({}),
  currentLangId: PropTypes.number.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};

const mapStateToProps = (state, ownProps) => {
  const { currentLangId } = ownProps;

  return {
    appLanguages: languageSelectors.selectLanguages(state, ownProps),
    currentLangId
  };
};

export default withRouter(connect(mapStateToProps, null)(LanguagePicker));
