import { createSelector } from "@reduxjs/toolkit";
import { selectors } from "./EventTranslationHandlers";
import { selectEventById } from "./EventsHandlers";

const { selectEventTranslationByEventId } = selectors;

const selectEventWithTranslation = createSelector(
  [selectEventTranslationByEventId, selectEventById],
  (eventTranslation, event) => {
    console.log("selectEventWithTranslation!!!");
    console.log(eventTranslation);
    console.log(event);
    return { ...event, ...eventTranslation };
  }
);

export default selectEventWithTranslation;
