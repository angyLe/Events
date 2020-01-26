import React from "react";
import PropTypes from "prop-types";
import { Flag, Button } from "semantic-ui-react";
import tr from "../../Utils/translationHelper";
import { SEMANTIC_UI_FLAGS, ICON_NAMES } from "../../constants";
import "./EventTranslations.css";

const EventTranslations = props => {
  const { languagesWithEventTranslations } = props;

  if (
    !Array.isArray(languagesWithEventTranslations) ||
    languagesWithEventTranslations.length <= 0
  )
    return null;

  const items = languagesWithEventTranslations.map(item => {
    return (
      <LanguageWithEventInfo
        key={item.languageId}
        languageIsoCode={item.languageIsoCode}
        eventTranslationTitle={item.eventTranslationTitle}
        eventTranslationId={item.eventTranslationId}
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
  const { languageIsoCode, eventTranslationTitle, eventTranslationId } = props;

  return (
    <div className="Language-with-event-info">
      <Flag
        className="Language-with-event-info-flag"
        name={SEMANTIC_UI_FLAGS[languageIsoCode]}
      />
      <div className="Language-with-event-info-Title">
        {eventTranslationTitle}
      </div>
      <Button icon={eventTranslationId ? ICON_NAMES.pencil : ICON_NAMES.add} />
    </div>
  );
};

LanguageWithEventInfo.defaultProps = {
  eventTranslationTitle: null,
  eventTranslationId: null
};

LanguageWithEventInfo.propTypes = {
  languageIsoCode: PropTypes.string.isRequired,
  eventTranslationTitle: PropTypes.string,
  eventTranslationId: PropTypes.number
};

EventTranslations.propTypes = {
  languagesWithEventTranslations: PropTypes.instanceOf(Array).isRequired
};

export default EventTranslations;
