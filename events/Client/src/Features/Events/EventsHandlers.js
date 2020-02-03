/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { FETCH_STATE } from "../../constants";
import { getObj } from "../../Utils/jsTypesHelper";
import { resetAction } from "../RootApp/RootAppHandlers";

const initialState = {
  fetchState: null,
  eventsList: null
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    getEventsStart(state) {
      state.fetchState = FETCH_STATE.loading;
    },
    getEventsSuccess(state, action) {
      state.eventsList = action.payload;
      state.fetchState = FETCH_STATE.success;
    },
    getEventsFailure(state) {
      state.fetchState = FETCH_STATE.error;
    },
    addEvent(state, action) {
      const event = action.payload;
      if (event && event.id) state.eventsList[event.id] = event;
    },
    updateEvent(state, action) {
      const event = action.payload;
      const { id } = event;
      if (id && state.eventsList[id]) {
        state.eventsList[id] = event;
      }
    },
    deleteEvent(state, action) {
      if (action.payload) delete state.eventsList[action.payload];
    }
  },
  extraReducers: builder =>
    builder.addCase(resetAction, (state, action) => {
      return initialState;
    })
});

export const {
  getEventsStart,
  getEventsSuccess,
  getEventsFailure,
  addEvent,
  updateEvent,
  deleteEvent
} = eventsSlice.actions;

export default eventsSlice.reducer;

/** SELECTORS */
const selectSlice = state => getObj(state).events || {};

export const selectEvents = state => selectSlice(state).eventsList || {};

export const selectFetchState = state => selectSlice(state).fetchState;

export const selectEventById = (state, props) => {
  return selectEvents(state)[props.eventId] || {};
};

