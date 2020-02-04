import { createSelector } from "@reduxjs/toolkit";
import { selectors as translationSelectors } from "./EventTranslationHandlers";
import { selectEventById } from "./EventsHandlers";

const selectEventWithTranslation = createSelector(
  [translationSelectors.selectEventTranslationByEventId, selectEventById],
  (eventTranslation, event) => {
    console.log("selectEventWithTranslation!!!");
    console.log(eventTranslation);
    console.log(event);
    return { ...event, ...eventTranslation };
  }
);

export default selectEventWithTranslation;
