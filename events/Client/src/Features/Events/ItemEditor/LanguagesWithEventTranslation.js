/* eslint-disable import/prefer-default-export */
import { createSelector } from "reselect";
import { selectors as eventTranslationSelectors } from "../EventTranslationHandlers";
import { languageSelectors } from "../../Languages/LanguagesHandlers";
import { objIsEmpty, getObj } from "../../../Utils/jsTypesHelper";

export const selectLanguagesWithEventTranslations = createSelector(
  languageSelectors.selectLanguages,
  eventTranslationSelectors.selectEventTranslations,
  (languages, eventTranslations) => {

    if (objIsEmpty(languages)) {
      return [];
    }

    const eventTranslationsTemp = getObj(eventTranslations);

    const resultArrays = [];

    Object.entries(languages).forEach(([key, language]) => {
      const languageId = Number(key);
      let eventTranslation = Object.values(eventTranslationsTemp).find(
        event => {
          return event.languageId === languageId;
        }
      );

      eventTranslation = eventTranslation || {};

      resultArrays.push({
        languageId,
        languageIsoCode: language.isoCode,
        eventTranslationTitle: eventTranslation.title || null,
        eventTranslationId: eventTranslation.eventTranslationId || null
      });
    });
    return resultArrays;
  }
);
