import { createSelector } from "@reduxjs/toolkit";
import DateTimeProvider from "../../../Utils/dateTimeProvider";
import selectEventsWithTranslations from "./SelectEventsWithTranslation";
import { objIsEmpty } from "../../../Utils/jsTypesHelper";

const selectEventsFilteredByDate = createSelector(
  [
    selectEventsWithTranslations,
    (state, props) => props.dateFrom,
    (state, props) => props.dateTo
  ],
  (events, dateFrom, dateTo) => {
    if (objIsEmpty(events)) return null;

    let result = {};

    Object.entries(events).forEach(([key, event]) => {
      const isBeforeDateTo = DateTimeProvider.dayIsBefore({
        date: event.dateTimeFrom,
        dateToCompareWith: dateTo
      });

      const isAfterDateFrom = DateTimeProvider.dayIsAfter({
        date: event.dateTimeFrom,
        dateToCompareWith: dateFrom
      });

      if (isBeforeDateTo && isAfterDateFrom) {
        result[key] = event;
      }
    });

    result = !objIsEmpty(result) ? result : null;

    return result;
  }
);

export default selectEventsFilteredByDate;
