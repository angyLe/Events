import { createSlice } from "@reduxjs/toolkit";
import { getObj } from "../../Utils/jsTypesHelper";
import DateTimeProvider from "../../Utils/dateTimeProvider";

/* eslint-disable no-param-reassign */
const dateTimeFilterHandlers = ({ name }) => {
  if (!name) return null;

  const createDateFilterSlice = () => {
    return createSlice({
      name,
      initialState: {
        periodType: "day",
        dateFrom: DateTimeProvider.getDateAsIsoString(
          DateTimeProvider.getDate()
        ),
        dateTo: DateTimeProvider.getDateAsIsoString(DateTimeProvider.getDate())
      },
      reducers: {
        setPeriod(state, action) {
          const { dateFrom, dateTo, periodType } = action.payload;
          state.dateFrom = dateFrom;
          state.dateTo = dateTo;
          state.periodType = periodType;
        }
      }
    });
  };

  const dateFilterSelectors = {
    selectSlice: state => getObj(state)[name] || null,
    selectPeriodType: state =>
      (dateFilterSelectors.selectSlice(state) || {}).periodType || null,
    selectDateFrom: state =>
      (dateFilterSelectors.selectSlice(state) || {}).dateFrom || null,
    selectDateTo: state =>
      (dateFilterSelectors.selectSlice(state) || {}).dateTo || null
  };

  return {
    createDateFilterSlice,
    dateFilterSelectors
  };
};

export default dateTimeFilterHandlers;
