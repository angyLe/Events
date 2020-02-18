/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { getObj } from "../../Utils/jsTypesHelper";
import { resetAction } from "../RootApp/RootAppHandlers";
import { SAVING_STATE, FETCH_STATE } from "../../constants";
import { selectors as eventTranslationSelectors } from "./EventTranslationHandlers";

const eventFields = {};
const eventTranslationFields = {};

const initialState = {
  fetchState: null,
  savingState: null,
  eventFields,
  eventTranslationFields,
  validationErrors: null
};

export const setEventTranslationInitialFields = ({ languageId, eventId }) => ({
  languageId,
  eventId
});

/** REDUCER */
const eventEditorSlice = createSlice({
  name: "eventEditor",
  initialState,
  reducers: {
    getEventInitialDataStart(state) {
      state.fetchState = FETCH_STATE.loading;
    },
    setEventInitialData(state, action) {
      const { event, eventTranslation } = action.payload;
      state.eventFields = event || {};
      state.eventTranslationFields = eventTranslation || {};
      state.fetchState = FETCH_STATE.success;
    },
    setEventTranslationData(state, action) {
      const { eventTranslation } = action.payload;
      state.eventTranslationFields = eventTranslation || {};
      state.fetchState = FETCH_STATE.success;
    },
    saveEventStart(state) {
      state.validationErrors = null;
      state.savingState = SAVING_STATE.saving;
    },
    saveEventSuccess(state, action) {
      const { eventId, eventTranslationId } = action.payload;
      state.savingState = SAVING_STATE.success;
      state.eventFields.eventId = eventId || null;
      state.eventTranslationFields.eventTranslationId =
        eventTranslationId || null;
      state.eventTranslationFields.eventId = eventId || null;
    },
    saveEventFailure(state) {
      state.savingState = SAVING_STATE.error;
    },
    updateEvent(state, action) {
      const { value, property } = action.payload;
      state.eventFields[property] = value;
    },
    updateEventTranslation(state, action) {
      const { value, property } = action.payload;
      state.eventTranslationFields[property] = value;
    },
    setValidationErrors(state, action) {
      state.validationErrors = action.payload;
      state.savingState = SAVING_STATE.error;
    }
  },
  extraReducers: builder =>
    builder.addCase(resetAction, (state, action) => {
      return initialState;
    })
});

export const {
  getEventInitialDataStart,
  setEventInitialData,
  setEventTranslationData,
  saveEventStart,
  saveEventSuccess,
  saveEventFailure,
  updateEvent,
  updateEventTranslation,
  setValidationErrors
} = eventEditorSlice.actions;

export default eventEditorSlice.reducer;

/** END REDUCER */

/** SELECTORS */

export const selectors = {
  selectSlice: state => getObj(state).eventEditor || {},
  selectFetchState: state => selectors.selectSlice(state).fetchState || null,
  selectEventFields: state => selectors.selectSlice(state).eventFields || {},
  selectEventTranslationFields: state =>
    selectors.selectSlice(state).eventTranslationFields || {},
  selectEvent: state => {
    const ev = selectors.selectEventFields(state) || {};
    const evt = selectors.selectEventTranslationFields(state) || {};
    return { ...evt, ...ev };
  },
  selectCurrentLanguage: state => {
    return selectors.selectEventTranslationFields(state).languageId || 0;
  },
  selectEventSavingState: state =>
    selectors.selectSlice(state).savingState || null,
  selectValidationErrors: state =>
    selectors.selectSlice(state).validationErrors || null
};

const changeCurrentTranslation = data => {
  return (dispatch, getState) => {
    dispatch(getEventInitialDataStart());

    const { languageId, eventId } = data;
    const et = eventTranslationSelectors.selectEventTranslationByEventId(
      getState(),
      { languageId, eventId }
    );

    const mainFields = setEventTranslationInitialFields({
      languageId,
      eventId
    });

    const res = { ...et, ...mainFields };

    dispatch(setEventTranslationData({ eventTranslation: res }));
  };
};

export const eventTranslationOperation = { changeCurrentTranslation };
