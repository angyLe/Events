/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { FETCH_STATE } from "../../constants";
import { getObj } from "../../Utils/jsTypesHelper";
import { resetAction } from "../RootApp/RootAppHandlers";
import dateTimeFilterHandlers from "./EventDateFilterHandlers";

const initialState = {
  fetchState: null,
  eventTranslationsList: null
};

/** REDUCER */
const eventTranslationsSlice = createSlice({
  name: "eventTranslations",
  initialState,
  reducers: {
    getEventsTranslationsStart(state) {
      state.fetchState = FETCH_STATE.loading;
    },
    getEventsTranslationsSuccess(state, action) {
      state.eventTranslationsList = action.payload;
      state.fetchState = FETCH_STATE.success;
    },
    getEventsTranslationsFailure(state) {
      state.fetchState = FETCH_STATE.error;
    },
    addEventTranslation(state, action) {
      const et = action.payload || {};

      if (et && et.eventTranslationId) {
        state.eventTranslationsList = state.eventTranslationsList || {};
        state.eventTranslationsList[et.eventTranslationId] = et;
      }
    },
    updateEventTranslation(state, action) {
      const et = action.payload || {};
      const { eventTranslationId } = et;
      if (
        eventTranslationId &&
        state.eventTranslationsList &&
        state.eventTranslationsList[eventTranslationId]
      ) {
        state.eventTranslationsList[eventTranslationId] = et;
      }
    }
  },
  extraReducers: builder =>
    builder.addCase(resetAction, (state, action) => {
      return initialState;
    })
});

export const {
  getEventsTranslationsStart,
  getEventsTranslationsSuccess,
  getEventsTranslationsFailure,
  addEventTranslation,
  updateEventTranslation
} = eventTranslationsSlice.actions;

export default eventTranslationsSlice.reducer;

/** END REDUCER */

/** SELECTORS */

/** To be able to test put all selectors into selectors object. Because of problem with
 * mocking of inner functions which is declared in the same file.
 */
export const selectors = {
  selectSlice: state => getObj(state).eventTranslations || {},
  selectEventTranslations: state =>
    selectors.selectSlice(state).eventTranslationsList || {},
  selectEventTranslationsFetchState: state =>
    selectors.selectSlice(state).fetchState,
  selectEventTranslationById: (state, props) => {
    return (
      selectors.selectEventTranslations(state)[props.eventTranslationId] || {}
    );
  },
  selectEventTranslationByEventId: (state, props) => {
    const eventTranslations = selectors.selectEventTranslations(state);

    const item = Object.values(eventTranslations).find(el => {
      return el.eventId == props.eventId && el.languageId == props.languageId;
    });

    return item || {};
  }
};

/** END SELECTORS */

/** EVENT DATE TIME FIlTER HANDLERS */
const eventTranslationsDateFilter = dateTimeFilterHandlers({
  name: "eventTranslationsDateFilter"
});

const eventTranslationDateFilterSlice = eventTranslationsDateFilter.createDateFilterSlice();

export const { setPeriod } = eventTranslationDateFilterSlice.actions;
export const dateTimeFilterReducer = eventTranslationDateFilterSlice.reducer;
export const dateTimeFilterSelectors =
  eventTranslationsDateFilter.dateFilterSelectors;
