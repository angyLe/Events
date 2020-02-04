/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { FETCH_STATE } from "../../constants";
import { getObj } from "../../Utils/jsTypesHelper";
import { resetAction } from "../RootApp/RootAppHandlers";

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
  getEventsTranslationsFailure
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
