import React from "react";
import PropTypes from "prop-types";
import { Flag, Button } from "semantic-ui-react";
import tr from "../../../Utils/translationHelper";
import { SEMANTIC_UI_FLAGS, ICON_NAMES } from "../../../constants";
import "./EventTranslations.css";

const EventTranslations = props => {
  const {
    languagesWithEventTranslations,
    editOrAddEventTranslation,
    currentLanguageId
  } = props;

  if (
    !Array.isArray(languagesWithEventTranslations) ||
    languagesWithEventTranslations.length <= 0
  )
    return null;

  const items = languagesWithEventTranslations.map(item => {
    const itemLangId = item.languageId;
    const isCurrentItem = currentLanguageId === itemLangId;
    return (
      <LanguageWithEventInfo
        key={item.languageId}
        isCurrentItem={isCurrentItem}
        languageId={itemLangId}
        languageIsoCode={item.languageIsoCode}
        eventTranslationTitle={item.eventTranslationTitle}
        eventTranslationId={item.eventTranslationId}
        btnClickAction={
          !isCurrentItem
            ? () =>
                editOrAddEventTranslation({
                  languageId: item.languageId
                })
            : null
        }
      />
    );
  });

  return (
    <div className="Event-translations">
      <h4 className="Event-translations-header">{tr("Translations")}</h4>
      {items}
    </div>
  );
};

const LanguageWithEventInfo = props => {
  const {
    languageIsoCode,
    eventTranslationTitle,
    eventTranslationId,
    btnClickAction,
    isCurrentItem
  } = props;

  return (
    <div className="Language-with-event-info">
      <Flag
        className="Language-with-event-info-flag"
        name={SEMANTIC_UI_FLAGS[languageIsoCode]}
      />
      <div className="Language-with-event-info-Title">
        {eventTranslationTitle || "-"}
      </div>
      <Button
        disabled={isCurrentItem}
        color="green"
        onClick={btnClickAction}
        icon={eventTranslationId ? ICON_NAMES.pencil : ICON_NAMES.add}
      />
    </div>
  );
};

LanguageWithEventInfo.defaultProps = {
  eventTranslationTitle: null,
  eventTranslationId: null,
  btnClickAction: null
};

LanguageWithEventInfo.propTypes = {
  languageIsoCode: PropTypes.string.isRequired,
  eventTranslationTitle: PropTypes.string,
  eventTranslationId: PropTypes.number,
  btnClickAction: PropTypes.func,
  isCurrentItem: PropTypes.bool.isRequired
};

EventTranslations.propTypes = {
  languagesWithEventTranslations: PropTypes.instanceOf(Array).isRequired,
  editOrAddEventTranslation: PropTypes.func.isRequired,
  currentLanguageId: PropTypes.number.isRequired
};

export default EventTranslations;
