// TODO: this selector will take data from state.languages and state.eventTranslations

// eslint-disable-next-line import/prefer-default-export
export const getLanguagesWithEventTranslations = args => {
  const { languages, eventTranslations = {} } = args;

  if (!Array.isArray(languages) || languages.length <= 0) return null;

  const resultArrays = [];

  languages.forEach(language => {
    const languageId = language.id;
    let eventTranslation = Object.values(eventTranslations).find(event => {
      return event.languageId === languageId;
    });

    eventTranslation = eventTranslation || {};
    resultArrays.push({
      languageId,
      languageIsoCode: language.isoCode,
      eventTranslationTitle: eventTranslation.title || null,
      eventTranslationId: eventTranslation.id || null
    });
  });

  return resultArrays;
};
