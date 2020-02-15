import { createSelector } from "@reduxjs/toolkit";
import { selectors as translationSelectors } from "../EventTranslationHandlers";
import { eventSelectors } from "../EventsHandlers";
import { objIsEmpty } from "../../../Utils/jsTypesHelper";

const selectEventsWithTranslations = createSelector(
  [translationSelectors.selectEventTranslations, eventSelectors.selectEvents],
  (eventTranslations, events) => {
    if (objIsEmpty(events)) return null;

    let result = {};

    Object.entries(events).forEach(([key, event]) => {
      let eventTranslation = Object.values(eventTranslations).find(el => {
        return Number(el.eventId) === Number(key);
      });

      eventTranslation = eventTranslation || {};

      result[key] = { ...event, ...eventTranslation };
    });

    result = objIsEmpty(result) ? null : result;

    return result;
  }
);

export default selectEventsWithTranslations;
